/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.helper;

import java.io.IOException;

/**
 *
 * @author DangThanh
 */
public class Action {   
    
    private void doShutdown() throws IOException {
        this.doShutdown(0);
    }
    
    public static void doShutdown(int second) throws IOException {
        System.out.println("Shutdown!");
        Runtime runtime = Runtime.getRuntime();
	Process proc = runtime.exec(Config.SHUTDOWN.replace("{second}", String.valueOf(second)));
	System.exit(0);
    }
    
    private void doRestart() throws IOException {
        this.doRestart(0);
    }
    
    public static void doRestart(int second) throws IOException {
        System.out.println("Restart!");
        Runtime runtime = Runtime.getRuntime();
	Process proc = runtime.exec(Config.RESTART.replace("{second}", String.valueOf(second)));
	System.exit(0);
    }
    
    private void doHibernate() throws IOException {
        this.doHibernate(0);
    }
    
    public static void doHibernate(int second) throws IOException {
        System.out.println("Hibernate!");
        Runtime runtime = Runtime.getRuntime();
	Process proc = runtime.exec(Config.HIBERNATE.replace("{second}", String.valueOf(second)));
	System.exit(0);
    }      
    
    public static void doLoggingOff() throws IOException {
        System.out.println("Logging Off!");
        Runtime runtime = Runtime.getRuntime();
	Process proc = runtime.exec(Config.LOGGING_OFF);
	System.exit(0);
    }
}
