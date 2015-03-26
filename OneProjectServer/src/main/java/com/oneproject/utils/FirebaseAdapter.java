/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.utils;

import com.firebase.client.Firebase;
import com.oneproject.server.helper.Config;

/**
 *
 * @author DangThanh
 */
public class FirebaseAdapter {

    private static Firebase root;
    private Firebase deviceFirebase;
    private StringBuilder firebaseURL = new StringBuilder(Config.FIREBASE_URL);

    public FirebaseAdapter(String childPath) {
        deviceFirebase = new Firebase(firebaseURL.append(childPath).toString());
    }

    public Firebase getDeviceFirebase() {
        return this.deviceFirebase;
    }

    public String getFirebaseUrl() {
        return this.firebaseURL.toString();
    }

    public static Firebase getFirebaseRoot() {
        if (root == null) {
            root = new Firebase(Config.FIREBASE_URL);
        }
        return root;
    }

    public void pushData(final String key, final Object data) throws InterruptedException {
        new Thread() {
            @Override
            public void run() {
                Firebase firebase = deviceFirebase;
                if (key != null && key != "") {
                    firebase = deviceFirebase.child(key);
                }
                firebase.setValue(data);
            }
        }.start();
    }

    public void createFirebase(final Object data) throws InterruptedException {
        new Thread() {
            @Override
            public void run() {
                deviceFirebase.setValue(data);
            }
        }.start();        
    }
}
