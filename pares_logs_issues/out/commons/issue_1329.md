# 1329 - Current issues with direct Nearby uploads

- URL: https://github.com/commons-app/apps-android-commons/issues/1329
- State: closed
- Author: misaochan
- Created: 2018-03-18T09:30:30Z

---

**Summary:** 

I thought we should probably keep a list of issues we are experiencing with the directNearbyUploadsNew feature branch, so we don't miss anything out before releasing to production. Please feel free to edit this post to add issues or detail for issues.

**Steps to reproduce:** 

Build from `2.7.x-release` and test the Nearby feature

- [x] 1. Memory leaks PR #1390 
- [x] 2. Crash when loading map (by the time I finished typing this out, I had lost the logcat. Sorry. :/ Will post when I encounter it again).
- [x] 3. <s>Text wrap issues in bottom sheet (see SS below). I would recommend removing "Directions" text</s>
- [x] 4. Fix "?" description bug in map (see SS below). This has already been fixed in list, we just need to copy the fix over to map. I should be able to do it after I'm done with my category PR.
- [x] 5. <s> Crash on orientation change</s> crashes when list view is open and orinetation changed. PR: #1385 
- [x] 6.  Bug: if you click one of nearby markers and make information bottom sheet visible, then go to settings and change theme, app will crash when you re-start nearby activity. Log is at below comment PR #1391
- [x] 7. <s> Action bar is hidden</s>
- [x] 8. Fix current location point visibility when bottom sheet is expanded, and re-center button is clicked. PR: #1381
- [x] 9. Fix transparent view is top of menu bar - PR is ready waiting for review #1378

![screenshot_20180318-194400](https://user-images.githubusercontent.com/3611199/37564649-ece24dc0-2ae5-11e8-817d-974f7d32a16d.png)
