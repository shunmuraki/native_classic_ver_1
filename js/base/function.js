import { all_view_changer } from "../editable/function.js";
import { is_it_same_series, same_cutter } from "../multiable/function.js";
import { full_start_scrollwidth, full_end_scrollwidth, the_name_list, window_height, the_middline, the_sunsetline, blocksize, blocktime } from "./elements.js";
import { classmover, same_change_tracer, target_data, vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "./tools.js";
import { wheel_positioning } from "../stylable/function.js";

let magic_elms = new Array();

// centering クラスの調整関数
export const centering_marker = (e, f, g) => {
    e.classList.remove(g);
    f.classList.add(g);
}

// original_centering クラスの調整関数
export const original_centering_checker = (e, f) => {
    let sps = e.children;
    let centering = f;
    let centering_num = [].slice.call(vertical_to_hor(centering).children).indexOf(centering);

    for (let i = 0; i < sps.length; i++) {
        let vers = sps[i].lastElementChild.children;
        for (let o = 0; o < vers.length; o++) {
            if (o > 0) {
                if (vers[o].classList.contains("original_centering")) {
                    vers[o].classList.remove("original_centering");
                }
                if (o == centering_num) {
                    vers[o].classList.add("original_centering");
                }
            }
        }
    }    
}

// textarea の存在を確認してfocusを挿れる関数.
export const focus_checker = (e) => {
    let bol = false;
    let content = e.lastElementChild;
    if (content) {
        if (content.tagName == "TEXTAREA") {
            bol = true;
            let v = content.value;
            content.value = "";
            content.focus();
            content.value = v;
        }
    }
    return bol;
}

// textarea の存在を確認してblurする関数.
export const blur_checker = (e) => {
    let bol = false;
    let content = e.lastElementChild;
    if (content) {
        if (content.tagName == "TEXTAREA") {
            bol = true;
            content.blur();
        }
    }
    return bol;
}

// sp_cover の生成関数
export const make_fragment = (e, f) => {

    const sp_cover = document.createElement("div");
    const sp = document.createElement("div");
    const horizontal = document.createElement("div");
    const adjuster = document.createElement("div");
    const vertical = document.createElement("div");
    const textarea = document.createElement("textarea");
    
    sp_cover.classList.add("sp_cover");
    sp.classList.add("sp");

    horizontal.classList.add("horizontal");
    adjuster.classList.add("adjuster");
    vertical.classList.add("vertical");
    textarea.classList.add("write_area");
    textarea.classList.add("styling_1_1_0_1");
    adjuster.classList.add("horizontal_child");
    vertical.classList.add("horizontal_child");

    vertical.appendChild(textarea);
    horizontal.appendChild(adjuster);
    horizontal.appendChild(vertical);
    sp.appendChild(horizontal);
    sp_cover.appendChild(sp);
    
    let fragment = document.createDocumentFragment();
    fragment.append(sp_cover);
    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
}

// ブロックの生成関数
export const make_ver_fragment = (e, f) => {

    const vertical = document.createElement("div");
    const textarea = document.createElement("textarea");

    vertical.classList.add("vertical");
    textarea.classList.add("write_area");
    textarea.classList.add("styling_1_1_0_1");
    vertical.classList.add("horizontal_child");

    vertical.appendChild(textarea);

    let fragment = document.createDocumentFragment();
    fragment.append(vertical);

    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
}

// 空のブロックの生成関数（sameの場合に使用）
export const make_dup_fragment = (e, f) => {

    const vertical = document.createElement("div");
    vertical.classList.add("vertical");
    vertical.classList.add("horizontal_child");
    let fragment = document.createDocumentFragment();
    fragment.append(vertical);

    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
}

// Editモードにおけるスクロール位置の調整関数　(???)
export const go_af_scroll = () => {
    let the_scrap = document.querySelector(".scrolled");
    if (the_scrap) {
        the_scrap.classList.remove("scrolled");
        let the_dis = (Number(target_data(the_scrap, "scroll_over_")) * blocksize) / blocktime;
        all_view_changer(the_scrap, -the_dis);
    }
}

// 上下左右の移動の際に special_cov を same_end に反映させて special_cov を描画上の都合からも削除する関数.
export const special_cleaner = (e) => {
    let ends = document.querySelectorAll(".same_end");
    for (let i = 0; i < ends.length; i++) {
        if (vertical_to_sp_cover(ends[i]).isEqualNode(e)) {
            let the_name = "this_cov_is_" + target_data(ends[i], "same_num_");
            let the_special_cov = document.getElementsByClassName(the_name)[0];
            
            if (the_special_cov) {
                let cont = the_special_cov.lastElementChild.cloneNode(true);
                ends[i].lastElementChild.remove();
                ends[i].appendChild(cont);
                the_special_cov.remove();
            }
        }
    }
}

// topへの移動
export const go_top = (e, f) => {
    let ver = e;
    var sibling = vertical_to_sp(ver).previousElementSibling;
    var pre_sibling = vertical_to_sp_cover(ver).previousElementSibling;
    let your_height = vertical_to_sp(ver).clientHeight;
    let to_the_distance = vertical_to_sp(ver).getBoundingClientRect().top;
    let next_one;

    let sibling_height = 0;

    if (f == "centering") {
        if (sibling) {
            blur_checker(ver);
            let the_num = [].slice.call(vertical_to_hor(ver).children).indexOf(ver);
            sibling_height = sibling.clientHeight;
            next_one = sibling.lastElementChild.children[the_num];
            centering_marker(ver, next_one, f);
            focus_checker(next_one);
            is_it_same_series(next_one);
            wheel_positioning();
        } else if (pre_sibling) {
            blur_checker(ver);            
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.lastElementChild.lastElementChild.lastElementChild;
            centering_marker(ver, next_one, f);
            wheel_positioning();
            focus_checker(next_one);
            // 対応するspecial_covを削除. 本来は左右の移動コマンドで対応していたが、上下移動の際は自動的にラインごとの位置が右揃えになるので、ここでその処理を実行しておく必要がある。
            special_cleaner(pre_sibling);
        }

    } else if (f == "new_layer_centering") {

        if (pre_sibling) {
            go_af_scroll();
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.children[1].lastElementChild.lastElementChild;
            centering_marker(ver, next_one, f);
            let now_position = pre_sibling.children[1].lastElementChild.scrollLeft;
            let the_distance = full_end_scrollwidth - now_position;
            all_view_changer(pre_sibling, the_distance);
            // * ここで本来はspecial_covをremoveしたりする必要があるのかも.
            special_cleaner(vertical_to_sp_cover(ver));
            
            is_it_same_series(next_one);
            wheel_positioning();
        }
    }

    // 上下方向の位置調整. これが将来的にはしっかり機能することが重要.
    if (sibling_height > to_the_distance) {
        scrollBy(0, - your_height);
        wheel_positioning();
    } 
}

// bottomへの移動
export const go_bottom = (e, f) => {

    let ver = e;
    var sibling = vertical_to_sp(ver).nextElementSibling;
    var pre_sibling = vertical_to_sp_cover(ver).nextElementSibling;
    let your_height = vertical_to_sp(ver).clientHeight;
    let to_the_distance =  window.innerHeight - vertical_to_sp(ver).getBoundingClientRect().bottom;
    let sibling_height = 0;
    let next_one;

    if (f == "centering") {

        if (sibling) {
            blur_checker(ver);
            let the_num = [].slice.call(vertical_to_hor(ver).children).indexOf(ver);
            sibling_height = sibling.clientHeight;
            next_one = sibling.lastElementChild.children[the_num];
            centering_marker(ver, next_one, f);
            focus_checker(next_one);
            is_it_same_series(next_one);
            wheel_positioning();
        } else if (pre_sibling) {
            blur_checker(ver);
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.lastElementChild.lastElementChild.lastElementChild;
           
            centering_marker(ver, next_one, f);
            wheel_positioning();
            focus_checker(next_one);
            special_cleaner(pre_sibling);
        }

    } else if (f == "new_layer_centering") {

        if (pre_sibling) {
            go_af_scroll();
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.children[1].lastElementChild.children[1];
            centering_marker(ver, next_one, f);
            let now_position = pre_sibling.children[1].lastElementChild.scrollLeft;
            let the_distance = full_start_scrollwidth - now_position;
            all_view_changer(pre_sibling, the_distance);            
            
            // * ここで本来はspecial_covをremoveしたりする必要があるのかも.
            special_cleaner(vertical_to_sp_cover(ver));
            
            is_it_same_series(next_one);
            wheel_positioning();
        }
    }

    if (sibling_height < to_the_distance) {
        scrollBy(0, your_height);
        wheel_positioning();
    } 
}

// leftへの移動
export const go_left = (e, f) => {
    go_af_scroll();
    let ver = e;
    // 中身が存在するかどうかでadjusterかどうかの判定を行っている.
    if (ver.previousElementSibling) {
        if (! ver.previousElementSibling.classList.contains("adjuster")) {
            blur_checker(ver);
            let sp_cover = vertical_to_sp_cover(ver);
            all_view_changer(sp_cover, - blocksize);
            let next_one = ver.previousElementSibling;
            centering_marker(ver, next_one, f);
            
            if (f == "centering") {
                focus_checker(next_one);
            }
    
            same_change_tracer(next_one);
            is_it_same_series(next_one);
        }
    }
}

// rightへの移動
export const go_right = (e, f) => {
    go_af_scroll();
    let ver = e;

    if (ver.nextElementSibling) {
        blur_checker(ver);
        let sp_cover = vertical_to_sp_cover(ver);   
        all_view_changer(sp_cover, blocksize);
        let next_one = ver.nextElementSibling;
        centering_marker(ver, next_one, f);

        if (f == "centering") {
            focus_checker(next_one);
        }

        same_change_tracer(next_one);
        is_it_same_series(next_one);
    }
}


// マジックコピーの関数.
export const the_magic_copy = (e) => {
    // * 初期化
    magic_elms = [];   
    // - 以降に残っているものを、動画に限らず全部コピー.
    let sp_cover = vertical_to_sp_cover(e);
    let c_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);
    // - 各spごとにコピーして以前のブロックをまとめて削除してラインfragmentとして変数に格納しておく.
    for (let i = 0; i < sp_cover.childElementCount; i++) {
        let line = sp_cover.children[i].lastElementChild.children;
        let new_folder = new Array();
        for (let o = line.length - 1; o >= c_num + 1; o--) {
            new_folder.unshift(line[o]);
            line[o].remove();
        }
        magic_elms.push(new_folder);
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

}

export const adjust_box = (e) => {
    if (window_height - e.getBoundingClientRect().bottom < the_sunsetline) {
        let the_adjust_num = the_sunsetline + e.getBoundingClientRect().bottom - window_height;
        scrollBy(0, the_adjust_num);
        wheel_positioning();
    }
}