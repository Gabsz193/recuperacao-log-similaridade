# 2647 - Crash when extract .tar.gz file

- URL: https://github.com/TeamAmaze/AmazeFileManager/issues/2647
- State: closed
- Author: Bambooin
- Created: 2021-06-19T08:54:14Z

---

**Describe the bug**
Crash when extract tar.gz file

An exmaple fie:
[gz.tar.gz](https://github.com/TeamAmaze/AmazeFileManager/files/6680325/gz.tar.gz)

**To Reproduce**
Steps to reproduce the behavior:
1. Click .tar.gz file
2. Click extract button
3. Amaze crash

**Expected behavior**
File is extracted.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Smartphone (please complete the following information):**
 - Device: [Redmi]
 - OS: [Lineage OS 16.0]
 - Rooted: [No]
 - Version: [last commit build]

**Additional context**
Add any other context about the problem here.
```
java.lang.RuntimeException: An error occurred while executing doInBackground()
	at android.os.AsyncTask$3.done(AsyncTask.java:354)
	at java.util.concurrent.FutureTask.finishCompletion(FutureTask.java:383)
	at java.util.concurrent.FutureTask.setException(FutureTask.java:252)
	at java.util.concurrent.FutureTask.run(FutureTask.java:271)
	at android.os.AsyncTask$SerialExecutor$1.run(AsyncTask.java:245)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1167)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:641)
	at java.lang.Thread.run(Thread.java:764)
Caused by: java.lang.NoSuchMethodException: <init> [class java.io.InputStream]
	at java.lang.Class.getConstructor0(Class.java:2327)
	at java.lang.Class.getDeclaredConstructor(Class.java:2166)
	at com.amaze.filemanager.filesystem.compressed.extractcontents.helpers.AbstractCompressedTarArchiveExtractor.<init>(AbstractCompressedTarArchiveExtractor.kt:43)
	at com.amaze.filemanager.filesystem.compressed.extractcontents.helpers.GzipExtractor.<init>(GzipExtractor.kt:34)
	at com.amaze.filemanager.filesystem.compressed.CompressedHelper.getExtractorInstance(CompressedHelper.java:91)
	at com.amaze.filemanager.asynchronous.services.ExtractService$DoWork.doInBackground(ExtractService.java:274)
	at com.amaze.filemanager.asynchronous.services.ExtractService$DoWork.doInBackground(ExtractService.java:227)
	at android.os.AsyncTask$2.call(AsyncTask.java:333)
	at java.util.concurrent.FutureTask.run(FutureTask.java:266)
	... 4 more

```