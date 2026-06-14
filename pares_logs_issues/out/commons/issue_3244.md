# 3244 - All uploads crash in prodRelease, 2.11.0~1c470241e

- URL: https://github.com/commons-app/apps-android-commons/issues/3244
- State: closed
- Author: misaochan
- Created: 2019-11-29T16:59:19Z

---

**Summary:** 

When testing prodRelease on current master, all uploads crash as soon as I select the photo to upload

**Steps to reproduce:** 

Clean install app on prodRelease build, select picture to upload

**System logs:**

```
USER_COMMENT= upload from Nearby
APP_VERSION_CODE=475
APP_VERSION_NAME=2.11.0
ANDROID_VERSION=9
PHONE_MODEL=SM-G960F
STACK_TRACE=java.lang.RuntimeException: Unable to start activity ComponentInfo{fr.free.nrw.commons/fr.free.nrw.commons.upload.UploadActivity}: java.lang.RuntimeException: Parcel android.os.Parcel@ad06b10: Unmarshalling unknown type code 7077996 at offset 712
at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3092)
at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:3235)
at android.app.servertransaction.LaunchActivityItem.execute(LaunchActivityItem.java:78)
at android.app.servertransaction.TransactionExecutor.executeCallbacks(TransactionExecutor.java:108)
at android.app.servertransaction.TransactionExecutor.execute(TransactionExecutor.java:68)
at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1926)
at android.os.Handler.dispatchMessage(Handler.java:106)
at android.os.Looper.loop(Looper.java:214)
at android.app.ActivityThread.main(ActivityThread.java:6986)
at java.lang.reflect.Method.invoke(Native Method)
at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:494)
at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1445)
Caused by: java.lang.RuntimeException: Parcel android.os.Parcel@ad06b10: Unmarshalling unknown type code 7077996 at offset 712
at android.os.Parcel.readValue(Parcel.java:2763)
at android.os.Parcel.readArrayMapInternal(Parcel.java:3053)
at android.os.BaseBundle.initializeFromParcelLocked(BaseBundle.java:288)
at android.os.BaseBundle.unparcel(BaseBundle.java:232)
at android.os.BaseBundle.containsKey(BaseBundle.java:504)
at android.content.Intent.hasExtra(Intent.java:7923)
at fr.free.nrw.commons.upload.UploadActivity.receiveInternalSharedItems(UploadActivity.java:385)
at fr.free.nrw.commons.upload.UploadActivity.receiveSharedItems(UploadActivity.java:309)
at fr.free.nrw.commons.upload.UploadActivity.lambda$uFmJNhak7opat5jgMvaezcNPkNM(Unknown Source:0)
at fr.free.nrw.commons.upload.-$$Lambda$UploadActivity$uFmJNhak7opat5jgMvaezcNPkNM.run(Unknown Source:2)
at fr.free.nrw.commons.utils.PermissionUtils$1.onPermissionGranted(PermissionUtils.java:114)
at com.karumi.dexter.MultiplePermissionsListenerToPermissionListenerAdapter.onPermissionsChecked(Unknown Source:35)
at com.karumi.dexter.DexterInstance$1.run(Unknown Source:43)
at com.karumi.dexter.MainThread.execute(Unknown Source:6)
at com.karumi.dexter.DexterInstance.checkMultiplePermissions(Unknown Source:56)
at com.karumi.dexter.DexterInstance.checkPermissions(Unknown Source:0)
at com.karumi.dexter.Dexter.check(Unknown Source:10)
at fr.free.nrw.commons.utils.PermissionUtils.checkPermissionsAndPerformAction(PermissionUtils.java:144)
at fr.free.nrw.commons.utils.PermissionUtils.checkPermissionsAndPerformAction(PermissionUtils.java:82)
at fr.free.nrw.commons.upload.UploadActivity.onCreate(UploadActivity.java:129)
at android.app.Activity.performCreate(Activity.java:7326)
at android.app.Activity.performCreate(Activity.java:7317)
at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1271)
at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:3072)
... 11 more

IS_SILENT=false
USER_EMAIL=
USER_CRASH_DATE=2019-11-30T02:53:27.923+10:00
REPORT_ID=9e27a0c3-bb36-4c0e-aa67-00f151b85742
```


