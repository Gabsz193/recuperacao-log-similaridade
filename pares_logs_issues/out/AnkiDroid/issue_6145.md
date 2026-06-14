# 6145 - Crash when exporting collection with time data while using SchedV2

- URL: https://github.com/ankidroid/Anki-Android/issues/6145
- State: closed
- Author: Arthus
- Created: 2020-05-10T14:42:16Z

---

###### Reproduction Steps

1. Open AnkiDroid with two decks and several sub deck. Enable Scheduler V2
2. Try to export a single deck with time data
3. Try to export whole collection without time data
4. Try to export whole collection while including time data


###### Expected Result
Trying to export a single deck shows a warning, that exporting single decks with time data is only supported with SchedV1.
When exporting the complete collection with time data, no such warning is shown, so I expect it to be able to export the collection


###### Actual Result
 Using SchedV2 the collection can be exported without the time data.

When the time data is selected for export, AnkiDroid crashes without further notice when trying to export the collection.

###### Debug info
AnkiDroid Version = 2.10beta3

Android Version = 10

ACRA UUID = 521087f7-500c-4737-9177-e052dde31e0e

###### Research
[ x ] I have read the [support page](https://ankidroid.org/docs/help.html) and am reporting a bug or enhancement request specific to AnkiDroid

[ x ] I have checked the [manual](https://ankidroid.org/docs/manual.html) and the [FAQ](https://github.com/ankidroid/Anki-Android/wiki/FAQ) and could not find a solution to my issue

[ x ] I have searched for similar existing issues here and on the user forum

