# 745 - Crash in current develop - show galery error

- URL: https://github.com/federicoiosue/Omni-Notes/issues/745
- State: closed
- Author: tappdesign
- Created: 2020-02-12T21:21:14Z

---

Hi Federico, 

It looks like there is crash in **bumptech - glide library** while browsing photo attachments
could be caused by upgrading the dependecy to the newer version.... (?)

**step to reproduce:**
create new note. 
Add two photo attachments. 
save note
Open saved note
tap on photo --> crash

```

    --------- beginning of crash
2020-02-12 22:11:35.906 21258-21258/? E/AndroidRuntime: FATAL EXCEPTION: main
    Process: it.feio.android.omninotes.alpha, PID: 21258
    java.lang.NoSuchMethodError: No virtual method fitCenter()Lcom/bumptech/glide/request/RequestOptions; in class Lcom/bumptech/glide/request/RequestOptions; or its super classes (declaration of 'com.bumptech.glide.request.RequestOptions' appears in /data/app/it.feio.android.omninotes.alpha-tqG1bTp60FOs9yvF5-J83A==/base.apk)
        at it.feio.android.simplegallery.GalleryPagerFragment.onCreateView(GalleryPagerFragment.java:86)
        at androidx.fragment.app.Fragment.performCreateView(Fragment.java:2600)
        at androidx.fragment.app.FragmentManagerImpl.moveToState(FragmentManagerImpl.java:881)
        at androidx.fragment.app.FragmentManagerImpl.moveFragmentToExpectedState(FragmentManagerImpl.java:1238)
        at androidx.fragment.app.FragmentManagerImpl.moveToState(FragmentManagerImpl.java:1303)
        at androidx.fragment.app.BackStackRecord.executeOps(BackStackRecord.java:439)
        at androidx.fragment.app.FragmentManagerImpl.executeOps(FragmentManagerImpl.java:2079)
        at androidx.fragment.app.FragmentManagerImpl.executeOpsTogether(FragmentManagerImpl.java:1869)
        at androidx.fragment.app.FragmentManagerImpl.removeRedundantOperationsAndExecute(FragmentManagerImpl.java:1824)
        at androidx.fragment.app.FragmentManagerImpl.execSingleAction(FragmentManagerImpl.java:1696)
        at androidx.fragment.app.BackStackRecord.commitNowAllowingStateLoss(BackStackRecord.java:299)
        at androidx.fragment.app.FragmentStatePagerAdapter.finishUpdate(FragmentStatePagerAdapter.java:259)
        at androidx.viewpager.widget.ViewPager.populate(ViewPager.java:1244)
        at androidx.viewpager.widget.ViewPager.populate(ViewPager.java:1092)
        at androidx.viewpager.widget.ViewPager.onMeasure(ViewPager.java:1622)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at androidx.appcompat.widget.ContentFrameLayout.onMeasure(ContentFrameLayout.java:143)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at androidx.appcompat.widget.ActionBarOverlayLayout.onMeasure(ActionBarOverlayLayout.java:403)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.LinearLayout.measureChildBeforeLayout(LinearLayout.java:1539)
        at android.widget.LinearLayout.measureVertical(LinearLayout.java:823)
        at android.widget.LinearLayout.onMeasure(LinearLayout.java:702)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at com.android.internal.policy.DecorView.onMeasure(DecorView.java:831)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewRootImpl.performMeasure(ViewRootImpl.java:2589)
        at android.view.ViewRootImpl.measureHierarchy(ViewRootImpl.java:1631)
        at android.view.ViewRootImpl.performTraversals(ViewRootImpl.java:1885)
        at android.view.ViewRootImpl.doTraversal(ViewRootImpl.java:1515)
        at android.view.ViewRootImpl$TraversalRunnable.run(ViewRootImpl.java:7266)
        at android.view.Choreographer$CallbackRecord.run(Choreographer.java:981)
        at android.view.Choreographer.doCallbacks(Choreographer.java:790)
        at android.view.Choreographer.doFrame(Choreographer.java:721)
        at android.view.Choreographer$FrameDisplayEventReceiver.run(Choreographer.java:967)
        at android.os.Handler.handleCallback(Handler.java:808)
        at android.os.Handler.dispatchMessage(Handler.java:101)
        at android.os.Looper.loop(Looper.java:166)
2020-02-12 22:11:35.906 21258-21258/? E/AndroidRuntime:     at android.app.ActivityThread.main(ActivityThread.java:7529)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.Zygote$MethodAndArgsCaller.run(Zygote.java:245)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:921)
2020-02-12 22:11:35.906 651-1125/? E/SDM: DisplayBase::BuildLayerStackStats: LayerStack layer_count: 4, app_layer_count: 3, gpu_target_index: 3, display type: 0
2020-02-12 22:11:35.909 21258-21258/? E/ACRA: ACRA caught a NoSuchMethodError for it.feio.android.omninotes.alpha
    java.lang.NoSuchMethodError: No virtual method fitCenter()Lcom/bumptech/glide/request/RequestOptions; in class Lcom/bumptech/glide/request/RequestOptions; or its super classes (declaration of 'com.bumptech.glide.request.RequestOptions' appears in /data/app/it.feio.android.omninotes.alpha-tqG1bTp60FOs9yvF5-J83A==/base.apk)
        at it.feio.android.simplegallery.GalleryPagerFragment.onCreateView(GalleryPagerFragment.java:86)
        at androidx.fragment.app.Fragment.performCreateView(Fragment.java:2600)
        at androidx.fragment.app.FragmentManagerImpl.moveToState(FragmentManagerImpl.java:881)
        at androidx.fragment.app.FragmentManagerImpl.moveFragmentToExpectedState(FragmentManagerImpl.java:1238)
        at androidx.fragment.app.FragmentManagerImpl.moveToState(FragmentManagerImpl.java:1303)
        at androidx.fragment.app.BackStackRecord.executeOps(BackStackRecord.java:439)
        at androidx.fragment.app.FragmentManagerImpl.executeOps(FragmentManagerImpl.java:2079)
        at androidx.fragment.app.FragmentManagerImpl.executeOpsTogether(FragmentManagerImpl.java:1869)
        at androidx.fragment.app.FragmentManagerImpl.removeRedundantOperationsAndExecute(FragmentManagerImpl.java:1824)
        at androidx.fragment.app.FragmentManagerImpl.execSingleAction(FragmentManagerImpl.java:1696)
        at androidx.fragment.app.BackStackRecord.commitNowAllowingStateLoss(BackStackRecord.java:299)
        at androidx.fragment.app.FragmentStatePagerAdapter.finishUpdate(FragmentStatePagerAdapter.java:259)
        at androidx.viewpager.widget.ViewPager.populate(ViewPager.java:1244)
        at androidx.viewpager.widget.ViewPager.populate(ViewPager.java:1092)
        at androidx.viewpager.widget.ViewPager.onMeasure(ViewPager.java:1622)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at androidx.appcompat.widget.ContentFrameLayout.onMeasure(ContentFrameLayout.java:143)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at androidx.appcompat.widget.ActionBarOverlayLayout.onMeasure(ActionBarOverlayLayout.java:403)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.LinearLayout.measureChildBeforeLayout(LinearLayout.java:1539)
        at android.widget.LinearLayout.measureVertical(LinearLayout.java:823)
        at android.widget.LinearLayout.onMeasure(LinearLayout.java:702)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6671)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at com.android.internal.policy.DecorView.onMeasure(DecorView.java:831)
        at android.view.View.measure(View.java:22216)
        at android.view.ViewRootImpl.performMeasure(ViewRootImpl.java:2589)
        at android.view.ViewRootImpl.measureHierarchy(ViewRootImpl.java:1631)
        at android.view.ViewRootImpl.performTraversals(ViewRootImpl.java:1885)
        at android.view.ViewRootImpl.doTraversal(ViewRootImpl.java:1515)
        at android.view.ViewRootImpl$TraversalRunnable.run(ViewRootImpl.java:7266)
        at android.view.Choreographer$CallbackRecord.run(Choreographer.java:981)
        at android.view.Choreographer.doCallbacks(Choreographer.java:790)
        at android.view.Choreographer.doFrame(Choreographer.java:721)
        at android.view.Choreographer$FrameDisplayEventReceiver.run(Choreographer.java:967)
        at android.os.Handler.handleCallback(Handler.java:808)
        at android.os.Handler.dispatchMessage(Handler.java:101)
        at android.os.Looper.loop(Looper.java:166)
2020-02-12 22:11:35.909 21258-21258/? E/ACRA:     at android.app.ActivityThread.main(ActivityThread.java:7529)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.Zygote$MethodAndArgsCaller.run(Zygote.java:245)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:921)
2020-02-12 22:11:35.923 651-1125/? E/SDM: DisplayBase::BuildLayerStackStats: LayerStack layer_count: 4, app_layer_count: 3, gpu_target_index: 3, display type: 0
2020-02-12 22:11:35.928 1516-1516/? I/MQoS: onSignal: mSubId=0,currDataSubID=0
2020-02-12 22:11:35.928 1516-1516/? I/MQoS: received cell-signal:5
```