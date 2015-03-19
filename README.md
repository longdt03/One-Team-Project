# One-Team
Dự án môn Công nghệ phần mềm - Thầy Trương Anh Hoàng

Thành viên:
1. Đặng Thành Long - Nhóm trưởng
2. Vũ Trung Kiên
3. Trần Tuấn Linh
4. Doãn Thị Hiền
5. Phạm Khôi Nguyên

Dự án: Xây dựng ứng dụng trên mobile điều khiển máy tính từ xa
+ Serve cài đặt trên desktop dưới dạng ứng dụng java (.exe)
+ Client cài đặt trên mobile dưới dạng ứng dụng android (.apk)
+ Cung cấp các chức năng: Shutdown (với các tác vụ Shutdown, Restart, Hibernate và LogOff)
+ Sử dụng firebase làm serve để gửi và nhận lệnh
+ Người dùng đăng nhập bằng email và password
+ Giao diện dễ sử dụng: có các tab chọn task và thời gian thực thi

# Mobile application

## Description

An application for mobile devices to remotely control computer.

## Requirement

* Android, iOS operating system
* Internet connection

## Technologies and tools
* Firebase API
* Ionic framework

## Feature

### Shutdown Options

User can choose these tasks:
* Shutdown
* Restart
Then choose time delay to execute task on computer, or:
* Hibernate
* Log off
computer instantly.

### Camera

User can send request to computer to take a photo from webcam. The photo display after.

## Bugs

* Photos sometimes do not display.
* Animations sometimes do not work.
* User cannot login sometimes

## TODO

* Complete and upgrade UI
* Design icons, logo and splash screen
* Improve user experiences
* Check internet connection
* Display computer name
* Save computer ID history

