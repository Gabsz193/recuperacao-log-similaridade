# 285 - ``NumberFormatException`` and can never open the setting page anymore

- URL: https://github.com/ramack/ActivityDiary/issues/285
- State: closed
- Author: tingsu
- Created: 2020-02-11T12:53:14Z

---

This exception was found on the master (v1.4.0, the latest code version) and a Google Android phone. 

STR:  Go to setting, click ``Location Service``, choose ``Network``, open ``Update period``, delete the default value "5" (leave the EditText empty), and click ``OK``.

The exception trace:

```
java.lang.NumberFormatException: Invalid int: ""
 	at java.lang.Integer.invalidInt(Integer.java:138)
 	at java.lang.Integer.parseInt(Integer.java:358)
 	at java.lang.Integer.parseInt(Integer.java:334)
 	at de.rampro.activitydiary.ui.settings.SettingsActivity.updateLocationAge(SettingsActivity.java:238)
 	at de.rampro.activitydiary.ui.settings.SettingsActivity.onSharedPreferenceChanged(SettingsActivity.java:135)
 	at android.app.SharedPreferencesImpl$EditorImpl.notifyListeners(SharedPreferencesImpl.java:479)
 	at android.app.SharedPreferencesImpl$EditorImpl.apply(SharedPreferencesImpl.java:387)
 	at android.support.v7.preference.Preference.tryCommit(Preference.java:1613)
 	at android.support.v7.preference.Preference.persistString(Preference.java:1644)
 	at android.support.v7.preference.EditTextPreference.setText(EditTextPreference.java:69)
 	at android.support.v7.preference.EditTextPreferenceDialogFragmentCompat.onDialogClosed(EditTextPreferenceDialogFragmentCompat.java:96)
 	at android.support.v7.preference.PreferenceDialogFragmentCompat.onDismiss(PreferenceDialogFragmentCompat.java:270)
 	at android.app.Dialog$ListenersHandler.handleMessage(Dialog.java:1323)
 	at android.os.Handler.dispatchMessage(Handler.java:102)
 	at android.os.Looper.loop(Looper.java:148)
 	at android.app.ActivityThread.main(ActivityThread.java:5417)
 	at java.lang.reflect.Method.invoke(Native Method)
 	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:726)
 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:616)
```

Once this issue happens, the ``setting`` page cannot be opened, and the app crashes with the exception trace below.

```
java.lang.RuntimeException: Unable to start activity ComponentInfo{de.rampro.activitydiary.debug/de.rampro.activitydiary.ui.settings.SettingsActivity}: java.lang.NumberFormatException: Invalid int: ""
 	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2416)
 	at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2476)
 	at android.app.ActivityThread.-wrap11(ActivityThread.java)
 	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1344)
 	at android.os.Handler.dispatchMessage(Handler.java:102)
 	at android.os.Looper.loop(Looper.java:148)
 	at android.app.ActivityThread.main(ActivityThread.java:5417)
 	at java.lang.reflect.Method.invoke(Native Method)
 	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:726)
 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:616)
 Caused by: java.lang.NumberFormatException: Invalid int: ""
 	at java.lang.Integer.invalidInt(Integer.java:138)
 	at java.lang.Integer.parseInt(Integer.java:358)
 	at java.lang.Integer.parseInt(Integer.java:334)
 	at de.rampro.activitydiary.ui.settings.SettingsActivity.updateLocationAge(SettingsActivity.java:238)
 	at de.rampro.activitydiary.ui.settings.SettingsActivity.onCreate(SettingsActivity.java:471)
 	at android.app.Activity.performCreate(Activity.java:6237)
 	at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1107)
 	at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2369)
 	... 9 more
```