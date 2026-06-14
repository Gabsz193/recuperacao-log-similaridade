# 239 - Navigation component crashes.

- URL: https://github.com/android/sunflower/issues/239
- State: closed
- Author: KoTius
- Created: 2018-11-05T09:08:50Z

---

I guess this is just broken Navigation, and i'm going to post this issue at Navigation bug tracker but still.

1. Open Plant list screen
2. With 2 or more fingers tap different Plant items at the same time
3. You will get exception

> java.lang.IllegalArgumentException: navigation destination com.google.samples.apps.sunflower:id/action_plant_list_fragment_to_plant_detail_fragment is unknown to this NavController

Seems like after first click Navigation framework thinks you are already at Plant detail part of the nav graph. And this fragment can't use this action.
It seems just broken as for me. I'd like it opens two separate screens if you do things like this.
This probably will crash you app everywhere when you can navigate with more then 1 then click listener (for example 2 buttons to register/forgot password screens)

In the current situation i have found few workarounds with this problem:
1. We can wrap `it.findNavController().navigate(direction)` with tryCatch block, catch IllegalArgumentException and do nothing. But it seems just broken, don't forget to leave a commentary in that catch block
2. You can use Global actions only https://developer.android.com/topic/libraries/architecture/navigation/navigation-global-action
But this is again will look just horrible tho. This seems acceptable if we add search into the app
3. You can add to PlantDetailFragment in nav graph action to navigate to itself (recursive). This is horrible as well. 

Offtopic: if you use recursive destination and tie ActonBar with NavController - check you home/back button. This will be broken if your recursive destination is first in nav graph.

Well, i don't have the good looking solution for the issue quite yet. Still working

UPD: Copy of this bug at google tracker https://issuetracker.google.com/issues/118975714