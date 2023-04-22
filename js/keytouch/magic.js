import { screen, blocksize } from "../base/elements.js";
import { is_it_same_series, same_cutter } from "../multiable/function.js";
import { make_fragment, make_ver_fragment, go_top, go_left, go_bottom, go_right, centering_marker, original_centering_checker, the_magic_copy, the_magic_paste, adjust_box, pointer_anim, special_cleaner } from "./function.js";
import { vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "./tools.js";
import { wheel_positioning } from "../stylable/function.js";
import { optimize_writing } from "../function/general.js";

window.addEventListener("keydown", (e)=>{

    if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
    
        let k = e.key;
        let current;
        let type_signiture;
        let current_vertical;

        keytouch_basic(current, type_signiture, current_vertical);
        
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

