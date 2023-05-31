// * e = scraps , f = extract_data
export const trace_to_defaultdisplay = (e, f) => {
    // * BANSについてループ
    // * クラスの付与(same_start / same_end / actuar_st / actuar_en / actuar_time_), same_num の変更.
    // * scrap ごとに存在する「BANS」
    // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ], coの関係かどうか.
    for (let i = 0; i < e.length; i++) {
        
        let the_extract_data = f[i];
        let sps = scraps[i].children;

        for (let o = 0; o < bans.length; o++) {
            // * 上で一通り作成した、抽出範囲を示すデータ
            let st_n = the_extract_data[o][0][0];
            let st_a = the_extract_data[o][0][1];
            let en_n = the_extract_data[o][1][0];
            let en_a = the_extract_data[o][1][1];

            // * 最初のブロックと最後尾のブロックの間にどれくらいのブロックが入っているか。
            let bbb = en_n - st_n + 1;

            for (let l = 1; l < sps.length; l++) {            
                let fragment = document.createDocumentFragment();
                let st_block = sps[l].lastElementChild.children[st_n];
                let en_block = sps[l].lastElementChild.children[en_n];
                // st_block と fragmnt を渡す
                fragment = start_block_extract(st_block, fragment); 
                // en_block と fragmnt を渡す.
                fragment = start_block_extract(en_block, fragment);
                // * fragmentの回帰。
                original_sp_cover.children[l - 1].lastElementChild.lastElementChild.before(fragment);
            }
        }
    }   
}

export const cleanup_original_wrapper_index = (e) => {
    // * 最初に sp_cover のブロックだけをすべて削除する。
    for (let i = 0; i < e.children.length; i++) {
            let blocks = e.children[i].lastElementChild.children;
            // * 最後尾のadjusterを残しておく.
            for (let o = blocks.length - 2; o >= 0 ; o--) {
            // * 最初のadjusterも残しておく.
            if (o > 0) { 
                blocks[o].remove();
            }
        }
    }   
}
 
export const default_landing_setup = (e) => {
    let the_new_focusedblock = e.lastElementChild.lastElementChild.lastElementChild.previousElementSibling;
    the_new_focusedblock.classList.add("centered_block");    
    e.classList.remove("edit_centered_wrapper_index");
    e.classList.remove("edit_target");
    original_centering_checker(e, the_new_focusedblock);
}


export const back_to_defalutmode = () => {
    let edit_display = document.querySelector(".edit_display");
    let default_display = document.querySelector(".default_display");
    let body = document.querySelector(".body");

    set("orange_data", s => s = 0);
    edit_display.remove();
    default_display.classList.remove("edit");
    default_display.style.opacity = 1;

    // * ナニコレ珍百景2023
    set("the_scrolled_distance", s => s = 0);
    let same_concealers = document.querySelectorAll(".same_concealer");
    for (let i = 0; i < same_concealers.length; i++) {
        same_concealers[i].remove();
    }
    
    body.style.backgroundColor = "#0070D8";
    body.classList.remove("edit_mode");
    default_display.style.display = "block";
    let final_centered_block = document.querySelector(".centered_display");
    let now_position = vertical_to_hor(final_centered_block).scrollLeft;
    all_view_changer(vertical_to_sp_cover(final_centered_block), custom_end_scrollwidth(vertical_to_hor(final_centered_block)) - now_position);
}

export const extract_data_make = (e) => {
    let extract_data;
    for (let i = 0; i < e.length; i++) {
       extract_data.push(stripe_inner_or_out(i));
    }
    return extract_data;
}

