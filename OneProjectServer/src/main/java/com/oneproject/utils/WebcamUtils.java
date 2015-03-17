/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.utils;

import com.github.sarxos.webcam.Webcam;
import com.oneproject.server.helper.Config;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

/**
 *
 * @author DangThanh
 */
public class WebcamUtils {

    private Webcam webcam = null;

    public WebcamUtils() {
        webcam = Webcam.getDefault();
    }

    //Mo Webcam
    public void openWebcam() {
        if (webcam.isOpen()) {
            webcam.close();
        }
        int i = 0;
        do {
            if (webcam.getLock().isLocked()) {
                System.out.println("Waiting for lock to be released " + i);
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e1) {
                    return;
                }
            } else {
                break;
            }
        } while (i++ < 3);
        webcam.open();
    }

    public File capture() throws IOException, InterruptedException {
        this.openWebcam();

        //Chup anh
        BufferedImage image = webcam.getImage();
        Thread.sleep(4000);
        webcam.close();

        File folder = new File(Config.WEBCAM_FOLDER);
        folder.mkdir(); //Khoi tao folder neu chua ton tai

        //Ghi anh ra file
        String fileName = "webcam_" + String.valueOf(System.currentTimeMillis()) + ".jpg";
        File file = new File(Config.WEBCAM_FOLDER + fileName);
        boolean bool = ImageIO.write(image, "jpg", file);
        while (bool == false) {
            bool = ImageIO.write(image, "jpg", file);
        }

        return file;
    }

//    public static void main(String[] args) {
//        WebcamUtils webcam = new WebcamUtils();
//        File capture = webcam.capture();
//    }
}
