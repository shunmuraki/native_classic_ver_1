// * special_cov 向けでない、通常の YT Player の束から該当するプレイヤーを返す関数.
export const yt_player_getter = (e) => {
    let the_keyid = e.id;
    let yt_iframe = null;
    if (the_keyid) {
        // * 動画は必ず same なので special のみから検索.
        yt_iframe = get("special_playerlist")[the_keyid];;
    }
    return yt_iframe;
}

// * yt のプレイヤーのシークポイントを最適化する関数.
export const yt_resetter = (e) => {
    let target;
    if (screen.classList.contains("edit")) {
        let the_see_centering = document.querySelector(".see");
        if (the_see_centering.classList.contains("principle_block")) {
            target = document.getElementsByClassName("new_layer_centering")[0];
          } else if (the_see_centering.classList.contains("principle_pointer")) {
            let orange_data = orange_data_getter();
            let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
            target = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", orange_data)[0];
          }
    } else {
        target = e;
    }
    let the_time = Number(target_data(target, "this_video_st_"));
    return the_time;
}

// ---------------------------------------------------------------------------------------------------------------

// * センタリングしたブロックの動画をブロック分再生（or ループ再生）する関数
export const yt_loop_player = (e, f, g) => {
    let the_time = yt_resetter(f);

    if (! get("yt_loop")[g]) {
        set("yt_loop", s => s = new Array());
    }
    get("yt_loop")[g].push(
        setInterval(() => {
            e.seekTo(the_time);
            e.playVideo();
        }, blocktime * 1000));
}

// * 上の関数によってセットされた interval 処理をクリアする関数.
export const yt_loop_stopper = (e, f, g) => {
    let duration;
    e.pauseVideo();
    if (f == "start") {
        e.seekTo(0);
    } else if (f == "end") {
        duration = e.getDuration();
        e.seekTo(duration);
    }
    if (get("yt_loop")[g]) {
        // 直してー！
        clearInterval(get("yt_loop")[g].shift());
    } 
}

// * 現在センタリングしているブロックが yt でループされているのを停止する関数.
export const just_clear_yt_loop = (e) => {;
    if (get("yt_loop")[e]) {
        for (let i = get("yt_loop")[e].length; i >= 0; i--)  {
            // 直してー！
            let v = set("yt_loop", s => s[e].shift());
            clearInterval(v);
        }
    }
}