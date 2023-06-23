// * comesin クラス（最新のorange_pointerを表す）を管理する関数.
export const centered_pointer_management = (e, f, g) => {
    if (document.querySelector(".centered_pointer")) {
        if (e == "top") {
            let next_pointer = g.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.lastElementChild;
            f.classList.toggle("centered_pointer");
            next_pointer.classList.toggle("centered_pointer");
        } else if (e == "left") {
            let next_pointer = f.previousElementSibling;
            f.classList.toggle("centered_pointer");
            next_pointer.classList.toggle("centered_pointer");
        } else if (e == "bottom") {
            let next_pointer = g.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
            f.classList.toggle("centered_pointer");
            next_pointer.classList.toggle("centered_pointer");
        } else if (e == "right") {
            let next_pointer = f.nextElementSibling;
            f.classList.toggle("centered_pointer");
            next_pointer.classList.toggle("centered_pointer");
        }
    }
}

// * 編集モード での 移動の仕方(ポインター移動 or ブロック移動) を管理する関数.
export const motion_type_management = (wrapper_index, classname) => {
    if (wrapper_index.classList.contains("motion_block")) {
        if ("motion_block" != classname) {
            wrapper_index.classList.remove("motion_block");
            wrapper_index.classList.add(classname);
        }
    } else if (wrapper_index.classList.contains("motion_pointer")) {
        if ("motion_pointer" != classname) {
            wrapper_index.classList.remove("motion_pointer");
            wrapper_index.classList.add(classname);
        }
    } 
}

// * 実行時点でのポインターに最も近いブロックを返す関数.
export const get_nearest_block = (e, f) => {
    let env = e;
    let nearest_block = null;
    let nearest_block_scrollleft = 0; 
    // * 選択中のポインターに最も近いブロック.
    let blocks = env.wrapper_index.firstElementChild.nextElementSibling.lastElementChild.children;
    let exact_distance = f + half_left_width - window.innerWidth;
    let the_num = Math.round(exact_distance / block_width);
    nearest_block = blocks[the_num + 1];
    let boxes_width = block_width * the_num;
    nearest_block_scrollleft = window.innerWidth + boxes_width - half_left_width;
    let output = [nearest_block, nearest_block_scrollleft];
    return output;
}

// * 実行時点でのブロックに最も近いポインターを返す関数.
export const get_nearest_pointer = (e) => {
    let env = e;
    let nearest_pointer = null;
    let nearest_pointer_scrollleft = 0; 
    let orange_space = get_orange_space(env.wrapper_index);
    let orange_pointer_list = get_orange_pointer_store_space(env.wrapper_index);
    // * 選択中のブロックに最も近いポインター.
    // * こちらは orange_data[orange_num_]["left"] の値の集合の中で実行時点での scrollLeft に最も近い値を見つけ、
    // * そこから それがどのポインターの位置に該当するのかを計算.
    let key_num = target_data(orange_space, "orange_num_");
    let dataset = get("orange_data")[key_num]["left"]; 
    // * 最も近い場所にあるポインターの scrollLeft とは、 今の scrollLeft よりも小さい値の集合の中で最大値.
    nearest_pointer_scrollleft = get_nearest_number(dataset);
    let classname_nearest_pointer_have = "scroll_left_" + nearly_left;
    let pointers = orange_pointer_list.children;
    for (let i = 0; i < the_pointers.length; i++) {
        if (pointers[i].classList.contains(classname_nearest_pointer_have)) {
            nearest_pointer = pointers[i];
        }
    }
    let output = [nearest_pointer, nearest_pointer_scrollleft];
    return output;
}

// ---------------------------------------------------------------------------------------------------------------

// * 分割された wrapper_index へ移動元の wrapper_index のブロック群を移す関数.
export const trace_to_edit_wrapper_index = (e) => {
    let wrapper_index = e;
    let list_wrappers = wrapper_index.children;
    let block_num = wrapper_index.length;
    for (let i = 0; i < block_num; i++) {
        let the_block_position_counter = block_num;
        let edit_wrapper_index_num = Math.ceil(the_block_position_counter / 24);
        while (the_block_position_counter >= 0) {
            trace_content_to_empties(list_wrappers[i], element(".edit_display").children(edit_wrapper_index_num).children[i], the_block_position_counter, 0, linesize);
            the_block_position_counter -= linesize;
        }
    }
}

