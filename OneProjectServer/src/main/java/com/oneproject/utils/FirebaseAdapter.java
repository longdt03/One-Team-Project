/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.utils;

import com.firebase.client.Firebase;
import com.oneproject.server.helper.Config;
import com.oneproject.server.models.Device;

/**
 *
 * @author DangThanh
 */
public class FirebaseAdapter {
    private static Firebase root;
    private static Device device;
    
    public static Device getDevice() {
        if(device == null) {
            device = new Device();
        }
        return device;
    }
    
    public static Firebase getFirebase() {
        if(root == null) {
            root = new Firebase(Config.FIREBASE_URL);
        }
        return root;
    }
    
    public static void pushData(String key, Object data) {
        try {
            Firebase firebase = FirebaseAdapter.getFirebase().child(key);            
            firebase.setValue(data);
            Thread.sleep(10000);
        } catch (InterruptedException ex) {
            ex.printStackTrace();
        }
    }
    
    public static void createFirebase(Object data) {
        try {
            FirebaseAdapter.getFirebase().setValue(data);           
            Thread.sleep(10000);
        } catch (InterruptedException ex) {
            ex.printStackTrace();
        }
    }
}
