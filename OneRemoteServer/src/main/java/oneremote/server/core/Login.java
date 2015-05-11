/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oneremote.server.core;

import com.firebase.client.AuthData;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import oneremote.server.utils.FirebaseAdapter;

/**
 *
 * @author DangThanh
 */
public class Login {

    public String uID;

    public void loginWithEmailPassword(String email, String password, final OnRequestListener listener) {
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
    }

    public void loginWithProvider(String email, String password, String provider, final OnRequestListener listener) {
        if (listener != null) {
            System.out.println("loading");
            listener.onLoading();
        }
        if ("google".equals(provider)) {
            String token = "/auth/google/token";
            FirebaseAdapter.getFirebaseRoot().authWithOAuthToken("google", token, new Firebase.AuthResultHandler() {
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
