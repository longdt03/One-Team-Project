package com.oneproject.server.ui;

import com.oneproject.server.core.WebSocketServer;
import java.awt.BorderLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;

public class UI extends JFrame implements ActionListener {

    private JLabel mStatus, mMessage;

    public UI() {
        super("WebSocket Server");

        JPanel status = new JPanel();
        mStatus = new JLabel();
        mStatus.setText("Status");
        status.add(mStatus);
        add(status, BorderLayout.EAST);

        JPanel message = new JPanel();
        mMessage = new JLabel();
        this.setMessage("Message");
        message.add(mMessage);
        add(message, BorderLayout.WEST);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
    }

    public  void createAndShowGUI() {
        //Create and set up the window.
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);        

        //Display the window.
        this.pack();
        this.setVisible(true);
        this.setResizable(false);
        this.setSize(360, 120);

        double width = Toolkit.getDefaultToolkit().getScreenSize().getWidth();
        double height = Toolkit.getDefaultToolkit().getScreenSize().getHeight();
        int frameWidth = this.getWidth();
        int frameHeight = this.getHeight();
        this.setLocation((int) (width - frameWidth) / 2, (int) (height - frameHeight) / 2);
    }

    public void setStatus(String status) {
        mStatus.setText(status);
        this.repaint();
    }

    public void setMessage(String message) {
        mMessage.setText(message);
        this.repaint();
    }
    
    public void setTittle(String tittle) {
        this.setTitle(tittle);
        this.repaint();
    }
}
