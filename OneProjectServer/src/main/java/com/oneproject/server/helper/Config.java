/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.helper;

import com.oneproject.utils.FirebaseAdapter;

/**
 *
 * @author DangThanh
 */
public class Config {
    public static final String SHUTDOWN = "shutdown -s -t {second}";
    public static final String RESTART = "shutdown -r -t {second}";
    public static final String HIBERNATE  = "shutdown -h";
    public static final String LOGGING_OFF  = "shutdown -l";
    public static final String SYNTAX_ERROR = "Syntax Error";
    public static final String SUCCESS = "Do Action Success!";
    public static final int PORT = 1234;
    public static final String FIREBASE_URL = "https://one-app.firebaseio.com/" + FirebaseAdapter.getDevice().getDeviceId() + "/";
    public static final String CONFIG_FILEPATH = "res\\config.txt";
    public static final String WEBCAM_FOLDER = "res\\webcam\\";
    
    
}
