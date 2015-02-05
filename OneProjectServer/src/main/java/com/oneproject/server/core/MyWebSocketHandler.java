/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.core;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

/**
 *
 * @author DangThanh
 */
@WebSocket
public class MyWebSocketHandler extends WebSocketHandler {

    private static ServerListener listener;
    private String message;
    private Session mSession;
    private static ArrayList<MyWebSocketHandler> sessions = new ArrayList();

    public static ArrayList<MyWebSocketHandler> getAllSessions() {
        return sessions;
    }

    @OnWebSocketClose
    public void onClose(int statusCode, String reason) {
        sessions.remove(this);
        if (listener != null) {
            this.listener.onClose(statusCode, reason);
        }
    }

    @OnWebSocketError
    public void onError(Throwable t) {
        if (listener != null) {
            this.listener.onError(t);
        }
    }

    @OnWebSocketConnect
    public void onConnect(Session session) {
        mSession = session;
        sessions.add(this);
        if (listener != null) {
            this.listener.onConnect(mSession);
        }
    }

    @OnWebSocketMessage
    public void onMessage(Session session, String message) {
        this.message = message;
        if (listener != null) {
            this.listener.onMessage(session, message);
        }
    }

    @Override
    public void configure(WebSocketServletFactory factory) {
        factory.register(MyWebSocketHandler.class);
        factory.getPolicy().setIdleTimeout(60 * 60 * 1000);
    }
    
    public Session getSession() {
        return this.mSession;
    }
    
    public ServerListener getListener() {
        return this.listener;
    }

    public static void setListener(ServerListener listener) {
        MyWebSocketHandler.listener = listener;
    }
}
