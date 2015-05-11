/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oneremote.server.utils;

import oneremote.server.models.Device;
import java.net.UnknownHostException;

/**
 *
 * @author DangThanh
 */
public class DeviceUtils {
    private static Device device;
    
    public static Device getDevice() throws UnknownHostException {
        if (device == null) {
            device = new Device();
        }
        return device;
    }        
}
