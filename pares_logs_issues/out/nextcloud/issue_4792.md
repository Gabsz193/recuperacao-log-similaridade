# 4792 - App crashes every time I try to create a new folder

- URL: https://github.com/nextcloud/android/issues/4792
- State: closed
- Author: levster69
- Created: 2019-11-04T00:20:40Z

---

************ CAUSE OF ERROR ************
```
java.lang.NullPointerException: Attempt to invoke virtual method 'java.lang.String com.owncloud.android.datamodel.OCFile.getRemotePath()' on a null object reference
	at com.owncloud.android.ui.dialog.CreateFolderDialogFragment.onClick(CreateFolderDialogFragment.java:139)
	at androidx.appcompat.app.AlertController$ButtonHandler.handleMessage(AlertController.java:167)
	at android.os.Handler.dispatchMessage(Handler.java:106)
	at android.os.Looper.loop(Looper.java:214)
	at android.app.ActivityThread.main(ActivityThread.java:6986)
	at java.lang.reflect.Method.invoke(Native Method)
	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:494)
	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1445)
```
************ APP INFORMATION ************
ID: com.nextcloud.client
Version: 30090051
Build flavor: gplay

************ DEVICE INFORMATION ************
Brand: samsung
Device: star2qlteue
Model: SM-G965U1
Id: PPR1.180610.011
Product: star2qlteue

************ FIRMWARE ************
SDK: 28
Release: 9
Incremental: G965U1UEU7CSJ3
