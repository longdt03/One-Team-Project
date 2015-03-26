/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.utils;

import com.firebase.client.ChildEventListener;
import com.firebase.client.Firebase;

/**
 *
 * @author DangThanh
 */
public class FirebaseListenerThread implements Runnable {

    private ChildEventListener listener;
    private Firebase firebase;
    
    public FirebaseListenerThread(Firebase firebase, ChildEventListener listener) {
        this.listener = listener;
        this.firebase = firebase;
        new Thread(this).start();
    }

    @Override
    public void run() {
        //Create new firebase note
        firebase.addChildEventListener(this.listener);
    }
}
