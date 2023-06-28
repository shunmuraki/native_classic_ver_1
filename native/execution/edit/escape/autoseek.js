export const keytouch_edit_command_autoseek_escape = () => {

    set("autoseeked_distance", s => s = 0);
    actuar_start_effect_cancel();
    actuar_end_effect_cancel();
    
    // * 一番近いブロックを探させてcenteringを渡す.
    let edit_wrapper_index = element(".edit_centered_wrapper_index");
    let orange_pointer_space = get_orange_pointer_space(edit_wrapper_index);
    // * comesin があるなら 無条件で クラスを取り外す.
    let centered_pointer = document.querySelector(".centered_pointer");
    if (centered_pointer) {
        centered_pointer.classList.remove("centered_pointer");
    }

    if (edit_wrapper_index.classList.contains("motion_pointer")) {
        
        // * 取得の仕方を改める.
        let nextstep = best_related_element(edit_wrapper_index, orange_pointer_space.scrollLeft, "pointer", get("orange_data"));
        let new_block = nextstep[0];
        let scroll_distance = nextstep[1];
        // * 取得の仕方を改める.

        new_block.classList.add("centered_pointer");
        let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
        all_view_changer(edit_wrapper_index, the_gap);                   

    } else if (edit_wrapper_index.classList.contains("motion_block")) {
        
        // * 取得の仕方を改める.
        let nextstep = best_related_element(edit_wrapper_index, orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let new_block = nextstep[0];
        let scroll_distance = nextstep[1];
        // * 取得の仕方を改める.

        // class_replace() * に書き換えていいでしょう。
        class_replace(element(".edit_centered_block"), new_block, "edit_centered_block");
        let gap = scroll_distance - orange_pointer_space.scrollLeft;
        all_view_changer(edit_wrapper_index, gap);
        concealer_management(new_block);
        
    }

    wheel_positioning();
    element(".edit_display").classList.remove("autoseekingmode");
}