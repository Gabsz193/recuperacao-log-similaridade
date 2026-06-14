# 112 - App shortcut: "Shuffle all" crashes

- URL: https://github.com/karimknaebel/Phonograph/issues/112
- State: closed
- Author: arkon
- Created: 2017-03-27T14:53:10Z

---

```
03-27 10:49:02.997 I/ActivityManager(2110): START u0 {act=android.intent.action.VIEW flg=0x10000000 cmp=com.kabouzeid.gramophone/.appshortcuts.AppShortcutLauncherActivity bnds=[368,1133][867,1248] (has extras)} from uid 10134 on display 0
03-27 10:49:03.037 I/ActivityManager(2110): Start proc 7838:com.kabouzeid.gramophone/u0a134 for activity com.kabouzeid.gramophone/.appshortcuts.AppShortcutLauncherActivity
03-27 10:49:03.080 W/System  (7838): ClassLoader referenced unknown path: /data/app/com.kabouzeid.gramophone-1/lib/arm
03-27 10:49:03.495 E/AndroidRuntime(7838): Process: com.kabouzeid.gramophone, PID: 7838
03-27 10:49:03.495 E/AndroidRuntime(7838): java.lang.RuntimeException: Unable to start activity ComponentInfo{com.kabouzeid.gramophone/com.kabouzeid.gramophone.appshortcuts.AppShortcutLauncherActivity}: java.lang.RuntimeException: android.os.TransactionTooLargeException: data parcel size 1614956 bytes
03-27 10:49:03.495 E/AndroidRuntime(7838): 	at com.kabouzeid.gramophone.appshortcuts.AppShortcutLauncherActivity.startServiceWithSongs(Unknown Source)
03-27 10:49:03.495 E/AndroidRuntime(7838): 	at com.kabouzeid.gramophone.appshortcuts.AppShortcutLauncherActivity.onCreate(Unknown Source)
03-27 10:49:03.499 W/ActivityManager(2110):   Force finishing activity com.kabouzeid.gramophone/.appshortcuts.AppShortcutLauncherActivity
03-27 10:49:04.010 W/ActivityManager(2110): Activity pause timeout for ActivityRecord{a09ce1f u0 com.kabouzeid.gramophone/.appshortcuts.AppShortcutLauncherActivity t433 f}
03-27 10:49:04.199 W/ActivityManager(2110):   Force finishing activity com.kabouzeid.gramophone/.appshortcuts.AppShortcutLauncherActivity
03-27 10:49:04.199 I/ActivityManager(2110): Killing 7838:com.kabouzeid.gramophone/u0a134 (adj 900): crash
```