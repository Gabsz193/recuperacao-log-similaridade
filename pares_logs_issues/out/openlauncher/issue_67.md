# 67 - Crash when opening sound panel while Do Not Disturb is activated

- URL: https://github.com/OpenLauncherTeam/openlauncher/issues/67
- State: closed
- Author: TheLastProject
- Created: 2017-04-24T13:32:04Z

---

Build version: 0.3.1 
Build date: 1980-01-01 00:00:00 
Current date: 2017-04-24 15:29:49 
Device: Motorola XT1524 
 
Stack trace:  
java.lang.SecurityException: Not allowed to change Do Not Disturb state
	at android.os.Parcel.readException(Parcel.java:1684)
	at android.os.Parcel.readException(Parcel.java:1637)
	at android.media.IAudioService$Stub$Proxy.setStreamVolume(IAudioService.java:830)
	at android.media.AudioManager.setStreamVolume(AudioManager.java:1071)
	at com.benny.openlauncher.util.LauncherAction.RunAction(LauncherAction.java:131)
	at com.benny.openlauncher.activity.Home$11.onItemClick(Home.java:595)
	at android.widget.AdapterView.performItemClick(AdapterView.java:310)
	at android.widget.AbsListView.performItemClick(AbsListView.java:1164)
	at com.balysv.materialripple.MaterialRippleLayout$PerformClickEvent.clickAdapterView(MaterialRippleLayout.java:658)
	at com.balysv.materialripple.MaterialRippleLayout$PerformClickEvent.run(MaterialRippleLayout.java:642)
	at com.balysv.materialripple.MaterialRippleLayout$3.onAnimationEnd(MaterialRippleLayout.java:336)
	at android.animation.AnimatorSet.onChildAnimatorEnded(AnimatorSet.java:829)
	at android.animation.AnimatorSet.-wrap1(AnimatorSet.java)
	at android.animation.AnimatorSet$AnimatorSetListener.onAnimationEnd(AnimatorSet.java:784)
	at android.animation.ValueAnimator.endAnimation(ValueAnimator.java:1153)
	at android.animation.ValueAnimator.doAnimationFrame(ValueAnimator.java:1313)
	at android.animation.AnimationHandler.doAnimationFrame(AnimationHandler.java:146)
	at android.animation.AnimationHandler.-wrap2(AnimationHandler.java)
	at android.animation.AnimationHandler$1.doFrame(AnimationHandler.java:54)
	at android.view.Choreographer$CallbackRecord.run(Choreographer.java:872)
	at android.view.Choreographer.doCallbacks(Choreographer.java:686)
	at android.view.Choreographer.doFrame(Choreographer.java:618)
	at android.view.Choreographer$FrameDisplayEventReceiver.run(Choreographer.java:860)
	at android.os.Handler.handleCallback(Handler.java:751)
	at android.os.Handler.dispatchMessage(Handler.java:95)
	at android.os.Looper.loop(Looper.java:154)
	at android.app.ActivityThread.main(ActivityThread.java:6128)
	at java.lang.reflect.Method.invoke(Native Method)
	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:889)
	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:779)
