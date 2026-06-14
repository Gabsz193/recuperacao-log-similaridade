# 3333 - `NPE` on `MainActivity#setPagingEnabled`

- URL: https://github.com/TeamAmaze/AmazeFileManager/issues/3333
- State: open
- Author: amaze-issue-automation[bot]
- Created: 2022-05-29T03:34:44Z

---

## Issue explanation (write below this line)



## Exception
* App Name: Amaze File Manager
* Package: com.amaze.filemanager
* Version: 3.7.0
* User Action: UI Error
* Request: Application crash
* OS: Linux Android 8.1.0 - 27
* Device: TB-8704X
* Model: Lenovo TB-8704X
* Product: TB-8704X
<details><summary><b>Crash log </b></summary><p>

```
java.lang.RuntimeException: Error receiving broadcast Intent { act=loadlist flg=0x10 (has extras) } in com.amaze.filemanager.ui.fragments.MainFragment$2@68f72a5
 at android.app.LoadedApk$ReceiverDispatcher$Args.lambda$-android_app_LoadedApk$ReceiverDispatcher$Args_53034(LoadedApk.java:1333)
 at android.app.-$Lambda$aS31cHIhRx41653CMnd4gZqshIQ.$m$7(Unknown Source:4)
 at android.app.-$Lambda$aS31cHIhRx41653CMnd4gZqshIQ.run(Unknown Source:39)
 at android.os.Handler.handleCallback(Handler.java:790)
 at android.os.Handler.dispatchMessage(Handler.java:99)
 at android.os.Looper.loop(Looper.java:164)
 at android.app.ActivityThread.main(ActivityThread.java:6518)
 at java.lang.reflect.Method.invoke(Native Method)
 at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)
 at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)
Caused by: java.lang.NullPointerException: Attempt to invoke virtual method 'void com.amaze.filemanager.ui.fragments.TabFragment.setPagingEnabled(boolean)' on a null object reference
 at com.amaze.filemanager.ui.activities.MainActivity.setPagingEnabled(MainActivity.java:1436)
 at com.amaze.filemanager.utils.MainActivityActionMode.onDestroyActionMode(MainActivityActionMode.kt:428)
 at androidx.appcompat.app.AppCompatDelegateImpl$ActionModeCallbackWrapperV9.onDestroyActionMode(AppCompatDelegateImpl.java:2708)
 at androidx.appcompat.view.StandaloneActionMode.finish(StandaloneActionMode.java:112)
 at com.amaze.filemanager.ui.fragments.MainFragment.loadlist(MainFragment.java:613)
 at com.amaze.filemanager.ui.fragments.MainFragment.updateList(MainFragment.java:1202)
 at com.amaze.filemanager.ui.fragments.MainFragment$2.onReceive(MainFragment.java:391)
 at android.app.LoadedApk$ReceiverDispatcher$Args.lambda$-android_app_LoadedApk$ReceiverDispatcher$Args_53034(LoadedApk.java:1323)
 ... 9 more
```

</details>
<hr>

Reporter: shuvashish76