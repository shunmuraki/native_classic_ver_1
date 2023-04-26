import { keytouch_basic, pointer_anim } from "../function/general.js";
import {the_magic_copy, the_magic_paste} from "../function/magic.js";
import { screen} from "../data/constant.js";

window.addEventListener("keydown", (e)=>{
   
    if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
    
        // 恒例の作業
        let key_basis = keytouch_basic();        
        let current_vertical = key_basis[2];
        
        // マジックコマンド.
        if(e.ctrlKey) {
            if (k == "c") {
                pointer_anim();
                the_magic_copy(current_vertical);
            }
            if (k == "v") {
                pointer_anim();
                the_magic_paste(current_vertical);
            }
        }
    
    }
    
});