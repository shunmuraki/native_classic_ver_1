// * 編集モードにおいて 上 のポインターに移動する関数.
export const edit_pointer_go_top = () => {
    
    let edit_env = edit_keytouch_setup();
    let edit_display = document.querySelector(".edit_display");
    let the_countingstart_top = elem_post_getter(edit_env.wrapper_index);

    // * スクロール位置の調整のため現在地を控えておく.
    let the_countingnow_pos = edit_env.wrapper_index.getBoundingClientRect().top;
    while (the_countingstart_top >= 1) {
        // [*  もっと簡単に調べられるようにするべき.]
        if (get_wrapper_index(edit_display.children[the_countingstart_top].previousElementSibling).childElementCount != 0) {
            // * もとの the_see_centering からクラスを外す.
            edit_env.wrapper_index.classList.toggle("edit_centerd_wrapper_index");
            // * 更新.
            let edit_centerd_wrapper_index = edit_display.children[the_countingstart_top];
            let orange_pointer_space = get_orange_pointer_space(next_centered_edit_wrapper_index);
            let centered_pointer = document.querySelector(".centered_pointer");

            centerd_pointer_management("top", centered_pointer, next_centered_edit_wrapper_index);
            // [* opac_com の削除こそオブジェクトにするべき.]
            if (centered_pointer.classList.contains("deleted_pointer")) {
                centered_pointer.remove();
            }
            
            // * orange_stripe が完結しているかを確認して数を合わせる.
            set("orange_data", s => s = orange_stripe_pre_end(edit_centerd_wrapper_index, get("orange_data")));
            let default_distance = document.querySelector(".centerd_pointer").parentElement.parentElement.scrollLeft;
            let the_gap = target_data(document.querySelector(".centerd_pointer"), "scroll_left_") - default_distance;
            
            // * 移動先の scrap の scrollLeft を調整.
            all_view_changer(edit_centerd_wrapper_index.previousElementSibling, the_gap);
            // [* ここで以下を実行する意味が不明.]
            motion_type_management(edit_centerd_wrapper_index.previousElementSibling, "pointer_motion");
            let nextstep = best_related_element(the_see_centering.previousElementSibling, orange_pointer_space.scrollLeft, "block", get("orange_data"));
            // * センタリングしている scrap には「see」クラスが付与される.
            edit_centerd_wrapper_index.previousElementSibling.classList.toggle("edit_centered_wrapper_index");
            edit_centerd_wrapper_index = edit_centerd_wrapper_index.previousElementSibling;
            let the_see_centering_height = edit_centerd_wrapper_index.getBoundingClientRect().top - the_countingnow_pos;
            // * edit モードでは「see」ラインの高さを維持する.
            scrollBy(0, the_see_centering_height);
            wheel_positioning();
            let new_one = nextstep[0];
            same_concealer_management(new_one);
            // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
            set("the_scrolled_distance", s => s = 0);
            break;
        }
        the_countingstart_top -= 1;
    }   
}

