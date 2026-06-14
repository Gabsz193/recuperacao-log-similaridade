# 73 - Globalhashes crash if the date isn't in the stock cache

- URL: https://github.com/CaptainSpam/geohashdroid/issues/73
- State: closed
- Author: CaptainSpam
- Created: 2020-02-28T06:24:59Z

---

There's reports of crashes when requesting Globalhashes.  Tracing it down, it looks like it happens if the stock price hasn't been fetched yet, and more to the point, a logging statement is trying to dereference a null Graticule object.  This should be a simple fix.