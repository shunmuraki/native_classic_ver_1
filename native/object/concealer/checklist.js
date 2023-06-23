// * concealer のマネジメント関数の一部。引数に登録するのが吉だとみた。
export const go_right_from_same_start_block = (left_block) => {
    // * ・・・・・・・・・・・・・・・・・・・「左から右に向かって移動した時に移動元が same_start でした」ケース
    // * 同じ same_num を持つ same_start の content があれば削除
    // * the_target_left が定義されていない。
    if (left_block.lastElementChild) {
        left_block.lastElementChild.style.setProperty('opacity', 0, 'important');
        let d = left_block.lastElementChild;
        d.remove();
    }
}

export const go_right_from_same_end_block = (env, left_block, player) => {
    // * 領域を出た YT の Player の再生を停止する.
    player_setup(left_block);
    if (env.wrapper_index.classList.contains("pausing")) {
        if (player) {
            if (get_correspond_same_concealer(left_block)) {
                let classname = "same_num_" + target_data(get_correspond_same_concealer(left_block), "this_cov_is_");
                player.pauseVideo();
                let time_when = yt_player_reset(left_block);
                player.seekTo(time_when);
                yt_loop_stop(player, "end", classname);
            }
        }
    }
    
    trace_concealer_to_original(left_block);
    if (left_block.lastElementChild) {
        if (! left_block.classList.contains("stable")) {
            left_block.lastElementChild.style.setProperty('opacity', 1, 'important');
        }
    } 
}

// ---------------------------------------------------------------------------------------------------------------

// * concealer 用に生成するクラスがあった方がいいのか。
export const go_left_from_same_start_block = (env, right_block, player) => {
    yt_player_setup(right_block);
    // * player が定義されていない。
    if (env.wrapper_index.classList.contains("pausing")) {
        if (player) {
            if (get_correspond_same_concealer(right_block)) {
                let classname = "same_num_" + value(get_correspond_same_concealer(right_block), "this_cov_is_");
                player.pauseVideo();
                let time_when = yt_player_reset(right_block);
                player.seekTo(time_when);
                yt_loop_stop(player, "start", classname);
            }
        }
    }
    
    // * same_start に special_cov の content を一時的に複製して格納.
    trace_concealer_to_original(right_block);
    if (right_block.lastElementChild) {
        right_block.lastElementChild.remove();
    }
    
    // * ここがカギ.
    // * っていうか same_start_content とか絶対グローバルなのおかしいでしょ.
    right_block.appendChild(get("same_start_content"));
}

export const go_left_from_same_end_block = (right_block) => {
    if (right_block.lastElementChild) {
        right_block.lastElementChild.style.setProperty('opacity', 0, 'important');
    }
}