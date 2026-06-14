# 1581 - Crash after granting permission.

- URL: https://github.com/commons-app/apps-android-commons/issues/1581
- State: closed
- Author: TGar21
- Created: 2018-06-02T15:32:57Z

---

**Summary:** 
Commons crashing during granting a Location permission aftr first run. I am using Oreo device.
See the video: https://www.dropbox.com/s/3aig57i1x6pdcok/2018_06_02_17_20_08.mp4?dl=0

**Steps to reproduce:** 

1. Turn off the GPS permission
2. Clear data
3. Start app
4. Go through the onboarding and sign in
5. Press menu icon and choose Nearby option
6. Dialogue asking for GPS permission appears, confirm it
7. Add the permission in the settings and then in the dialogue


How can we reproduce the issue?
`06-02 12:44:46.199 12044 12044 E AndroidRuntime: FATAL EXCEPTION: main 06-02 12:44:46.199 12044 12044 E AndroidRuntime: Process: fr.free.nrw.commons, PID: 12044 06-02 12:44:46.199 12044 12044 E AndroidRuntime: java.lang.RuntimeException: Failure delivering result ResultInfo{who=@android:requestPermissions:, request=1, result=-1, data=Intent { act=android.content.pm.action.REQUEST_PERMISSIONS (has extras) }} to activity {fr.free.nrw.commons/fr.free.nrw.commons.nearby.NearbyActivity}: java.lang.NullPointerException: Attempt to invoke virtual method 'double android.location.Location.getLatitude()' on a null object reference 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.app.ActivityThread.deliverResults(ActivityThread.java:4581) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.app.ActivityThread.handleSendResult(ActivityThread.java:4631) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.app.ActivityThread.-wrap19(Unknown Source:0) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1699) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.os.Handler.dispatchMessage(Handler.java:105) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.os.Looper.loop(Looper.java:180) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.app.ActivityThread.main(ActivityThread.java:6944) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at java.lang.reflect.Method.invoke(Native Method) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at com.android.internal.os.Zygote$MethodAndArgsCaller.run(Zygote.java:240) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:835) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: Caused by: java.lang.NullPointerException: Attempt to invoke virtual method 'double android.location.Location.getLatitude()' on a null object reference 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at fr.free.nrw.commons.location.LatLng.from(LatLng.java:45) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at fr.free.nrw.commons.location.LocationServiceManager.getLKL(LocationServiceManager.java:93) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at fr.free.nrw.commons.nearby.NearbyActivity.onRequestPermissionsResult(NearbyActivity.java:163) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.app.Activity.dispatchRequestPermissionsResult(Activity.java:7399) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.app.Activity.dispatchActivityResult(Activity.java:7250) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: at android.app.ActivityThread.deliverResults(ActivityThread.java:4577) 06-02 12:44:46.199 12044 12044 E AndroidRuntime: ... 9 more`

**Expected behavior:** 
It should show the map.

**Observed behavior:** 
Crash. After returning to the app again, the map is shown normally.

**Device and Android version:** 
HTC 10, OS 8.0.0 Oreo, stock version
 
 **Commons app version:** 
2.7.1. downloaded from Play store

**Video:** 

https://www.dropbox.com/s/3aig57i1x6pdcok/2018_06_02_17_20_08.mp4?dl=0

**Would you like to work on the issue?**

I would like to look at it. If I won't manage to fix this, I'll let you know.
