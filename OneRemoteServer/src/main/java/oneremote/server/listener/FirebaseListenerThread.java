/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oneremote.server.listener;

import com.firebase.client.ChildEventListener;
import com.firebase.client.Firebase;
import com.firebase.client.ServerValue;
import oneremote.server.utils.FirebaseAdapter;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author DangThanh
 */
public class FirebaseListenerThread implements Runnable, NetworkListenerThread.NetworkListener {

    private ChildEventListener listener;
    private Firebase firebase;
    private FirebaseAdapter adapter;
    private NetworkListenerThread nwListener;
    private boolean isOnline = false;

    public FirebaseListenerThread(Firebase firebase, FirebaseAdapter adapter, ChildEventListener listener) {

        this.listener = listener;
        this.firebase = firebase;
        this.adapter = adapter;
        this.nwListener = new NetworkListenerThread(this);
        new Thread(this.nwListener).start();
        new Thread(this).start();
    }

    @Override
    public void run() {
        //Create new firebase note
        ChildEventListener addChildEventListener = firebase.addChildEventListener(this.listener);
        firebase.child("status").onDisconnect().setValue("offline|" + System.currentTimeMillis());
    }

    @Override
    public void onOnline() {
        if (!isOnline) {
            firebase.goOnline();     
            try {
                this.adapter.pushData("status", "online|" + System.currentTimeMillis());
            } catch (InterruptedException ex) {
                Logger.getLogger(FirebaseListenerThread.class.getName()).log(Level.SEVERE, null, ex);
            }
            isOnline = true;
            System.out.println("Online-----");
        }
    }

    @Override
    public void onOffline() {
        if (isOnline) {
            firebase.child("status").goOffline();
            isOnline = false;
            System.out.println("Offline-----");
        }
    }
}
