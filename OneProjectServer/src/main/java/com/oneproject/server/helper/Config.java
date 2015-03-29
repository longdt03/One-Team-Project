/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.helper;

import com.oneproject.server.core.Login;
import com.oneproject.server.utils.FirebaseAdapter;
import java.awt.Color;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;

/**
 *
 * @author DangThanh
 */
public class Config {

    public static final String SHUTDOWN = "shutdown -s -t {second}";
    public static final String RESTART = "shutdown -r -t {second}";
    public static final String HIBERNATE = "shutdown -h";
    public static final String LOGGING_OFF = "shutdown -l";
    public static final String SYNTAX_ERROR = "Syntax Error";
    public static String FIREBASE_URL;
    public static String CONFIG_FILEPATH;
    public static String WEBCAM_FOLDER;
    public static String DEVICE_NAME;
    public static String GG_ACCESS_TOKEN;
    public static String CONNECT_FAIL;
    public static String LOGIN_SUCCESS;
    public static String LOGIN_FAIL;
    
    public static void initConfig() throws UnknownHostException {
        DEVICE_NAME = InetAddress.getLocalHost().getHostName();
        WEBCAM_FOLDER = "res\\webcam\\";
        CONFIG_FILEPATH = "res\\config.txt";
        FIREBASE_URL = "https://one-app.firebaseio.com/";
        GG_ACCESS_TOKEN = "a6lqL-km9Lsf9GYVGWTkZzJc";
        CONNECT_FAIL = "Check your connection and try again";
        LOGIN_SUCCESS = "Login success!";
        LOGIN_FAIL = "Invalid email or password.";
    }
}
