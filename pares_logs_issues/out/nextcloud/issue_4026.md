# 4026 - IllegalStateException on Toolbar

- URL: https://github.com/nextcloud/android/issues/4026
- State: closed
- Author: tobiasKaminsky
- Created: 2019-05-15T05:39:36Z

---

```
Caused by: java.lang.IllegalStateException: 
  at androidx.appcompat.app.AppCompatDelegateImpl.setSupportActionBar (AppCompatDelegateImpl.java:345)
  at androidx.appcompat.app.AppCompatActivity.setSupportActionBar (AppCompatActivity.java:130)
  at com.owncloud.android.ui.activity.ToolbarActivity.setupToolbar (ToolbarActivity.java:69)
  at com.owncloud.android.ui.activity.ToolbarActivity.setupToolbar (ToolbarActivity.java:99)
  at com.owncloud.android.ui.activity.FileDisplayActivity.onCreate (FileDisplayActivity.java:244)
  at android.app.Activity.performCreate (Activity.java:7326)
  at android.app.Activity.performCreate (Activity.java:7317)
  at android.app.Instrumentation.callActivityOnCreate (Instrumentation.java:1271)
  at android.app.ActivityThread.performLaunchActivity (ActivityThread.java:3066)
```

This is the IllegalStateException:
`"This Activity already has an action bar supplied by the window decor. Do not request Window.FEATURE_SUPPORT_ACTION_BAR and set windowActionBar to false in your theme to use a Toolbar instead."`

Seems to happen quite often, starting with 3.6.1 RC2.
Unfortunately I do not have any infos how to reproduce it.
