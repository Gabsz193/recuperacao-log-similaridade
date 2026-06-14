# 2198 - Production app crashing due to SearchTypeFragment

- URL: https://github.com/fossasia/open-event-attendee-android/issues/2198
- State: closed
- Author: iamareebjamal
- Created: 2019-07-27T18:19:21Z

---

```
FATAL EXCEPTION: ControllerMessenger
Process: com.eventyay.attendee, PID: 12924
androidx.fragment.app.i$b: Unable to instantiate fragment org.fossasia.openevent.general.search.type.SearchTypeFragment: calling Fragment constructor caused an exception
	at androidx.fragment.app.Fragment.instantiate(Fragment.java:532)
	at androidx.fragment.app.FragmentContainer.instantiate(FragmentContainer.java:57)
	at androidx.fragment.app.FragmentManagerImpl$6.instantiate(FragmentManagerImpl.java:2850)
	at androidx.navigation.fragment.FragmentNavigator.instantiateFragment(FragmentNavigator.java:132)
	at androidx.navigation.fragment.FragmentNavigator.navigate(FragmentNavigator.java:162)
	at androidx.navigation.fragment.FragmentNavigator.navigate(FragmentNavigator.java:58)
	at androidx.navigation.NavController.navigate(NavController.java:859)
	at androidx.navigation.NavController.navigate(NavController.java:793)
	at androidx.navigation.NavController.navigate(NavController.java:730)
	at androidx.navigation.NavController.navigate(NavController.java:716)
	at androidx.navigation.NavController.navigate(NavController.java:907)
	at org.fossasia.openevent.general.search.SearchFragment$onCreateView$3.onClick(SearchFragment.java:94)
	at android.view.View.performClick(View.java:5637)
	at android.view.View$PerformClick.run(View.java:22429)
	at android.os.Handler.handleCallback(Handler.java:751)
	at android.os.Handler.dispatchMessage(Handler.java:95)
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
	at android.os.Handler.handleCallback(Handler.java:751)
	at android.os.Handler.dispatchMessage(Handler.java:95)
	at android.os.Looper.loop(Looper.java:154)
	at android.app.ActivityThread.main(ActivityThread.java:6121)
	at java.lang.reflect.Method.invoke(Method.java)
	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:889)
	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:779)
Caused by: java.lang.reflect.InvocationTargetException
	at java.lang.reflect.Constructor.newInstance0(Constructor.java)
	at java.lang.reflect.Constructor.newInstance(Constructor.java:430)
	at androidx.fragment.app.Fragment.instantiate(Fragment.java:514)
	... 37 more
Caused by: java.lang.IllegalStateException: Fragment SearchTypeFragment{5a9863 (1c24b273-9112-4adb-a634-4a00e1e0c17f)} not attached to a context.
	at androidx.fragment.app.Fragment.requireContext(Fragment.java:765)
	at androidx.fragment.app.Fragment.getResources(Fragment.java:829)
	at androidx.fragment.app.Fragment.getString(Fragment.java:851)
	at org.fossasia.openevent.general.search.type.SearchTypeFragment.<init>(SearchTypeFragment.java:31)
	... 40 more
```