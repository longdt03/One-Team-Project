/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oneremote.server.utils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author DangThanh
 */
public class NetworkUtils {

    //=> Kiem tra ket noi mang
    public static boolean checkNetworkAvailable() {
        try {
            URL url = new URL("http://www.google.com");
            URLConnection conn = url.openConnection();
            conn.connect();
            System.out.println("availble connect");
            return true;
        } catch (IOException ex) {
            System.out.println("unavailble connection");
        }
        return false;
    }
}
