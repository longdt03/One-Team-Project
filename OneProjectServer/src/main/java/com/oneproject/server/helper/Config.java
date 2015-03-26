/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.helper;

import com.oneproject.server.core.Login;
import com.oneproject.utils.FirebaseAdapter;
import java.net.InetAddress;
import java.net.UnknownHostException;

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
    public static final String SUCCESS = "Do Action Success!";
    public static String FIREBASE_URL;
    public static String CONFIG_FILEPATH;
    public static String WEBCAM_FOLDER;
    public static String DEVICE_NAME;

    public static void initConfig() throws UnknownHostException {
        DEVICE_NAME = InetAddress.getLocalHost().getHostName();
        WEBCAM_FOLDER = "res\\webcam\\";
        CONFIG_FILEPATH = "res\\config.txt";
        FIREBASE_URL = "https://one-app.firebaseio.com/";
    }
}
