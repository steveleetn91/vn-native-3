![alt text](https://vnnativeframework.club/assets/images/logo.png)
# Vn Native Framework Version 3 - Beta

Vn native framework is a framework useful all platforms, it's help you develop software, game, e-commerce for : 
Android, iOS, MacOS, Windows, Web, Linux, with struct lazy load you can use for big project. Slack room : 

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

# Plugins dependencies 
vnnative3-webview
    `https://github.com/steveleetn91/vnnative3-webview`

vnnative3-form
    `https://github.com/steveleetn91/vnnative3-form`

vnnative3-location
    `https://github.com/steveleetn91/vnnative3-location`

# Game ( Phaser )

Install 
    `npm i phaser`

And
    `npm install @types/phaser`

Full document 
    `https://phaser.io/`

# Issue

Let's give for me a some issue
    `https://github.com/steveleetn91/vn-native-3/issues`

# Licence 
Licence : MIT
