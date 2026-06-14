# 2123 - App crashing on clicking any search result in Explore

- URL: https://github.com/commons-app/apps-android-commons/issues/2123
- State: closed
- Author: ShridharGoel
- Created: 2018-12-15T07:01:49Z

---

**Summary:** 

App crashes on clicking any search result in Explore.

**Steps to reproduce:** 

1. Search something in Explore. 
2. Click on any search result.
3. The app will crash.
 
**System logs:**

```
java.lang.NullPointerException: Attempt to invoke virtual method 'android.support.v4.app.FragmentActivity android.support.v4.app.Fragment.getActivity()' on a null object reference at fr.free.nrw.commons.media.MediaDetailPagerFragment$MediaDetailAdapter.getItem(MediaDetailPagerFragment.java:401) at android.support.v4.app.FragmentStatePagerAdapter.instantiateItem(FragmentStatePagerAdapter.java:109)
        at android.support.v4.view.ViewPager.addNewItem(ViewPager.java:1004)
        at android.support.v4.view.ViewPager.populate(ViewPager.java:1152)
        at android.support.v4.view.ViewPager.populate(ViewPager.java:1086)
        at android.support.v4.view.ViewPager.onMeasure(ViewPager.java:1616)
        at android.view.View.measure(View.java:19883)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6085)
        at android.widget.LinearLayout.measureChildBeforeLayout(LinearLayout.java:1464)
        at android.widget.LinearLayout.measureVertical(LinearLayout.java:758)
        at android.widget.LinearLayout.onMeasure(LinearLayout.java:640)
        at android.view.View.measure(View.java:19883)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6085)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at android.view.View.measure(View.java:19883)
        at android.widget.RelativeLayout.measureChildHorizontal(RelativeLayout.java:715)
        at android.widget.RelativeLayout.onMeasure(RelativeLayout.java:461)
        at android.view.View.measure(View.java:19883)
        at android.support.v4.widget.DrawerLayout.onMeasure(DrawerLayout.java:1059)
        at android.view.View.measure(View.java:19883)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6085)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at android.support.v7.widget.ContentFrameLayout.onMeasure(ContentFrameLayout.java:141)
        at android.view.View.measure(View.java:19883)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6085)
        at android.widget.LinearLayout.measureChildBeforeLayout(LinearLayout.java:1464)
        at android.widget.LinearLayout.measureVertical(LinearLayout.java:758)
        at android.widget.LinearLayout.onMeasure(LinearLayout.java:640)
        at android.view.View.measure(View.java:19883)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6085)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at android.view.View.measure(View.java:19883)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6085)
        at android.widget.LinearLayout.measureChildBeforeLayout(LinearLayout.java:1464)
        at android.widget.LinearLayout.measureVertical(LinearLayout.java:758)
        at android.widget.LinearLayout.onMeasure(LinearLayout.java:640)
        at android.view.View.measure(View.java:19883)
        at android.view.ViewGroup.measureChildWithMargins(ViewGroup.java:6085)
        at android.widget.FrameLayout.onMeasure(FrameLayout.java:185)
        at com.android.internal.policy.DecorView.onMeasure(DecorView.java:693)
        at android.view.View.measure(View.java:19883)
        at android.view.ViewRootImpl.performMeasure(ViewRootImpl.java:2317)
        at android.view.ViewRootImpl.measureHierarchy(ViewRootImpl.java:1408)
        at android.view.ViewRootImpl.performTraversals(ViewRootImpl.java:1661)
        at android.view.ViewRootImpl.doTraversal(ViewRootImpl.java:1296)
        at android.view.ViewRootImpl$TraversalRunnable.run(ViewRootImpl.java:6401)
        at android.view.Choreographer$CallbackRecord.run(Choreographer.java:876)
        at android.view.Choreographer.doCallbacks(Choreographer.java:688)
        at android.view.Choreographer.doFrame(Choreographer.java:623)
        at android.view.Choreographer$FrameDisplayEventReceiver.run(Choreographer.java:862)
        at android.os.Handler.handleCallback(Handler.java:754)
        at android.os.Handler.dispatchMessage(Handler.java:95)
        at android.os.Looper.loop(Looper.java:163)
        at android.app.ActivityThread.main(ActivityThread.java:6205)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:904)
```

**Commons app version:** 
`
2.9.0
Branch: master
Build: betaDebug

**GIF:** 
        
![ezgif com-video-to-gif 2](https://user-images.githubusercontent.com/35566748/50040204-2d1bbc00-0065-11e9-88c1-561496a1a7be.gif)

**Would you like to work on the issue?**

Yes
