# 825 - Move command can lead to crash if invoked while category list is filtered

- URL: https://github.com/mtotschnig/MyExpenses/issues/825
- State: closed
- Author: mtotschnig
- Created: 2021-05-17T21:19:56Z

---

Given:
* Category A with one sub category b
* On Category screen (either opened from transaction form or from Settings), click on search icon an enter A as search term
* Category A now appears without children
* Tap and hold on category A

Expected:
* Move command is not available in contextual action bar because main category with children cannot be moved.

Actual:
* Move command is available and when invoked crashes the app.