# 3222 - Column 'MAX(date)' does not exist

- URL: https://github.com/getodk/collect/issues/3222
- State: closed
- Author: yanokwa
- Created: 2019-07-18T16:33:03Z

---

This issue happened in the pre-launch report on an Android 6.0 device running French. 

**Devices tested**
<img width="978" alt="Screen Shot 2019-07-18 at 9 31 40 AM" src="https://user-images.githubusercontent.com/32369/61475090-e6fe4200-a93e-11e9-9926-83c4850a8a50.png">

**Device with the failure**
<img width="986" alt="Screen Shot 2019-07-18 at 9 31 52 AM" src="https://user-images.githubusercontent.com/32369/61475091-e796d880-a93e-11e9-877e-3cc78a930a16.png">

**Stack trace**
```
FATAL EXCEPTION: ControllerMessenger
Process: org.odk.collect.android, PID: 29336
java.lang.IllegalArgumentException: column 'MAX(date)' does not exist
	at android.database.AbstractCursor.getColumnIndexOrThrow(AbstractCursor.java:333)
	at android.database.CursorWrapper.getColumnIndexOrThrow(CursorWrapper.java:87)
	at android.widget.SimpleCursorAdapter.findColumns(SimpleCursorAdapter.java:333)
	at android.widget.SimpleCursorAdapter.swapCursor(SimpleCursorAdapter.java:345)
	at org.odk.collect.android.activities.FormChooserList.onLoadFinished(SourceFile:232)
	at org.odk.collect.android.activities.FormChooserList.onLoadFinished(SourceFile:55)
	at androidx.loader.app.LoaderManagerImpl$LoaderObserver.onChanged(SourceFile:250)
	at androidx.lifecycle.LiveData.considerNotify(SourceFile:131)
	at androidx.lifecycle.LiveData.dispatchingValue(SourceFile:149)
	at androidx.lifecycle.LiveData.setValue(SourceFile:307)
	at androidx.lifecycle.MutableLiveData.setValue(SourceFile:50)
	at androidx.loader.app.LoaderManagerImpl$LoaderInfo.setValue(SourceFile:189)
	at androidx.loader.app.LoaderManagerImpl$LoaderInfo.onLoadComplete(SourceFile:174)
	at androidx.loader.content.Loader.deliverResult(SourceFile:132)
	at androidx.loader.content.CursorLoader.deliverResult(SourceFile:109)
	at androidx.loader.content.CursorLoader.deliverResult(SourceFile:41)
	at androidx.loader.content.AsyncTaskLoader.dispatchOnLoadComplete(SourceFile:258)
	at androidx.loader.content.AsyncTaskLoader$LoadTask.onPostExecute(SourceFile:83)
	at androidx.loader.content.ModernAsyncTask.finish(SourceFile:490)
	at androidx.loader.content.ModernAsyncTask$InternalHandler.handleMessage(SourceFile:507)
	at android.os.Handler.dispatchMessage(Handler.java:102)
	at androidx.test.espresso.base.Interrogator.a(Interrogator.java:19)
	at androidx.test.espresso.base.UiControllerImpl.a(UiControllerImpl.java:166)
	at androidx.test.espresso.base.UiControllerImpl.a(UiControllerImpl.java:158)
	at androidx.test.espresso.base.UiControllerImpl.a(UiControllerImpl.java:34)
	at androidx.test.espresso.action.MotionEvents.a(MotionEvents.java:77)
	at androidx.test.espresso.action.MotionEvents.a(MotionEvents.java:52)
	at androidx.test.espresso.action.Tap.c(Tap.java:8)
	at androidx.test.espresso.action.Tap.b(Tap.java:18)
	at androidx.test.espresso.action.Tap$1.a(Tap.java:3)
	at androidx.test.espresso.action.GeneralClickAction.perform(GeneralClickAction.java:20)
	at androidx.test.espresso.ViewInteraction$SingleExecutionViewAction.perform(ViewInteraction.java:9)
	at androidx.test.espresso.ViewInteraction.a(ViewInteraction.java:79)
	at androidx.test.espresso.ViewInteraction.a(ViewInteraction.java:96)
	at androidx.test.espresso.ViewInteraction$1.call(ViewInteraction.java:3)
	at java.util.concurrent.FutureTask.run(FutureTask.java:237)
	at android.os.Handler.handleCallback(Handler.java:739)
	at android.os.Handler.dispatchMessage(Handler.java:95)
	at android.os.Looper.loop(Looper.java:148)
	at android.app.ActivityThread.main(ActivityThread.java:5585)
	at java.lang.reflect.Method.invoke(Native Method)
	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:730)
	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:620)
```