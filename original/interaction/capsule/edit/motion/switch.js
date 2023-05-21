// * 編集モードにおいて、ブロック移動からポインター移動に切り替える関数.
export const keytouch_edit_command_switch_to_pointer = () => {
    let env = keytouch_setup();
    let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
    let orange_pointer_list = orange_pointer_space.firstElementChild;
    // ]* ここも the_see_centering の定義がされていない.
    // [* 他のオブジェクトとともに、引数にこれを渡すようにするべきか.] 
    if (the_see_centering.classList.contains("principle_block")) {
        if (centering) {
            // * センタリングが移動するので、まもなく役割を終える.
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
export const keytouch_edit_command_switch_to_block = () => {
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

// ---------------------------------------------------------------------------------------------------------------


// * 編集モード での 移動の仕方(ポインター移動 or ブロック移動) を管理する関数.
export const principle_management = (e, f) => {
    let scrap = e;
    if (scrap.classList.contains("principle_block")) {
        if ("principle_block" != f) {
            scrap.classList.remove("principle_block");
            scrap.classList.add(f);
        }
    } else if (scrap.classList.contains("principle_pointer")) {
        if ("principle_pointer" != f) {
            scrap.classList.remove("principle_pointer");
            scrap.classList.add(f);
        }
    } 
}
