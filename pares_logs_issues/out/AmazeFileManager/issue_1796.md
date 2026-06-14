# 1796 - crash when cutting a folder and paste in it

- URL: https://github.com/TeamAmaze/AmazeFileManager/issues/1796
- State: closed
- Author: anlalalu
- Created: 2019-12-24T09:28:39Z

---

**Describe the bug**
crash when cutting a folder and paste in it

**To Reproduce**
Steps to reproduce the behavior:
1. create a folder(named 'test2') in an empty folder
2. long click 'test2' folder
3. tap 'cut'
4. click 'test2' folder to go into the folder
5. tap 'paste'


**Screenshots**
<img width="512" alt="Screen Shot1" src="https://user-images.githubusercontent.com/46981872/71406182-6290b780-2672-11ea-9daf-9e10d70cb0be.png">

<img width="509" alt="Screen Shot2" src="https://user-images.githubusercontent.com/46981872/71406223-805e1c80-2672-11ea-966c-7e27567556cb.png">


**Smartphone (please complete the following information):**
 - Device: emulator
 - OS: Android 4.4.4
 - Rooted: No
 - Version: 3.3.2

**Stack Trace**
E/AndroidRuntime: FATAL EXCEPTION: main
                                                 Process: com.amaze.filemanager, PID: 1327
                                                 java.lang.IndexOutOfBoundsException: Invalid index 0, size is 0
                                                     at java.util.ArrayList.throwIndexOutOfBoundsException(ArrayList.java:255)
                                                     at java.util.ArrayList.get(ArrayList.java:308)
                                                     at com.amaze.filemanager.asynchronous.asynctasks.DeleteTask.onPostExecute(DeleteTask.java:175)
                                                     at com.amaze.filemanager.asynchronous.asynctasks.DeleteTask.onPostExecute(DeleteTask.java:51)
                                                     at android.os.AsyncTask.finish(AsyncTask.java:632)
                                                     at android.os.AsyncTask.access$600(AsyncTask.java:177)
                                                     at android.os.AsyncTask$InternalHandler.handleMessage(AsyncTask.java:645)
                                                     at android.os.Handler.dispatchMessage(Handler.java:102)
                                                     at android.os.Looper.loop(Looper.java:136)
                                                     at android.app.ActivityThread.main(ActivityThread.java:5001)
                                                     at java.lang.reflect.Method.invokeNative(Native Method)
                                                     at java.lang.reflect.Method.invoke(Method.java:515)
                                                     at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:785)
                                                     at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:601)
                                                     at dalvik.system.NativeStart.main(Native Method)
