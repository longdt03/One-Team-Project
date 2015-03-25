/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.ui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JFrame;

/**
 *
 * @author DangThanh
 */
public class LoginFrame extends JFrame {

    private LoginListener loginListener;
    
    public LoginFrame(final LoginListener listener) {
        super("Login");
        initComponents();
        this.loginListener = listener;
        this.createAndShowUI();
        this.btnLogin.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                loginListener.onClickLogin(txtEmail.getText(), new String(txtPassword.getPassword()));
            }
        });
        
        this.btnLoginGoogle.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                loginListener.onClickLoginGG(txtEmail.getText(), new String(txtPassword.getPassword()));
            }
        });
    }
   
    public void setLoginStatus(boolean isSuccess) {
        if(isSuccess) {
            this.lbLoginStatus.setText("Login Success!");
        } else {
            this.lbLoginStatus.setText("Invalid email or password.");
        }
    }
    
     private void createAndShowUI() {
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("System".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        this.setLocationRelativeTo(null);
    }
    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        lbEmail = new javax.swing.JLabel();
        lbPassword = new javax.swing.JLabel();
        txtEmail = new javax.swing.JTextField();
        txtPassword = new javax.swing.JPasswordField();
        btnLogin = new javax.swing.JButton();
        lbLoginStatus = new javax.swing.JLabel();
        btnLoginGoogle = new javax.swing.JButton();

        setResizable(false);

        lbEmail.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        lbEmail.setText("Email:");

        lbPassword.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        lbPassword.setText("Password:");

        txtEmail.setHorizontalAlignment(javax.swing.JTextField.LEFT);

        btnLogin.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        btnLogin.setText("Login");

        btnLoginGoogle.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        btnLoginGoogle.setText("Login with Google");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(128, 128, 128)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(btnLoginGoogle, javax.swing.GroupLayout.DEFAULT_SIZE, 164, Short.MAX_VALUE)
                            .addComponent(btnLogin, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(20, 20, 20)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(lbLoginStatus, javax.swing.GroupLayout.PREFERRED_SIZE, 216, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addComponent(lbPassword, javax.swing.GroupLayout.DEFAULT_SIZE, 71, Short.MAX_VALUE)
                                    .addComponent(lbEmail, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addComponent(txtEmail, javax.swing.GroupLayout.DEFAULT_SIZE, 236, Short.MAX_VALUE)
                                    .addComponent(txtPassword))))))
                .addContainerGap(89, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(24, 24, 24)
                .addComponent(lbLoginStatus, javax.swing.GroupLayout.PREFERRED_SIZE, 25, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(txtEmail, javax.swing.GroupLayout.PREFERRED_SIZE, 31, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(lbEmail, javax.swing.GroupLayout.PREFERRED_SIZE, 31, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(lbPassword, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(txtPassword, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addComponent(btnLogin, javax.swing.GroupLayout.PREFERRED_SIZE, 37, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(btnLoginGoogle, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(19, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents
 
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnLogin;
    private javax.swing.JButton btnLoginGoogle;
    private javax.swing.JLabel lbEmail;
    private javax.swing.JLabel lbLoginStatus;
    private javax.swing.JLabel lbPassword;
    private javax.swing.JTextField txtEmail;
    private javax.swing.JPasswordField txtPassword;
    // End of variables declaration//GEN-END:variables

    public static interface LoginListener {
        public void onClickLogin(String email, String password);
        public void onClickLoginGG(String email, String password);
    }
}
