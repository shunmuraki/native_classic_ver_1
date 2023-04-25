import { tracer_basis, vertical_to_hor, vertical_to_sp_cover, vertical_to_sp, target_data, classmover } from "./tool.js";
import {make_ver_fragment} from "./make.js";
import { centering_marker, original_centering_checker, same_cutter, focus_checker, adjust_box } from "./general.js";
import { is_it_same_series } from "./multi.js";
import { all_view_changer } from "./edit.js";
import { the_name_list, blocksize } from "../data/constant.js";
import { native_value } from "../data/variable.js";

let magic_elms = native_value("magic_elms");

// マジックコピーの関数.
export const the_magic_copy = (e) => {
    // スタイリング直後にカットされることを想定.
    tracer_basis(document.querySelector(".centering"));
    // 初期化
    magic_elms = [];   
    // 以降に残っているものを、動画に限らず全部コピー.
    let sp_cover = vertical_to_sp_cover(e);
    let c_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);
    // 各spごとにコピーして以前のブロックをまとめて削除してラインfragmentとして変数に格納しておく.
    for (let i = 0; i < sp_cover.childElementCount; i++) {
        let line = sp_cover.children[i].lastElementChild.children;
        let current_scrollleft = sp_cover.children[i].lastElementChild.scrollLeft;
        let breaker = line[c_num + 1];

        if (breaker.classList.contains("same")) {
            let same_name = "same_num_" + target_data(breaker, "same_num_");
            let sames = document.getElementsByClassName(same_name);
            // same_end同士中身をコピーしたい。
            let c = sames[sames.length - 1].lastElementChild.cloneNode(true);
            // 色々処理施す前に、0 で sameならsame_start を与えて same_num もう更新する.
            // [same_cutter の部分利用]
            breaker.previousElementSibling.classList.add("same_end");
            console.log(c);
            breaker.previousElementSibling.appendChild(c);
            breaker.classList.add("same_start");
            let breakpoint = [].slice.call(sames).indexOf(breaker);
            let same_data = same_data_getter();
            same_data += 1;
            same_data_counter(same_data);
            for (let i = sames.length - 1; i >= breakpoint; i--) {
                let same_block = sames[i];
                classmover(same_block, same_block, "same_num_", "remove");
                same_block.classList.add("same_num_" + same_data);                    
            }
        }

        // 色々処理.
        // ここでは何をしている？？
        let new_folder = new Array();
        // adjuster を削除させない。
        for (let o = line.length - 2; o >= c_num + 1; o--) {
            new_folder.unshift(line[o]);
            line[o].remove();
        }

        magic_elms.push(new_folder);
        sp_cover.children[i].lastElementChild.scrollLeft = current_scrollleft;
    }
}

// マジックペーストの関数.
export const the_magic_paste = (e) => {
    // コピーしてあるfragmentを貼り付ける. ラインが足りないなら追加し、あとはペースト対象のラインとそれ以外のラインとで条件分岐して適当なタイプのブロックを同じ数だけ挿入している.
    let the_line_num = magic_elms.length;    
    let sp_cover = vertical_to_sp_cover(e);
    let whole_line_num = sp_cover.childElementCount;

    let current_line_num = [].slice.call(sp_cover.children).indexOf(vertical_to_sp(e)) + 1;
    let c_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);

    let bottom_line_num = current_line_num + the_line_num - 1;
    let the_additional_num = bottom_line_num - whole_line_num;

    let current_ver_num = vertical_to_hor(e).childElementCount;
    let current_scrollleft = vertical_to_hor(e).scrollLeft;

    let added_line = vertical_to_sp(e).cloneNode(true);
    let edit_contents = added_line.lastElementChild.children;

    the_name_list.push("centering");
    the_name_list.push("original_centering");

    // 足りないラインを新しく生成.
    if (the_additional_num > 0) {
        for (let i = 1; i < current_ver_num; i++) {
            for (let o = 0; o < the_name_list.length; o++) {
                classmover(edit_contents[i], edit_contents[i], the_name_list[o], "remove");
            }
            edit_contents[i].lastElementChild.remove();
            let new_textarea = document.createElement("textarea");
            new_textarea.classList.add("write_area");
            edit_contents[i].appendChild(new_textarea);
        }
        
        for (let i = 0; i < the_additional_num; i++) {
            let final_copy = added_line.cloneNode(true);
            sp_cover.appendChild(final_copy);
            final_copy.lastElementChild.scrollLeft = current_scrollleft;
        }
    }

    // 不足分を補ってライン数が十分なsp_coverに対して再度子要素を取得してループ. 条件分岐はここから.
    for (let i = 1; i <= sp_cover.childElementCount; i++) {
        if (i < current_line_num || i > bottom_line_num) {
            for (let o = 0; o < magic_elms[0].length; o++) {
                let c_v = sp_cover.children[i - 1].lastElementChild.children[c_num + o];
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

        } else { 
            let will_added_elems = magic_elms[i - current_line_num];
            for (let o = 0; o < will_added_elems.length; o++) {
                sp_cover.children[i - 1].lastElementChild.children[c_num + o].after(will_added_elems[o]);
            }    
        }
    }

    let old_center = document.querySelector(".centering");
    let center = old_center.nextElementSibling;
    centering_marker(old_center, center, "centering");
    original_centering_checker(sp_cover, center);
    same_cutter(center, "addon");
    is_it_same_series(center);
    all_view_changer(sp_cover, blocksize);
    focus_checker(center);
    adjust_box(center);
}