![alt text](https://raw.githubusercontent.com/steveleetn91/vn-native-3/master/assets/images/solution.jpg)
![alt text](https://raw.githubusercontent.com/steveleetn91/vn-native-3/master/assets/images/logo.png)
# Vn Native Framework Version 3 - Beta

Vn native framework is a framework useful all platforms, it's help you develop software, game, e-commerce for : 
Android, iOS, MacOS, Windows, Web, Linux, with struct `lazy load` and `lazy build` you can use for big project. Slack room : 

https://join.slack.com/t/vnnative/shared_invite/zt-10c6aiylx-GBQ8e2M_skQyh1i4fW879A

Vn Native Framework using lazy load for all page, so it's ready for big project. 
    `Note : We need NodeJS version >= 16.x.x`


# Video how to install ? 

    https://www.youtube.com/watch?v=fwB5k8Edp6Q

# How to install ? 
Very easy, first you need 
    `git clone https://github.com/steveleetn91/vn-native-3.git`

Then
    `cd vn-native-3`

.Then run 
    `npm install`

# First run or reinstall ?
Copy 
    `.env.example`

To
    `.env`

Run 
    `npm link`

Run 
    `npm run build:web`

# Permission

`sudo chmod -R 777 ./bin`

# How to run web server ?

Only run 
    `npm run serve:web`    

Then you can visit : 
    `http://localhost:9000`

Or
    `http://your_ip:9000`

# Production of web platform

First step 
    `mkdir -p ./platforms/web/build`

Only run 
    `npm run build:web`

Then go to 
    `./platform/web`

Copy and upload to your hosting

# Vn Native 3 View

Now we using Mustache library for view engine, so to get advanced please read more at here :  
    `https://github.com/steveleetn91/vnnative3-webview`

# Windows software development

We use Electron for feature software. First step 
    `npm run serve:electron`

# Windows software production
Install Electron packager
    `npm install --save-dev electron-packager`

We use Electron for feature software. First step
    `npm run build:electron-win`

Then you can go to
    `platforms/electron/dist`

# MacOS software development

We use Electron for feature software. First step 
    `npm run serve:electron`

# MacOS software production
Install Electron packager
    `npm install --save-dev electron-packager`

We use Electron for feature software. First step
    `npm run build:electron-macos`

Then you can go to
    `platforms/electron/dist`    

# How to add android platforms
To add android platform only run.
    `npm run add:android`
    
## Android OS development

Video https://www.youtube.com/watch?v=VqENPZfoY1I. 

Now I created android project at `./platform/android`. So you only need run: 
    `npm run development:android`

Then run web server.
    `npm run serve:web`

Last step open android studio and open project at `./platforms/android`. Then run app.

## Android OS production

To build android production you need two step, first step run this command line, after if you need upload to Google Play, so please view document android about how to upload to Goog Play ?
    `npm run build:android`

You can change config at Android Studio.

# iOS platform
 
We need install ruby gem.    
    `sudo gem install xcodeproj`

To add iOS platform 
    `npm run add:ios`

## Development iOS 

If this is first run, so you need : 
    `npm run build:ios`

You need start web serve, after to prepare for development iOS us need : 
    `npm run development:ios`

## Production iOS 

To build production us need : 
    `npm run build:ios`

# Plugins dependencies 
vnnative3-webview
    `https://github.com/steveleetn91/vnnative3-webview`

vnnative3-form
    `https://github.com/steveleetn91/vnnative3-form`

vnnative3-location
    `https://github.com/steveleetn91/vnnative3-location`

vnnative-3-os
    `https://github.com/steveleetn91/vnnative-3-os`    

# Game ( Phaser )

Install 
    `npm i phaser`

Full document 
    `https://phaser.io/`

# Issue

Let's give for me a some issue
    `https://github.com/steveleetn91/vn-native-3/issues`

# Licence 
Licence : MIT
