import { screen, blocksize, blocktime } from "../base/elements.js";
import { same_data_counter, same_data_getter, target_data, vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "../base/tools.js";
import { make_dup_fragment } from "../base/function.js";
import { all_view_changer, best_related_element } from "../editable/function.js";
import { block_multiable, special_playlist_getter } from "./function.js";
import { orange_data_getter } from "../editable/keytouch.js";

let players_list = {};
let yt_loop = new Array();
let same_data = 0;
same_data_counter(same_data);

// special_cov 向けでない、通常の yt プレイヤーの束から該当するプレイヤーを返す関数.
export const yt_player_getter = (e) => {
    let the_keyid = e.id;
    let yt_iframe = null;
    if (the_keyid) {
        // 動画は必ずsameなのでspecialのみから検索.
        let playlist = special_playlist_getter();
        yt_iframe = playlist[the_keyid];
    }
    return yt_iframe;
}

// yt のプレイヤーのシークポイントを最適化する関数.
export const yt_resetter = (e) => {
    let target;
    if (screen.classList.contains("edit")) {
        let the_see_centering = document.querySelector(".see");
        if (the_see_centering.classList.contains("principle_block")) {
            target = document.getElementsByClassName("new_layer_centering")[0];
          } else if (the_see_centering.classList.contains("principle_pointer")) {
            let orange_data = orange_data_getter();
            let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
            target = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", orange_data)[0];
          }
    } else {
        target = e;
    }

    let the_time = Number(target_data(target, "this_video_st_"));
    return the_time;
}

// センタリングしたブロックの動画をブロック分再生（or ループ再生）する関数
export const yt_loop_player = (e) => {
    let the_time = yt_resetter(e);
    yt_loop.push(
        setInterval(() => {
            // e.pauseVideo();
            e.seekTo(the_time);
            e.playVideo();
        }, blocktime * 1000));
}

// 上の関数によってセットされた interval 処理をクリアする関数.
export const yt_loop_stopper = (e, f) => {
    let duration;
    e.pauseVideo();
    if (f == "start") {
        e.seekTo(0);
    } else if (f == "end") {
        duration = e.getDuration();
        e.seekTo(duration);
    }
    clearInterval(yt_loop.shift());
}

// 現在センタリングしているブロックが yt でループされているのを停止する関数.
export const just_clear_yt_loop = () => {
    for (let i = yt_loop.length; i >= 0; i--)  {
        clearInterval(yt_loop.shift());
    }
}

// 動画の読み込み・sp_cover内のラインの調整（ブロック数）などを行う関数. um と multiable にて共通利用.
export const video_load_then = (e, f) => {

    same_data = same_data_getter();
    same_data += 1;
    same_data_counter(same_data);

    let the_id_name = "yt_editor_" + same_data;
    let the_code = e.slice(-11);
    let the_box = f.parentElement;
    the_box.lastElementChild.remove();
    let the_add_box = document.createElement("div");
    the_add_box.setAttribute("id",the_id_name);

    the_add_box.classList.add("styling_1_1_1_1");

    // contentが textarea から img, video に置換されるためスタリングもここで変更.
    the_box.appendChild(the_add_box);

    let pl = block_multiable(the_id_name, the_code);
    players_list[the_id_name] = pl;
    
    setTimeout(() => {
        
        let the_duration = sessionStorage.getItem("the_duration");        
        let the_name = "same_num_" + same_data;
        the_box.classList.add("same");
        the_box.classList.add(the_name);
        
        // same は dupブロックで表現.
        make_dup_fragment(the_box, "before");
        
        let the_will_copied = the_box.previousElementSibling;
        the_will_copied.classList.add("same");
        the_will_copied.classList.add("video");
        the_will_copied.classList.add(the_name);

        // Escape後にiframeが復活するように id_is_ を複製したすべてにセット.
        let the_id_name = "id_is_" + the_code;
        the_will_copied.classList.add(the_id_name);
    
        // 動画の尺 / 3　分のブロックが必要であるため算出.
        let the_block_num = Math.floor(the_duration / blocktime);
        let the_fragment = document.createDocumentFragment();
        let the_fragment_stable = document.createDocumentFragment();
        
        for (let i = 0; i < the_block_num; i++) {
            let the_newone = the_will_copied.cloneNode(true);
            
            // ブロックごとの動画再生位置を付与. (編集に備えて)
            let the_seek_num = blocktime * i;
            let the_v_st_name = "this_video_st_" + the_seek_num;
            the_newone.classList.add(the_v_st_name);
            // 最初のsameには始点を与えておく.
            if (i == 0) {
                the_newone.classList.add("same_start");
            }
            // 本ライン用fragmentの生成
            the_fragment.appendChild(the_newone); 
            // 本ライン以外が対象のfragmentの生成
            let the_newone_stable = the_will_copied.cloneNode(true);
            the_fragment_stable.appendChild(the_newone_stable);
        }
        the_will_copied.remove();
        
        // 最後の中身を伴うsameには終点を与える.
        let the_v_en_name = "this_video_st_" + the_duration;
        
        // ACTUAR分を考慮.
        let the_actuar = the_duration - (the_block_num * blocktime);
        let the_actuar_name =  "actuar_time_" + the_actuar;
        the_box.classList.add("actuar_en");
        the_box.classList.add(the_v_en_name);
        the_box.classList.add(the_actuar_name);
        the_box.classList.add("same_end");
        the_box.classList.add("id_is_" + the_code);
        
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

        let after_distance = blocksize * (the_block_num);
        all_view_changer(current_sp_cover, after_distance);
    }, 1500);
}
