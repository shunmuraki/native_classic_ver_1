// * このあたりに player_seup() が存在したんだと思う.
export const yt_player_setup = () => {
    let player;
    if (e.lastElementChild) {
        player = get_yt_player(e.lastElementChild);
    }
    return player;
}

// * special_cov 向けでない、通常の YT Player の束から該当するプレイヤーを返す関数.
export const get_yt_player = (e) => {
    let the_keyid = e.id;
    let yt_iframe = null;
    if (the_keyid) {
        // * 動画は必ず same なので special のみから検索.
        yt_iframe = get("special_playerlist")[the_keyid];;
    }
    return yt_iframe;
}

// * yt のプレイヤーのシークポイントを最適化する関数.
export const yt_player_reset = (e) => {
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
    let the_time = Number(target_data(target, "this_video_st_"));
    return the_time;
}

// ---------------------------------------------------------------------------------------------------------------

// * センタリングしたブロックの動画を再生（or ループ再生）する関数
export const yt_loop_start = (e, f, g) => {
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
export const yt_loop_stop = (e, f, g) => {
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

// ---------------------------------------------------------------------------------------------------------------

// * 現在センタリングしているブロックが yt でループされているのを停止する関数.
export const yt_loop_clear = (e) => {;
    if (get("yt_loop")[e]) {
        for (let i = get("yt_loop")[e].length; i >= 0; i--)  { 
            let yt_loop_final_form = get("yt_loop")[g];
            clearInterval(yt_loop_final_form.shift());
            set("yt_loop", s => s = yt_loop_final_form);
        }
    }
}