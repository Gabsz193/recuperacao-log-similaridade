# 8972 - [Bug] Crash 2.15 DeckSelectionDialog crash, not attached to Activity

- URL: https://github.com/ankidroid/Anki-Android/issues/8972
- State: closed
- Author: mikehardy
- Created: 2021-05-26T23:15:19Z

---

###### Reproduction Steps

1. Open deck picker
2. Open Note editor
3. select create new deck


###### Expected Result

Work

###### Actual Result

Somehow, this happened on 2.15.1 on an Android 11 device:

```


0 | --------- beginning of main
1 | 05-25 21:09:20.738 I/AnkiDroid(13776): initialize()
2 | 05-25 21:09:21.228 I/AnkiDroid(13776): Not participating in analytics sample (sample percentage vs random: 10 42)
3 | 05-25 21:09:21.228 I/AnkiDroid(13776): setOptIn(): from false to false
4 | 05-25 21:09:21.228 I/AnkiDroid(13776): Not participating in analytics sample (sample percentage vs random: 10 70)
5 | 05-25 21:09:21.233 I/AnkiDroid(13776): Creating notification channel with id/name: General Notifications/AnkiDroid
6 | 05-25 21:09:21.234 I/AnkiDroid(13776): Creating notification channel with id/name: Synchronization/Synchronization
7 | 05-25 21:09:21.245 I/AnkiDroid(13776): Creating notification channel with id/name: Global Reminders/Cards due
8 | 05-25 21:09:21.246 I/AnkiDroid(13776): Creating notification channel with id/name: Deck Reminders/Reminders
9 | 05-25 21:09:21.253 I/AnkiDroid(13776): AnkiDroidApp: Starting Services
10 | 05-25 21:09:21.254 W/AnkiDroid(13776): BootService/ Boot Service did not execute - no permissions
11 | 05-25 21:09:21.296 I/AnkiDroid(13776): Launching DeckPicker
12 | 05-25 21:09:21.337 I/AnkiDroid(13776): AnkiActivity::onCreate - DeckPicker
13 | 05-25 21:09:21.344 I/AnkiDroid(13776): Displaying initial permission request dialog
14 | 05-25 21:09:21.474 I/AnkiDroid(13776): AnkiActivity::onStart - DeckPicker
15 | 05-25 21:09:21.501 I/AnkiDroid(13776): AnkiActivity::onResume - DeckPicker
16 | 05-25 21:09:24.000 I/AnkiDroid(13776): AnkiActivity::onPause - DeckPicker
17 | 05-25 21:09:26.410 I/AnkiDroid(13776): Begin openCollection: /storage/emulated/0/AnkiDroid/collection.anki2
18 | 05-25 21:09:26.652 I/AnkiDroid(13776): Opening rust backend. Server: false. Langs: 'en', path:
19 | 05-25 21:09:26.689 I/AnkiDroid(13776): Opening Collection: '/storage/emulated/0/AnkiDroid/collection.anki2' '' '' ''
20 | 05-25 21:09:26.876 I/AnkiDroid(13776): Rust: executeGetRowsAffected UPDATE col SET conf=?,dconf=?,decks=?
21 | 05-25 21:09:26.892 I/AnkiDroid(13776): Opening Collection Log
22 | 05-25 21:09:27.094 I/AnkiDroid(13776): ExecuteCommand: localMinutesWest
23 | 05-25 21:09:27.096 I/AnkiDroid(13776): ExecuteCommand: localMinutesWest
24 | 05-25 21:09:27.097 I/AnkiDroid(13776): Rust: executeGetRowsAffected UPDATE col SET models=?
25 | 05-25 21:09:27.109 I/AnkiDroid(13776): flush - Saving information to DB...
26 | 05-25 21:09:27.110 I/AnkiDroid(13776): Rust: executeGetRowsAffected UPDATE col SET ls=?,crt=?,dty=?,mod=?,scm=?,usn=?,conf=?
27 | 05-25 21:09:27.116 I/AnkiDroid(13776): End openCollection: /storage/emulated/0/AnkiDroid/collection.anki2
28 | 05-25 21:09:27.117 I/AnkiDroid(13776): Fresh install
29 | 05-25  21:09:27.133 W/AnkiDroid(13776): BackupManager/ Collection is already  open during backup... we probably shouldn't be doing this
30 | 05-25  21:09:27.133 I/AnkiDroid(13776): Launching new thread to backup  /storage/emulated/0/AnkiDroid/collection.anki2 to  /storage/emulated/0/AnkiDroid/backup/collection-2021-05-25-21-09.colpkg
31 | 05-25 21:09:27.134 I/AnkiDroid(13776): AnkiActivity::onResume - DeckPicker
32 | 05-25 21:09:27.184 I/AnkiDroid(13776): Updating deck list UI
33 | 05-25 21:09:27.188 I/AnkiDroid(13776): Updating deck list UI
34 | 05-25 21:09:27.234 I/AnkiDroid(13776): Backup created succesfully
35 | 05-25 21:09:29.277 I/AnkiDroid(13776): DeckPicker:: Sync button pressed
36 | 05-25 21:09:29.277 W/AnkiDroid(13776): DeckPicker/ User not logged in
37 | 05-25 21:09:40.759 I/AnkiDroid(13776): Navigating to card browser
38 | 05-25 21:09:40.772 I/AnkiDroid(13776): AnkiActivity::onPause - DeckPicker
39 | 05-25 21:09:40.785 I/AnkiDroid(13776): AnkiActivity::onCreate - CardBrowser
40 | 05-25 21:09:40.821 I/AnkiDroid(13776): AnkiActivity::onStart - CardBrowser
41 | 05-25 21:09:40.823 I/AnkiDroid(13776): AnkiActivity::onResume - CardBrowser
42 | 05-25 21:09:40.873 I/AnkiDroid(13776): CardBrowser:: Completed doInBackgroundSearchCards Successfully
43 | 05-25 21:09:41.124 I/AnkiDroid(13776): AnkiActivity::onStop - DeckPicker
44 | 05-25 21:09:48.230 I/AnkiDroid(13776): Navigating to decks
45 | 05-25 21:09:48.255 I/AnkiDroid(13776): AnkiActivity::onPause - CardBrowser
46 | 05-25 21:09:48.263 I/AnkiDroid(13776): AnkiActivity::onDestroy - DeckPicker
47 | 05-25 21:09:48.272 I/AnkiDroid(13776): AnkiActivity::onCreate - DeckPicker
48 | 05-25 21:09:48.276 I/AnkiDroid(13776): No startup screens required
49 | 05-25 21:09:48.318 I/AnkiDroid(13776): AnkiActivity::onStart - DeckPicker
50 | 05-25 21:09:48.320 I/AnkiDroid(13776): AnkiActivity::onResume - DeckPicker
51 | 05-25 21:09:48.359 I/AnkiDroid(13776): Updating deck list UI
52 | 05-25 21:09:48.360 I/AnkiDroid(13776): Updating deck list UI
53 | 05-25 21:09:48.604 I/AnkiDroid(13776): AnkiActivity::onStop - CardBrowser
54 | 05-25 21:09:48.606 I/AnkiDroid(13776): AnkiActivity::onDestroy - CardBrowser
55 | 05-25 21:09:58.225 I/AnkiDroid(13776): AnkiActivity::onPause - DeckPicker
56 | 05-25 21:09:58.235 I/AnkiDroid(13776): AnkiActivity::onCreate - NoteEditor
57 | 05-25  21:09:58.287 I/AnkiDroid(13776): onCollectionLoaded() Edit note  activity successfully started in add card mode with node id  1621998598260
58 | 05-25 21:09:58.289 I/AnkiDroid(13776): AnkiActivity::onStart - NoteEditor
59 | 05-25 21:09:58.291 I/AnkiDroid(13776): AnkiActivity::onResume - NoteEditor
60 | 05-25 21:09:58.598 I/AnkiDroid(13776): AnkiActivity::onStop - DeckPicker
61 | 05-25 21:18:06.659 I/AnkiDroid(13776): AnkiActivity::onPause - NoteEditor
62 | 05-25 21:18:07.433 I/AnkiDroid(13776): AnkiActivity::onStop - NoteEditor
63 | 05-25 21:18:07.440 I/AnkiDroid(13776): Saving instance
64 | 05-25 21:18:08.217 I/AnkiDroid(13776): AnkiActivity::onStart - NoteEditor
65 | 05-25 21:18:08.223 I/AnkiDroid(13776): AnkiActivity::onResume - NoteEditor
66 | 05-25 21:18:08.992 I/AnkiDroid(13776): CreateDeckDialog::createNewDeck
67 | --------- beginning of crash


```

