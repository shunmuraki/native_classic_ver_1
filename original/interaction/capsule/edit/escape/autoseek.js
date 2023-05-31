export const keytouch_edit_command_autoseek_escape = () => {

    set("the_scrolled_distance", s => s = 0);
    actuar_st_effect_cancel();
    actuar_en_effect_cancel();

    // * 一番近いブロックを探させてcenteringを渡す.
    let edit_wrapper_index = document.querySelector(".edit_centered_wrapper_index");
    let orange_pointer_space = get_orange_pointer_space(edit_wrapper_index);

    // * comesin があるなら 無条件で クラスを取り外す.
    let centered_pointer = document.querySelector(".centered_pointer");
    
    if (centered_pointer) {
        centered_pointer.classList.remove("centered_pointer");
    }

    if (edit_wrapper_index.classList.contains("pointer_motion")) {
        
        let nextstep = best_related_element(edit_wrapper_index, orange_pointer_space.scrollLeft, "pointer", get("orange_data"));
        let new_one = nextstep[0];
        let scroll_distance = nextstep[1];
        new_one.classList.add("centered_pointer");
        let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
        all_view_changer(edit_wrapper_index, the_gap);                   

    } else if (edit_wrapper_index.classList.contains("block_motion")) {
        
        let nextstep = best_related_element(edit_wrapper_index, orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let new_one = nextstep[0];
        let scroll_distance = nextstep[1];
        document.querySelector(".edit_centered_block").classList.remove("edit_centered_block");
        new_one.classList.add("edit_centered_block");
        let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
        all_view_changer(edit_wrapper_index, the_gap);
        same_concealer_management(new_one);
        
    }

    wheel_positioning();
    new_layer.classList.remove("autoseekingmode");
}