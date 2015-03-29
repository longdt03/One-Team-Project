/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.core;

import com.oneproject.server.listener.FirebaseListenerThread;
import com.firebase.client.ChildEventListener;
import com.firebase.client.DataSnapshot;
import com.firebase.client.FirebaseError;
import com.oneproject.server.helper.Config;
import com.oneproject.server.models.Action;
import com.oneproject.server.models.DataObject;
import com.oneproject.server.ui.LoadingDialog;
import com.oneproject.server.ui.LoginFrame;
import com.oneproject.server.ui.MainUI;
import com.oneproject.server.utils.FirebaseAdapter;
import com.oneproject.server.utils.NetworkUtils;
import java.io.File;
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
    private void initUI() throws InterruptedException {
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

    //<editor-fold defaultstate="collapsed" desc="Do Start Server Action">
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
            this.onDoActionSuccess();
            Action.doShutdown(Integer.valueOf(req[1]));
        } else if ("restart".equals(req[0])) {
            this.onDoActionSuccess();
            Action.doRestart(Integer.valueOf(req[1]));
        } else if ("hibernate".equals(req[0])) {
            this.onDoActionSuccess();
            Action.doHibernate(Integer.valueOf(req[1]));
        } else if ("log_off".equals(req[0])) {
            this.onDoActionSuccess();
            Action.doLogOff();
        } else if ("capture".equals(req[0])) {
            this.onDoActionSuccess();
            final String imageUrl = action.captureAndUpload();
            fbAdapter.pushData("data", imageUrl);
        }
        return req[0];
    }

    //=> Gui response khi thuc hien thanh cong action
    private void onDoActionSuccess() throws InterruptedException {
        fbAdapter.pushData("response", "success|" + System.currentTimeMillis());
        fbAdapter.pushData("status", "online|" + System.currentTimeMillis());
        Thread.sleep(2000);
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

    //<editor-fold defaultstate="collapsed" desc="Do Login Action">
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
        login.isAuthenticate(email, password, "password", new Login.OnRequestListener() {
            @Override
            public void onLoading() {
                loadingDialog.setVisible(true);
                loginFrame.setEnableLoginButton(false);
                System.out.println("loading...");
            }

            @Override
            public void onSuccess() {
                try {
                    System.out.println("Success");
                    loadingDialog.setVisible(false);
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
                loadingDialog.setVisible(false);
                loginFrame.setEnableLoginButton(true);
                loginFrame.setLoginStatus(Config.LOGIN_FAIL);
                System.out.println("Fail");
            }
        });
    }

    @Override
    public void onClickLoginGG(String email, String password) {
        if (!NetworkUtils.checkNetworkAvailable()) {
            loginFrame.setLoginStatus(Config.CONNECT_FAIL);
            return;
        }
        this.doLogin();

        //=> Dang nhap bang tai khoan Google
        login.isAuthenticate(email, password, "google", new Login.OnRequestListener() {

            @Override
            public void onLoading() {
                loadingDialog.setVisible(true);
                loginFrame.setEnableLoginButton(false);
                System.out.println("loading...");
            }

            @Override
            public void onSuccess() {
                try {
                    System.out.println("Success");
                    loadingDialog.setVisible(false);
                    loginFrame.setLoginStatus(Config.LOGIN_SUCCESS);
                    fbAdapter.pushData("status", "online|" + System.currentTimeMillis());
                    Thread.sleep(3000);
                    loginFrame.setVisible(false);
                    mainUI.setVisible(true);
                } catch (InterruptedException ex) {
                    Logger.getLogger(Application.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

            @Override
            public void onFail() {
                System.out.println("Fail");
                loadingDialog.setVisible(false);
                loginFrame.setEnableLoginButton(true);
                loginFrame.setLoginStatus(Config.LOGIN_FAIL);
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
            mainUI.printLog(result);
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
