import { keytouch_basic, pointer_anim, original_centering_checker, adjust_box, centering_marker, same_cutter, special_cleaner, wheel_positioning } from "../function/general.js";
import { make_fragment, make_ver_fragment } from "../function/make.js";
import { is_it_same_series } from "../function/multi.js";
import { screen, blocksize } from "../data/constant.js";

window.addEventListener("keydown", (e)=>{

    if (screen.classList.contains("edit") == false && screen.classList.contains("um") == false) {
        
        // 恒例の作業
        let key_basis = keytouch_basic();
        let current_vertical = key_basis[2];
        let current_horizontal = key_basis[3];
        let current_sp_cover = key_basis[5];

        // 縦に要素を追加する処理.
        if(e.metaKey) {
            if (k == "Enter") {
                pointer_anim();
                original_centering_checker(current_sp_cover, current_vertical);
                adjust_box(current_vertical);
                make_fragment(current_sp_cover, "after");    
                special_cleaner();
                let next_one = current_sp_cover.nextElementSibling.lastElementChild.lastElementChild.lastElementChild.previousElementSibling;
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
    }

});

