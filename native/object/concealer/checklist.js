export const go_right_from_samestart_block = () => {
    // * ・・・・・・・・・・・・・・・・・・・「左から右に向かって移動した時に移動元が same_start でした」ケース
    // * 同じ same_num を持つ same_start の content があれば削除.
    if (the_target_left.lastElementChild) {
        the_target_left.lastElementChild.style.setProperty('opacity', 0, 'important');
        let d = the_target_left.lastElementChild;
        d.remove();
    }
}


export const go_right_from_sameend_block = () => {
    // * 領域を出た YT の Player の再生を停止する.
    player_setup(the_target_left); 
    if (wrapper_index.classList.contains("pausing")) {
        if (player) {
            if (get_correspond_same_concealer(the_target_left)) {
                let the_name = "same_num_" + target_data(get_correspond_same_concealer(the_target_left), "this_cov_is_");
                player.pauseVideo();
                let the_time = yt_player_reset(the_target_left);
                player.seekTo(the_time);
                yt_loop_stop(player, "end", the_name);
            }
        }
    }
    
    trace_concealer_to_original(the_target_left);
    
    if (the_target_left.lastElementChild) {
        if (! the_target_left.classList.contains("stable")) {
            the_target_left.lastElementChild.style.setProperty('opacity', 1, 'important');
        }
    } 
}

// ---------------------------------------------------------------------------------------------------------------

export const go_left_from_samestart_block = () => {
    yt_player_setup(the_target_right);
    if (wrapper_index.classList.contains("pausing")) {
        if (player) {
            if (get_correspond_same_concealer(the_target_right)) {
                let the_name = "same_num_" + get_value(get_correspond_same_concealer(the_target_right), "this_cov_is_");
                player.pauseVideo();
                let the_time = yt_player_reset(the_target_right);
                player.seekTo(the_time);
                yt_loop_stop(player, "start", the_name);
            }
        }
    }
    
    // * same_start に special_cov の content を一時的に複製して格納.
    trace_concealer_to_original(the_target_right);

    if (the_target_right.lastElementChild) {
        the_target_right.lastElementChild.remove();
    }
    
    // * ここがカギ.
    // * っていうか same_start_content とか絶対グローバルなのおかしいでしょ.
    the_target_right.appendChild(get("same_start_content"));
}


export const go_left_from_sameend_block = () => {
    if (the_target_right.lastElementChild) {
        the_target_right.lastElementChild.style.setProperty('opacity', 0, 'important');
    }
}