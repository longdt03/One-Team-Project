/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oneremote.server.utils;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;

/**
 *
 * @author Thanh Long
 */
public class SlideController {

    private final Robot controler;
    private final int buttonDown = KeyEvent.VK_DOWN;
    private final int buttonUp = KeyEvent.VK_UP;
    private final int buttonHome = KeyEvent.VK_HOME;
    private final int buttonEnd = KeyEvent.VK_END;

    public SlideController() throws AWTException {
        this.controler = new Robot();
    }

    public void nextSlide() {
        this.controler.keyPress(buttonDown);
    }

    public void prevSlide() {
        this.controler.keyPress(buttonUp);
    }

    public void goFirstSlide() {
        this.controler.keyPress(buttonHome);
    }

    public void goLastSlide() {
        this.controler.keyPress(buttonEnd);
    }
}
