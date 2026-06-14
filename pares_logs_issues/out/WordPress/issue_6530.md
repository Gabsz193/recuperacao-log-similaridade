# 6530 - Crash report 8.1: NPE in PostStore.updatePost()

- URL: https://github.com/wordpress-mobile/WordPress-Android/issues/6530
- State: closed
- Author: aforcier
- Created: 2017-08-16T09:20:49Z

---

```
Caused by java.lang.NullPointerException: Attempt to invoke virtual method 'void org.wordpress.android.fluxc.model.PostModel.setDateLocallyChanged(java.lang.String)' on a null object reference
       at org.wordpress.android.fluxc.store.PostStore.updatePost(PostStore.java:548)
       at org.wordpress.android.fluxc.store.PostStore.onAction(PostStore.java:365)
       at java.lang.reflect.Method.invoke(Method.java)
       at org.greenrobot.eventbus.EventBus.invokeSubscriber(EventBus.java:485)
```

The crash is in FluxC, but we should understand why we're ending up with a `null` `PostModel` when sending an `UPDATE_POST` action from WPAndroid.