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

//    @Override
//    public void onMessage(Session session, String message) {
//        System.out.println("Message: " + message);
//        if (message.equals("image")) {
//            System.out.println("session: " + mHandler.getSession());
//            if (mHandler.getSession() != null) {
//                try {
//                    File f = new File("image\\github.jpg");
//                    BufferedImage bi = ImageIO.read(f);
//                    ByteArrayOutputStream out = new ByteArrayOutputStream();
//                    ImageIO.write(bi, "png", out);
//                    ByteBuffer byteBuffer = ByteBuffer.wrap(out.toByteArray());
//                    mHandler.getSession().getRemote().sendBytes(byteBuffer);
//                    out.close();
//                    byteBuffer.clear();
//
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//    }
//
//    @Override
//    public void onConnect(Session session) {
//        System.out.println("Connected");
//        System.out.println(session.getLocalAddress());
//    }
//
//    @Override
//    public void onError(Throwable t) {
//        System.out.println("Error: " + t.getMessage());
//    }
//
//    @Override
//    public void onClose(int statusCode, String reason) {
//        System.out.println("Status Code: " + statusCode);
//        System.out.println("Reason: " + reason);
//    }

    @Override
    public void run() {
        // TODO Auto-generated method stub
        super.run();

        try {
            Server server = new Server(1234);
            server.setHandler(this.mHandler);
            server.setStopTimeout(0);
            server.start();
            server.join();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }    
}
