// * comesin クラス（最新のorange_pointerを表す）を管理する関数.
export const centered_pointer_management = (e, f, g) => {
    if (document.querySelector(".comesin")) {
        if (e == "top") {
            let next_one = g.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.lastElementChild;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");
        } else if (e == "left") {
            let next_one = f.previousElementSibling;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");
        } else if (e == "bottom") {
            let next_one = g.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");
        } else if (e == "right") {
            let next_one = f.nextElementSibling;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");
        }
    }
}

// * 編集モード での 移動の仕方(ポインター移動 or ブロック移動) を管理する関数.
export const motion_type_management = (e, f) => {
    let wrapper_index = e;
    if (wrapper_index.classList.contains("block_motion")) {
        if ("block_motion" != f) {
            wrapper_index.classList.remove("block_motion");
            wrapper_index.classList.add(f);
        }
    } else if (wrapper_index.classList.contains("pointer_motion")) {
        if ("pointer_motion" != f) {
            wrapper_index.classList.remove("pointer_motion");
            wrapper_index.classList.add(f);
        }
    } 
}

// * 実行時点でのポインターに最も近いブロックを返す関数.
export const get_nearest_block = (e) => {
    let env = e;
    let the_elem = null;
    let the_left = 0; 
    let orange_space = get_orange_space(env.wrapper_index);
    let orange_pointer_list = orange_space.firstElementChild.firstElementChild;
    // * 選択中のポインターに最も近いブロック.
    let blocks = env.wrapper_index.firstElementChild.nextElementSibling.lastElementChild.children;
    let exact_distance = f + half_left_width - window.innerWidth;
    let the_num = Math.round(exact_distance / block_width);
    the_elem = blocks[the_num + 1];
    let boxes_width = block_width * the_num;
    let the_final_num = window.innerWidth + boxes_width - half_left_width;
    the_left = the_final_num;
    let final_data = [the_elem, the_left];
    return final_data;
}

// * 実行時点でのブロックに最も近いポインターを返す関数.
export const get_nearest_pointer = (e) => {
    let env = e;
    let the_elem = null;
    let the_left = 0; 
    let orange_space = get_orange_space(env.wrapper_index);
    let orange_pointer_list = get_orange_pointer_store_space(env.wrapper_index);
    
    // * 選択中のブロックに最も近いポインター.
    // * こちらは orange_data[orange_num_]["left"] の値の集合の中で実行時点での scrollLeft に最も近い値を見つけ、
    // * そこから それがどのポインターの位置に該当するのかを計算.
    let the_key_num = target_data(orange_space, "orange_num_");
    let dataset = get("orange_data")[the_key_num]["left"];
    let exact_distance = f;

    // * 最も近い場所にあるポインターの scrollLeft とは、 今の scrollLeft よりも小さい値の集合の中で最大値.
    the_left = get_nearest_number(dataset);
    let the_name = "scroll_left_" + nearly_left; 
    let the_pointers = orange_pointer_list.children;
    
    for (let i = 0; i < the_pointers.length; i++) {
        if (the_pointers[i].classList.contains(the_name)) {
            the_elem = the_pointers[i];
        }
    }

    let final_data = [the_elem, the_left];
    return final_data;
}

// ---------------------------------------------------------------------------------------------------------------

// * 編集モードを実行した際の編集レイヤーの初期位置を調整する関数.
export const edit_mode_initial_positioning = (e) => {
    let editor_height = window_height - 100;
    let the_up_comming = (editor_height - e.clientHeight) / 2;
    if (editor_height - e.getBoundingClientRect().bottom < the_up_comming) {
        let the_adjust_num = the_up_comming + e.getBoundingClientRect().bottom - editor_height;
        scrollBy(0, the_adjust_num);
        wheel_positioning();
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * 分割された wrapper_index へ移動元の wrapper_index のブロック群を移す関数.
export const trace_to_edit_wrapper_index = (e) => {
    let wrapper_index = e;
    let list_wrappers = wrapper_index.children;
    let n = wrapper_index.length;
    for (let i = 0; i < n; i++) {
        let the_block_position_counter = n;
        let edit_wrapper_index_num = Math.ceil(the_block_position_counter / 24);
        while (the_block_position_counter >= 0) {
            trace_content_to_empties(list_wrappers[i], element(".edit_display").children(edit_wrapper_index_num).children[i], the_block_position_counter, 0, linesize);
            the_block_position_counter -= linesize;
        }
    }
}

// * 編集モード展開時に強制的に 複数の edit_wrapper_index へ分割された same 群を調整するオブジェクト.
export const edit_wrapper_index_same_adaptation = (e) => {
    // * [linesize] 個ずつで強制的に区分けされたscrapによって same が分裂したケースに対応.
    for (let i = 0; i < new_layer.childElementCount; i++) {
        for (let o = 1; o < new_layer.children[i].childElementCount; o++) {
            let the_target_start = new_layer.children[i].children[o].lastElementChild.firstElementChild.nextElementSibling;
            let the_target_end = new_layer.children[i].children[o].lastElementChild.lastElementChild.previousElementSibling;
            if (the_target_start.classList.contains("same") && the_target_start.classList.contains("same_start") == false) {
                the_target_start.classList.add("same_start");
                // * 編集モードへの展開が、トリミング後に影響しないよう、エスケープ処理に備えて co クラスを付与.
                the_target_start.classList.add("co");
            }
            if (the_target_end.classList.contains("same") && the_target_end.classList.contains("same_end") == false) {
                the_target_end.classList.add("same_end"); 
                // * 編集モードへの展開が、トリミング後に影響しないよう、エスケープ処理に備えて co クラスを付与.
                the_target_end.classList.add("co");
            }
        }
    }
}

// * 以下編集レイヤーのスクロール位置の調整.
export const edit_layer_positioning = (e) => {
 let centering_num = [].slice.call(layer_centering.parentElement.children).indexOf(layer_centering) - 1;
 let see = document.querySelector(".see");
 let see_num = [].slice.call(new_layer.children).indexOf(see);
 let scraps = new_layer.children;
 let the_default_scrollleft = blocksize * centering_num + window.innerWidth - half_left_width;
 
 for (let i = 0; i < scraps.length; i++) {
     let scrap = scraps[i];
     // * orange_dataと連携が開始.
     set("orange_data", s => s[i] = {});
     set("orange_data", s => s[i]["s_count"] = 0);
     set("orange_data", s => s[i]["left"] = []);
     if (i == see_num) {
         for (let o = 0; o < scrap.children.length; o++) {
             // orange_space をスキップ
             if (o == 0) {
                 scrap.children[o].children[0].scrollLeft = the_default_scrollleft;
                 scrap.children[o].children[1].scrollLeft = the_default_scrollleft;
             }
             if (o > 0) {
                 scrap.children[o].lastElementChild.scrollLeft = the_default_scrollleft;
             }
         }
     } else {
         for (let o = 0; o < scrap.children.length; o++) {
             // orange_space をスキップ
             if (o == 0) {
                 scrap.children[o].children[0].scrollLeft = full_start_scrollwidth;
                 scrap.children[o].children[1].scrollLeft = full_start_scrollwidth;
             }
             if (o > 0) {
                 scrap.children[o].lastElementChild.scrollLeft = full_start_scrollwidth;
             }
         }
     }
 }   
}