/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oneremote.server.core;

import oneremote.server.listener.FirebaseListenerThread;
import com.firebase.client.ChildEventListener;
import com.firebase.client.DataSnapshot;
import com.firebase.client.FirebaseError;
import oneremote.server.helper.Config;
import oneremote.server.models.Action;
import oneremote.server.models.DataObject;
import oneremote.server.ui.LoadingDialog;
import oneremote.server.ui.LoginFrame;
import oneremote.server.ui.MainUI;
import oneremote.server.utils.FirebaseAdapter;
import oneremote.server.utils.NetworkUtils;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author DangThanh
 */
public class Application implements ChildEventListener, MainUI.MainUIListener, LoginFrame.LoginListener {

    private MainUI mainUI;
    private LoginFrame loginFrame;
    private LoadingDialog loadingDialog;
    private FirebaseListenerThread fbListener;
    private FirebaseAdapter fbAdapter;
    private Login login;
    private Action action;

    public Application() throws Exception {
        this.initUI();
        Config.initConfig();
        this.initConfigFile();
    }

    //<editor-fold defaultstate="collapsed" desc="Init Properties">
    //=> Khoi tao giao dien
    private void initUI() throws InterruptedException, IOException {
        mainUI = new MainUI(this);
        loginFrame = new LoginFrame(this);
        loadingDialog = new LoadingDialog(loginFrame);
        loginFrame.setVisible(true);
    }

    private void initFirebase() throws InterruptedException {
        String childPath = login.getUID() + "/" + Config.DEVICE_NAME;
        //=> Ket noi Firebase
        fbAdapter = new FirebaseAdapter(childPath);

        //=> Khoi tao data cho Firebase
        String onlineStatus = "online|" + System.currentTimeMillis();
        DataObject dataObject = new DataObject("", "", "", onlineStatus);
        fbAdapter.createFirebase(dataObject);

        //=> Khoi tao Listener lang nghe su thay doi du lieu tren firebase
        fbListener = new FirebaseListenerThread(fbAdapter.getDeviceFirebase(), this.fbAdapter, this);
    }

    //=> Khoi tao Folder res
    private void initConfigFile() {
        File resFolder = new File("//res");
        resFolder.mkdir();

        File folder = new File(Config.WEBCAM_FOLDER);
        folder.mkdir();
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Server Action">
    //=> Thuc hien khi start server
    public void doStartServer() throws Exception {
        initFirebase();
        this.action = new Action();
    }

    //=> Thuc hien cac action khi nhan duoc request
    public String doAction(String request) throws Exception {
        String[] req = request.split("\\|");
        //=> Kiem tra cu phap request 
        if (req.length != 2) {
            return Config.SYNTAX_ERROR;
        }

        //=>Thuc hien action        
        if ("shutdown".equals(req[0])) {
            action.doShutdown(Integer.valueOf(req[1]));
        } else if ("restart".equals(req[0])) {
            action.doRestart(Integer.valueOf(req[1]));
        } else if ("hibernate".equals(req[0])) {
            action.doHibernate(Integer.valueOf(req[1]));
        } else if ("log_off".equals(req[0])) {
            action.doLogOff();
        } else if ("capture".equals(req[0])) {
            String imageUrl = action.captureAndUpload();
            fbAdapter.pushData("data", imageUrl);
        } else if ("next_slide".equals(req[0])) {
            this.action.doNextSlide();
        } else if ("prev_slide".equals(req[0])) {
            this.action.doPreSlide();
        } else if ("first_slide".equals(req[0])) {
            this.action.doGoFirstSlide();
        } else if ("last_slide".equals(req[0])) {
            this.action.doGoLastSlide();
        } else {
            return Config.SYNTAX_ERROR;
        }
        return req[0];
    }

    //=> Gui response khi thuc hien thanh cong action
    private void onDoActionSuccess() throws InterruptedException {
        fbAdapter.pushData("response", "success|" + System.currentTimeMillis());
//        fbAdapter.pushData("status", "online|" + System.currentTimeMillis());
//        Thread.sleep(2000);
    }

    @Override
    public void onClick() {
        new Thread() {
            @Override
            public void run() {
                try {
                    doStartServer();
                } catch (Exception ex) {
                    mainUI.printLog(ex.getLocalizedMessage());
                }
            }
        }.start();
        mainUI.setEnableStartBtn(false);
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Do Login">
    //=> Login
    public void doLogin() {
        login = new Login();
    }

    @Override
    public void onClickLogin(String email, String password) {
        if (!NetworkUtils.checkNetworkAvailable()) {
            loginFrame.setLoginStatus(Config.CONNECT_FAIL);
            return;
        }
        this.doLogin();
        //=> Dang nhap bang email va password da nhap
        login.loginWithEmailPassword(email, password, new Login.OnRequestListener() {
            @Override
            public void onLoading() {
                loadingDialog.showLoading();
                loginFrame.setEnableLoginButton(false);
                System.out.println("loading...");
            }

            @Override
            public void onSuccess() {
                try {
                    System.out.println("Success");
                    loadingDialog.hideLoading();
                    loginFrame.setLoginStatus(Config.LOGIN_SUCCESS);
                    Thread.sleep(2000);
                    loginFrame.setVisible(false);
                    mainUI.setVisible(true);
                } catch (InterruptedException ex) {
                    ex.printStackTrace();
                }
            }

            @Override
            public void onFail() {
                loadingDialog.hideLoading();
                loginFrame.setEnableLoginButton(true);
                loginFrame.setLoginStatus(Config.LOGIN_FAIL);
                System.out.println("Fail");
            }
        });
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Listen Firebase Event & Do Action">
    @Override
    public void onChildAdded(DataSnapshot ds, String string) {
        mainUI.printLog("Data was added");
    }

    @Override
    public void onChildChanged(DataSnapshot ds, String string) {
        try {
            String request = (String) ds.getValue();
            mainUI.printLog("Received 1 message");
            String result = this.doAction(request);
            if (!Config.SYNTAX_ERROR.equals(result)) {
                this.onDoActionSuccess();
                mainUI.printLog(result);
            }
        } catch (Exception ex) {
            mainUI.printLog(ex.getMessage());
        }
    }

    @Override
    public void onChildRemoved(DataSnapshot ds) {
        mainUI.printLog("Data was removed");
    }

    @Override
    public void onChildMoved(DataSnapshot ds, String string) {
        mainUI.printLog("Data was moved");
    }

    @Override
    public void onCancelled(FirebaseError fe) {
        mainUI.printLog("Firebase was disconnected: " + fe.getMessage());
    }
//</editor-fold>

    public static void main(String[] args) {
        try {
            Application app = new Application();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
