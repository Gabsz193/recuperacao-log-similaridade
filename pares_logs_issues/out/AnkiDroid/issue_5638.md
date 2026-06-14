# 5638 - crash caused by backslash

- URL: https://github.com/ankidroid/Anki-Android/issues/5638
- State: closed
- Author: HairyPhil
- Created: 2019-11-24T18:39:09Z

---

###### Reproduction Steps

1. Enter the following 6 characters of text in any card field: `&bsol;`
2. Save the card. Anki crashes.
3. Reopen Anki.
4. Open the card browser. Anki crashes again, as soon as it attempts to display the card text.

###### Expected Result

Anki should display the literal text in the card browser, and a backslash symbol when reviewing the card.

###### Actual Result

Anki crashes every time it reads the card info. This makes it impossible to edit the card to fix the problem. To remove the corrupt card, the current database has to be overwritten with a backup.

I didn't try other backslash codes (https://www.toptal.com/designers/htmlarrows/punctuation/backslash/), but they may produce the same effect.

###### Debug info

AnkiDroid version 2.9.1 on Android 10 on Pixel 3.

###### Research

[ x ] I have read the [support page](https://ankidroid.org/docs/help.html) and am reporting a bug or enhancement request specific to AnkiDroid

[ x ] I have checked the [manual](https://ankidroid.org/docs/manual.html) and the [FAQ](https://github.com/ankidroid/Anki-Android/wiki/FAQ) and could not find a solution to my issue

[ x ] I have searched for similar existing issues here and on the user forum
