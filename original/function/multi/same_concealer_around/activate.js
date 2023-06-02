// * special_cov を作成して追加する関数.
export const same_concealer_activation_setup = () => {
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

// * 追加した special_cov の YT Iframe を再生する関数.
function play_around() {
    if (player) {
        let the_name = "same_num_" + target_data(special_cov, "this_cov_is_");
        just_clear_yt_loop(the_name);
        setTimeout(() => {
            let the_time = yt_resetter(e);
            player.seekTo(the_time);
            player.playVideo();
            yt_loop_player(player, e, the_name);
        }, 1000)
    }
}