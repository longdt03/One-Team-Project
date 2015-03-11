/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.core;

import com.firebase.client.Firebase;
import com.oneproject.server.helper.Config;
import com.oneproject.server.helper.Device;
import java.util.logging.Level;
import java.util.logging.Logger;

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
    
    public static void pushData(String url, Object data) {
        try {
            Firebase firebase = new Firebase(url);
            firebase.setValue(data);
            Thread.sleep(5000);
        } catch (InterruptedException ex) {
            Logger.getLogger(FirebaseAdapter.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
