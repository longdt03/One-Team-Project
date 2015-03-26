/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.core;

import com.oneproject.utils.FirebaseListenerThread;
import com.firebase.client.ChildEventListener;
import com.firebase.client.DataSnapshot;
import com.firebase.client.FirebaseError;
import com.oneproject.server.helper.Config;
import com.oneproject.server.models.Action;
import com.oneproject.server.models.DataObject;
import com.oneproject.server.ui.LoadingDialog;
import com.oneproject.server.ui.LoginFrame;
import com.oneproject.server.ui.MainUI;
import com.oneproject.utils.FirebaseAdapter;
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
    private FirebaseListenerThread firebaseListener;
    private FirebaseAdapter firebaseAdapter;
    private Login login;
    private Action action;

    public Application() throws Exception {
        this.initUI();
        Config.initConfig();
    }

    //=> Khoi tao giao dien
    public void initUI() throws InterruptedException {
        mainUI = new MainUI(this);
        loginFrame = new LoginFrame(this);
        loadingDialog = new LoadingDialog(loginFrame);
        loginFrame.setVisible(true);
    }

    public void initFirebase() throws InterruptedException {
        String childPath = login.getUID() + "/" + Config.DEVICE_NAME;
        //=> Ket noi Firebase
        firebaseAdapter = new FirebaseAdapter(childPath);

        //=> Khoi tao data cho Firebase
        DataObject data = new DataObject();
        firebaseAdapter.createFirebase(data);

        //=> Khoi tao Listener lang nghe su thay doi du lieu tren firebase
        firebaseListener = new FirebaseListenerThread(firebaseAdapter.getDeviceFirebase(), this);
    }

    //=> Thuc hien khi start server
    public void doStartServer() throws Exception {
        this.initFirebase();
        this.action = new Action();
    }

    //=> Login
    public void doLogin() {
        login = new Login();
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
            String imageUrl = action.captureAndUpload();
            firebaseAdapter.pushData("data", imageUrl);
        } else if ("connect".equals(req[0])) {
            firebaseAdapter.pushData("response", "online");
        }
        return req[0];
    }

    //=> Gui response khi thuc hien thanh cong action
    private void onDoActionSuccess() throws InterruptedException {
        firebaseAdapter.pushData("response", "success|" + System.currentTimeMillis());
        Thread.sleep(2000);
    }

//    public void initConfigFile() {
//        //Khoi tao folder neu chua ton tai
//        File resFolder = new File("//res");
//        resFolder.mkdir();
//
//        File folder = new File(Config.WEBCAM_FOLDER);
//        folder.mkdir();
//    }
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

    @Override
    public void onClick() {
        try {
            this.doStartServer();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        mainUI.setEnableStartBtn(false);
    }

    @Override
    public void onClickLogin(String email, String password) {
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
                    loginFrame.setLoginStatus(true);
                    Thread.sleep(3000);
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
                loginFrame.setLoginStatus(false);
                System.out.println("Fail");
            }
        });
    }

    @Override
    public void onClickLoginGG(String email, String password) {
        this.doLogin();

        //=> Dang nhap bang tai khoan Google
        login.isAuthenticate(email, password, "google", new Login.OnRequestListener() {

            @Override
            public void onLoading() {
                loginFrame.setEnableLoginButton(false);
                loadingDialog.setVisible(true);
                System.out.println("loading...");
            }

            @Override
            public void onSuccess() {
                try {
                    System.out.println("Success");
                    loadingDialog.setVisible(false);
                    loginFrame.setLoginStatus(true);
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
                loginFrame.setLoginStatus(false);
            }
        });
    }

    public static void main(String[] args) {
        try {
            Application app = new Application();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
