import { keytouch_basic, original_centering_checker } from "../function/general.js";
import { go_top, go_left, go_bottom, go_right } from "../function/motion.js";
import { screen } from "../data/constant.js";

window.addEventListener("keydown", (e)=>{

    if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
        
        // 恒例の作業
        let key_basis = keytouch_basic(); 
        let current_vertical = key_basis[2];
        let current_sp_cover = key_basis[5];
        
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

