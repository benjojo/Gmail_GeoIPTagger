Gmail_GeoIPTagger
=================

An app script that will filter your email from where in the world it was sent from

It labels your email like this: 

![alt text](http://i.imgur.com/aDptePC.png "Screenshot")

**This code is experimental and not feature complete. If it breaks, you get
  to keep both pieces.**

##Setup
First open your google drive and make a new script

![alt text](.setupimages/1.png "sc1")

Then make a blank project

![alt text](.setupimages/2.png "sc2")

Copy and paste the contents of `Code.gs` into the code editor

![alt text](.setupimages/3.png "sc3")

Set your function to run as `TagInbox` and then hit run to make sure it works

![alt text](.setupimages/4.png "sc4")

The first time that it runs it will ask permissions to read and write to your gmail inbox and to connect to other services

It needs gmail access to tag things as labels, it needs to connect to external services to do GeoIP lookups.

![alt text](.setupimages/5.png "sc5")

![alt text](.setupimages/6.png "sc6")

If that runs smoothly we can now set it to run automatically
Resorces > Current Project Triggers

![alt text](.setupimages/7.png "sc7")

Then set the function to run every 10 mins

![alt text](.setupimages/8.png "sc8")

![alt text](.setupimages/9.png "sc9")
