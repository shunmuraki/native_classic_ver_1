import { all_view_changer } from "../editable/function.js";
import { is_it_same_series } from "../multiable/function.js";
import { full_start_scrollwidth, full_end_scrollwidth } from "./elements.js";
import { same_change_tracer, target_data, vertical_to_hor, vertical_to_sp, vertical_to_sp_cover } from "./tools.js";

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
            let the_special_cov = document.getElementsByClassName("special_cov")[0];
            the_special_cov.remove();
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
            let the_special_cov = document.getElementsByClassName("special_cov")[0];
            the_special_cov.remove();
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