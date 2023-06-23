// * ５秒おきに実行されるタイマー処理(setTimeout)をセットする関数.
export const same_concealer_overwrap_activate = () => {
    set("timeoutArray", s => s.push(same_concealer_overwrap()));
}

// * ５秒ごとに実行される s_timeout (the_timeout によってセットされる) を解除する関数.
export const same_concealer_overwrap_cancel = () => {
    // 戻り値を取得しつつ、shift() 実行後の timeoutArray を取得しておく。
    let array = get("timeoutArray");
    let log = timeout.shift();
    set("timeoutArray", s => s = array);
    clearTimeout(log);
}

// * オートシーキング中に５秒おきに実行する処理を作成して返す関数.
export const same_concealer_overwrap = (edit_env, play_when, pause_when, seeking_duration) => {
    // * 核となるタイマー処理.
    let five_second_timeout = setTimeout(() => {
        let centering_block = document.getElementsByClassName("edit_centered_block")[0];
        if (centering_block.nextElementSibling && scrap.classList.contains("playing")) {
            let next_centering_block = centering_block.nextElementSibling;
            let block_num = Math.floor((edit_env.block_list.scrollLeft + half_left_width - window.innerWidth) / blocksize);
            centering_marker(centering_block, next_centering_block, "edit_centered_block");
            is_it_same_series(next_centering_block);
            // 自身を次のタイマーとして追加(高等技術).
            same_concealer_overwrap_activate();
            let latest_centering_block = document.getElementsByClassName("edit_centered_block")[0];
            for (let i = 0; i < edit_env.wrapper_index.children.length; i++) {
                // orange_space を弾く.
                let horizon = edit_env.wrapper_index.children[i].lastElementChild;
                for (let o = 0; o < horizon.children.length; o++) {
                    let the_block = horizon.children[block_num + 2];
                    let the_same_concealer = which_special_is(the_block);
                    if (the_same_concealer) {
                        // 新しいspecial_covが台頭する時.                                
                        if (! the_same_concealer.isEqualNode(which_special_is(latest_centering_block))) {
                            same_concealer_overwrap_cancel();
                            seek_and_actuareffect_overwrap_cancel();
                            let player;
                            if (the_same_concealer.lastElementChild) {
                                if (the_same_concealer.lastElementChild.tagName == "IFRAME") {
                                    player = yt_player_getter(the_same_concealer.lastElementChild); 
                                }
                            }
                            // * 次のブロックを参照してから続きの処理を決定.
                            // [* もう少しちゃんと理解したい.]
                            setTimeout(() => {
                                if (player) {
                                    player.pauseVideo();
                                    let time_when = yt_resetter();
                                    player.seekTo(time_when);
                                    player.playVideo();
                                }        
                                // * この setTimeout１秒分を考慮する.
                                let gap = pause_when - play_when;
                                seeking_duration = (blocktime * 1000) - gap;
                                same_concealer_overwrap_activate();
                                seek_and_actuareffect_overwrap_activate();
                            }, 1000)
                            // * ここ変数にせなあかんのちゃう？
                        }
                    }
                }
            }
        } else {
            // * timeoutArray についても読み込む必要があったりするよね.
            same_concealer_overwrap_cancel();
        }
    }, seeking_duration);
    // * タイマー処理を返す.
    return five_second_timeout;
}