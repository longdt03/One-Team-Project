/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oneproject.utils;

import com.google.gdata.client.photos.PicasawebService;
import com.google.gdata.data.PlainTextConstruct;
import com.google.gdata.data.media.MediaFileSource;
import com.google.gdata.data.media.mediarss.MediaContent;
import com.google.gdata.data.photos.AlbumEntry;
import com.google.gdata.data.photos.AlbumFeed;
import com.google.gdata.data.photos.GphotoEntry;
import com.google.gdata.data.photos.PhotoEntry;
import com.google.gdata.util.AuthenticationException;
import java.io.File;
import java.net.URL;
import java.util.List;
import javax.activation.MimetypesFileTypeMap;

/**
 *
 * @author DangThanh
 */
public class PicasaUtils {

    private final String ALBUM_NAME = "Webcam";
    private final String USERNAME = "oneteam.uet@gmail.com";
    private final String PASSWORD = "oneteamuet";
    private final String PICASA_URL = "http://picasaweb.google.com/data/feed/api/user/" + this.USERNAME;
    private String albumID;
    private PicasawebService myService;

    public PicasaUtils() throws Exception {
        this.login();
        this.createAlbum();
    }

    private void login() throws AuthenticationException {
        this.myService = new PicasawebService("MyRemote");
        this.myService.setUserCredentials(this.USERNAME, this.PASSWORD);
    }

    public String createAlbum(String albumName, String description) throws Exception {
        albumID = this.isExistAlbum(albumName);
        if (albumID == null) {
            URL postUrl = new URL(this.PICASA_URL);

            AlbumEntry myAlbum = new AlbumEntry();
            myAlbum.setTitle(new PlainTextConstruct(albumName));
            myAlbum.setDescription(new PlainTextConstruct(description));

            AlbumEntry insertedAlbum = myService.insert(postUrl, myAlbum);
            albumID = insertedAlbum.getGphotoId();
        }

        return albumID;
    }

    private String createAlbum() throws Exception {
        return this.createAlbum(this.ALBUM_NAME, "This is " + this.ALBUM_NAME);
    }

    public String isExistAlbum(String albumName) throws Exception {
        URL feedUrl = new URL(this.PICASA_URL + "?kind=album");
        AlbumFeed myUserFeed = myService.getFeed(feedUrl, AlbumFeed.class);
        List<GphotoEntry> albumEntries = myUserFeed.getEntries();
        for (GphotoEntry albumEntry : albumEntries) {
            if (albumName.equals(albumEntry.getTitle().getPlainText())) {
                return albumEntry.getGphotoId();
            }
        }
        return null;
    }

    private String isExistAlbum() throws Exception {
        return this.isExistAlbum(this.ALBUM_NAME);
    }

    public String uploadImage(File imageFile) throws Exception {
        //Khong upload neu chua ton tai album
        if(this.albumID == null || this.albumID == "") {
            return "";
        }
        
        //Upload anh len Picasa
        URL albumPostUrl = new URL(this.PICASA_URL + "/albumid/" + albumID);
        PhotoEntry myPhoto = new PhotoEntry();
        myPhoto.setTitle(new PlainTextConstruct(imageFile.getName()));
        myPhoto.setDescription(new PlainTextConstruct("Webcam Image was uploaded by MyRemote"));
        myPhoto.setClient("OneRemote");
        MediaFileSource myMedia = new MediaFileSource(imageFile, new MimetypesFileTypeMap().getContentType(imageFile));
        myPhoto.setMediaSource(myMedia);
        PhotoEntry insertedImage = myService.insert(albumPostUrl, myPhoto);
        
        //Lay link anh
        List<MediaContent> mediaContents = insertedImage.getMediaContents();
        for (MediaContent content : mediaContents) {
            return content.getUrl();
        }
        return "";
    }

    public String getAlbumID() {
        return albumID;
    }

    public String getAlbumName() {
        return ALBUM_NAME;
    }

//    public static void main(String[] args) throws Exception {
//        PicasaUtils picasaUtils = new PicasaUtils();
//        System.out.println(picasaUtils.uploadImage(new File("C:\\Users\\DangThanh\\Desktop\\MyRemote\\res\\webcam\\Window2.jpg")));
//    }
}
