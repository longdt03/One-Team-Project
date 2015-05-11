/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oneremote.server.models;

import oneremote.server.helper.Config;
import oneremote.server.utils.PicasaUtils;
import oneremote.server.utils.SlideControler;
import oneremote.server.utils.WebcamUtils;
import java.io.File;
import java.io.IOException;

/**
 *
 * @author DangThanh
 */
public class Action {

    private WebcamUtils webcam;
    private PicasaUtils picasaUploader;
    private SlideControler slideControler;
    
    public Action() throws Exception {
        //=>Khoi tao Webcam 
        webcam = new WebcamUtils();
        //=> Khoi tao GooglePicasa Uploader
        picasaUploader = new PicasaUtils();
        //=> Khoi tao SlideControler
        slideControler = new SlideControler();
    }

    public void doShutdown(int second) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process proc = runtime.exec(Config.SHUTDOWN.replace("{second}", String.valueOf(second)));
    }

    public void doRestart(int second) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process proc = runtime.exec(Config.RESTART.replace("{second}", String.valueOf(second)));
    }

    public void doHibernate(int second) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process proc = runtime.exec(Config.HIBERNATE.replace("{second}", String.valueOf(second)));
    }

    public void doLogOff() throws IOException {
        Runtime runtime = Runtime.getRuntime();
        Process proc = runtime.exec(Config.LOGGING_OFF);
    }

    public void doNextSlide() {
        slideControler.nextSlide();
    }
    
    public void doPreSlide() {
        slideControler.prevSlide();
    }
    
    public void doGoFirstSlide() {
        slideControler.goFirstSlide();
    }
    
    public void doGoLastSlide() {
        slideControler.goLastSlide();
    }
    
    //=>Chup anh va upload len GG Picasa
    public String captureAndUpload() throws Exception {
        File image = this.webcam.capture();
        return picasaUploader.uploadImage(image);
    }
}
