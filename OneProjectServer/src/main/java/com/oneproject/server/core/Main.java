/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.core;

import com.firebase.client.ChildEventListener;
import com.firebase.client.DataSnapshot;
import com.firebase.client.FirebaseError;
import com.oneproject.server.helper.Action;
import com.oneproject.server.ui.UI;

/**
 *
 * @author DangThanh
 */
public class Main implements ChildEventListener, UI.UIListener {

    private UI ui;
    private boolean isStart = false;
    private FirebaseListenerThread firebaseListener;
    private String deviceId = FirebaseAdapter.getDevice().getDeviceId();
    private String password = FirebaseAdapter.getDevice().getPassword();
    
    public Main() {
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
        String message = (String)ds.getValue();
        System.out.println("Message: " + message);
        ui.setMessage(message);
        String[] msg = message.split("\\|");
        try {
            //Kiem tra request gui len
            if (msg.length != 2) {
                return;
            }

            //Thuc hien action
            if ("shutdown".equals(msg[0])) {
                Action.doShutdown(Integer.valueOf(msg[1]));
            } else if ("restart".equals(msg[0])) {
                Action.doRestart(Integer.valueOf(msg[1]));
            } else if ("hibernate".equals(msg[0])) {
                Action.doHibernate(Integer.valueOf(msg[1]));
            } else if ("log_off".equals(msg[0])) {
                Action.doLogOff();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
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
    
    public static void main(String[] args) {
        Main main = new Main();
    }   
}
