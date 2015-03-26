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
    
    private String response;
    private String data;
    private String request;
    
    public DataObject() {
        this.setData("", "", "");
    }
    
    public DataObject setData(String response, String data, String request) {
        this.put("response", response);
        this.put("data", data);
        this.put("request", request);
        return this;
    }
}
