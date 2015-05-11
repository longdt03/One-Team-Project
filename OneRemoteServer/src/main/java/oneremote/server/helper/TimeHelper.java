/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oneremote.server.helper;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author DangThanh
 */
public class TimeHelper {

    public static String getCurrentTime() {
        Date date = new Date();
        SimpleDateFormat ft = new SimpleDateFormat("hh:mm:ss a");
        return ft.format(date);
    }
}
