/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.core;

import org.eclipse.jetty.server.Server;

/**
 *
 * @author DangThanh
 */
public class WebSocketServer extends Thread {    
    private MyWebSocketHandler mHandler;

    public WebSocketServer() {
        mHandler = new MyWebSocketHandler();        
    }

    @Override
    public void run() {
        super.run();
        try {
            Server server = new Server(1234);
            server.setHandler(this.mHandler);
            server.setStopTimeout(0);
            server.start();
            server.join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }    
}
