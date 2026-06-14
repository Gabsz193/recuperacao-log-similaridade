# 5756 - Crash on preview of card added to dynamic deck

- URL: https://github.com/ankidroid/Anki-Android/issues/5756
- State: closed
- Author: mikehardy
- Created: 2020-02-16T20:15:39Z

---


Saw our first google auto-test-lab-on-new-release crash report in a long time

https://play.google.com/apps/publish/?account=5338425030304417978&pli=1#PreLaunchReportPlace:p=com.ichi2.anki&plrtab=CRASH&plrvc=21000136


###### Reproduction Steps

1. create a dynamic deck based on previewing ahead 1 day
2. click the FAB button to add a note (should go to current / dynamic deck)
3. in note editor click the the cards button at bottom to open template editor
4. in template editor click the eyeball at the top to open the preview


###### Expected Result

You should see a preview


###### Actual Result

```
2020-02-16 15:01:38.837 16674-16674/com.ichi2.anki E/AbstractFlashcardViewer: Unable to restoreCollectionPreferences
    org.json.JSONException: No value for rev
        at org.json.JSONObject.get(JSONObject.java:392)
        at org.json.JSONObject.getJSONObject(JSONObject.java:612)
        at com.ichi2.anki.AbstractFlashcardViewer.restoreCollectionPreferences(AbstractFlashcardViewer.java:1782)
        at com.ichi2.anki.AbstractFlashcardViewer.onCollectionLoaded(AbstractFlashcardViewer.java:844)
        at com.ichi2.anki.Previewer.onCollectionLoaded(Previewer.java:65)
        at com.ichi2.anki.AnkiActivity.startLoadingCollection(AnkiActivity.java:261)
        at com.ichi2.anki.Previewer.onCreate(Previewer.java:60)
```


So here's the questions:

1. is it legal to add a card to a dynamic deck? seems like no? If no, should the FAB / add card actions toast that you can't add to a dynamic deck?



###### Debug info
Refer to the [support page](https://ankidroid.org/docs/help.html) if you are unsure where to get the "debug info".

###### Research
*Enter an [ x ] character to confirm the points below:*

[  ] I have read the [support page](https://ankidroid.org/docs/help.html) and am reporting a bug or enhancement request specific to AnkiDroid

[  ] I have checked the [manual](https://ankidroid.org/docs/manual.html) and the [FAQ](https://github.com/ankidroid/Anki-Android/wiki/FAQ) and could not find a solution to my issue

[  ] I have searched for similar existing issues here and on the user forum

