# 8460 - [Bug] Card Browser - Select Many Crash

- URL: https://github.com/ankidroid/Anki-Android/issues/8460
- State: closed
- Author: david-allison
- Created: 2021-04-03T23:17:12Z

---

I have discovered a bug related to this feature and wanted to let you know (I can try to collaborate on this):
- Enter Card Browser, choose a deck with enough cards to scroll.
- Long-Press the top card.
- scroll down and long-press the bottom card (Any two cards that need scrolling to go from one another.)

**Expected** : Select all cards between.
**Actual**: AnkiDroid Crashes.


https://user-images.githubusercontent.com/53411854/113493598-4de3d600-94e9-11eb-986e-846fe3e6a384.mp4

This is the line where it hangs
``` CheckBox cb = childView.findViewById(R.id.card_checkbox); ```

_Originally posted by @madelesi in https://github.com/ankidroid/Anki-Android/issues/8278#issuecomment-812937391_