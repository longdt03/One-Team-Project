/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.core;

import com.oneproject.server.helper.Action;
import com.oneproject.server.helper.Config;
import com.oneproject.server.ui.UI;
import java.io.IOException;
import org.eclipse.jetty.websocket.api.Session;

/**
 *
 * @author DangThanh
 */
public class Main implements ServerListener {

    private WebSocketServer mWebSocketServer;
    private UI ui;

    public Main() {
        //Khoi tao giao dien
        ui = new UI();
        ui.createAndShowGUI();

        //Khoi tao server
        MyWebSocketHandler.setListener(this);
        mWebSocketServer = new WebSocketServer();               
    }

    //Start server
    public void startServer() {
        mWebSocketServer.start();
    }

    @Override
    public void onMessage(Session session, String message) {
        System.out.println("Message: " + message);
        ui.setMessage("Message: " + message);
        String[] msg = message.split("\\|");
        try {
            //Kiem tra request gui len
            if (msg.length != 2) {
                session.getRemote().sendString(Config.SYNTAX_ERROR);
                return;
            }
            
            //Thuc hien action
            session.getRemote().sendString(Config.SYNTAX_ERROR);
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
    public void onConnect(Session session) {
        System.out.println("Connected");
        ui.setStatus("Status: Connected");
        ui.setTittle(session.getLocalAddress().toString());
        try {
            session.getRemote().sendString("Connected");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void onError(Throwable t) {
        System.out.println("Error: " + t.getMessage());
    }

    @Override
    public void onClose(int statusCode, String reason) {
        System.out.println("Status Code: " + statusCode);
        System.out.println("Reason: " + reason);
        ui.setStatus("Status: Disconnect");
    }

    public static void main(String[] args) {
        Main main = new Main();
        main.startServer();
    }
}
