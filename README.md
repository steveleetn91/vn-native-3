# Vn Native Framework Version 3 - Beta

Just beta version, but us can use for web platform. But Android, Ios, Macos, Windows App need a little time.

# How to install ? 
Very easy, first you need 
    `git clone https://github.com/steveleetn91/vn-native-3.git`

Then
    `cd vn-native-3 && git checkout beta`

.Then run 
    `npm install`

# First run or reinstall ?
Copy 
    `.env.example`

To
    `.env`

Run 
    `npm link`

Then
    `npm run build`   

# Permission

`sudo chmod -R 777 ./bin`

# How to run ?

Only run 
    `npm run serve`    

Then you can visit : 
    `http://localhost:9000`

Or
    `http://your_ip:9000`

# Production of web platform

First step 
    `mkdir -p ./platforms/web`

Only run 
    `vn3-web-build`

Then go to 
    `./platform/web`

Copy and upload to your hosting

# Issue

Let's give for me a some issue

    `https://github.com/steveleetn91/vn-native-3/issues`

# Licence 
Licence : MIT