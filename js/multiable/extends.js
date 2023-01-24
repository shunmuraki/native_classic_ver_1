import { same_data_counter, same_data_getter, vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "../base/tools.js";
import { make_ver_fragment, make_dup_fragment } from "../base/function.js";
import { all_view_changer } from "../editable/function.js";
import { block_multiable } from "./function.js";

let players_list = [];
let same_data = 0;
same_data_counter(same_data);

export const video_load_then = (e, f) => {

    // もし YouTubeの動画のURLがペーストされていたら.
    // とりあえず最初にその内容の id を知りたくなるよね。後ろから抜粋しましょう。
    // let the_imp_value = type_signiture;
    // この the_code を引数に渡す予定
    let the_code = e.slice(-11);
    // * あと必要なのは box
    let the_box = f.parentElement;
    
    the_box.lastElementChild.remove();
    
    let the_add_box = document.createElement("div");
    the_add_box.setAttribute("id","auth_video_same");
    the_add_box.classList.add("styling_0_0_1_1");
    the_box.appendChild(the_add_box);
    
    let pl = block_multiable("auth_video_same", the_code);
    players_list.push(pl);
    
    setTimeout(() => {
    
    let the_duration = sessionStorage.getItem("the_duration");
    
    // この時点ですでにthe_add_boxはiframeに置換されているので再取得して消す.
    document.getElementById("auth_video_same").removeAttribute("id");
    
    console.log(the_duration);
    
    // // * 通常版.
    // let good_stable = document.createElement("div");
    // good_stable.classList.add("vertical");
    // good_stable.classList.add("horizontal_child");
    
    // // * 特別版.
    // let good_ex = document.createElement("div");
    // good_ex.classList.add("same");
    // good_ex.classList.add("vertical");
    // good_ex.classList.add("horizontal_child");
    
    
    // *** 以下数行は dupli でも共通。
    same_data = same_data_getter();
    same_data += 1;
    same_data_counter(same_data);
    
    let the_name = "same_num_" + same_data;
    
    the_box.classList.add("same");
    the_box.classList.add(the_name);
    
    // ** 試しに一つ、ということで。
    make_dup_fragment(the_box, "before");
    // * 即コピーする.
    // let the_copied_stable = the_box.previousElementSibling.cloneNode(true);

    // * おおもとのこれの中身が textarea だったらいいのかしら？
    // * 理想的には空で済ませたいところ。
    let the_will_copied = the_box.previousElementSibling;
    console.log(the_will_copied);
    // * ↑ ひとつ思ったんだけど、こいつは消さなくていいの？？
    
    // *動画の尺 / 3　分のブロックが必要やな。
    // でもお尻以外は必要ないからなぁ..
    let the_block_num = Math.floor(the_duration / 3);
    console.log(the_block_num);
    
    let the_fragment = document.createDocumentFragment();
    let the_fragment_stable = document.createDocumentFragment();
    
    for (let i = 0; i < the_block_num; i++) {
        let the_newone = the_will_copied.cloneNode(true);
        the_newone.classList.add("same");
        the_newone.classList.add("video");
        the_newone.classList.add(the_name);
        
        // 番号振っていきまあああああしゅ
        let the_seek_num = 3 * i;
        let the_v_st_name = "this_video_st_" + the_seek_num;
        the_newone.classList.add(the_v_st_name);
        // * 最初のsameには始点を与えておく.
        if (i == 0) {
            the_newone.classList.add("same_start");
        }
        // * 本ライン用fragmentの生成
        the_fragment.appendChild(the_newone); 
        
        // * 本ライン以外が対象のfragmentの生成
        let the_newone_stable = the_will_copied.cloneNode(true);
        the_fragment_stable.appendChild(the_newone_stable);
    }
    the_will_copied.remove();
    // * 最後の中身を伴うsameには終点を与える.
    let the_v_en_name = "this_video_st_" + the_duration;
    
    // * ACTUAR ACTUAR ACTUAR ACTUAR ACTUAR ACTUAR ACTUAR 
    // * ACTUAR ACTUAR ACTUAR ACTUAR ACTUAR ACTUAR ACTUAR 
    // * ACTUAR ACTUAR ACTUAR ACTUAR ACTUAR ACTUAR ACTUAR 
    let the_actuar = the_duration - (the_block_num * 3);
    let the_actuar_name =  "actuar_time_" + the_actuar;
    the_box.classList.add("actuar_en");
    the_box.classList.add(the_v_en_name);
    the_box.classList.add(the_actuar_name);
    the_box.classList.add("same_end");
    
    // * 必要分複製したブロックたちを詰めたFragmentを 今の current.parent の前に一気に挿入するといい。
    // でも「追加したらそんなに増える」なんて他のラインは同期されないよね, 
    // * どうしたらいい？
    
    // ***** ブロックを増やす前に数えておく。　下のfor文のために。
    let the_box_num = [].slice.call(vertical_to_hor(the_box).children).indexOf(the_box) - 1;
    // * 多分本来はここで他のラインにも追加をする必要がある。
    the_box.before(the_fragment);
    let current_sp_cover = vertical_to_sp_cover(the_box);
    
    
    let the_sp_num = [].slice.call(current_sp_cover.children).indexOf(vertical_to_sp(the_box));
    
    console.log(the_box_num);
    console.log(the_sp_num);
    
    for (let i = 0; i < current_sp_cover.childElementCount; i++) {
        // 本ライン以外に stable_fragment を投下.
        if (i != the_sp_num) {
            console.log("oh my god!");
            current_sp_cover.children[i].lastElementChild.children[the_box_num].before(the_fragment_stable);
        }
    }
    
    let after_distance = 400 * (the_block_num);
    
    // * 最後にオートスクロールで揃える.
    all_view_changer(current_sp_cover, after_distance);
    
    // * あと色付け.
    // * centering は移らないのかしらね。
    // original_centering_checker(current_sp_cover, the_box);
    // vertical_stripe_checker(current_sp_cover);
    // horizontal_stripe_checker(current_sp_cover);
    }, 200);
}
