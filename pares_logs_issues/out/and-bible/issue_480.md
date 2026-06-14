# 480 - Crash when operating with bookmark labels

- URL: https://github.com/AndBible/and-bible/issues/480
- State: closed
- Author: tuomas2
- Created: 2019-12-26T08:51:19Z

---

1. Start with database with no bookmark labels. Go to bookmark labels screen.
2. Create 2 bookmark labels, first with label "asdf", second with empty label
3. Remove label with "asdf" title
4. Rename first bookmark label to something else
 -> Actual: goes to bookmark screen 
     Expected: should not leave bookmark labels 
5. Go back to bookmark labels
6. Rename label
7. Repeat steps 5,6 if needed
8. Crash

