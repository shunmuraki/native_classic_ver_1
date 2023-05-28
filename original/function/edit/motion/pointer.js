// * 編集モードにおいて 上 のポインターに移動する関数.
export const keytouch_edit_command_pointer_arrow_top = () => {
    let env = keytouch_setup();
    let the_countingstart_top = elem_post_getter(the_see_centering);
    // * スクロール位置の調整のため現在地を控えておく.
    let the_countingnow_pos = the_see_centering.getBoundingClientRect().top;
    while (the_countingstart_top >= 1) {
        // [*  もっと簡単に調べられるようにするべき.]
        if (new_layer.children[the_countingstart_top].previousElementSibling.firstElementChild.firstElementChild.firstElementChild.childElementCount != 0) {
            // * もとの the_see_centering からクラスを外す.
            the_see_centering.classList.toggle("see");
            // * 更新.
            the_see_centering = new_layer.children[the_countingstart_top];
            let orange_pointer_space = the_see_centering.previousElementSibling.firstElementChild.firstElementChild;
            comesin_management("top", centering, the_see_centering);
            // [* opac_com の削除こそオブジェクトにするべき.]
            if (centering.classList.contains("opac_cam")) {
                centering.remove();
            }
            // * orange_stripe が完結しているかを確認して数を合わせる.
            set("orange_data", s => s = pre_pointing_in(the_see_centering, get("orange_data")));
            let default_distance = document.querySelector(".comesin").parentElement.parentElement.scrollLeft;
            let the_gap = target_data(document.querySelector(".comesin"), "scroll_left_") - default_distance;
            // * 移動先の scrap の scrollLeft を調整.
            all_view_changer(the_see_centering.previousElementSibling, the_gap);
            // [* ここで以下を実行する意味が不明.]
            principle_management(the_see_centering.previousElementSibling, "principle_pointer");
            let nextstep = best_related_element(the_see_centering.previousElementSibling, orange_pointer_space.scrollLeft, "block", get("orange_data"));
            // * センタリングしている scrap には「see」クラスが付与される.
            the_see_centering.previousElementSibling.classList.toggle("see");
            the_see_centering = the_see_centering.previousElementSibling;
            let the_see_centering_height = the_see_centering.getBoundingClientRect().top - the_countingnow_pos;
            // * edit モードでは「see」ラインの高さを維持する.
            scrollBy(0, the_see_centering_height);
            wheel_positioning();
            let new_one = nextstep[0];
            is_it_same_series(new_one);    
            // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
            set("the_scrolled_distance", s => s = 0);
            break;
        }
        the_countingstart_top -= 1;
    }   
}

// * 編集モードにおいて 下 のポインターに移動する関数.
export const keytouch_edit_command_pointer_arrow_bottom = () => {
    let env = keytouch_setup();
    let the_bottom_num = new_layer.childElementCount - 1;
    let the_countingstart_bottom = elem_post_getter(the_see_centering);
    // * スクロール位置の調整のため現在地を控えておく.
    let the_countingnow_pos = the_see_centering.getBoundingClientRect().top;
    while (the_countingstart_bottom < the_bottom_num) {
        if (new_layer.children[the_countingstart_bottom].nextElementSibling.firstElementChild.firstElementChild.firstElementChild.childElementCount != 0) {
            // * もとのthe_see_centeringからクラスを外す.
            the_see_centering.classList.toggle("see");
            // * 更新.
            the_see_centering = new_layer.children[the_countingstart_bottom];
            let orange_pointer_space = the_see_centering.nextElementSibling.firstElementChild.firstElementChild;
            // * orange_stripe が完結しているかを確認して数を合わせる.
            set("orange_data", s => s = pre_pointing_in(the_see_centering, get("orange_data")));
            set("orange_data", s => s = pre_pointing_out(the_see_centering, the_see_centering.nextElementSibling, get("orange_data")));
            comesin_management("bottom", centering, the_see_centering);

            if (centering.classList.contains("opac_cam")) {
              centering.remove();
            }
            
            let default_distance = document.querySelector(".comesin").parentElement.parentElement.scrollLeft;
            let the_gap = target_data(document.querySelector(".comesin"), "scroll_left_") - default_distance;
            // * 移動先の scrap の scrollLeft を調整.
            all_view_changer(the_see_centering.nextElementSibling, the_gap);
            principle_management(the_see_centering.nextElementSibling, "principle_pointer");                                
            let nextstep = best_related_element(the_see_centering.nextElementSibling, orange_pointer_space.scrollLeft, "block", get("orange_data"));
            // * 再度更新.
            the_see_centering.nextElementSibling.classList.toggle("see");
            the_see_centering = the_see_centering.nextElementSibling;
            let the_see_centering_height = the_see_centering.getBoundingClientRect().top - the_countingnow_pos;
            // * edit モードでは「see」ラインの高さを維持.
            scrollBy(0, the_see_centering_height);
            wheel_positioning();
            let new_one = nextstep[0];
            is_it_same_series(new_one);
            // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
            set("the_scrolled_distance", s => s = 0);
            break;
        }
        the_countingstart_bottom += 1;
    }    
}

// * 編集モードにおいて 左 のポインターに移動する関数.
export const keytouch_edit_command_pointer_arrow_left = () => {
    if (centering.previousElementSibling) {
        let env = keytouch_setup();
        let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
        let the_gap = target_data(centering.previousElementSibling, "scroll_left_") - centering.parentElement.parentElement.scrollLeft;
        all_view_changer(the_see_centering, the_gap);           
        comesin_management("left", centering, the_see_centering);  
        // [* opac_com は僕に何を教えてくれるのだろうか.]
        if (centering.classList.contains("opac_cam")) {
            centering.remove();
        }
        // * ポインター移動によって変化したラインにおいて、ブロックについても表示内容を同期する必要がある.
        let nextstep = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let new_one = nextstep[0];
        is_it_same_series(new_one);
        // [* これの存在意義が分からない.]
        set("the_scrolled_distance", s => s = 0);
    }
}

// * 編集モードにおいて 右 のポインターに移動する関数.
export const keytouch_edit_command_pointer_arrow_right = () => {
    if (centering.nextElementSibling) {
        let env = keytouch_setup();
        let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
        let the_gap = target_data(centering.nextElementSibling, "scroll_left_") - centering.parentElement.parentElement.scrollLeft;
        all_view_changer(the_see_centering, the_gap);          
        comesin_management("right", centering, the_see_centering);
        // [* opac_com は僕に何を教えてくれるのだろうか.]
        if (centering.classList.contains("opac_cam")) {
            centering.remove();
        }
        // * ポインター移動によって変化したラインにおいて、ブロックについても表示内容を同期する必要がある.
        let nextstep = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let new_one = nextstep[0];
        is_it_same_series(new_one);
        // [* これの存在意義が分からない.]
        set("the_scrolled_distance", s => s = 0);
    }
}