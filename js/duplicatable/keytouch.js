// * command = K
import { same_data_getter, target_data, vertical_to_hor, vertical_to_sp_cover, vertical_to_sp, same_data_counter, classmover } from "../base/tools.js";
import { make_fragment, make_ver_fragment, make_dup_fragment , go_top, go_left, go_bottom, go_right, centering_marker, original_centering_checker, vertical_stripe_checker, horizontal_stripe_checker } from "../base/function.js";
import { is_it_same_series, same_cutter } from "../multiable/function.js";

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

        // 複製されるのが画像かもしれないので、command + U では必要なかったが配慮.
        if (current.tagName == "TEXTAREA") {
          current.blur();
        }
         
        // 具体的な複製の処理.
         let sps = current_sp_cover.children;
         let c_v_num = [].slice.call(current_horizontal.children).indexOf(current_vertical);
         let scrollleft_b = current_horizontal.scrollLeft;
         let balanc = 0;
         let center_num = [].slice.call(sps).indexOf(vertical_to_sp(current_vertical));

         for (let i = 0; i < sps.length; i++) {
              
            // 対象のラインの場合.
            if (i == center_num) {
                  
                  // 現在のブロックを same_end として、その前に要素を追加しながら移動していく.
                  make_dup_fragment(current_vertical, "before");
                  let next_one = current_vertical.previousElementSibling;
                  
                  if (! current_vertical.classList.contains("same")) {

                    current_vertical.classList.add("same");
                    let same_data = same_data_getter();
                    same_data += 1;
                    same_data_counter(same_data);
                  
                    current_vertical.classList.add("same_end");
                    next_one.classList.add("same_start");

                  } 

                  let same_data_latest = same_data_getter();
                  let the_name = "same_num_" + same_data_latest;
  
                  current_vertical.classList.add("same");
                  next_one.classList.add("same");
                  
                  current_vertical.classList.add(the_name);
                  next_one.classList.add(the_name);
                  
                  // command + U では必要なかったが配慮.
                  if (next_one.lastElementChild.tagName == "TEXTAREA") {
                    next_one.lastElementChild.focus();
                  }

              } else {
                
                  // sp_cover 内の対象外のラインの場合.
                  let c_v = sps[i].lastElementChild.children[c_v_num];

                  // 以下 command + u と同様の条件分岐.
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

         // ブロック挿入が終わって sp_cover が満たされた以降の処理. このあたりも大枠が command + u と同様.
         let center = document.querySelector(".centering");
         let the_center_num_b = [].slice.call(vertical_to_hor(center).children).indexOf(center);
 
          balanc = the_center_num_b - c_v_num;
          for (let i = 0; i < sps.length; i++) {
              sps[i].lastElementChild.scrollLeft = balanc * 400 + scrollleft_b;
          }

          original_centering_checker(current_sp_cover, center);
          vertical_stripe_checker(current_sp_cover);
          horizontal_stripe_checker(current_sp_cover);
          is_it_same_series(center);
        }
    }


    if (type_signiture) {

      // ind コマンドの処理.
      if ( type_signiture.indexOf('ind') != -1) {
        
        document.querySelector(".ms_area").remove();
        if (document.querySelector(".centering").lastElementChild == "TEXTAREA") {
          document.querySelector(".centering").lastElementChild.focus();
        }

        let centering = document.querySelector(".centering");

        // same群の中で　command + u をした場合に same が２つに分裂するのと近いため、処理を same_cutter に共通化してある.
        same_cutter(centering, "replace");
        centering.classList.add("change");
        is_it_same_series(centering);  
      }
    }
  
  })