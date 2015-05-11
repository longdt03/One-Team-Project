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
    
    private String response = "";
    private String data = "";
    private String request = "";
    private String status = "";
    
    public DataObject() {
    }

    public DataObject(String response, String data, String request, String status) {
        this.put("response", response);
        this.put("data", data);
        this.put("request", request);
        this.put("status", status);
    }
    
    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
