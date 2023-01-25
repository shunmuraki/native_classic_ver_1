import { all_view_changer } from "../editable/function.js";
import { is_it_same_series } from "../multiable/function.js";
import { full_start_scrollwidth, full_end_scrollwidth, the_name_list } from "./elements.js";
import { classmover, same_change_tracer, target_data, vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "./tools.js";

let magic_elms = new Array();

// centering function.
export const centering_marker = (e, f, g) => {
    e.classList.remove(g);
    f.classList.add(g);
}

// original - centering function.
// export const original_centering_marker = (e) => {
//     // E には current_vertical を与える
//     let blocks = vertical_to_hor(e).children;
//     for (let i = 0; i < blocks.length; i++) {
//         if (blocks[i].classList.contains("original_centering")) {
//             blocks[i].classList.remove("original_centering");
//         }
//     }
//     e.classList.add("original_centering");
// }

// vertical_stripe identifier.
// export const v_stripe_op = (e) => {
//     // connectable 対応にしないと。
//     let sps = vertical_to_sp_cover(e).children;
//     for (let i = 0; i < sps.length; i++) {
//         let vers = sps[i].lastElementChild.children;
//         for (let o = 0; o < vers.length; o++) {
//             if (vers[o].classList.contains("v_st_active")) {
//                 vers[o].lastElementChild.previousElementSibling.previousElementSibling.style.opacity = 0;
//                 vers[o].classList.remove("v_st_active");
//             };
//             sps[i].lastElementChild.lastElementChild.lastElementChild.previousElementSibling.previousElementSibling.style.opacity = 1;
//             sps[i].lastElementChild.lastElementChild.classList.add("v_st_active");
//         }
//     }
// }

// vertical_stripe identifier.
// export const h_stripe_op = (e) => {
//     // connectable 対応にしないと。
//     let sp = vertical_to_sp_cover(e).firstElementChild;
//     for (let i = 0; i < sp.length; i++) {
//         let vers = sps[i].lastElementChild.children;
//         for (let o = 0; o < vers.length; o++) {
//             if (o > 1) {
//                 vers[o].children[i].style.opacity = 1;
//             }
//         }
//     }
// }

// ***** やっぱり確実性を優先しよう。

// original_centering_check
// * ターゲットは sp_cover
// centeringの番号を取得してすべての sp のその番号を持つ vor にoriginal_centeringをくれてやる.
// もとの original_centeinrは全部はぎとる。
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

// v_stirpe_checker
// * ターゲットは sp_cover
// そうじゃなかったら。
export const vertical_stripe_checker = (e) => {
    let sps = e.children;
    for (let i = 0; i < sps.length; i++) {
        let vers = sps[i].lastElementChild.children;
        for (let o = 0; o < vers.length; o++) {
            if (o > 0) {
                vers[o].children[0].style.opacity = 0;
                if (o == vers.length - 1) {
                    vers[o].children[0].style.opacity = 1;
                }
            }
        }
    }
}
// h_stripe check
// * ターゲットは sp_cover
// そうだったら
// そうじゃなかったら。
export const horizontal_stripe_checker = (e) => {
    let sps = e.children;
    for (let i = 0; i < sps.length; i++) {
        let vers = sps[i].lastElementChild.children;
        for (let o = 0; o < vers.length; o++) {
            if (o > 0) {
                if (i == 0) {
                    vers[o].children[1].style.opacity = 1;
                } else {
                    vers[o].children[1].style.opacity = 0;
                }
            }
        }
    }   
}

// command + u, command + Enter, 上下左右 にて実行をする
// * 他のこれまでの箇所をリセットする方が大変そうだけどね。

// ------------------------------------------------------------------------------------------    

// Creating Fragments

// vertical
export const make_fragment = (e, f) => {
    const sp_cover = document.createElement("div");
    const sp = document.createElement("div");
    const stripe_ver = document.createElement("div");
    const stripe_hor = document.createElement("div");
    const horizontal = document.createElement("div");
    const adjuster = document.createElement("div");
    const vertical = document.createElement("div");
    const textarea = document.createElement("textarea");
    
    sp_cover.classList.add("sp_cover");
    sp.classList.add("sp");

    stripe_ver.classList.add("stripe_ver");
    stripe_hor.classList.add("stripe_hor");
    horizontal.classList.add("horizontal");
    adjuster.classList.add("adjuster");
    vertical.classList.add("vertical");
    textarea.classList.add("write_area");
    textarea.classList.add("styling_0_0_1_1");
    adjuster.classList.add("horizontal_child");
    vertical.classList.add("horizontal_child");
    
    vertical.appendChild(stripe_ver);
    vertical.appendChild(stripe_hor);
    vertical.appendChild(textarea);
    horizontal.appendChild(adjuster);
    horizontal.appendChild(vertical);
    sp.appendChild(horizontal);
    sp_cover.appendChild(sp);
    
    stripe_ver.style.opacity = 0;
    stripe_hor.style.opacity = 0;
    
    let fragment = document.createDocumentFragment();
    fragment.append(sp_cover);
    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
}

// vertical
export const make_ver_fragment = (e, f) => {
    const stripe_ver = document.createElement("div");
    const stripe_hor = document.createElement("div");
    const vertical = document.createElement("div");
    const textarea = document.createElement("textarea");

    stripe_ver.classList.add("stripe_ver");
    stripe_hor.classList.add("stripe_hor");
    vertical.classList.add("vertical");
    textarea.classList.add("write_area");
    textarea.classList.add("styling_0_0_1_1");
    vertical.classList.add("horizontal_child");

    vertical.appendChild(stripe_ver);
    vertical.appendChild(stripe_hor);
    vertical.appendChild(textarea);

    stripe_ver.style.opacity = 0;
    stripe_hor.style.opacity = 0;
    // if (vertical_to_hor(e).lastChild == e) {
    // } else {        
    //     stripe_hor.style.opacity = 1;
    // }

    let fragment = document.createDocumentFragment();
    fragment.append(vertical);

    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
}

export const make_dup_fragment = (e, f) => {
    const stripe_ver = document.createElement("div");
    const stripe_hor = document.createElement("div");
    const vertical = document.createElement("div");

    stripe_ver.classList.add("stripe_ver");
    stripe_hor.classList.add("stripe_hor");
    vertical.classList.add("vertical");
    vertical.classList.add("horizontal_child");

    vertical.appendChild(stripe_ver);
    vertical.appendChild(stripe_hor);

    stripe_ver.style.opacity = 0;
    stripe_hor.style.opacity = 0;

    let fragment = document.createDocumentFragment();
    fragment.append(vertical);

    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
}

// ------------------------------------------------------------------------------------------


export const go_af_scroll = () => {
    let the_scrap = document.querySelector(".scrolled");
    if (the_scrap) {
        the_scrap.classList.remove("scrolled");
        let the_dis = (Number(target_data(the_scrap, "scroll_over_")) * 400) / 3;
        console.log(the_dis);
        all_view_changer(the_scrap, -the_dis);
    }
}

// top
export const go_top = (e, f) => {
    let ver = e;
    var sibling = vertical_to_sp(ver).previousElementSibling;
    var pre_sibling = vertical_to_sp_cover(ver).previousElementSibling;
    let your_height = vertical_to_sp(ver).clientHeight;
    let to_the_distance = vertical_to_sp(ver).getBoundingClientRect().top;

    let sibling_height = 0;

    if (f == "centering") {
        if (sibling) {
            // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
            // ** あと移動この場所についても、だよね。そっちも大事。
            if (ver.lastElementChild.tagName == "TEXTAREA") {
                ver.lastElementChild.blur();
            }
            let the_num = [].slice.call(vertical_to_hor(ver).children).indexOf(ver);
            sibling_height = sibling.clientHeight;
            let next_one = sibling.lastElementChild.children[the_num];
            // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
            // ** あと移動この場所についても、だよね。そっちも大事。
            centering_marker(ver, next_one, f);
            if (next_one.lastElementChild.tagName == "TEXTAREA") {
                next_one.lastElementChild.focus();
            }

            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            is_it_same_series(next_one);

        } else if (pre_sibling) {
            // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
            // ** あと移動この場所についても、だよね。そっちも大事。
            if (ver.lastElementChild.tagName == "TEXTAREA") {
                ver.lastElementChild.blur();
            }
            sibling_height = pre_sibling.clientHeight;
            // *** ここは new_layer とも同じだな。いや、そんなことないか。
            let next_one = pre_sibling.lastElementChild.lastElementChild.lastElementChild;
            centering_marker(ver, next_one, f);

            // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
            // ** あと移動この場所についても、だよね。そっちも大事。
            if (next_one.lastElementChild.tagName == "TEXTAREA") {
                next_one.lastElementChild.focus();
            }

            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            // SPECIAL_COV SPECIAL_COV SPECIAL_COV

            // * same_endの方を先に取得してみるか。
            let ends = document.querySelectorAll(".same_end");
            for (let i = 0; i < ends.length; i++) {
                if (vertical_to_sp_cover(ends[i]).isEqualNode(pre_sibling)) {
                    let the_name = "this_cov_is_" + target_data(ends[i], "same_num_");
                    // * 同じ列に存在するsame_endを取得してそこから番号だけもらった上で、ループでその番号と対応するspecial_covを消すようにしたらどうだろう。
                    let the_special_cov = document.getElementsByClassName(the_name)[0];
                    the_special_cov.remove();
                }
            }

        }

    } else if (f == "new_layer_centering") {

        if (pre_sibling) {
            go_af_scroll();
            sibling_height = pre_sibling.clientHeight;
            // *** テスト！！！！
            // *** テスト！！！！
            // *** テスト！！！！
            // let next_one = pre_sibling.children[1].lastElementChild.lastElementChild.previousElementSibling;
            let next_one = pre_sibling.children[1].lastElementChild.lastElementChild;
            centering_marker(ver, next_one, f);
            
            // pre_sibling.children[1].lastElementChild.scrollLeft == pre_sibling.children[1].lastElementChild.scrollWidth;
            
            // * ここで pointer志向の左右移動と同じ関数を使い回したい.
            // * 引数に　「対象となる scrap領域」と「移動距離」を与えるようにする.
            let now_position = pre_sibling.children[1].lastElementChild.scrollLeft;
            // *** テスト！！！！
            // *** テスト！！！！
            let the_distance = full_end_scrollwidth - now_position;
            all_view_changer(pre_sibling, the_distance);

            // * SPECIAL_COV SPECIAL_COV SPECIAL_COV SPECIAL_COV SPECIAL_COV 
            // * SPECIAL_COV SPECIAL_COV SPECIAL_COV SPECIAL_COV SPECIAL_COV 
            // * SPECIAL_COV SPECIAL_COV SPECIAL_COV SPECIAL_COV SPECIAL_COV 
            // 多分再取得することから始めるのかな。
            // is_it_same_series(next_one);

            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            is_it_same_series(next_one);
        }
    }

    if (sibling_height > to_the_distance) {
        window.scrollTo({
            bottom: your_height,
            behavior: "smooth",
        })
    } 
}

// bottom
export const go_bottom = (e, f) => {

    let ver = e;
    var sibling = vertical_to_sp(ver).nextElementSibling;
    var pre_sibling = vertical_to_sp_cover(ver).nextElementSibling;
    let your_height = vertical_to_sp(ver).clientHeight;
    let to_the_distance = vertical_to_sp(ver).getBoundingClientRect().bottom - window.innerHeight;
    
    let sibling_height = 0;

    if (f == "centering") {

        if (sibling) {
            // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
            // ** あと移動この場所についても、だよね。そっちも大事。
            if (ver.lastElementChild.tagName == "TEXTAREA") {
                ver.lastElementChild.blur();
            }
            let the_num = [].slice.call(vertical_to_hor(ver).children).indexOf(ver);
            sibling_height = sibling.clientHeight;
            let next_one = sibling.lastElementChild.children[the_num];
            centering_marker(ver, next_one, f);

            // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
            // ** あと移動この場所についても、だよね。そっちも大事。
            if (next_one.lastElementChild.tagName == "TEXTAREA") {
                next_one.lastElementChild.focus();
            }

            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            is_it_same_series(next_one);
        } else if (pre_sibling) {
            // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
            // ** あと移動この場所についても、だよね。そっちも大事。
            if (ver.lastElementChild.tagName == "TEXTAREA") {
                ver.lastElementChild.blur();
            }
            sibling_height = pre_sibling.clientHeight;
            let next_one = pre_sibling.lastElementChild.lastElementChild.lastElementChild;
           
            centering_marker(ver, next_one, f);
            // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
            // ** あと移動この場所についても、だよね。そっちも大事。
            if (next_one.lastElementChild.tagName == "TEXTAREA") {
                next_one.lastElementChild.focus();
            }

            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            let ends = document.querySelectorAll(".same_end");
            for (let i = 0; i < ends.length; i++) {
                if (vertical_to_sp_cover(ends[i]).isEqualNode(pre_sibling)) {
                    let the_name = "this_cov_is_" + target_data(ends[i], "same_num_");
                    // * 同じ列に存在するsame_endを取得してそこから番号だけもらった上で、ループでその番号と対応するspecial_covを消すようにしたらどうだろう。
                    let the_special_cov = document.getElementsByClassName(the_name)[0];
                    the_special_cov.remove();
                }
            }
        }

    } else if (f == "new_layer_centering") {

        if (pre_sibling) {
            go_af_scroll();
            sibling_height = pre_sibling.clientHeight;
            let next_one = pre_sibling.children[1].lastElementChild.children[1];
            centering_marker(ver, next_one, f);

            // * ここで pointer志向の左右移動と同じ関数を使い回したい.
            // * 引数に　「対象となる scrap領域」と「移動距離」を与えるようにする.
            let now_position = pre_sibling.children[1].lastElementChild.scrollLeft;

            console.log(now_position);
            
            let the_distance = full_start_scrollwidth - now_position;
            console.log(the_distance);
            all_view_changer(pre_sibling, the_distance);

            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            // SPECIAL_COV SPECIAL_COV SPECIAL_COV
            is_it_same_series(next_one);
        }

    }

    if (sibling_height < to_the_distance) {
        window.scrollTo({
            top: your_height,
            behavior: "smooth",
        })
    } 
}

// ------------------------------------------------------------------------------------------
// ----------- horizontal

// left
export const go_left = (e, f) => {
    go_af_scroll();
    let ver = e;
    // これがright と違うのは、adjusterにあたる可能性があるため。これを避けてる　←賢い.
    if (ver.previousElementSibling.lastElementChild) {
        // e.lastElementChild.blur();

        // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
        // ** あと移動この場所についても、だよね。そっちも大事。
        if (ver.lastElementChild) {
            if (ver.lastElementChild.tagName == "TEXTAREA") {
                ver.lastElementChild.blur();
            }
        }
        let sp_cover = vertical_to_sp_cover(ver);
        // let be_scrolled_targets = sp_cover.children;
        // for (let i = 0; i < be_scrolled_targets.length; i++) {
        //     be_scrolled_targets[i].lastElementChild.scrollLeft -= 400;
        // }
        all_view_changer(sp_cover, -400);

        console.log(ver);
        let next_one = ver.previousElementSibling;
        centering_marker(ver, next_one, f);
        
        if (f == "centering") {
            if (next_one.lastElementChild.tagName == "TEXTAREA") {
                var v = next_one.lastElementChild.value;
                next_one.lastElementChild.value = "";
    
                // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
                // ** あと移動この場所についても、だよね。そっちも大事。
                next_one.lastElementChild.focus();
                next_one.lastElementChild.value = v; 
            }
        }

        // SPECIAL_COV SPECIAL_COV SPECIAL_COV
        // SPECIAL_COV SPECIAL_COV SPECIAL_COV
        same_change_tracer(next_one);
        is_it_same_series(next_one);
    }
}

// right
export const go_right = (e, f) => {
    go_af_scroll();
    let ver = e;

    // 一旦試験的に解除してみる。
    if (ver.nextElementSibling) {

        // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
        // ** あと移動この場所についても、だよね。そっちも大事。
        if (ver.nextElementSibling.lastElementChild) {
            if (ver.lastElementChild.tagName == "TEXTAREA") {
                ver.lastElementChild.blur();
            }
        }
        let sp_cover = vertical_to_sp_cover(ver);
        // let be_scrolled_targets = sp_cover.children;
        // for (let i = 0; i < be_scrolled_targets.length; i++) {
        //     be_scrolled_targets[i].lastElementChild.scrollLeft += 400;
        // }
        all_view_changer(sp_cover, 400);

        let next_one = ver.nextElementSibling;
        centering_marker(ver, next_one, f);

        if (f == "centering") {
            // ** それが存在して TEXTAREA　だったらfocus、じゃなかったら何にもしない　っていう方向で一回全部書いてみる（上下左右。）
            // ** あと移動この場所についても、だよね。そっちも大事。
            if (next_one.lastElementChild.tagName == "TEXTAREA") {
                var v = next_one.lastElementChild.value; 
                next_one.lastElementChild.value = "";
                next_one.lastElementChild.focus();
                next_one.lastElementChild.value = v; 
            }
        }

        // SPECIAL_COV SPECIAL_COV SPECIAL_COV
        // SPECIAL_COV SPECIAL_COV SPECIAL_COV
        same_change_tracer(next_one);
        is_it_same_series(next_one);
    }
}


// ------------- MAGIC COMMAND ---------------

export const the_magic_copy = (e) => {

    // * 初期化
    magic_elms = [];   
    // - 以降に残っているものを、動画に限らず全部コピーしての改行になる. 今のブロックが最後尾になる。innerHTMLをsessionStorageに保存しておいて最新を保つ.
    let sp_cover = vertical_to_sp_cover(e);
    let c_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);
    
    // - 各spごとにコピーして以前のブロックをまとめて削除してラインfragmentとして変数に格納しておく。それをリストにして「the_magic_fragment」とする。
    for (let i = 0; i < sp_cover.childElementCount; i++) {
        let line = sp_cover.children[i].lastElementChild.children;
        console.log(line);
        let new_folder = new Array();
        console.log(line.length);
        console.log(c_num);
        for (let o = line.length - 1; o >= c_num + 1; o--) {
            console.log(o);
            console.log(line[o]);
            new_folder.unshift(line[o]);
            line[o].remove();
        }
        magic_elms.push(new_folder);
    }
}


