// * special_cov 向けでない、通常の YT Player の束から該当するプレイヤーを返す関数.
export const get_correspond_player = (e) => {
    let the_keyid = e.lastElementChild.id;
    let player = null;
    if (the_keyid) {
        // * 動画は必ず same なので special のみから検索.
        player = get("special_playerlist")[the_keyid];;
    }
    return player;
}

// * yt のプレイヤーのシークポイントを最適化する関数.
export const player_currenttime_reset = (e) => {
    let target;
    let default_display = element(".default_display");
    if (default_display.classList.contains("edit_mode")) {
        let centered_wrapper_index = element(".centered_wrapper_index");
        if (centered_wrapper_index.classList.contains("block_motion")) {
            target = element(".edit_centered_block");
          } else if (centered_wrapper_index.classList.contains("pointer_motion")) {
            target = best_related_element(centered_wrapper_index, get_orange_pointer_space(centered_wrapper_index).scrollLeft, "block", get("orange_data"))[0];
          }
    } else {
        target = e;
    }
    let the_time = Number(get_value(target, "this_video_st_"));
    return the_time;
}

