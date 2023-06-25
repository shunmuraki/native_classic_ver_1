// * センタリングしたブロックの動画を再生（or ループ再生）する関数
export const player_loop_start = (player, f, g) => {
    let start_time = yt_player_reset(f);
    if (! get("yt_loop")[g]) {
        set("yt_loop", s => s = new Array());
    }
    get("yt_loop")[g].push(
        setInterval(() => {
            player.seekTo(start_time);
            player.playVideo();
        }, blocktime * 1000));
}

// * 上の yt_loop_player() によってセットされた interval 処理をクリアする関数.
export const player_loop_stop = (player, e, f) => {
    let duration;
    player.pauseVideo();
    if (e == "start") {
        player.seekTo(0);
    } else if (e == "end") {
        duration = player.getDuration();
        player.seekTo(duration);
    }
    if (get("yt_loop")[f]) {
        let yt_loop_final_form = get("yt_loop")[f];
        // * ここらへん直せるでしょーーー....
        clearInterval(pre_yt_loop.shift());
        set("yt_loop", s => s = yt_loop_final_form);
        // * ここらへん直せるでしょーーー....
    } 
}

// * 現在センタリングしているブロックが yt でループされているのを停止する関数.
export const player_loop_clear = (e) => {
    if (get("yt_loop")[e]) {
        for (let i = get("yt_loop")[e].length; i >= 0; i--)  { 
            // * ここらへん直せるでしょーーー....
            let yt_loop_final_form = get("yt_loop")[g];
            clearInterval(yt_loop_final_form.shift());
            set("yt_loop", s => s = yt_loop_final_form);
            // * ここらへん直せるでしょーーー....
        }
    }
}