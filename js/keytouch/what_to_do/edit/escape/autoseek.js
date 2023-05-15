export const keytouch_edit_command_autoseek_escape = () => {
    set("the_scrolled_distance", s => s = 0);
    actuar_st_alloff();
    actuar_en_alloff();

    // 一番近いブロックを探させてcenteringを渡すようにする.
    let see_target = document.querySelector(".see");
    let orange_pointer_space = see_target.firstElementChild.firstElementChild;

    // comesin があるなら 無条件で クラスを取り外す.
    let current_comesin = document.querySelector(".comesin");
    if (current_comesin) {
        current_comesin.classList.remove("comesin");
    }

    if (see_target.classList.contains("principle_pointer")) {
        let nextstep = best_related_element(see_target, orange_pointer_space.scrollLeft, "pointer", get("orange_data"));
        let new_one = nextstep[0];
        let scroll_distance = nextstep[1];
        new_one.classList.add("comesin");
        let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
        all_view_changer(see_target, the_gap);                   
    } else if (see_target.classList.contains("principle_block")) {
        let nextstep = best_related_element(see_target, orange_pointer_space.scrollLeft, "block", get("orange_data"));
        let new_one = nextstep[0];
        let scroll_distance = nextstep[1];
        document.querySelector(".new_layer_centering").classList.remove("new_layer_centering");
        new_one.classList.add("new_layer_centering");            
        let the_gap = scroll_distance - orange_pointer_space.scrollLeft;
        all_view_changer(see_target, the_gap);
        is_it_same_series(new_one);
    }

    wheel_positioning();
    new_layer.classList.remove("autoseekingmode");
}