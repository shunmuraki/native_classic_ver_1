export const delete_all_concealer = () => {
    let concealers = document.querySelectorAll(".concealer");
    if (concealers.length > 0) {
        for (let i = concealers.length - 1; i >= 0; i--) {
            concealers[i].remove();
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * concealer を作成して追加する関数.
export const trace_original_to_concealer = () => {
    let the_name = "same_num_" + the_num;
    let special_cov = same_concealer_make(e, the_num);
    let hit_target = document.getElementsByClassName(the_name)[document.getElementsByClassName(the_name).length - 1];
    
    // * もし iframe だった場合 YT player を生成するようにする。
    // * ！cloneNode() はここでは使用しない！
    if (hit_target.lastElementChild) {

        if (hit_target.lastElementChild.tagName == "IFRAME") {

            let special_playerlist = native_value("special_playerlist");
            let the_code = target_data(hit_target, "id_is_");
            set("s_s_num", s => s+= 1);
            let the_keyname = String("yt_editor_" + get("s_s_num"));
            let the_sp_if = document.createElement("div");
            the_sp_if.setAttribute("id", the_keyname);
            classmover(hit_target.lastElementChild, the_sp_if, "style_", "add");
            special_cov.appendChild(the_sp_if);
            let pl = block_multiable(the_keyname, the_code);
            special_playerlist[the_keyname] = pl;
            // * ブロックのスタイル維持のため.
            special_cov.classList.add("video");
            // * Escape後にiframeが復活するように id_is_ を複製したすべてにセット.
            // [* 正直意味が分からない.]
            special_cov.classList.add("id_is_" + the_code);

        } else {

            let the_one = hit_target.lastElementChild.cloneNode(true);
            special_cov.appendChild(the_one);
            if (the_one.tagName == "IMG") {
                // * スタイル維持のため.
                special_cov.classList.add("img");
                special_cov.style.height = 225 + "px";
            }
            
        }

        hit_target.lastElementChild.style.setProperty('opacity', 0, 'important');
    }
}

// * concealer の中身を same_start や same_end に戻すオブジェクト.
export const trace_concealer_to_original = (e) => {
    let same_concealer = get_correspond_same_concealer(e);
    let content = null;   
    // * 削除する前に same_start が右隣の場合にコンテントを一時的に same_startへ移してあげる.
    // * そして再度 same_start が centering した時にその中身を取り除くようにする.
    if (same_concealer) {
        if (same_concealer.lastElementChild) {
            content = same_concealer.lastElementChild.cloneNode(true);
            set("same_start_content", s => s = content);
        }
        same_concealer.remove();
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * special_cov関連の関数を束ねたもの.
export const concealer_management = (e) => {
    let wrapper_index = get_wrapper_index(e);
    let list_wrappers = wrapper_index.children;
    let centering_num = [].slice.call(get_block_list(e).children).indexOf(e);
    for (let i = 0; i < list_wrappers.length; i++) {
        if (i == 0 && list_wrappers[0].classList.contains("orange_space")) {
        } else {
            let blocks = list_wrappers[i].lastElementChild.children;
            concealer_activate_check(blocks[centering_num]);
            concealer_inactivate_check(blocks[centering_num]);
        }
    }
}