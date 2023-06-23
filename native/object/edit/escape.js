// * e = scraps , f = extract_data
export const trace_to_default_display = (extract_data) => {
    let edit_wrapper_indexies = element(".edit_display").children;
    // * BANSについてループ
    // * クラスの付与(same_start / same_end / actuar_st / actuar_en / actuar_time_), same_num の変更.
    // * scrap ごとに存在する「BANS」
    // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ], coの関係かどうか.
    for (let i = 0; i < edit_wrapper_indexies.length; i++) {
        let single_extract_data = extract_data[i];
        let list_wrappers = edit_wrapper_indexies[i].children;
        for (let o = 0; o < single_extract_data.length; o++) {
            // * convert_extra_data() をここで実行.
            let data = single_extract_data[o];
            let end_block_actuar_distance = data[1][1];
            for (let l = 1; l < list_wrappers.length; l++) {            
                let fragment = document.createDocumentFragment();
                // st_block と fragmnt を渡す
                fragment.appendChild(start_block_extract(data, list_wrappers[l]));
                // en_block と fragmnt を渡す.
                fragment.appendChild(end_block_extract(end_block_actuar_distance, list_wrappers[l], edit_wrapper_indexies.children[i + 1].children[l]));
                // * fragmentの回帰。
                element(".editing_wrapper_index").children[l - 1].lastElementChild.lastElementChild.before(fragment);
            }
        }
    }   
}

export const extract_start_block = (single_extract_data, list_wrapper) => {
    // * 上で一通り作成した、抽出範囲を示すデータ
    let start_block_num = data[0][0];
    let end_block_num = data[1][0];
    let start_block_actuar_distance = data[0][1];
    // * 最初のブロックと最後尾のブロックの間にどれくらいのブロックが入っているか。
    let between_block_num = end_block_num - start_block_num + 1;

    let latest_fragment = fragment;
    let start_block = list_wrapper.lastElementChild.children[start_block_num];
    // * 新しく配布する same_num_ がいくつかを保存する変数.
    let next_same_num;
    let edit_wrapper_index = element(".edit_display").children[edit_wrapper_index_num];
    // * 最初に nex を決める。
    if (start_block.classList.contains("co") && edit_wrapper_index.classList.contains("orange_stripe_maybe_continue")) {
        start_block.classList.remove("same_start");
        next_same_num = target_data(list_wrapper, "continue_num_");
    } else {
        // * 通常の処理.
        // * 2回分を兼ねている。ローカルのsame_numは -1 を維持。
        set("same_num", s += 2);
        next_same_num = same_num - 1;
        start_block.classList.add("same_start");
    }

    if (start_block.classList.contains("co")) {
        start_block.classList.remove("co");
    }

    // * same と関連性のない actuar の処理
    if (start_block_actuar_distance != "NONE") {
        start_block.classList.add("actuar_st");
        start_block.classList.add("actuar_time_" + start_block_actuar_distance);
    }

    // * nex を用いた、新しいクラスの配布。   
    for (let i = 0; i < between_block_num; i++) {
        let same_block = list_wrapper.lastElementChild.children[st_n + i];
        classmover(same_block, same_block, "same_num_", "remove");
        same_block.classList.add("same_num_" + next_same_num);
        // same_end を除いてfragmentへ追加
        if (end_block_num != start_block_num + i) {
            let cloned_same_block = same_block.cloneNode(true);
            latest_fragment.appendChild(cloned_same_block);
        }
    }
    
    return latest_fragment;
}

export const extract_end_block = (end_block_actuar_distance, list_wrapper, continued_list_wrapper) => {

    let latest_fragment = fragment;
    let end_block = list_wrapper.lastElementChild.children[end_block_num];
    let next_edit_wrapper_index = list_wrapper.parentElement.nextElementSibling;

    if (end_block.lastElementChild) {
        end_block.lastElementChild.remove();
    } else {
        if (! end_block.classList.contains("co")) {
            // * 本当の same_end ではない場合、これと同時に「stable」クラスを付与する。
            end_block.classList.add("middlejumper");
            end_block.classList.add("middlejumper_end");
        }
    }

    if (end_block.classList.contains("co")) {
        if (next_edit_wrapper_index) {
            next_edit_wrapper_index.classList.add("orange_stripe_maybe_continue");
            continued_list_wrapper.classList.add("continue_num_" + same_num);
        } 
        end_block.classList.remove("same_end");
        end_block.classList.remove("co");
    } else {
        // この時点での same_end の中身をこちらにコピー.
        end_block.classList.add("same_end");
        let yt_id_classname = "id_is_" + target_data(end_block, "yt_id_");
        let real_end_block = document.getElementsByClassName(yt_id_classname)[document.getElementsByClassName(yt_id_classname).length - 1];
        let original_content = real_end_block.lastElementChild.cloneNode(true);
        // * dupブロックだった場合を想定. 
        end_block.appendChild(original_content);
    }

    // * same と関連性のない actuar の処理
    if (end_block_actuar_distance != "NONE") {
        end_block.classList.add("actuar_en");
        end_block.classList.add("actuar_time_" + end_block_actuar_distance);
    }    

    // * fragmentへ追加
    let cloned_end_block = end_block.cloneNode(true);
    latest_fragment.appendChild(cloned_end_block);
    return latest_fragment;
}

