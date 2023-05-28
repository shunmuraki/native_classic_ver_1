// * 編集モードにおいて 上 のブロックへ移動する関数.
export const keytouch_edit_command_block_arrow_top = () => {    
    if (the_see_centering.previousElementSibling) { 
        let env = keytouch_setup();
        // * orange_stripe が完結しているかを確認して数を合わせる.
        set("orange_data", s => s = pre_pointing_in(the_see_centering, get("orange_data")));
        // [* ここで以下を実行する意味が不明.]
        principle_management(the_see_centering.previousElementSibling, "principle_block");
        // * センタリングしている scrap には「see」クラスが付与される.
        the_see_centering.classList.toggle("see");
        the_see_centering.previousElementSibling.classList.toggle("see");
        
        
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
            special_cleaner(vertical_to_sp_cover(ver));   
            cs_bye();
            // * 編集モードでは「see」ラインの位置を維持.
            scrollBy(0, - connected_your_height);
            is_it_same_series(next_one);
        }

        // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
        set("the_scrolled_distance", s => s = 0);
    }
}

// * 編集モードにおいて 左 のブロックへ移動する関数.
export const keytouch_edit_command_block_arrow_left = () => {
    let env = keytouch_setup();
    go_left(new_layer_centering, "new_layer_centering");
    set("the_scrolled_distance", s => s = 0);
}

// * 編集モードにおいて 右 のブロックへ移動する関数.
export const keytouch_edit_command_block_arrow_right = () => {
    let env = keytouch_setup();
    go_right(new_layer_centering, "new_layer_centering");
    set("the_scrolled_distance", s => s = 0);
}

// * 編集モードにおいて 下 のブロックへ移動する関数.
export const keytouch_edit_command_block_arrow_bottom = () => {
    if (the_see_centering.nextElementSibling) {
        let env = keytouch_setup();
        set("orange_data", s => s = pre_pointing_in(the_see_centering, get("orange_data")));
        set("orange_data", s => s = pre_pointing_out(the_see_centering, the_see_centering.nextElementSibling, get("orange_data")));
        // [* ここで以下を実行する意味が不明.]
        principle_management(the_see_centering.nextElementSibling, "principle_block");
        the_see_centering.classList.toggle("see");
        the_see_centering.nextElementSibling.classList.toggle("see");
 
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
            special_cleaner(vertical_to_sp_cover(ver));     
            cs_bye();
            // * 編集モードでは「see」ラインの位置を維持.
            scrollBy(0, connected_your_height);
            is_it_same_series(next_one);
        }
        
        // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
        set("the_scrolled_distance", s => s = 0);
    }
}