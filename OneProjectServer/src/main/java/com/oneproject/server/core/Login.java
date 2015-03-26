/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.server.core;

import com.firebase.client.AuthData;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.oneproject.utils.FirebaseAdapter;

/**
 *
 * @author DangThanh
 */
public class Login {

    public String uID;

    public void isAuthenticate(final String email, final String password, final String provider, final OnRequestListener listener) {
        if ("password".equals(provider)) {
            if (listener != null) {
                System.out.println("loading");
                listener.onLoading();                    
            }
            FirebaseAdapter.getFirebaseRoot().authWithPassword(email, password, new Firebase.AuthResultHandler() {
                @Override
                public void onAuthenticated(AuthData aut) {
                    System.out.println("success");
                    uID = aut.getUid();                    
                    if (listener != null) {
                        listener.onSuccess();
                    }
                }

                @Override
                public void onAuthenticationError(FirebaseError fe) {
                    System.out.println(fe.getMessage());
                    if (listener != null) {
                        listener.onFail();
                    }
                }
            });
        } else if ("google".equals(provider)) {
        }
    }    
    
    public String getUID() {
        return uID.split(":")[1];
    }

    public interface OnRequestListener {
        void onLoading();
        void onSuccess();
        void onFail();
    }
}
