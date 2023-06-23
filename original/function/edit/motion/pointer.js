import { get_the_block_index_num } from "../../tool";

// * 編集モードにおいて 上 のポインターに移動する関数.
export const edit_pointer_go_top = () => {
    let edit_env = edit_keytouch_setup();
    let edit_wrapper_index_num = get_the_block_index_num(element(".edit_display"), edit_env.wrapper_index);
    // * スクロール位置の調整のため現在地を控えておく.
    let edit_wrapper_index_margin_top = edit_env.wrapper_index.getBoundingClientRect().top;
    while (edit_wrapper_index_num >= 1) {
        // [*  もっと簡単に調べられるようにするべき.]
        if (get_orange_pointer_store_space(edit_env.wrapper_index).previousElementSibling.childElementCount != 0) {
            // * もとの the_see_centering からクラスを外す.
            edit_env.wrapper_index.classList.toggle("edit_centerd_wrapper_index");
            // * 更新.
            let next_centered_edit_wrapper_index = edit_display.children[edit_wrapper_index_num + 1];
            let next_orange_pointer_space = get_orange_pointer_space(next_centered_edit_wrapper_index);
            let centered_pointer = element(".centered_pointer");
            centerd_pointer_management("top", centered_pointer, next_centered_edit_wrapper_index);
            if (centered_pointer.classList.contains("deleted_pointer")) {
                centered_pointer.remove();
            }
            // * orange_stripe が完結しているかを確認して数を合わせる.
            set("orange_data", s => s = orange_stripe_pre_end(edit_env.wrapper_index, get("orange_data")));
            let current_scrollleft = element(".centered_pointer").parentElement.parentElement.scrollLeft;
            let gap = target_data(element(".centered_pointer"), "scroll_left_") - current_scrollleft;
            // * 移動先の scrap の scrollLeft を調整.
            all_view_changer(next_centered_edit_wrapper_index, gap);
            // [* ここで以下を実行する意味が不明.]
            motion_type_management(edit_env.wrapper_index.previousElementSibling, "pointer_motion");
            let nextstep = best_related_element(next_centered_edit_wrapper_index, next_orange_pointer_space.scrollLeft, "block", get("orange_data"));
            // * センタリングしている scrap には「see」クラスが付与される.
            next_centered_edit_wrapper_index.classList.toggle("edit_centered_wrapper_index");
            let vertical_gap = next_centered_edit_wrapper_index.getBoundingClientRect().top - edit_wrapper_index_margin_top;
            // * edit モードでは「see」ラインの高さを維持する.
            scrollBy(0, vertical_gap);
            wheel_positioning();
            // * 取得の仕方を改めろ。
            let next_block = nextstep[0];
            same_concealer_management(next_block);
            // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
            set("the_scrolled_distance", s => s = 0);
            break;
        } 
    }   
}

