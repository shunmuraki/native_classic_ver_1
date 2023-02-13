import { blocksize, screen } from "../base/elements.js"
import { vertical_to_hor, vertical_to_sp_cover, which_special_is } from "../base/tools.js";
import { make_dup_fragment, original_centering_checker, blur_checker, pointer_anim } from "../base/function.js";
import { is_it_same_series, same_cutter } from "../multiable/function.js";
import { adjust_target_pos } from "../ms/function.js";
import { same_around } from "./function.js";

window.addEventListener("keydown", (e)=>{ 
  
  let type_signiture;
  let current = document.activeElement;
  let k = e.key; 
  let current_vertical;

  if (document.activeElement.tagName == "TEXTAREA") {
    current_vertical = current.parentElement;
    type_signiture = current.value;

  } else {
    current_vertical = document.querySelector(".centering");
  }

  let current_horizontal = vertical_to_hor(current_vertical);
  let current_sp_cover = vertical_to_sp_cover(current_vertical);

  if(e.metaKey) {  
    // 以下 command + k の処理.
    if (k == "k") {
      pointer_anim();
      // 複製されるのが画像かもしれないので、command + U では必要なかったが配慮.
      if (current.tagName == "TEXTAREA") {
        current.blur();
      }
        
      // 具体的な複製の処理.
        let sps = current_sp_cover.children;
        let c_v_num = [].slice.call(current_horizontal.children).indexOf(current_vertical);
        let scrollleft_b = current_horizontal.scrollLeft;
        let balanc = 0;
        // connnected
        if (sps.length > 1) {
        same_around(current_vertical, "connected");
        } else {
        // 通常の処理.
        // 現在のブロックを same_end として、その前に要素を追加しながら移動していく.
        make_dup_fragment(current_vertical, "before");
        same_around(current_vertical, "default");
        }

        // ブロック挿入が終わって sp_cover が満たされた以降の処理. このあたりも大枠が command + u と同様.
        let center = document.querySelector(".centering");
        let the_center_num_b = [].slice.call(vertical_to_hor(center).children).indexOf(center);

        balanc = the_center_num_b - c_v_num;
        for (let i = 0; i < sps.length; i++) {
            sps[i].lastElementChild.scrollLeft = balanc * blocksize + scrollleft_b;
        }

        original_centering_checker(current_sp_cover, center);
        is_it_same_series(center);
      }
  }

  if (type_signiture) {      
    // ind コマンドの処理.
    if ( type_signiture.indexOf('in') != -1) {
      if (screen.classList.contains("ms")) {
        document.querySelector(".ms_area").remove();
        let centering = document.querySelector(".centering");
        // same群の中で　command + u をした場合に same が２つに分裂するのと近いため、処理を same_cutter に共通化してある.
        same_cutter(centering, "replace");
        centering.classList.add("change");
        is_it_same_series(centering);  
        adjust_target_pos(centering.previousElementSibling.lastElementChild, "off");
        blur_checker(centering.previousElementSibling);
        if (centering.classList.contains("same")) {
          centering = which_special_is(centering);
        }
        blur_checker(centering);
        adjust_target_pos(centering.lastElementChild, "off");
        centering.lastElementChild.style.opacity = 1;
        screen.classList.remove("ms");
      }
    }
  }
})