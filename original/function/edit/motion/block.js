// * 編集モードにおいて 上 のブロックへ移動する関数.
export const edit_block_go_up = () => {
    let edit_env = keytouch_setup();
    if (edit_env.wrapper_index.previousElementSibling) { 
        // * orange_stripe が完結しているかを確認して数を合わせる.
        set("orange_data", s => s = pre_pointing_in(the_see_centering, get("orange_data")));
        // [* ここで以下を実行する意味が不明.]
        principle_management(edit_env.wrapper_index.previousElementSibling, "block_motion");
        // * センタリングしている scrap には「see」クラスが付与される.
        edit_env.wrapper_index.classList.toggle("edit_centerd_wrapper_index");
        edit_env.wrapper_index.previousElementSibling.classList.toggle("edit_centerd_wrapper_index");

        // * 編集モードだった場合.
        // [* go_top() から移植.]
        if (pre_sibling) {
            // [* これの存在意義が分からない.]
            go_af_scroll();
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.children[1].lastElementChild.lastElementChild;
            centering_marker(ver, next_one, f);
            let now_position = pre_sibling.children[1].lastElementChild.scrollLeft;
            let the_distance = full_end_scrollwidth - now_position;
            // * 移動先のラインの scrollLeft を調整.
            all_view_changer(pre_sibling, the_distance);
            let my_position = this_sc.children[1].lastElementChild.scrollLeft;
            let my_distance = full_start_scrollwidth - my_position;
            // * 移動元のラインの scrollLeft を調整.
            all_view_changer(this_sc, my_distance);    
            special_cleaner(edit_env.wrapper_index);
            cs_bye();
            // * 編集モードでは「see」ラインの位置を維持.
            scrollBy(0, - connected_your_height);
            same_concealer_management(next_one);
        }

        // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
        set("the_scrolled_distance", s => s = 0);
    }
}

// * 編集モードにおいて 左 のブロックへ移動する関数.
export const edit_block_go_left = () => {
    let edit_env = edit_keytouch_setup();
    go_left(edit_env.block);
    set("the_scrolled_distance", s => s = 0);
}

// * 編集モードにおいて 右 のブロックへ移動する関数.
export const edit_block_go_right = () => {
    let edit_env = edit_keytouch_setup();
    go_right(edit_env.block);
    set("the_scrolled_distance", s => s = 0);
}

// * 編集モードにおいて 下 のブロックへ移動する関数.
export const edit_block_go_bottom = () => {
    let edit_env = edit_keytouch_setup();
    if (edit_env.wrapper_index.nextElementSibling) {
        set("orange_data", s => s = orange_stripe_pre_end(edit_env.wrapper_index, get("orange_data")));
        set("orange_data", s => s = orange_stripe_pre_start(edit_env.wrapper_index, edit_env.wrapper_index.nextElementSibling, get("orange_data")));
        // [* ここで以下を実行する意味が不明.]
        motion_type_management(edit_env.wrapper_index.nextElementSibling, "principle_block");
        edit_env.wrapper_index.classList.toggle("edit_centerd_wrapper_index");
        edit_env.wrapper_index.nextElementSibling.classList.toggle("edit_centerd_wrapper_index");
        // [* go_bottm() から移植.]
        if (pre_sibling) {
            // [* これの存在意義が分からない.]
            go_af_scroll();
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.children[1].lastElementChild.children[1];
            centering_marker(ver, next_one, f);        
            let now_position = pre_sibling.children[1].lastElementChild.scrollLeft;
            let the_distance = full_start_scrollwidth - now_position;
            // * 移動先のラインの scrollLeft を調整.
            all_view_changer(pre_sibling, the_distance);    
            let my_position = this_sc.children[1].lastElementChild.scrollLeft;
            let my_distance = full_end_scrollwidth - my_position;
            // * 移動元のラインの scrollLeft を調整.
            all_view_changer(this_sc, my_distance);
            special_cleaner(edit_env.wrapper_index);
            cs_bye();
            // * 編集モードでは「see」ラインの位置を維持.
            scrollBy(0, connected_your_height);
            same_concealer_management(next_one);
        }
        
        // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
        set("the_scrolled_distance", s => s = 0);
    }
}