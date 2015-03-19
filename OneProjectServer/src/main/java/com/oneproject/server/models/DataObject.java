/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.models;

import java.util.HashMap;

/**
 *
 * @author DangThanh
 */
public class DataObject extends HashMap<String, Object>{
    
    private String deviceName;
    private String password;
    private String data;
    private String systax;
    
    public DataObject setData(String deviceName, String password, String data, String request) {
        this.put("device_name", deviceName);
        this.put("password", password);
        this.put("data", data);
        this.put("request", request);
        return this;
    }
}