// * orange_stripe 上にあるブロックだけを抽出する関数.
// * トリミングの際に実行される.　(/keytouch/what_to_do/edit/escape)
export const stripe_inner_or_out = (e) => {
    
    // [* cool の宣言が欠けている.]        
    let extract_data_of_each_wrapper_index = new Array();
    // * scrapごとに処理をする。
    let po_and_st = edit_wrapper_indexies[e].firstElementChild.firstElementChild.firstElementChild.children;
    
    // * stripe ごとに処理する。
    // * stripeの先頭と最後尾のブロックを検出し、それらについての情報を調べて
    // * 「同一scrap内のsp間で共通の選択範囲を示すデータ」を作成する。
    for (let o = 0; o < po_and_st.length; o++) {
        if (po_and_st[o].classList.contains("orange_pointer_s")) {
            
            let the_pointer_s = po_and_st[o];
            let the_pointer_f = grab_auto(the_pointer_s)[1];
            let the_pointer_scrollleft_st = Number(target_data(the_pointer_s, "scroll_left_"));
            let the_pointer_scrollleft_en = Number(target_data(the_pointer_f, "scroll_left_"));

            // * stripeごとの選択範囲を示すデータ。scrap - orange_space ごとに束ねることになる。
            let single_extract_data = new Array();
            let w = full_start_scrollwidth;

            // * pointer_s と pointer_f のポジションをブロック数に変換。
            let st = Math.trunc((the_pointer_scrollleft_st - w) / blocksize) + 1;
            let en = Math.trunc((the_pointer_scrollleft_en - w) / blocksize);

            // * 以下 [st] について
            // 差分を取得してこれが 50 以上なら actuar と認定し、same_start と一緒にデータに格納する。
            // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ]]
            let st_d = Math.trunc(the_pointer_scrollleft_st - w - (blocksize * (st - 1)));
            
            if (st_d > 50) {
                let rsd = blocksize - st_d;
                single_extract_data.push([st, rsd]);
            } else {
                single_extract_data.push([st, "NONE"]);
            }

            // 以下 [en] について
            // 差分を取得してこれが 50 以上なら actuar と認定し、same_start と一緒にデータに格納する。
            // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ], coの関係かどうか]
            let en_d = Math.trunc(the_pointer_scrollleft_en - w - (blocksize * en)); 
            if (en_d > 50) {
                single_extract_data.push([en, en_d]);
            } else {
                // co についても処理。
                single_extract_data.push([en, "NONE"]);
            }
            extract_data_of_each_wrapper_index.push(stcl);
        }
    }

    return extract_data_of_each_wrapper_index;
}

export const complete_middlejumper = (e) => {
    for (let i = 0; i < e.length; i++) {
        if (e[i].nextElementSibling) {
            e[i].nextElementSibling.classList.add("middlejumper");
        }
    }   
}

export const start_block_extract = (e, f, g) => {

    let fragment = e;
    let st_block = f;
    let en_block = g;
    // * 新しく配布する same_num_ がいくつかを保存する変数.
    let nex;
    // * 最初に nex を決める。
    if (st_block.classList.contains("co") && scraps[i].classList.contains("orange_stripe_maybe_continue")) {
        st_block.classList.remove("same_start");
        nex = target_data(scraps[i].children[l], "continue_num_");
    } else {
        // * 通常の処理.
        // * 2回分を兼ねている。ローカルのsame_numは -1 を維持。
        set("same_num", s += 2);
        nex = same_num - 1;
        st_block.classList.add("same_start");
    }

    if (st_block.classList.contains("co")) {
        st_block.classList.remove("co");
    }

    // * same と関連性のない actuar の処理
    if (st_a != "NONE") {
        st_block.classList.add("actuar_st");
        st_block.classList.add("actuar_time_" + st_a);
    }

    // * nex を用いた、新しいクラスの配布。   
    for (let m = 0; m < bbb; m++) {
        
        let t = sps[l].lastElementChild.children[st_n + m];
        classmover(t, t, "same_num_", "remove");
        t.classList.add("same_num_" + nex);
        
        // same_end を除いてfragmentへ追加
        if (en_n != st_n + m) {
            let cloned_t = t.cloneNode(true);
            fragment.appendChild(cloned_t);
        }
    }

    return fragment;
}

export const end_block_extract = (e, f, g) => {

    let fragment = e;
    let st_block = f;
    let en_block = g;

    if (en_block.lastElementChild) {
        en_block.lastElementChild.remove();
    } else {
        if (! en_block.classList.contains("co")) {
            // * 本当の same_end ではない場合、これと同時に「stable」クラスを付与する。
            en_block.classList.add("middlejumper");
            en_block.classList.add("middlejumper_end");
        }
    }

    if (en_block.classList.contains("co")) {
        if (scraps[i + 1]) {
            scraps[i + 1].classList.add("orange_stripe_maybe_continue");
            scraps[i + 1].children[l].classList.add("continue_num_" + same_num);
        } 
        en_block.classList.remove("same_end");
        en_block.classList.remove("co");
    } else {
        // この時点での same_end の中身をこちらにコピー.
        en_block.classList.add("same_end");
        let the_t = "id_is_" + target_data(en_block, "id_is_");
        let hit_target = document.getElementsByClassName(the_t)[document.getElementsByClassName(the_t).length - 1];
        let the_natural_cont = hit_target.lastElementChild.cloneNode(true);
        // * dupブロックだった場合を想定. 
        en_block.appendChild(the_natural_cont);
    }

    // * same と関連性のない actuar の処理
    if (en_a != "NONE") {
        en_block.classList.add("actuar_en");
        en_block.classList.add("actuar_time_" + en_a);
    }

    // * fragmentへ追加
    let cloned_f = en_block.cloneNode(true);
    fragment.appendChild(cloned_f);

    return fragment;
}