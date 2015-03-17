/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.utils;

import com.firebase.client.ChildEventListener;
import com.oneproject.server.models.Device;

/**
 *
 * @author DangThanh
 */
public class FirebaseListenerThread implements Runnable {
    
    private ChildEventListener listener;
    private Device device = null;
    
    public FirebaseListenerThread(ChildEventListener listener) {
        this.listener = listener;
        this.device = FirebaseAdapter.getDevice();
        new Thread(this).start();
    }
    @Override
    public void run() {
        FirebaseAdapter.getFirebase().addChildEventListener(this.listener);
    }
}
