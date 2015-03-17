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
import com.oneproject.server.models.Action;
import com.oneproject.server.ui.UI;
import com.oneproject.utils.FirebaseAdapter;
import com.oneproject.utils.PicasaUtils;
import com.oneproject.utils.WebcamUtils;
import java.io.File;

/**
 *
 * @author DangThanh
 */
public class Application implements ChildEventListener, UI.UIListener {

    private UI ui;
    private boolean isStart = false;
    private FirebaseListenerThread firebaseListener;
    private String deviceId = FirebaseAdapter.getDevice().getDeviceId();
    private String password = FirebaseAdapter.getDevice().getPassword();
    private WebcamUtils webcam;
    private PicasaUtils picasaUploader;
    
    public Application() throws Exception {
        this.initUI();
        webcam = new WebcamUtils();
        picasaUploader = new PicasaUtils();
    }
    
    public void initUI() {
        UI.setListener(this);
        ui = new UI();
        ui.createAndShowUI();
        ui.setDeviceId(deviceId);
        ui.setPassword(password);
    }
    
    @Override
    public void onChildAdded(DataSnapshot ds, String string) {
        System.out.println("Add");
    }

    @Override
    public void onChildChanged(DataSnapshot ds, String string) {
        String request = (String)ds.getValue();
        System.out.println("Message: " + request);
        ui.setMessage(request);
        this.doAction(request);
    }

    @Override
    public void onChildRemoved(DataSnapshot ds) {
        System.out.println("Remove");
    }

    @Override
    public void onChildMoved(DataSnapshot ds, String string) {
        System.out.println("Move");
    }

    @Override
    public void onCancelled(FirebaseError fe) {
        System.out.println("Cancel");
    }

    @Override
    public void onClick() {
        if (!this.isStart) {
            this.firebaseListener = new FirebaseListenerThread(this);
            ui.setEnableStartBtn(false);
        }
    }
    
    public void doAction(String request) {
        String[] req = request.split("\\|");
        try {
            //Kiem tra cu phap request 
            if (req.length != 2) {
                return;
            }

            //Thuc hien action
            if ("shutdown".equals(req[0])) {
                Action.doShutdown(Integer.valueOf(req[1]));
            } else if ("restart".equals(req[0])) {
                Action.doRestart(Integer.valueOf(req[1]));
            } else if ("hibernate".equals(req[0])) {
                Action.doHibernate(Integer.valueOf(req[1]));
            } else if ("log_off".equals(req[0])) {
                Action.doLogOff();
            } else if("capture".equals(req[0])) {
                String imageUrl = this.captureAndUpload();
                FirebaseAdapter.pushData("data", imageUrl);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public String captureAndUpload() throws Exception {        
        File image = this.webcam.capture();
        return picasaUploader.uploadImage(image);
    }
    
    public static void main(String[] args) {
        try {
            Application app = new Application();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }   
}
