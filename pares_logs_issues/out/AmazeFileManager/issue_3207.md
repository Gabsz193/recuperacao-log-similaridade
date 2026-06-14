# 3207 - Searching causes crashes

- URL: https://github.com/TeamAmaze/AmazeFileManager/issues/3207
- State: closed
- Author: sjl872964789
- Created: 2022-03-06T15:49:24Z

---

**Describe the bug**
I'm not sure which of my previous steps caused the problem, now amaze crashes every time I search t.

**To Reproduce**
Steps to reproduce the behavior:
Not sure

**Expected behavior**
Don't crash

**Screenshots**
![77](https://user-images.githubusercontent.com/15941953/156930516-0199211e-ba95-4685-85d9-d21db519d72f.png)

**Smartphone (please complete the following information):**
 - OS: Android 8.0
 - Rooted: No
 - Version: 3.6.7

**Additional context**

* __App Name:__ Amaze File Manager
* __Package:__ com.amaze.filemanager
* __Version:__ 3.6.7
* __User Action:__ UI Error
* __Request:__ Application crash
* __OS:__ Linux Android 8.0.0 - 26
* __Device:__ generic_x86
* __Model:__ Android SDK built for x86
* __Product:__ sdk_gphone_x86
<details><summary><b>Crash log </b></summary><p>

```
java.lang.NullPointerException: Attempt to read from field 'java.lang.String com.amaze.filemanager.adapters.data.LayoutElementParcelable.title' on a null object reference
 at com.amaze.filemanager.adapters.RecyclerAdapter.onBindViewHolder(RecyclerAdapter.java:765)
 at androidx.recyclerview.widget.RecyclerView$Adapter.onBindViewHolder(RecyclerView.java:7065)
 at androidx.recyclerview.widget.RecyclerView$Adapter.bindViewHolder(RecyclerView.java:7107)
 at androidx.recyclerview.widget.RecyclerView$Recycler.tryBindViewHolderByDeadline(RecyclerView.java:6012)
 at androidx.recyclerview.widget.RecyclerView$Recycler.tryGetViewHolderForPositionByDeadline(RecyclerView.java:6279)
 at androidx.recyclerview.widget.RecyclerView$Recycler.getViewForPosition(RecyclerView.java:6118)
 at androidx.recyclerview.widget.RecyclerView$Recycler.getViewForPosition(RecyclerView.java:6114)
 at androidx.recyclerview.widget.LinearLayoutManager$LayoutState.next(LinearLayoutManager.java:2303)
 at androidx.recyclerview.widget.LinearLayoutManager.layoutChunk(LinearLayoutManager.java:1627)
 at androidx.recyclerview.widget.LinearLayoutManager.fill(LinearLayoutManager.java:1587)
 at androidx.recyclerview.widget.LinearLayoutManager.onLayoutChildren(LinearLayoutManager.java:665)
 at androidx.recyclerview.widget.RecyclerView.dispatchLayoutStep2(RecyclerView.java:4134)
 at androidx.recyclerview.widget.RecyclerView.dispatchLayout(RecyclerView.java:3851)
 at androidx.recyclerview.widget.RecyclerView.onLayout(RecyclerView.java:4404)
 at android.view.View.layout(View.java:19590)
 at android.view.ViewGroup.layout(ViewGroup.java:6053)
 at androidx.swiperefreshlayout.wid
