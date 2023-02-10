import { screen, blocksize } from "../base/elements.js";
import { is_it_same_series, same_cutter } from "../multiable/function.js";
import { make_fragment, make_ver_fragment, go_top, go_left, go_bottom, go_right, centering_marker, original_centering_checker, the_magic_copy, the_magic_paste, adjust_box, pointer_anim, special_cleaner } from "./function.js";
import { vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "./tools.js";
import { wheel_positioning } from "../stylable/function.js";

window.addEventListener("keydown", (e)=>{
    if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
        
        let k = e.key;
        let current;
        let current_vertical;
        let type_signiture;
        
        if (document.activeElement.tagName != "BODY") {
            current = document.activeElement;
            type_signiture = current.value;
            current_vertical = document.querySelector(".centering");

            if (document.activeElement.classList.contains("ms_area") == false) {
                current.style.height = 24 + 'px';
                let scrollHeight = current.scrollHeight;
                current.style.height = scrollHeight + 'px'; 
                let height = current.clientHeight;
                current.parentElement.style.height = height + "px";
                adjust_box(current_vertical);
            }

        } else {
            current_vertical = document.querySelector(".centering");
        }
        
        let current_horizontal = vertical_to_hor(current_vertical);
        let current_sp_cover = vertical_to_sp_cover(current_vertical);

        // 縦に要素を追加する処理.
        if(e.metaKey) {
            if (k == "Enter") {
                pointer_anim();
                original_centering_checker(current_sp_cover, current_vertical);
                adjust_box(current_vertical);
                make_fragment(current_sp_cover, "after");    
                special_cleaner(current_sp_cover);
                let next_one = current_sp_cover.nextElementSibling.lastElementChild.lastElementChild.lastElementChild;
                var next_textarea = next_one.lastElementChild;
                centering_marker(current_vertical, next_one, "centering");
                next_textarea.focus();
                is_it_same_series(next_one);
                wheel_positioning();
            }
        }
    
        // 横に要素を追加する処理.
        if(e.metaKey) {
            if (k == "u") {
                pointer_anim();
                let sps = current_sp_cover.children;
                let c_v_num = [].slice.call(current_horizontal.children).indexOf(current_vertical);
                let scrollleft_b = current_horizontal.scrollLeft;
                let balanc = 0;
                let center_num = [].slice.call(sps).indexOf(vertical_to_sp(current_vertical)); 
    
                for (let i = 0; i < sps.length; i++) {
                    if (i == center_num) {
                        make_ver_fragment(current_vertical, "after");  
                        let next_one = current_vertical.nextElementSibling;
                        next_one.lastElementChild.focus();
                        centering_marker(current_vertical, next_one, "centering");
                    } else {
                        let c_v = sps[i].lastElementChild.children[c_v_num];
                        if (c_v.classList.contains("same")) {
                            if (! c_v.classList.contains("same_end")) {
                                let addition = c_v.cloneNode(true);
                                c_v.before(addition);
                            } else if (c_v.classList.contains("same_end")) { 
                                make_ver_fragment(c_v, "after");
                            }
                        } else  {
                            make_ver_fragment(c_v, "after");
                        }
                    }
                }
    
                // 以下各ラインへの挿入後の処理.
                let center = document.querySelector(".centering");
                let the_center_num_b = [].slice.call(vertical_to_hor(center).children).indexOf(center);
                
                balanc = the_center_num_b - c_v_num;
                for (let i = 0; i < sps.length; i++) {
                    sps[i].lastElementChild.scrollLeft = balanc * blocksize + scrollleft_b;
                }
    
                original_centering_checker(current_sp_cover, center);
                same_cutter(center, "addon");
                is_it_same_series(center);
            }
        }
    
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