// * 編集モードにおいて 下 のポインターに移動する関数.
export const edit_pointer_go_bottom = () => {

    let edit_env = edit_keytouch_setup();
    let edit_display = document.querySelector(".edit_display");
    let the_bottom_num = new_layer.childElementCount - 1;
    let the_countingstart_bottom = elem_post_getter(the_see_centering);

    // * スクロール位置の調整のため現在地を控えておく.
    let the_countingnow_pos = the_see_centering.getBoundingClientRect().top;
    while (the_countingstart_bottom < the_bottom_num) {
        if (get_orange_pointer_space(edit_display.children[the_countingstart_bottom].nextElementSibling).childElementCount != 0) {
            // * もとのthe_see_centeringからクラスを外す.
            edit_env.wrapper_index.classList.toggle("edit_centered_wrapper_index");
            // * 更新.
            let edit_centered_wrapper_index = new_layer.children[the_countingstart_bottom];
            let orange_pointer_space = edit_centered_wrapper_index.nextElementSibling.firstElementChild.firstElementChild;
            let centered_pointer = document.querySelector(".centered_pointer");

            // * orange_stripe が完結しているかを確認して数を合わせる.
            set("orange_data", s => s = orange_stripe_pre_end(edit_centered_wrapper_index, get("orange_data")));
            set("orange_data", s => s = orange_stripe_pre_start(edit_centered_wrapper_index, edit_centered_wrapper_index.nextElementSibling, get("orange_data")));
            motion_type_management("bottom", centered_pointer, edit_centered_wrapper_index);

            if (centered_pointer.classList.contains("deleted_pointer")) {
                centered_pointer.remove();
            }
            
            let default_distance = document.querySelector(".centered_pointer").parentElement.parentElement.scrollLeft;
            let the_gap = target_data(document.querySelector(".centered_pointer"), "scroll_left_") - default_distance;
            // * 移動先の scrap の scrollLeft を調整.
            all_view_changer(edit_centered_wrapper_index.nextElementSibling, the_gap);
            principle_management(edit_centered_wrapper_index.nextElementSibling, "pointer_motion");
            let nextstep = best_related_element(edit_centered_wrapper_index.nextElementSibling, orange_pointer_space.scrollLeft, "block", get("orange_data"));
            // * 再度更新.
            edit_centered_wrapper_index.nextElementSibling.classList.toggle("edit_centered_wrapper_index");
            edit_centered_wrapper_index = edit_centered_wrapper_index.nextElementSibling;
            let the_see_centering_height = edit_centered_wrapper_index.getBoundingClientRect().top - the_countingnow_pos;
            // * edit モードでは「see」ラインの高さを維持.
            scrollBy(0, the_see_centering_height);
            wheel_positioning();
            let new_one = nextstep[0];
            same_concealer_management(new_one);
            // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
            set("the_scrolled_distance", s => s = 0);
            break;
        }
        the_countingstart_bottom += 1;
    }    
}

// * 編集モードにおいて 左 のポインターに移動する関数.
export const edit_pointer_go_left = () => {
    let centered_pointer = document.querySelector(".centered_pointer");
    if (centered_pointer.previousElementSibling) {
        let edit_env = edit_keytouch_setup();
        let orange_pointer_space = get_orange_pointer_space(edit_env.wrapper_index);
        let the_gap = target_data(centered_pointer.previousElementSibling, "scroll_left_") - centered_pointer.parentElement.parentElement.scrollLeft;
        all_view_changer(edit_env.wrapper_index, the_gap);
        comesin_management("left", centered_pointer, edit_env.wrapper_index);
        // [* opac_com は僕に何を教えてくれるのだろうか.]
        if (centered_pointer.classList.contains("deleted_pointer")) {
            centered_pointer.remove();
        }
        // * ポインター移動によって変化したラインにおいて、ブロックについても表示内容を同期する必要がある.
        let nextstep = best_related_element(edit_env.wrapper_index, orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let new_one = nextstep[0];
        same_concealer_management(new_one);
        // [* これの存在意義が分からない.]
        set("the_scrolled_distance", s => s = 0);
    }
}

// * 編集モードにおいて 右 のポインターに移動する関数.
export const keytouch_edit_command_pointer_arrow_right = () => {
    let centered_pointer = document.querySelector(".centered_pointer");
    if (centered_pointer.nextElementSibling) {
        let edit_env = keytouch_setup();
        let orange_pointer_space = get_orange_pointer_space(edit_env.wrapper_index);
        let the_gap = target_data(centered_pointer.nextElementSibling, "scroll_left_") - centered_pointer.parentElement.parentElement.scrollLeft;
        all_view_changer(edit_env.wrapper_index, the_gap);          
        comesin_management("right", centered_pointer, edit_env.wrapper_index);
        // [* opac_com は僕に何を教えてくれるのだろうか.]
        if (centered_pointer.classList.contains("deleted_pointer")) {
            centered_pointer.remove();
        }
        // * ポインター移動によって変化したラインにおいて、ブロックについても表示内容を同期する必要がある.
        let nextstep = best_related_element(edit_env.wrapper_index, orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let new_one = nextstep[0];
        same_concealer_management(new_one);
        // [* これの存在意義が分からない.]
        set("the_scrolled_distance", s => s = 0);
    }
}