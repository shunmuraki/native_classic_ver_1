import { screen, blocksize } from "../base/elements.js";
import { is_it_same_series, same_cutter } from "../multiable/function.js";
import { make_fragment, make_ver_fragment, go_top, go_left, go_bottom, go_right, centering_marker, original_centering_checker, the_magic_copy, the_magic_paste, adjust_box, pointer_anim, special_cleaner } from "./function.js";
import { vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "./tools.js";
import { wheel_positioning } from "../stylable/function.js";

window.addEventListener("keydown", (e)=>{

    if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
        
        let k = e.key;
        let current;
        let type_signiture;
        let current_vertical;
        let current_horizontal;
        let current_sp_cover;
        keytouch_basic(current, type_signiture, current_vertical, current_horizontal, current_sp_cover);
        
        // 上下左右の移動. (デフォルトレイヤー）
        if(e.shiftKey) {      
            if (k == "ArrowUp") {
                original_centering_checker(current_sp_cover, current_vertical);
                go_top(current_vertical, "centering");
            }   
            if (k == "ArrowLeft") {
                go_left(current_vertical, "centering");
            }  
            if (k == "ArrowRight") {
                go_right(current_vertical, "centering");
            }
            if (k == "ArrowDown") {
                original_centering_checker(current_sp_cover, current_vertical);
                go_bottom(current_vertical, "centering");
            }
        }
    }

});

