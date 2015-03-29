/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.models;

import com.oneproject.server.helper.Config;
import com.oneproject.server.utils.PicasaUtils;
import com.oneproject.server.utils.WebcamUtils;
import java.io.File;
import java.io.IOException;

/**
 *
 * @author DangThanh
 */
public class Action {

    private WebcamUtils webcam;
    private PicasaUtils picasaUploader;

    public Action() throws Exception {
        //=>Khoi tao Webcam 
        webcam = new WebcamUtils();
        //=> Khoi tao GooglePicasa Uploader
        picasaUploader = new PicasaUtils();
    }

    public static void doShutdown(int second) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process proc = runtime.exec(Config.SHUTDOWN.replace("{second}", String.valueOf(second)));
    }

    public static void doRestart(int second) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process proc = runtime.exec(Config.RESTART.replace("{second}", String.valueOf(second)));
    }

    public static void doHibernate(int second) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process proc = runtime.exec(Config.HIBERNATE.replace("{second}", String.valueOf(second)));
    }

    public static void doLogOff() throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process proc = runtime.exec(Config.LOGGING_OFF);
    }

    //=>Chup anh va upload len GG Picasa
    public String captureAndUpload() throws Exception {
        File image = this.webcam.capture();
        return picasaUploader.uploadImage(image);
    }
}
