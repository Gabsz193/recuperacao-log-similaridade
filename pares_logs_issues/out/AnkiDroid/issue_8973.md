# 8973 - [Bug] 2.15 Crash TagsDialog not attached to a Context

- URL: https://github.com/ankidroid/Anki-Android/issues/8973
- State: closed
- Author: mikehardy
- Created: 2021-05-26T23:16:49Z

---

###### Reproduction Steps

* Add Note
* Tap Tags
* Tap Add
* Type in text box
* Leave AnkiDroid
* Restore AnkiDroid
* TextBox is still there, Tags Dialog has been removed
* Press "OK"
* Crash


###### Expected Result



###### Actual Result

On Android 11 AnkiDroid 2.15.1:

```
java.lang.IllegalStateException: Fragment TagsDialog{c83353f} (4c0ff020-c55f-4c86-8ad9-9748aa4e36f8) not attached to a context.
at androidx.fragment.app.Fragment.requireContext(Fragment.java:2)
at androidx.fragment.app.Fragment.getResources(Fragment.java:1)
at androidx.fragment.app.Fragment.getString(Fragment.java:2)
at com.ichi2.anki.dialogs.tags.TagsDialog.addTag(TagsDialog.java:7)
at com.ichi2.anki.dialogs.tags.TagsDialog.lambda$null$3(TagsDialog.java:1)
at com.ichi2.anki.dialogs.tags.TagsDialog.c(Unknown Source:0)
at com.ichi2.anki.dialogs.tags.d.onInput(Unknown Source:2)
at com.afollestad.materialdialogs.MaterialDialog.onClick(MaterialDialog.java:13)
at android.view.View.performClick(View.java:8160)
at android.widget.TextView.performClick(TextView.java:16220)
at android.view.View.performClickInternal(View.java:8137)
at android.view.View.access$3700(View.java:888)
at android.view.View$PerformClick.run(View.java:30236)
at android.os.Handler.handleCallback(Handler.java:938)
at android.os.Handler.dispatchMessage(Handler.java:99)
at android.os.Looper.loop(Looper.java:246)
at android.app.ActivityThread.main(ActivityThread.java:8512)
at java.lang.reflect.Method.invoke(Native Method)
at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeI
```

```
no logcat :-(
```

###### Debug info
Refer to the [support page](https://ankidroid.org/docs/help.html) if you are unsure where to get the "debug info".

###### Research
*Enter an [x] character to confirm the points below:*

- [ ] I have read the [support page](https://ankidroid.org/docs/help.html) and am reporting a bug or enhancement request specific to AnkiDroid
- [ ] I have checked the [manual](https://ankidroid.org/docs/manual.html) and the [FAQ](https://github.com/ankidroid/Anki-Android/wiki/FAQ) and could not find a solution to my issue
- [ ] I have searched for similar existing issues here and on the user forum
- [ ] (Optional) I have confirmed the issue is not resolved in the latest alpha release ([instructions](https://docs.ankidroid.org/manual.html#betaTesting))

