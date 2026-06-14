# 637 - Validator preferences causes crashing of app

- URL: https://github.com/MarcusWolschon/osmeditor4android/issues/637
- State: closed
- Author: kudlav
- Created: 2017-12-12T19:13:17Z

---

## Vespucci Version
Vespucci 0.9.10b1324

## Device (Manufacturer and Model)
Samsung Galaxy A3 (SM-A300FU)

## Android Version 
Android 6.0.1

## Behaviour/Symptoms/Expected Behaviour/How to recreate
1. Remove all entries from Validator preferences except one re-survey entry
2. Set key "shop" and value to "*", max. age to "0" 
3. Press DONE and go back to the main screen.
3. The app immediately crashes when there are already downloaded data. If not, try to download view and the app crashes.

Next time, just visit Validator preferences and leave it without saving, just go back to the map and it crashes as well. Even removing of the entry doesn't solve the problem, you have to reset the app after that.

## Crash dump submitted (no or yes + date)
12.12.2017 (19:30 UTC+1) 2 reports containig email adress xxxxxxx
## Any other potentially relevant information
Language: cs_CZ