// * 編集モードにおいて 下 のポインターに移動する関数.
export const edit_pointer_go_bottom = () => {

    let edit_env = edit_keytouch_setup();
    let bottom_num = new_layer.childElementCount - 1;
    let edit_wrapper_index_num = get_the_block_index_num(edit_env.wrapper_index);
    // * スクロール位置の調整のため現在地を控えておく.
    let edit_wrapper_index_margin_top = edit_env.wrapper_index.getBoundingClientRect().top;
    while (edit_wrapper_index_num < bottom_num) {
        if (get_orange_pointer_store_space(edit_env.wrapper_index.nextElementSibling).childElementCount != 0) {
            // * もとのthe_see_centeringからクラスを外す.
            edit_env.wrapper_index.classList.toggle("edit_centered_wrapper_index");
            // * 更新.
            let next_edit_centered_wrapper_index = element(".edit_display").children[the_countingstart_bottom + 1];
            let next_orange_pointer_space = edit_centered_wrapper_index.nextElementSibling.firstElementChild.firstElementChild;
            let centered_pointer = document.querySelector(".centered_pointer");
            // * orange_stripe が完結しているかを確認して数を合わせる.
            set("orange_data", s => s = orange_stripe_pre_end(edit_centered_wrapper_index, get("orange_data")));
            set("orange_data", s => s = orange_stripe_pre_start(edit_centered_wrapper_index, edit_centered_wrapper_index.nextElementSibling, get("orange_data")));
            motion_type_management("bottom", centered_pointer, edit_centered_wrapper_index);
            if (centered_pointer.classList.contains("deleted_pointer")) {
                centered_pointer.remove();
            }
            
            let current_scrollleft = element(".centered_pointer").parentElement.parentElement.scrollLeft;
            let gap = target_data(element(".centered_pointer"), "scroll_left_") - current_scrollleft;
            // * 移動先の scrap の scrollLeft を調整.
            all_view_changer(next_edit_centered_wrapper_index, the_gap);
            principle_management(next_edit_centered_wrapper_index, "motion_pointer");
            let nextstep = best_related_element(next_edit_centered_wrapper_index, next_orange_pointer_space.scrollLeft, "block", get("orange_data"));
            // * 再度更新.
            next_edit_centered_wrapper_index.classList.toggle("edit_centered_wrapper_index");
            edit_centered_wrapper_index = next_edit_centered_wrapper_index.nextElementSibling;
            let vertical_gap = next_edit_centered_wrapper_index.getBoundingClientRect().top - edit_wrapper_index_margin_top;
            // * edit モードでは「see」ラインの高さを維持.
            scrollBy(0, vertical_gap);
            wheel_positioning();
            // * 正す！！！
            let next_block = nextstep[0];
            same_concealer_management(next_block);
            // [* これがひとつ目の問いで、 the_scrolled_distance は何の目的で用意されているのか.]
            set("the_scrolled_distance", s => s = 0);
            break;
        }
    }    
}

// * 編集モードにおいて 左 のポインターに移動する関数.
export const edit_pointer_go_left = () => {
    let centered_pointer = element(".centered_pointer");
    let next_pointer = centered_pointer.previousElementSibling;
    if (next_pointer) {
        let edit_env = edit_keytouch_setup();
        let gap = target_data(next_pointer, "scroll_left_") - centered_pointer.parentElement.parentElement.scrollLeft;
        all_view_changer(edit_env.wrapper_index, gap);
        comesin_management("left", centered_pointer, edit_env.wrapper_index);
        // [* opac_com は僕に何を教えてくれるのだろうか.]
        if (centered_pointer.classList.contains("deleted_pointer")) {
            centered_pointer.remove();
        }
        // * ポインター移動によって変化したラインにおいて、ブロックについても表示内容を同期する必要がある.
        // * 直す！
        let nextstep = best_related_element(edit_env.wrapper_index, edit_env.orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let next_block = nextstep[0];
        // * 直す！
        same_concealer_management(next_block);
        // [* これの存在意義が分からない.]
        set("the_scrolled_distance", s => s = 0);
    }
}

// * 編集モードにおいて 右 のポインターに移動する関数.
export const keytouch_edit_command_pointer_arrow_right = () => {
    let centered_pointer = element(".centered_pointer");
    let next_pointer = centered_pointer.nextElementSibling;
    if (next_pointer) {
        let edit_env = keytouch_setup();
        let gap = target_data(next_pointer, "scroll_left_") - centered_pointer.parentElement.parentElement.scrollLeft;
        all_view_changer(edit_env.wrapper_index, gap);
        comesin_management("right", centered_pointer, edit_env.wrapper_index);
        // [* opac_com は僕に何を教えてくれるのだろうか.]
        if (centered_pointer.classList.contains("deleted_pointer")) {
            centered_pointer.remove();
        }
        // * ポインター移動によって変化したラインにおいて、ブロックについても表示内容を同期する必要がある.
        // * 直す！
        let nextstep = best_related_element(edit_env.wrapper_index, edit_env.edit_orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let next_block = nextstep[0];
        // * 直す！
        same_concealer_management(next_block);
        // [* これの存在意義が分からない.]
        set("the_scrolled_distance", s => s = 0);
    }
}