```
java.lang.IllegalStateException: Fragment DeckSelectionDialog{fb75809} (27d510a7-16e3-4819-99a9-3fbbb8d65fc7) not attached to an activity.
at androidx.fragment.app.Fragment.requireActivity(Fragment.java:2)
at com.ichi2.anki.dialogs.DeckSelectionDialog.requireAnkiActivity(DeckSelectionDialog.java:1)
at com.ichi2.anki.dialogs.DeckSelectionDialog.lambda$showDeckDialog$3(DeckSelectionDialog.java:1)
at com.ichi2.anki.dialogs.DeckSelectionDialog.c(Unknown Source:0)
at com.ichi2.anki.dialogs.r0.accept(Unknown Source:4)
at com.ichi2.anki.dialogs.CreateDeckDialog.createNewDeck(CreateDeckDialog.java:3)
at com.ichi2.anki.dialogs.CreateDeckDialog.createDeck(CreateDeckDialog.java:2)
at com.ichi2.anki.dialogs.CreateDeckDialog.onPositiveButtonClicked(CreateDeckDialog.java:6)
at com.ichi2.anki.dialogs.CreateDeckDialog.lambda$showDialog$0(CreateDeckDialog.java:1)
at com.ichi2.anki.dialogs.CreateDeckDialog.a(Unknown Source:0)
at com.ichi2.anki.dialogs.i.onClick(Unknown Source:2)
at com.afollestad.materialdialogs.MaterialDialog.onClick(MaterialDialog.java:7)
at android.view.View.performClick(View.java:7448)
at android.view.View.performClickInternal(View.java:7425)
at android.view.View.access$3600(View.java:810)
at android.view.View$PerformClick.run(View.java:28305)
at android.os.Handler.handleCallback(Handler.java:938)
at android.os.Handler.dispatchMessage(Handler.java:99)
at android.os.Looper.loop(Looper.java:223)
at android.app.ActivityThread.main(ActivityThread.java:7660)
at java.lang.reflect.Method.invoke(Native Method)
at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:592)
at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:947)
```

###### Debug info
Refer to the [support page](https://ankidroid.org/docs/help.html) if you are unsure where to get the "debug info".

###### Research
*Enter an [x] character to confirm the points below:*

- [ ] I have read the [support page](https://ankidroid.org/docs/help.html) and am reporting a bug or enhancement request specific to AnkiDroid
- [ ] I have checked the [manual](https://ankidroid.org/docs/manual.html) and the [FAQ](https://github.com/ankidroid/Anki-Android/wiki/FAQ) and could not find a solution to my issue
- [ ] I have searched for similar existing issues here and on the user forum
- [ ] (Optional) I have confirmed the issue is not resolved in the latest alpha release ([instructions](https://docs.ankidroid.org/manual.html#betaTesting))