// ---------------------------------------------------------------------------------------------------------------

export const extract_data_make = (e) => {
    let extract_data;
    for (let i = 0; i < e.length; i++) {
       extract_data.push(extra_data_producer(i));
    }
    return extract_data;
}

// * orange_stripe 上にあるブロックだけを抽出する関数.
// * トリミングの際に実行される.　(/keytouch/what_to_do/edit/escape)
export const extra_data_producer = (e) => {
    // [* cool の宣言が欠けている.]        
    let extract_data_of_each_wrapper_index = new Array();
    // * scrapごとに処理をする。
    let orange_pointers = get_orange_stripe_store_space(edit_wrapper_indexies[e]).children;
    // * stripe ごとに処理する。
    // * stripeの先頭と最後尾のブロックを検出し、それらについての情報を調べて
    // * 「同一scrap内のsp間で共通の選択範囲を示すデータ」を作成する。
    for (let o = 0; o < orange_pointers.length; o++) {
        if (orange_pointers[o].classList.contains("orange_pointer_s")) {
            
            let pointer_s = orange_pointers[o];
            let pointer_f = grab_auto(pointer_s)[1];
            let pointer_s_scrollleft = Number(target_data(pointer_s, "scroll_left_"));
            let pointer_f_scrollleft = Number(target_data(pointer_f, "scroll_left_"));
            
            // * stripeごとの選択範囲を示すデータ。scrap - orange_space ごとに束ねることになる。
            let single_extract_data = new Array();            
            // * pointer_s と pointer_f のポジションをブロック数に変換。
            let head_block_num = Math.trunc((pointer_s_scrollleft - full_start_scrollwidth) / blocksize) + 1;
            let tale_block_num = Math.trunc((pointer_f_scrollleft - full_start_scrollwidth) / blocksize);

            // * 以下 [st] について
            // 差分を取得してこれが 50 以上なら actuar と認定し、same_start と一緒にデータに格納する。
            // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ]]
            let head_block_gap = Math.trunc(pointer_s_scrollleft - full_start_scrollwidth - (blocksize * (head_block_num - 1)));
            if (head_block_actuar_distance > 50) {
                let head_actuar_distance = blocksize - head_block_gap;
                single_extract_data.push([head_block_num, head_actuar_distance]);
            } else {
                single_extract_data.push([head_block_num, "NONE"]);
            }

            // 以下 [en] について
            // 差分を取得してこれが 50 以上なら actuar と認定し、same_start と一緒にデータに格納する。
            // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ], coの関係かどうか]
            let tale_block_gap = Math.trunc(the_pointer_scrollleft_en - full_start_scrollwidth - (blocksize * tale_block_num));
            if (tale_block_gap > 50) {
                single_extract_data.push([tale_block_num, tale_block_gap]);
            } else {
                // co についても処理。
                single_extract_data.push([tale_block_num, "NONE"]);
            }
            extract_data_of_each_wrapper_index.push(single_extract_data);
        }
    }
    return extract_data_of_each_wrapper_index;
}

export const cleanup_editing_wrapper_index = (e) => {
    // * 最初に sp_cover のブロックだけをすべて削除する。
    for (let i = 0; i < element(".editing_wrapper_index").children.length; i++) {
        let blocks = element(".editing_wrapper_index").children[i].lastElementChild.children;
        // * 最後尾のadjusterを残しておく.
        for (let o = blocks.length - 2; o >= 0 ; o--) {
            // * 最初のadjusterも残しておく.
            if (o > 0) { 
                blocks[o].remove();
            }
        }
    }
}
 
export const default_landing_setup = () => {
    let new_centered_block = element(".editing_wrapper_index").lastElementChild.lastElementChild.lastElementChild.previousElementSibling;
    new_centered_block.classList.add("centered_block");
    element(".editing_wrapper_index").classList.remove("edit_centered_wrapper_index");
    element(".editing_wrapper_index").classList.remove("edit_target");
    original_centering_checker(element(".editing_wrapper_index"), new_centered_block);
}

// * 編集モード から デフォルトモード に戻すオブジェクト。
export const back_to_defalutmode = () => {
    let edit_display = element(".edit_display");
    let default_display = element(".default_display");
    let body = element(".body");
    set("orange_data", s => s = 0);
    edit_display.remove();
    default_display.classList.remove("edit_mode");
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
    let final_scrollleft = get_block_list(final_centered_block).scrollLeft;
    all_view_changer(get_wrapper_index(final_centered_block), custom_end_scrollwidth(get_block_list(final_centered_block)) - final_scrollleft);
}

// ---------------------------------------------------------------------------------------------------------------

// * middlejumper を相手型にも付与してセットし切るオブジェクト。
export const complete_middlejumper = (middlejumpers) => {
    for (let i = 0; i < middlejumpers.length; i++) {
        if (middlejumpers[i].nextElementSibling) {
            middlejumpers[i].nextElementSibling.classList.add("middlejumper");
        }
    }   
}