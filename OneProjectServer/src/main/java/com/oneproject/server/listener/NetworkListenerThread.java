/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.listener;

import com.oneproject.server.utils.NetworkUtils;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author DangThanh
 */
public class NetworkListenerThread implements Runnable {

    private NetworkListener listener;

    public NetworkListenerThread(NetworkListener listener) {
        this.listener = listener;
    }

    @Override
    public void run() {
        while (true) {
            try {
                boolean isOnline = NetworkUtils.checkNetworkAvailable();
                if (isOnline) {
                    listener.onOnline();
                } else {
                    listener.onOffline();
                }
                Thread.sleep(10000);
            } catch (InterruptedException ex) {
                Logger.getLogger(NetworkListenerThread.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public static interface NetworkListener {

        public void onOnline();

        public void onOffline();
    }
}
