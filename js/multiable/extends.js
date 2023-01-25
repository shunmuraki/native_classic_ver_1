import { same_data_counter, same_data_getter, vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "../base/tools.js";
import { make_ver_fragment, make_dup_fragment } from "../base/function.js";
import { all_view_changer } from "../editable/function.js";
import { block_multiable } from "./function.js";

let players_list = [];
let same_data = 0;
same_data_counter(same_data);

// 動画の読み込み・sp_cover内のラインの調整（ブロック数）などを行う関数. um と multiable にて共通利用.
export const video_load_then = (e, f) => {
    
    let the_code = e.slice(-11);
    let the_box = f.parentElement;
    the_box.lastElementChild.remove();
    let the_add_box = document.createElement("div");
    the_add_box.setAttribute("id","auth_video_same");
    the_add_box.classList.add("styling_1_1_1_1");
    the_box.appendChild(the_add_box);
    
    let pl = block_multiable("auth_video_same", the_code);
    players_list.push(pl);
    
    setTimeout(() => {
        
        let the_duration = sessionStorage.getItem("the_duration");
        
        // この時点でthe_add_boxはiframeに置換されているので再取得して消す.
        document.getElementById("auth_video_same").removeAttribute("id");
        
        same_data = same_data_getter();
        same_data += 1;
        same_data_counter(same_data);
        
        let the_name = "same_num_" + same_data;
        the_box.classList.add("same");
        the_box.classList.add(the_name);
        
        // same は dupブロックで表現.
        make_dup_fragment(the_box, "before");
        
        let the_will_copied = the_box.previousElementSibling;
    
        // *動画の尺 / 3　分のブロックが必要であるため算出.
        let the_block_num = Math.floor(the_duration / 3);
        let the_fragment = document.createDocumentFragment();
        let the_fragment_stable = document.createDocumentFragment();
        
        for (let i = 0; i < the_block_num; i++) {
            let the_newone = the_will_copied.cloneNode(true);
            the_newone.classList.add("same");
            the_newone.classList.add("video");
            the_newone.classList.add(the_name);
            
            // ブロックごとの動画再生位置を付与. (編集に備えて)
            let the_seek_num = 3 * i;
            let the_v_st_name = "this_video_st_" + the_seek_num;
            the_newone.classList.add(the_v_st_name);
            // 最初のsameには始点を与えておく.
            if (i == 0) {
                the_newone.classList.add("same_start");
            }
            // 本ライン用fragmentの生成
            the_fragment.appendChild(the_newone); 
            // * 本ライン以外が対象のfragmentの生成
            let the_newone_stable = the_will_copied.cloneNode(true);
            the_fragment_stable.appendChild(the_newone_stable);
        }
        the_will_copied.remove();
        // 最後の中身を伴うsameには終点を与える.
        let the_v_en_name = "this_video_st_" + the_duration;
        
        // ACTUAR分を考慮.
        let the_actuar = the_duration - (the_block_num * 3);
        let the_actuar_name =  "actuar_time_" + the_actuar;
        the_box.classList.add("actuar_en");
        the_box.classList.add(the_v_en_name);
        the_box.classList.add(the_actuar_name);
        the_box.classList.add("same_end");
        
        // video製のsame群を適切な箇所へ挿入.
        let the_box_num = [].slice.call(vertical_to_hor(the_box).children).indexOf(the_box) - 1;
        the_box.before(the_fragment);
        let current_sp_cover = vertical_to_sp_cover(the_box);
        let the_sp_num = [].slice.call(current_sp_cover.children).indexOf(vertical_to_sp(the_box));

        // 本ライン以外には stable_fragment を挿入.
        for (let i = 0; i < current_sp_cover.childElementCount; i++) {
            if (i != the_sp_num) {
                current_sp_cover.children[i].lastElementChild.children[the_box_num].before(the_fragment_stable);
            }
        }

        let after_distance = 400 * (the_block_num);
        all_view_changer(current_sp_cover, after_distance);
    }, 200);
}
