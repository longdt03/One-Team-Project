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
    private static Session mSession;

    @OnWebSocketClose
    public void onClose(Session session, int statusCode, String reason) {
        if (mSession == session && listener != null) {
            this.listener.onClose(statusCode, reason);
            mSession = null;
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
        if (mSession == null && listener != null) {
            mSession = session;
            this.listener.onConnect(mSession);
        } else {
            session.close();
        }
    }

    @OnWebSocketMessage
    public void onMessage(Session session, String message) {
        if (session == mSession && listener != null) {
            this.message = message;
            this.listener.onMessage(mSession, message);
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
