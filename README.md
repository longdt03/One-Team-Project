One Remote README

----------------------------------------------------------------------
#CONTENTS
----------------------------------------------------------------------
1. [About Us](#about-us)
2. [About One Remote Program](#about-one-remote-program)
3. [Requirement Software](#requirement-software)
4. [Functions](#functions)
5. [Usage](#usage)
6. [Feedback](#feedback)
7. [Test](#test)
----------------------------------------------------------------------
### About Us
----------------------------------------------------------------------

Thank you for downloading the One Remote Program.

We are One Team. We are a student group who studying software technology instructed by Teacher Truong Anh Hoang
 We have four members: 
1. Dang Thanh Long - scrumt master
2. Vu Trung Kien 
3. Doan Thi Hien 
4. Tran Tuan Linh 

We follow Scrumpt process to do our project. In every sprint, we set up new tasks for it.After that, everybody pick and do their tasks based on their ability. 
If you want to have more detail, go check our pivotal tracker in this link below:
- [User Story](https://www.pivotaltracker.com/n/projects/1263646 "User Story")


----------------------------------------------------------------------
### ABout One Remote Program
----------------------------------------------------------------------
One Remote Program is an application for mobile devices to remotely control computer
It is a open source code so feel free to download it and use it if u want
This client program has been written in ionic framework and we have used firebase API to store and sync the data. The programming language we use is angularjs 
In this server, we have used java to code all necessary functions.  
Besides, we have used jshint tool to check and test the syntax. So, don't worry about any syntax error.
If you need more information about what we have used, follow this link :
- [Firebase](https://www.firebase.com/ "firebase")
- [Ionic](http://ionicframework.com/ "Ionic")
- [Java](http://www.java.com/en/ "Java") 
- [Angularjs](https://angularjs.org/ "Angularjs")	


----------------------------------------------------------------------
### Requirement Software
----------------------------------------------------------------------
To use our program, we need you to have all the following softwares:
 1. Android, IOS Operating System
 2. Internet Connection(because our application operates through Internet)
To download Android, you can follow this link: 
[Android](http://developer.android.com/sdk/index.html)	


----------------------------------------------------------------------
### Functions
----------------------------------------------------------------------
Now, we have two functions:
1. Shutdown Options
User can choose these tasks:
* Shutdown
* Restart
Then choose time delay to execute task on computer, or:
* Hibernate
* Log off
computer instantly.
2. Camera 
User can send request to computer to take a photo from webcam. The photo displays after.


----------------------------------------------------------------------
### Usage
----------------------------------------------------------------------
<How to use>
First, you have to install my server code into a computer and my client code into a android device(or you can use android virtual machine)
1. Server is installed in java file(.exe)
2. Client is installed in moblie in android file(.apk)
3. The user need to log in by ID and Password
4. The User Interface is easy to use: we have tabs to pick task and Time to operate.

Server app

Client app

If you want more information, go check specified folder.


-----------------------------------------------------------------------
## FeedBack
-----------------------------------------------------------------------

## Questions
---------

For miscellaneous questions about One Remote usage and deployment, we
encourage you to contact this number: 01689964546 or send its to our mail: oneteam.uet@gmail.com. 
If not, ask us directly in class.


## Support
-------

For more extensive One Remote Software questions or deployment issues, please contact
our Technical Support staff at this mail: oneteam.uet@gmail.com 


## Reporting Bugs
--------------

* Photos sometimes do not display.
* Animations sometimes do not work.
* User cannot login sometimes

### Test
-----------------------------------------------------------------------

* We have test cases and features folder to test.
* In test cases folder, we have many test cases to test our app.
	- Sign In : Test cases for Log In and Log Out Function
* In features folder, we have been writing our code for automated test
    1. Features are written with the [Gherkin syntax](https://github.com/cucumber/cucumber/wiki/Gherkin)
    2. Support files let you setup the environment in which steps will be run, and define step definitions.
    3. *World* is a constructor function with utility properties, destined to be used in step definitions
    	// support/world.js
    4. Step definitions are the glue between features written in Gherkin and the actual *SUT* (*system under test*). They are 	written in JavaScript.
    5. Hooks can be used to prepare and clean the environment before and after each scenario is executed.


