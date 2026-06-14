# 7182 - Crash report 9.2: NPE in LoginActivity.saveCredentialsInSmartLock

- URL: https://github.com/wordpress-mobile/WordPress-Android/issues/7182
- State: closed
- Author: maxme
- Created: 2018-02-01T07:19:40Z

---

```
Caused by java.lang.NullPointerException: Attempt to invoke virtual method 'void org.wordpress.android.ui.accounts.SmartLockHelper.saveCredentialsInSmartLock(java.lang.String, java.lang.String, java.lang.String, android.net.Uri)' on a null object reference
       at org.wordpress.android.ui.accounts.LoginActivity.saveCredentialsInSmartLock(LoginActivity.java:498)
       at org.wordpress.android.login.LoginBaseFormFragment.saveCredentialsInSmartLock(LoginBaseFormFragment.java:274)
       at org.wordpress.android.login.LoginUsernamePasswordFragment.finishLogin(LoginUsernamePasswordFragment.java:460)
       at org.wordpress.android.login.LoginUsernamePasswordFragment.onSiteChanged(LoginUsernamePasswordFragment.java:513)
       at java.lang.reflect.Method.invoke(Method.java)
       at java.lang.reflect.Method.invoke(Method.java:372)
       at org.greenrobot.eventbus.EventBus.invokeSubscriber(EventBus.java:485)
       at org.greenrobot.eventbus.EventBus.invokeSubscriber(EventBus.java:479)
       at org.greenrobot.eventbus.HandlerPoster.handleMessage(HandlerPoster.java:67)
       at android.os.Handler.dispatchMessage(Handler.java:102)
       at android.os.Looper.loop(Looper.java:135)
       at android.app.ActivityThread.main(ActivityThread.java:5348)
       at java.lang.reflect.Method.invoke(Method.java)
       at java.lang.reflect.Method.invoke(Method.java:372)
       at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:947)
       at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:742)
```

Please fix this one in the branch `release/9.2`