export const the_magic_paste = (e) => {

    console.log("de");
    // - 最初に追加ライン分（関係性から算出）複製（全部空にする）
    let the_line_num = magic_elms.length;
    console.log(the_line_num);

    console.log(magic_elms);
    
    // 現在の位置はsp_coverのラインの中の何番目?
    let sp_cover = vertical_to_sp_cover(e);
    let whole_line_num = sp_cover.childElementCount;
    let current_line_num = [].slice.call(sp_cover.children).indexOf(vertical_to_sp(e));
    let c_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);

    console.log(c_num);

    let the_underground_num = whole_line_num - current_line_num;
    let the_additional_num = the_line_num - the_underground_num;

    let current_ver_num = vertical_to_hor(e).childElementCount;
    let current_scrollleft = vertical_to_hor(e).scrollLeft;

    let added_line = vertical_to_sp(e).cloneNode(true);
    let edit_contents = added_line.lastElementChild.children;

    let new_name_list = the_name_list.push("centering");
    new_name_list.push("original_centering");

    // * 足りないラインを新しく生成
    for (let i = 1; i < current_ver_num; i++) {
        for (let o = 0; o < new_name_list.length; o++) {
            classmover(edit_contents[i], edit_contents[i], the_name_list[o], "remove");
        }
        edit_contents[i].lastElementChild.remove();
        let new_textarea = document.createElement("textarea");
        new_textarea.classList.add("write_area");
        edit_contents[i].appendChild(new_textarea);
    }
    
    console.log(added_line);

    for (let i = 0; i < the_additional_num; i++) {
        let final_copy = added_line.cloneNode(true);
        sp_cover.appendChild(final_copy);
        // scroll
        final_copy.lastElementChild.scrollLeft = current_scrollleft;
    }

    // - そのまま中身を同じラインに追加
    console.log(current_line_num);

    // * i が current_line_num -- the_line_num + current_line_num の間だったらmagic_elemsから挿入, 一応same_cutterとかやっとく必要ある？ is_itとかもさ.
    // * i がその範囲の外にあったら、 same クラスを持っているかどうかで判定して、持っていたらひとつ前のを複製、持っていなかったらmake_ver_fragment()するといいのかな.


    for (let i = 0; i <= sp_cover.childElementCount; i++) {

        if (i > current_line_num || i < the_line_num + current_line_num) {

            let target_line_num = i + current_line_num;
            console.log(i);
            console.log(current_line_num);
            console.log(target_line_num);
            let will_added_elems = magic_elms[i];
            console.log(will_added_elems);
            for (let o = 0; o < will_added_elems.length; o++) {
    
                console.log(sp_cover.children[target_line_num].lastElementChild.children[c_num]);
    
                // * そもそも after で純に追加していくと順番変わりそうじゃない？
                // * それを考慮して c_num + o に after するようにした. これでどうだろう.
                sp_cover.children[target_line_num].lastElementChild.children[c_num + o].after(will_added_elems[o]);

            }

        } else {

            // * ---------    ここまでですべての挿入は終わっていて、あとは数合わせ、っていう段階.   --------------------------------
    
            // * 追加分のブロックも増やさないといけないでしょう？どこに挿入されるかによって、挿入先は異なってくるが。sameとかだったら大変だぞ....
            // * 通常の追加分は make_ver_fragment() でいいわけやんか.
            // * will_added_emls 分のブロックをすべてのsp-horに追加することは決まっている.
            for (let o = 0; o < will_added_elems.length; o++) {
            
                let c_v = sp_cover.children[i].lastElementChild.children[c_num + o];
    
                if (c_v.classList.contains("same") || c_v.classList.contains("same_end") == false) {
                    let addition = c_v.cloneNode(true);
                    c_v.before(addition);
                } else if (c_v.classList.contains("same") == false || c_v.classList.contains("same_end")) {
                    make_ver_fragment(c_v, "after");
                }
            }
    
        }

    }

    let center = e.nextElementSibling;

    centering_marker(e, center, "centering");
    original_centering_checker(sp_cover, e.nextElementSibling);
    // [[[ --- new_setup --- ]]]
    original_centering_checker(sp_cover, center);
    vertical_stripe_checker(sp_cover);
    horizontal_stripe_checker(sp_cover);

    // もし same の途中だったら　というケースを考える必要がある。ここでもう一度再構築が必要になる。

    // SPECIAL COV
    same_cutter(center, "addon");
    is_it_same_series(center);

    // * 400 分だけスクロール.
    all_view_changer(sp_cover, 400);
    
    e.blur();

    if (e.nextElementSibling.lastElementChild.tagName == "TEXTAREA") {
        e.nextElementSibling.lastElementChild.focus();
    }

}