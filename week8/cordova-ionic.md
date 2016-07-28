Cordova and Ionic
=======

**Cordova** allows us to turn web apps into native mobile apps.

**Ionic** uses Cordova with AngularJS to allow us to create rapid mobile apps that look professionally built.


Installing
----------

Please read [http://ionicframework.com/getting-started/](http://ionicframework.com/getting-started/) for installation instructions:
```bash
sudo npm install -g cordova ionic
```

#### Android SDK

We also need to install the Android SDK (Software Development Kit), follow the instructions [here](https://developer.android.com/studio/index.html).



### Our First App: Hello Tabs

```bash
ionic start helloTabs tabs
cd helloTabs
ionic platform add android
ionic run android
```
### Maps App

```bash
ionic start myMaps maps
cd myMaps
ionic platform add android
ionic plugin add cordova-plugin-geolocation
ionic run android
```