// * 編集モード展開時に強制的に 複数の edit_wrapper_index へ分割された same 群を調整するオブジェクト.
export const same_adaptation_on_edit_display = (e) => {
    let edit_display = element(".edit_display");
    // * [linesize] 個ずつで強制的に区分けされたscrapによって same が分裂したケースに対応.
    for (let i = 0; i < edit_display.childElementCount; i++) {
        for (let o = 1; o < edit_display.children[i].childElementCount; o++) {
            let first_block = edit_display.children[i].children[o].lastElementChild.firstElementChild.nextElementSibling;
            let final_block = edit_display.children[i].children[o].lastElementChild.lastElementChild.previousElementSibling;
            if (first_block.classList.contains("same") && first_block.classList.contains("same_start") == false) {
                first_block.classList.add("same_start");
                // * 編集モードへの展開が、トリミング後に影響しないよう、エスケープ処理に備えて co クラスを付与.
                first_block.classList.add("co");
            }
            if (final_block.classList.contains("same") && final_block.classList.contains("same_end") == false) {
                final_block.classList.add("same_end");
                // * 編集モードへの展開が、トリミング後に影響しないよう、エスケープ処理に備えて co クラスを付与.
                final_block.classList.add("co");
            }
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * 編集モードを実行した際の編集レイヤーの初期位置を調整する関数.
export const edit_display_initial_positioning = (e) => {
    let editor_height = window_height - 100;
    let top_space_height = (editor_height - e.clientHeight) / 2;
    if (editor_height - e.getBoundingClientRect().bottom < top_space_height) {
        let adjust_height = top_space_height + e.getBoundingClientRect().bottom - editor_height;
        scrollBy(0, adjust_height);
        wheel_positioning();
    }
}

// * 以下編集レイヤーのスクロール位置の調整.
export const edit_display_initial_scrollleft = (e) => { 
    let edit_display = element(".edit_display");
    let edit_centered_block = element(".edit_centered_block");
    let edit_centered_block_num = [].slice.call(edit_centered_block.parentElement.children).indexOf(edit_centered_block) - 1;
    let edit_centered_wrapper_index_num = [].slice.call(edit_display.children).indexOf(element(".edit_centered_wrapper_index"));
    let edit_wrapper_indexies = edit_display.children; 
    let initial_scrollleft = blocksize * edit_centered_block_num + window.innerWidth - half_left_width;

    for (let i = 0; i < edit_wrapper_indexies.length; i++) {
        let edit_wrapper_index = edit_wrapper_indexies[i];
        // * <><><><><><><><><<><><> これここでやることでは絶対にない。 <><><><><><><><><<><><>
        // * orange_dataと連携が開始.
        set("orange_data", s => s[i] = {});
        set("orange_data", s => s[i]["s_count"] = 0);
        set("orange_data", s => s[i]["left"] = []);
        // * <><><><><><><><><<><><> これここでやることでは絶対にない。 <><><><><><><><><<><><>
        if (i == edit_centered_wrapper_index_num) {
            for (let o = 0; o < edit_wrapper_index.children.length; o++) {
                // orange_space をスキップ
                if (o == 0) {
                    edit_wrapper_index.children[o].children[0].scrollLeft = initial_scrollleft;
                    edit_wrapper_index.children[o].children[1].scrollLeft = initial_scrollleft;
                }
                if (o > 0) {
                    edit_wrapper_index.children[o].lastElementChild.scrollLeft = initial_scrollleft;
                }
            }
        } else {
            for (let o = 0; o < edit_wrapper_index.children.length; o++) {
                // orange_space をスキップ
                if (o == 0) {
                    edit_wrapper_index.children[o].children[0].scrollLeft = full_start_scrollwidth;
                    edit_wrapper_index.children[o].children[1].scrollLeft = full_start_scrollwidth;
                }
                if (o > 0) {
                    edit_wrapper_index.children[o].lastElementChild.scrollLeft = full_start_scrollwidth;
                }
            }
        }
    }   
}