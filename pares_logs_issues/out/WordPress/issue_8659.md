# 8659 - IllegalStateException in RecyclerView: Two different ViewHolders have the same stable ID

- URL: https://github.com/wordpress-mobile/WordPress-Android/issues/8659
- State: closed
- Author: loremattei
- Created: 2018-11-26T11:27:26Z

---

```
Fatal Exception: java.lang.IllegalStateException: Two different ViewHolders have the same stable ID. Stable IDs in your adapter MUST BE unique and SHOULD NOT change.
 ViewHolder 1:ViewHolder{425cbd80 position=20 id=72545603, oldPos=-1, pLpos:-1 not recyclable(1)} 
 View Holder 2:ViewHolder{426f6090 position=19 id=72545603, oldPos=-1, pLpos:-1} android.support.v7.widget.RecyclerView{43187c58 VFED.V.. ......ID 0,0-480,606 #7f090420 app:id/recycler_view}, adapter:org.wordpress.android.ui.reader.adapters.ReaderSiteSearchAdapter@43090348, layout:android.support.v7.widget.LinearLayoutManager@43149848, context:org.wordpress.android.ui.main.WPMainActivity@41d736f0
       at android.support.v7.widget.RecyclerView.handleMissingPreInfoForChangeError(RecyclerView.java:3946)
       at android.support.v7.widget.RecyclerView.dispatchLayoutStep3(RecyclerView.java:3870)
       at android.support.v7.widget.RecyclerView.dispatchLayout(RecyclerView.java:3540)
       at android.support.v7.widget.RecyclerView.onLayout(RecyclerView.java:4082)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.support.v4.widget.SwipeRefreshLayout.onLayout(SwipeRefreshLayout.java:606)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.RelativeLayout.onLayout(RelativeLayout.java:1083)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.support.design.widget.HeaderScrollingViewBehavior.layoutChild(HeaderScrollingViewBehavior.java:132)
       at android.support.design.widget.ViewOffsetBehavior.onLayoutChild(ViewOffsetBehavior.java:42)
       at android.support.design.widget.AppBarLayout$ScrollingViewBehavior.onLayoutChild(AppBarLayout.java:1361)
       at android.support.design.widget.CoordinatorLayout.onLayout(CoordinatorLayout.java:894)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.RelativeLayout.onLayout(RelativeLayout.java:1083)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.RelativeLayout.onLayout(RelativeLayout.java:1083)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.FrameLayout.layoutChildren(FrameLayout.java:323)
       at android.widget.FrameLayout.onLayout(FrameLayout.java:261)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.RelativeLayout.onLayout(RelativeLayout.java:1083)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.FrameLayout.layoutChildren(FrameLayout.java:323)
       at android.widget.FrameLayout.onLayout(FrameLayout.java:261)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.FrameLayout.layoutChildren(FrameLayout.java:323)
       at android.widget.FrameLayout.onLayout(FrameLayout.java:261)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.FrameLayout.layoutChildren(FrameLayout.java:323)
       at android.widget.FrameLayout.onLayout(FrameLayout.java:261)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.LinearLayout.setChildFrame(LinearLayout.java:1791)
       at android.widget.LinearLayout.layoutVertical(LinearLayout.java:1635)
       at android.widget.LinearLayout.onLayout(LinearLayout.java:1544)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.widget.FrameLayout.layoutChildren(FrameLayout.java:323)
       at android.widget.FrameLayout.onLayout(FrameLayout.java:261)
       at com.android.internal.policy.DecorView.onLayout(DecorView.java:764)
       at android.view.View.layout(View.java:19685)
       at android.view.ViewGroup.layout(ViewGroup.java:6077)
       at android.view.ViewRootImpl.performLayout(ViewRootImpl.java:2538)
       at android.view.ViewRootImpl.performTraversals(ViewRootImpl.java:2254)
       at android.view.ViewRootImpl.doTraversal(ViewRootImpl.java:1434)
       at android.view.ViewRootImpl$TraversalRunnable.run(ViewRootImpl.java:6868)
       at android.view.Choreographer$CallbackRecord.run(Choreographer.java:1026)
       at android.view.Choreographer.doCallbacks(Choreographer.java:838)
       at android.view.Choreographer.doFrame(Choreographer.java:769)
       at android.view.Choreographer$FrameDisplayEventReceiver.run(Choreographer.java:1012)
       at android.os.Handler.handleCallback(Handler.java:790)
       at android.os.Handler.dispatchMessage(Handler.java:99)
       at android.os.Looper.loop(Looper.java:171)
       at android.app.ActivityThread.main(ActivityThread.java:6635)
       at java.lang.reflect.Method.invoke(Method.java)
       at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:547)
       at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:823)
```

5ae0fd9b638393737a3c3ea5-fabric