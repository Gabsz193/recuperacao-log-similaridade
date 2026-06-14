# 4977 - Crash in DeckPicker after CardBrowser on clean install

- URL: https://github.com/ankidroid/Anki-Android/issues/4977
- State: closed
- Author: mikehardy
- Created: 2018-09-17T15:17:37Z

---

###### Reproduction Steps

1. Clean install of current alpha, no decks
2. Not sure if it's important, but click floating menu "get shared decks" then just back button immediately (it was in the repro and doesn't take long)
3. Click the hamburger and select Card Browser
4. Click the hamburger again and go to Deck list


###### Expected Result

You should see the Default deck and no cards


###### Actual Result

Crash


###### Debug info

This is from that same roboelectric test harness someone throws at our alphas (awesome work, that) 

https://play.google.com/apps/publish/?account=5338425030304417978#PreLaunchReportPlace:p=com.ichi2.anki&appid=4973711737547064258&plrtab=CRASH&plrvc=20900135

09-17 10:13:14.046 1712-3619/system_process I/ActivityManager: START u0 {cmp=com.ichi2.anki/.CardBrowser (has extras)} from uid 10136
09-17 10:13:14.050 16163-16163/com.ichi2.anki D/DeckPicker: onPause()
09-17 10:13:14.055 16163-16163/com.ichi2.anki D/CardBrowser: onCreate()
09-17 10:13:14.067 16163-16168/com.ichi2.anki I/zygote: Do partial code cache collection, code=219KB, data=147KB
09-17 10:13:14.068 16163-16168/com.ichi2.anki I/zygote: After code cache collection, code=219KB, data=147KB
    Increasing code cache capacity to 1024KB
09-17 10:13:14.083 16163-16163/com.ichi2.anki D/AnkiActivity: AnkiActivity.startLoadingCollection()
09-17 10:13:14.084 16163-16163/com.ichi2.anki D/CardBrowser: onCollectionLoaded()
09-17 10:13:14.094 16163-16182/com.ichi2.anki D/DeckTask: doInBackgroundSearchCards
09-17 10:13:14.094 16163-16163/com.ichi2.anki D/CardBrowser: onResume()
09-17 10:13:14.095 16163-16163/com.ichi2.anki D/DialogHandler: Reading persistent message
09-17 10:13:14.115 1428-1428/? D/gralloc_ranchu: gralloc_alloc: Creating ashmem region of size 8298496
09-17 10:13:14.121 1428-1428/? I/chatty: uid=1000(system) allocator@2.0-s identical 1 line
09-17 10:13:14.125 1428-1428/? D/gralloc_ranchu: gralloc_alloc: Creating ashmem region of size 8298496
09-17 10:13:14.155 16163-16168/com.ichi2.anki I/zygote: JIT allocated 56KB for compiled code of void android.view.View.<init>(android.content.Context, android.util.AttributeSet, int, int)
09-17 10:13:14.166 16163-16163/com.ichi2.anki I/CardBrowser: CardBrowser:: Completed doInBackgroundSearchCards Successfuly
09-17 10:13:14.166 16163-16163/com.ichi2.anki D/AndroidRuntime: Shutting down VM
    
    
    --------- beginning of crash
09-17 10:13:14.167 16163-16163/com.ichi2.anki E/AndroidRuntime: FATAL EXCEPTION: main
    Process: com.ichi2.anki, PID: 16163
    java.lang.NullPointerException: Attempt to invoke virtual method 'boolean android.support.v7.widget.SearchView.isIconified()' on a null object reference
        at com.ichi2.anki.CardBrowser$20.onPostExecute(CardBrowser.java:1364)
        at com.ichi2.async.DeckTask$TaskListener.onPostExecute(DeckTask.java:1521)
        at com.ichi2.async.DeckTask.onPostExecute(DeckTask.java:376)
        at com.ichi2.async.DeckTask.onPostExecute(DeckTask.java:69)
        at android.os.AsyncTask.finish(AsyncTask.java:695)
        at android.os.AsyncTask.-wrap1(Unknown Source:0)
        at android.os.AsyncTask$InternalHandler.handleMessage(AsyncTask.java:712)
        at android.os.Handler.dispatchMessage(Handler.java:105)
        at android.os.Looper.loop(Looper.java:164)
        at android.app.ActivityThread.main(ActivityThread.java:6541)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.Zygote$MethodAndArgsCaller.run(Zygote.java:240)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:767)