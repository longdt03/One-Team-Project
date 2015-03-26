/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.utils;

import com.oneproject.server.models.Device;

/**
 *
 * @author DangThanh
 */
public class DeviceUtils {
    private static Device device;
    
    public static Device getDevice() {
        if (device == null) {
            device = new Device();
        }
        return device;
    }        
}
