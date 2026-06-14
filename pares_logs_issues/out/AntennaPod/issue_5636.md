# 5636 - Crash when switching apps while share dialog is open

- URL: https://github.com/AntennaPod/AntennaPod/issues/5636
- State: closed
- Author: keunes
- Created: 2022-01-04T08:12:37Z

---

### Checklist

- [X] I have used the search function to see if someone else has already submitted the same bug report.
- [X] I will describe the problem with as much detail as possible.
- [X] If the bug only to occurs with a certain podcast, I will include the URL of that podcast.

### App version

2.4.1 (cloud chapter debug build)

### Where did you get the app from

Other

### Android version

10

### Device model

FP3

### First occurred

just now

### Steps to reproduce

(I believe)
1. Open share dialog
2. Switch apps

### Expected behaviour

Continue playing

### Current behaviour

Crash (playback stops)

### Logs

```
java.lang.RuntimeException: Parcelable encountered IOException writing serializable object (name = de.danoeh.antennapod.model.feed.FeedItem)
	at android.os.Parcel.writeSerializable(Parcel.java:1833)
	at android.os.Parcel.writeValue(Parcel.java:1780)
	at android.os.Parcel.writeArrayMapInternal(Parcel.java:928)
	at android.os.BaseBundle.writeToParcelInner(BaseBundle.java:1584)
	at android.os.Bundle.writeToParcel(Bundle.java:1253)
	at android.os.Parcel.writeBundle(Parcel.java:997)
	at androidx.fragment.app.FragmentState.writeToParcel(FragmentState.java:125)
	at android.os.Parcel.writeTypedObject(Parcel.java:1634)
	at android.os.Parcel.writeTypedList(Parcel.java:1513)
	at android.os.Parcel.writeTypedList(Parcel.java:1470)
	at androidx.fragment.app.FragmentManagerState.writeToParcel(FragmentManagerState.java:58)
	at android.os.Parcel.writeParcelable(Parcel.java:1801)
	at android.os.Parcel.writeValue(Parcel.java:1707)
	at android.os.Parcel.writeArrayMapInternal(Parcel.java:928)
	at android.os.BaseBundle.writeToParcelInner(BaseBundle.java:1584)
	at android.os.Bundle.writeToParcel(Bundle.java:1253)
	at android.os.Parcel.writeBundle(Parcel.java:997)
	at android.os.Parcel.writeValue(Parcel.java:1698)
	at android.os.Parcel.writeArrayMapInternal(Parcel.java:928)
	at android.os.BaseBundle.writeToParcelInner(BaseBundle.java:1584)
	at android.os.Bundle.writeToParcel(Bundle.java:1253)
	at android.os.Parcel.writeBundle(Parcel.java:997)
	at android.os.Parcel.writeValue(Parcel.java:1698)
	at android.os.Parcel.writeArrayMapInternal(Parcel.java:928)
	at android.os.BaseBundle.writeToParcelInner(BaseBundle.java:1584)
	at android.os.Bundle.writeToParcel(Bundle.java:1253)
	at android.app.IActivityTaskManager$Stub$Proxy.activityStopped(IActivityTaskManager.java:4505)
	at android.app.servertransaction.PendingTransactionActions$StopInfo.run(PendingTransactionActions.java:145)
	at android.os.Handler.handleCallback(Handler.java:883)
	at android.os.Handler.dispatchMessage(Handler.java:100)
	at android.os.Looper.loop(Looper.java:214)
	at android.app.ActivityThread.main(ActivityThread.java:7397)
	at java.lang.reflect.Method.invoke(Native Method)
	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:492)
	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:935)
Caused by: java.io.NotSerializableException: de.danoeh.antennapod.model.feed.FeedMedia
	at java.io.ObjectOutputStream.writeObject0(ObjectOutputStream.java:1240)
	at java.io.ObjectOutputStream.defaultWriteFields(ObjectOutputStream.java:1604)
	at java.io.ObjectOutputStream.writeSerialData(ObjectOutputStream.java:1565)
	at java.io.ObjectOutputStream.writeOrdinaryObject(ObjectOutputStream.java:1488)
	at java.io.ObjectOutputStream.writeObject0(ObjectOutputStream.java:1234)
	at java.io.ObjectOutputStream.writeObject(ObjectOutputStream.java:354)
	at android.os.Parcel.writeSerializable(Parcel.java:1828)
	... 34 more
```