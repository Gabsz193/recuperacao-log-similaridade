# 2736 - Crash reported by shuvashish76

- URL: https://github.com/TeamAmaze/AmazeFileManager/issues/2736
- State: closed
- Author: amaze-issue-automation[bot]
- Created: 2021-08-21T02:44:17Z

---

## Issue explanation (write below this line)



## Exception
* App Name: Amaze File Manager
* Package: com.amaze.filemanager
* Version: 3.6.1
* User Action: UI Error
* Request: Application crash
* OS: Linux Android 8.1.0 - 27
* Device: TB-8704X
* Model: Lenovo TB-8704X
* Product: TB-8704X
<details><summary><b>Crash log </b></summary><p>

```
java.lang.NullPointerException: Attempt to invoke virtual method 'boolean androidx.fragment.app.Fragment.onOptionsItemSelected(android.view.MenuItem)' on a null object reference
 at com.amaze.filemanager.ui.activities.PreferencesActivity.onOptionsItemSelected(PreferencesActivity.java:138)
 at android.app.Activity.onMenuItemSelected(Activity.java:3464)
 at androidx.fragment.app.FragmentActivity.onMenuItemSelected(FragmentActivity.java:340)
 at androidx.appcompat.app.AppCompatActivity.onMenuItemSelected(AppCompatActivity.java:228)
 at androidx.appcompat.view.WindowCallbackWrapper.onMenuItemSelected(WindowCallbackWrapper.java:109)
 at androidx.appcompat.view.WindowCallbackWrapper.onMenuItemSelected(WindowCallbackWrapper.java:109)
 at androidx.appcompat.widget.ToolbarWidgetWrapper$1.onClick(ToolbarWidgetWrapper.java:188)
 at android.view.View.performClick(View.java:6294)
 at android.view.View$PerformClick.run(View.java:24774)
 at android.os.Handler.handleCallback(Handler.java:790)
 at android.os.Handler.dispatchMessage(Handler.java:99)
 at android.os.Looper.loop(Looper.java:164)
 at android.app.ActivityThread.main(ActivityThread.java:6518)
 at java.lang.reflect.Method.invoke(Native Method)
 at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)
 at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)

```
</details>
<hr>

Reporter: shuvashish76