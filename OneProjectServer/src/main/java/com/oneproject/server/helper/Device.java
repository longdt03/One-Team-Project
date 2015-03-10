/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.helper;

import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.snapshot.Node;
import com.oneproject.server.core.FirebaseAdapter;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author DangThanh
 */
public class Device {

    private String deviceId;
    private String password;
    private String deviceName;

    public Device() {
        try {
            deviceName = InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException ex) {
            Logger.getLogger(Device.class.getName()).log(Level.SEVERE, null, ex);
        }
        this.initDeviceInfo();
    }

    public String getDeviceId() {
        return this.deviceId;
    }

    public String getDeviceName() {
        return this.deviceName;
    }

    public void setPassword(String pass) {
        this.password = pass;
    }

    public String getPassword() {
        return this.password;
    }

    private static String generateDeviceId() {
        long id = 000000;
        Random r = new Random();
        id = r.nextInt(899999) + 100000;
        return String.valueOf(id);
    }

    //Kiem tra trung device id trong database
    public static boolean isExistId(long id) {
        Firebase firebase = new Firebase(Config.FIREBASE_URL);
        DataSnapshot data = new DataSnapshot(firebase.child(String.valueOf(id)), Node.MAX_NODE, null);
        return data.getValue() != null;
    }

    public void initDeviceInfo() {
        try {
            File file = new File(Config.CONFIG_FILE_PATH);
            if (!file.exists()) {
                file.createNewFile();
            }
            if (!this.readDeviceInfo()) {
                this.deviceId = this.generateDeviceId();
                this.password = "oneteam";
                this.storeDeviceInfo();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean readDeviceInfo() {
        try {
            File file = new File(Config.CONFIG_FILE_PATH);

            BufferedReader reader = new BufferedReader(new FileReader(file));
            String data = reader.readLine();
            if (data == null) {
                return false;
            }
            this.deviceId = data;
            this.password = reader.readLine();
            if (this.password == null) {
                this.password = "oneteam";
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public void storeDeviceInfo() {
        try {
            File file = new File(Config.CONFIG_FILE_PATH);
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(new String(this.deviceId + "\n" + this.password + "\n" + this.deviceName).getBytes());

            //Store data to Database
            String url = Config.FIREBASE_URL + String.valueOf(this.deviceId) + "/";
            Map data = new HashMap();
            data.put("password", this.password);
            data.put("data", "");
            data.put("device_name", this.deviceName);
            FirebaseAdapter.pushData(url, data);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

//    public static void main(String[] args) {
//        Device device = new Device();
//        device.initDeviceInfo();
//        System.out.println(device.getDeviceId() + " " + device.getPassword() + " " + device.getDeviceName());
//        while (true) {
//        }
//    }
}
