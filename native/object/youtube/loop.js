// * センタリングしたブロックの動画を再生（or ループ再生）する関数
export const player_loop_start = (e, f, g) => {
    let the_time = yt_player_reset(f);
    if (! get("yt_loop")[g]) {
        set("yt_loop", s => s = new Array());
    }
    get("yt_loop")[g].push(
        setInterval(() => {
            e.seekTo(the_time);
            e.playVideo();
        }, blocktime * 1000));
}

// * 上の yt_loop_player() によってセットされた interval 処理をクリアする関数.
export const player_loop_stop = (e, f, g) => {
    let duration;
    e.pauseVideo();
    if (f == "start") {
        e.seekTo(0);
    } else if (f == "end") {
        duration = e.getDuration();
        e.seekTo(duration);
    }
    if (get("yt_loop")[g]) {
        let yt_loop_final_form = get("yt_loop")[g];
        clearInterval(pre_yt_loop.shift());
        set("yt_loop", s => s = yt_loop_final_form);
    } 
}

// * 現在センタリングしているブロックが yt でループされているのを停止する関数.
export const player_loop_clear = (e) => {
    if (get("yt_loop")[e]) {
        for (let i = get("yt_loop")[e].length; i >= 0; i--)  { 
            let yt_loop_final_form = get("yt_loop")[g];
            clearInterval(yt_loop_final_form.shift());
            set("yt_loop", s => s = yt_loop_final_form);
        }
    }
}