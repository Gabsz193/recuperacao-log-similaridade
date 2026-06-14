# 9164 - [Bug] 2.16alpha2: App crashes if phone volume is changed while reviewing

- URL: https://github.com/ankidroid/Anki-Android/issues/9164
- State: closed
- Author: guimcaballero
- Created: 2021-06-29T19:17:52Z

---

###### Reproduction Steps

1. Enter any deck and start reviewing a card
2. Change the phone's volume using the physical buttons on the side

###### Expected Result

App shouldn't crash

###### Actual Result

App crashes (volume does change)

###### Other info

Doesn't seem to happen on any other screen, just on review. Happens both for cards with and without audio. 

###### Debug info

```
AnkiDroid Version = 2.16alpha2

Android Version = 10

Manufacturer = OnePlus

Model = ONEPLUS A6013

Hardware = qcom

Webview User Agent = Mozilla/5.0 (Linux; Android 10; ONEPLUS A6013 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.120 Mobile Safari/537.36

ACRA UUID = 72fe91db-f17e-4605-93af-7e4b52efffbd

Scheduler = std2

Crash Reports Enabled = true

DatabaseV2 Enabled = true
```

###### Research

- [x] I have read the [support page](https://ankidroid.org/docs/help.html) and am reporting a bug or enhancement request specific to AnkiDroid
- [x] I have checked the [manual](https://ankidroid.org/docs/manual.html) and the [FAQ](https://github.com/ankidroid/Anki-Android/wiki/FAQ) and could not find a solution to my issue
- [x] I have searched for similar existing issues here and on the user forum
- [x] (Optional) I have confirmed the issue is not resolved in the latest alpha release ([instructions](https://docs.ankidroid.org/manual.html#betaTesting))

