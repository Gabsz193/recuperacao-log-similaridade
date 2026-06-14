# 1329 - Android 4.4 crash when moving files

- URL: https://github.com/gsantner/markor/issues/1329
- State: closed
- Author: whunger
- Created: 2021-05-03T11:02:13Z

---

#### General information

* **App version: 2.6.0** 
* **System: Android 4.4.4** 

#### Description

When moving a file from one folder to another, the file is copied, then Markor crashes with the following exception. The file has been copied successfully to the target location, but it has not been removed from the source folder.

#### Log

```
05-03 11:45:44.972 E/dalvikvm(12677): Could not find class 'java.util.function.Consumer', referenced from method org.apache.commons.io.IOUtils.closeQuietly
05-03 11:45:44.972 W/dalvikvm(12677): VFY: unable to resolve check-cast 4643 (Ljava/util/function/Consumer;) in Lorg/apache/commons/io/IOUtils;
05-03 11:45:44.972 D/dalvikvm(12677): VFY: replacing opcode 0x1f at 0x0001
05-03 11:45:44.972 W/dalvikvm(12677): VFY: unable to find class referenced in signature (Ljava/util/function/Consumer;)
05-03 11:45:44.972 I/dalvikvm(12677): Could not find method java.util.function.Consumer.accept, referenced from method org.apache.commons.io.IOUtils.closeQuietly
05-03 11:45:44.982 W/dalvikvm(12677): VFY: unable to resolve interface method 35121: Ljava/util/function/Consumer;.accept (Ljava/lang/Object;)V
05-03 11:45:44.982 D/dalvikvm(12677): VFY: replacing opcode 0x72 at 0x0009
05-03 11:45:45.012 D/AndroidRuntime(12677): Shutting down VM
05-03 11:45:45.012 W/dalvikvm(12677): threadid=1: thread exiting with uncaught exception (group=0x41d63ba8)
05-03 11:45:45.052 E/AndroidRuntime(12677): FATAL EXCEPTION: main
05-03 11:45:45.052 E/AndroidRuntime(12677): Process: net.gsantner.markor, PID: 12677
05-03 11:45:45.052 E/AndroidRuntime(12677): java.lang.NoClassDefFoundError: java.util.function.Consumer
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at org.apache.commons.io.IOUtils.closeQuietly(IOUtils.java:345)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at org.apache.commons.io.IOUtils.closeQuietly(IOUtils.java:498)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at other.writeily.model.WrMarkorSingleton.copyFile(WrMarkorSingleton.java:73)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at other.writeily.model.WrMarkorSingleton.moveFile(WrMarkorSingleton.java:97)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at other.writeily.model.WrMarkorSingleton.moveSelectedNotes(WrMarkorSingleton.java:132)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at net.gsantner.opoc.ui.FilesystemViewerFragment$1.onFsViewerSelected(FilesystemViewerFragment.java:579)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at net.gsantner.opoc.ui.FilesystemViewerDialog.onFsViewerSelected(FilesystemViewerDialog.java:218)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at net.gsantner.opoc.ui.FilesystemViewerAdapter.onClick(FilesystemViewerAdapter.java:355)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at net.gsantner.opoc.ui.FilesystemViewerDialog.onClicked(FilesystemViewerDialog.java:190)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at net.gsantner.opoc.ui.FilesystemViewerDialog_ViewBinding$2.doClick(FilesystemViewerDialog_ViewBinding.java:59)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at butterknife.internal.DebouncingOnClickListener.onClick(DebouncingOnClickListener.java:22)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at android.view.View.performClick(View.java:4449)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at android.view.View$PerformClick.run(View.java:18631)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at android.os.Handler.handleCallback(Handler.java:733)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at android.os.Handler.dispatchMessage(Handler.java:95)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at android.os.Looper.loop(Looper.java:136)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at android.app.ActivityThread.main(ActivityThread.java:5001)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at java.lang.reflect.Method.invokeNative(Native Method)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at java.lang.reflect.Method.invoke(Method.java:515)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:785)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:601)
05-03 11:45:45.052 E/AndroidRuntime(12677): 	at dalvik.system.NativeStart.main(Native Method)
05-03 11:45:45.062 W/ActivityManager( 2767):   Force finishing activity net.gsantner.markor/.activity.MainActivity
```
