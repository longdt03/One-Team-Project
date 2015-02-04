/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.core;

import org.eclipse.jetty.websocket.api.Session;
/**
 *
 * @author DangThanh
 */
public interface ServerListener {
    public void onMessage(Session session, String message);
    public void onConnect(Session session);
    public void onError(Throwable t);
    public void onClose(int statusCode, String reason);
}
