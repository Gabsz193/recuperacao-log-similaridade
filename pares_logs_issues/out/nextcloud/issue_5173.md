# 5173 - Fc app on selecting storage folder auto uploaded

- URL: https://github.com/nextcloud/android/issues/5173
- State: closed
- Author: toobie83
- Created: 2020-01-13T09:15:28Z

---

### Steps to reproduce
1. Clicking on auto upload
2. Selecting folder
3. Select Configure
4. Trying to change the Remote folder,
nextcloud crashes afterwards

### Expected behaviour
- nextcloud remote structure should show up to change the remote folder.

### Actual behaviour
- App instantly force closes.

### Environment data
Android version: 10, Miui11

Device model: Xiaomi mi 9

Stock or customized system: MiuiMix 11.2

Nextcloud app version: 3.10.0 RC2

Nextcloud server version: 17.0.2

### Logs
#### Web server error log
```
Insert your webserver log here
```
************ CAUSE OF ERROR ************

java.lang.NullPointerException: Attempt to invoke interface method 'android.view.MenuItem android.view.MenuItem.setVisible(boolean)' on a null object reference
	at com.owncloud.android.ui.fragment.OCFileListFragment.onPrepareOptionsMenu(OCFileListFragment.java:796)
	at androidx.fragment.app.Fragment.performPrepareOptionsMenu(Fragment.java:2723)
	at androidx.fragment.app.FragmentManagerImpl.dispatchPrepareOptionsMenu(FragmentManagerImpl.java:2743)
	at androidx.fragment.app.FragmentController.dispatchPrepareOptionsMenu(FragmentController.java:398)
	at androidx.fragment.app.FragmentActivity.onPreparePanel(FragmentActivity.java:489)
	at androidx.appcompat.view.WindowCallbackWrapper.onPreparePanel(WindowCallbackWrapper.java:99)
	at androidx.appcompat.app.AppCompatDelegateImpl$AppCompatWindowCallback.onPreparePanel(AppCompatDelegateImpl.java:2857)
	at androidx.appcompat.view.WindowCallbackWrapper.onPreparePanel(WindowCallbackWrapper.java:99)
	at androidx.appcompat.app.ToolbarActionBar$ToolbarCallbackWrapper.onPreparePanel(ToolbarActionBar.java:522)
	at androidx.appcompat.app.ToolbarActionBar.populateOptionsMenu(ToolbarActionBar.java:456)
	at androidx.appcompat.app.ToolbarActionBar$1.run(ToolbarActionBar.java:56)
	at android.os.Handler.handleCallback(Unknown Source:2)
	at android.os.Handler.dispatchMessage(Unknown Source:4)
	at android.os.Looper.loop(Unknown Source:242)
	at android.app.ActivityThread.main(Unknown Source:98)
	at java.lang.reflect.Method.invoke(Native Method)
	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(Unknown Source:11)
	at com.android.internal.os.ZygoteInit.main(Unknown Source:275)

************ APP INFORMATION ************
ID: com.nextcloud.client
Version: 30100052
Build flavor: gplay

************ DEVICE INFORMATION ************
Brand: Xiaomi
Device: cepheus
Model: MI 9
Id: QKQ1.190825.002
Product: cepheus

************ FIRMWARE ************
SDK: 29
Release: 10
Incremental: 20.1.9

#### Nextcloud log (data/nextcloud.log)
```
Insert your Nextcloud log here
```
**NOTE:** Be super sure to remove sensitive data like passwords, note that everybody can look here! You can use the Issue Template application to prefill some of the required information: https://apps.nextcloud.com/apps/issuetemplate
