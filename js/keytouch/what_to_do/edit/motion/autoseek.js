// * 編集モードにおいて、ブロック移動からポインター移動に切り替える関数.
export const keytouch_edit_command_autoseek_arrow_left = () => {
    let env = keytouch_setup();
    let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
    let orange_pointer_list = orange_pointer_space.firstElementChild;
    if (the_see_centering.classList.contains("principle_block")) {
        if (centering) {
            if (centering.classList.contains("opac_cam")) {
                centering.remove();
            }
        }
        if (orange_pointer_list.childElementCount != 0) {
            centering.classList.remove("comesin"); 
            let nextstep = best_related_element(the_see_centering, vertical_to_hor(new_layer_centering).scrollLeft, "pointer", get("orange_data"));
            let new_one = nextstep[0];
            let scroll_distance = nextstep[1];
            new_layer_centering.classList.remove("new_layer_centering");
            new_one.classList.add("comesin");
            let the_gap = scroll_distance - vertical_to_hor(new_layer_centering).scrollLeft;
            all_view_changer(the_see_centering, the_gap);                        
            principle_management(the_see_centering, "principle_pointer");
        }
    } 
    // *  principle_pointer だった場合は何もしない.
}

// * 編集モードにおいて、ポインター移動からブロック移動に切り替える関数.
export const keytouch_edit_command_autoseek_arrow_right = () => {
    let env = keytouch_setup();
    let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
    let orange_pointer_list = orange_pointer_space.firstElementChild;
    if (the_see_centering.classList.contains("principle_pointer")) {
        let nextstep = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let new_one = nextstep[0];
        let scroll_distance = nextstep[1];
        new_one.classList.add("new_layer_centering");                    
        let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
        all_view_changer(the_see_centering, the_gap);
        principle_management(the_see_centering, "principle_block");
        is_it_same_series(new_one);
    }
    // * principle_block だった場合は何もしない.                    
    set("the_scrolled_distance", s => s = 0);
}