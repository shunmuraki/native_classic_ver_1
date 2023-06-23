// * 編集モードにおいて、ブロック移動からポインター移動に切り替える関数.
// [* switch_to_pointer() に変更]
export const motion_switch_to_pointer = () => {
    let edit_env = edit_keytouch_setup();
    // ]* ここも the_see_centering の定義がされていない.
    // [* 他のオブジェクトとともに、引数にこれを渡すようにするべきか.] 
    let centered_pointer = element((".centered_pointer"));
    if (edit_env.wrapper_index.classList.contains("motion_block")) {
        if (centered_pointer) {
            // * センタリングが移動するので、まもなく役割を終える.
            if (centered_pointer.classList.contains("deleted_pointer")) {
                centered_pointer.remove();
            }
        }
        if (edit_env.orange_pointer_store_space.childElementCount != 0) {
            centered_pointer.classList.remove("comesin"); 
            // * これは取得の仕方がそもそも間違ってる. 最新にしてください。
            let nextstep = best_related_element(edit_env.wrapper_index, get_block_list(edit_env.block).scrollLeft, "pointer", get("orange_data"));
            let next_pointer = nextstep[0];
            let final_scrollleft = nextstep[1];
            // * これは取得の仕方がそもそも間違ってる. 最新にしてください。
            edit_env.block.classList.remove("edit_centerd_block");
            next_pointer.classList.add("centerd_pointer");
            let gap = final_scrollleft - get_block_list(edit_env.block).scrollLeft;
            all_view_changer(edit_env.wrapper_index, gap);
            motion_type_management(edit_env.wrapper_index, "motion_pointer");
        }
    } 
    // *  principle_pointer だった場合は何もしない.
}

// * 編集モードにおいて、ポインター移動からブロック移動に切り替える関数.
// [* switch_to_block() に変更]
export const motion_switch_to_block = () => {
    let edit_env = edit_keytouch_setup();
    if (edit_env.wrapper_index.classList.contains("motion_pointer")) {
        // * これは取得の仕方がそもそも間違ってる. 最新にしてください。
        let nextstep = best_related_element(edit_env.wrapper_index, edit_env.orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let next_block = nextstep[0];
        let final_scrollleft = nextstep[1];
        // * これは取得の仕方がそもそも間違ってる. 最新にしてください。
        next_block.classList.add("edit_centerd_block");
        let gap = final_scrollleft - edit_env.orange_pointer_space.scrollLeft;
        all_view_changer(edit_env.block, gap);
        principle_management(edit_env.wrapper_index, "motion_block");
        same_concealer_management(next_block);
    }
    // * principle_block だった場合は何もしない.                    
    set("the_scrolled_distance", s => s = 0);
}