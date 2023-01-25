// * command = K

import { same_data_getter, target_data, vertical_to_hor, vertical_to_sp_cover, vertical_to_sp, same_data_counter, classmover } from "../base/tools.js";
import { make_fragment, make_ver_fragment, make_dup_fragment , go_top, go_left, go_bottom, go_right, centering_marker, original_centering_checker, vertical_stripe_checker, horizontal_stripe_checker } from "../base/function.js";
import { is_it_same_series, same_cutter } from "../multiable/function.js";

// * /ind
let screen = document.querySelector(".screen");

window.addEventListener("keydown", (e)=>{ 
    // * 上下左右のキーが押された時。

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
    // let current_sp = vertical_to_sp(current_vertical);
    let current_sp_cover = vertical_to_sp_cover(current_vertical);

    if(e.metaKey) {  
      // copy_fragment!!!!!!!!!
      if (k == "k") {

        // command + U では必要なかった配慮. ↓
        if (current.tagName == "TEXTAREA") {
          current.blur();
        }
         // 複製要員。中身は command + u とほぼ一緒。

         let sps = current_sp_cover.children;
         let c_v_num = [].slice.call(current_horizontal.children).indexOf(current_vertical);
          
          let scrollleft_b = current_horizontal.scrollLeft;

          let balanc = 0;
          let center_num = [].slice.call(sps).indexOf(vertical_to_sp(current_vertical));

          for (let i = 0; i < sps.length; i++) {
              
            if (i == center_num) {

                  make_dup_fragment(current_vertical, "before");
                  let next_one = current_vertical.previousElementSibling;
                  // next_one.lastElementChild.style.opacity = 0;
                  
                  if (! current_vertical.classList.contains("same")) {

                    // current_vertical.lastElementChild.opacity = 1;
                    current_vertical.classList.add("same");

                    let same_data = same_data_getter();
                    same_data += 1;
                    same_data_counter(same_data);
                    
                    // delete 機能がないので、初めて same群が新たにできる瞬間.
                    current_vertical.classList.add("same_end");
                    next_one.classList.add("same_start");

                  } 

                  let same_data_latest = same_data_getter();
                  let the_name = "same_num_" + same_data_latest;
  
                  current_vertical.classList.add("same");
                  next_one.classList.add("same");
                  
                  current_vertical.classList.add(the_name);
                  next_one.classList.add(the_name);
                  // current_vertical.before(next_one);
                  
                  // command + U では必要なかった配慮. ↓
                  if (next_one.lastElementChild.tagName == "TEXTAREA") {
                    next_one.lastElementChild.focus();
                    console.log('anaaa');
                  }
              } else {
                  let c_v = sps[i].lastElementChild.children[c_v_num];

                  if (c_v.classList.contains("same")) {
                    if (! c_v.classList.contains("same_end")) {
                      let addition = c_v.cloneNode(true);
                      c_v.before(addition);

                      console.log(c_v);
                      console.log("dup made!");
                        
                    } else if (c_v.classList.contains("same_end")) {
                      console.log(c_v);
                      console.log("ver made!");
                      make_ver_fragment(c_v, "after");
                    }
                  } else  {
                    console.log(c_v);
                    console.log("ver made!");
                    make_ver_fragment(c_v, "after");
                  }

              }
          }

         // after that...
         let center = document.querySelector(".centering");
         let the_center_num_b = [].slice.call(vertical_to_hor(center).children).indexOf(center);
 
          balanc = the_center_num_b - c_v_num;

          for (let i = 0; i < sps.length; i++) {
              sps[i].lastElementChild.scrollLeft = balanc * 400 + scrollleft_b;
              console.log(sps[i].lastElementChild.children[the_center_num_b]);
          }

          original_centering_checker(current_sp_cover, center);
          vertical_stripe_checker(current_sp_cover);
          horizontal_stripe_checker(current_sp_cover);

          // SPECIAL COV
          // same_cutter(center);
          is_it_same_series(center);
      }
    }


    if (type_signiture) {
      if ( type_signiture.indexOf('ind') != -1) {

        console.log("ind");
        
        document.querySelector(".ms_area").remove();
        if (document.querySelector(".centering").lastElementChild == "TEXTAREA") {
          document.querySelector(".centering").lastElementChild.focus();
        }
  
        // ここは直す必要があって、
        // 「その押され場所のtextarea、そしてその隣のverのtextarea、この２つのスタイルを変える」が正しい内容になる
        //　same は残すべきだろうか。「change」は必ず「この要素」に付与する。 ... まぁ残しておいていいでしょう。
        let centering = document.querySelector(".centering");
        // centering.lastElementChild.style.opacity = 1;
  
        // console.log("nyaaaaa");
        
        // // same　も値含め更新しないと。
        // // * centering　以降の same_ を全部撤去後、最新の値を込めて same_をセットし、このcurr
        // centering.previousElementSibling.classList.add("same_end");
  
        // let same_name = "same_num_" + target_data(centering, "same_num_");
        
        // let sames = document.getElementsByClassName(same_name);
        // let breakpoint = [].slice.call(sames).indexOf(centering);
        // console.log(breakpoint);
        
        // let same_data = same_data_getter();
        // same_data += 1;
        // same_data_counter(same_data);
        // classmover(centering, centering, "same_num_", "remove");
        // centering.classList.add("same_num_" + same_data);
  
        // for (let i = sames.length - 1; i >= breakpoint; i--) {
        //   console.log(i);
        //   let new_elm = centering.cloneNode(true);
      
        //   // new_elm.lastElementChild.style.opacity = 0;
        //   let same_block = sames[i];
        //   same_block.before(new_elm);
        //   same_block.remove();
        // }

        // document.getElementsByClassName("same_num_" + same_data)[document.getElementsByClassName("same_num_" + same_data).length - 1].classList.add("same_end");
  
        // centering.classList.add("same_start"); 

        same_cutter(centering, "replace");
        centering.classList.add("change");
  
        // * あとはなんですか？？ state とかやったらよろしゅうの？？
        is_it_same_series(centering);  
  
      }
    }
  
  })