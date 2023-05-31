// * 編集モードにおいて、ブロック移動からポインター移動に切り替える関数.
// [* switch_to_pointer() に変更]
export const motion_switch_to_pointer = () => {
    let edit_env = edit_keytouch_setup();
    let orange_pointer_space = get_orange_pointer_space(edit_env.wrapper_index);
    let orange_pointer_list = orange_pointer_space.firstElementChild;
    // ]* ここも the_see_centering の定義がされていない.
    // [* 他のオブジェクトとともに、引数にこれを渡すようにするべきか.] 
    if (edit_env.wrapper_index.classList.contains("principle_block")) {
        if (centering) {
            // * センタリングが移動するので、まもなく役割を終える.
            if (centering.classList.contains("deleted_pointer")) {
                centering.remove();
            }
        }
        if (orange_pointer_list.childElementCount != 0) {
            centering.classList.remove("comesin"); 
            let nextstep = best_related_element(edit_env.wrapper_index, get_block_list(edit_env.block).scrollLeft, "pointer", get("orange_data"));
            let new_one = nextstep[0];
            let scroll_distance = nextstep[1];
            new_layer_centering.classList.remove("edit_centerd_block");
            new_one.classList.add("centerd_pointer");
            let the_gap = scroll_distance - vertical_to_hor(new_layer_centering).scrollLeft;
            all_view_changer(edit_env.wrapper_index, the_gap);                        
            motion_type_management(edit_env.wrapper_index, "pointer_motion");
        }
    } 
    // *  principle_pointer だった場合は何もしない.
}

// * 編集モードにおいて、ポインター移動からブロック移動に切り替える関数.
// [* switch_to_block() に変更]
export const motion_switch_to_block = () => {
    let edit_env = edit_keytouch_setup();
    let orange_pointer_space = get_orange_pointer_space(edit_env.wrapper_index);
    if (edit_env.wrapper_index.classList.contains("pointr_motion")) {
        let nextstep = best_related_element(edit_env.wrapper_index, orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let new_one = nextstep[0];
        let scroll_distance = nextstep[1];
        new_one.classList.add("edit_centerd_block");
        let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
        all_view_changer(edit_env.block, the_gap);
        principle_management(edit_env.wrapper_index, "block_motion");
        same_concealer_management(new_one);
    }
    // * principle_block だった場合は何もしない.                    
    set("the_scrolled_distance", s => s = 0);
}