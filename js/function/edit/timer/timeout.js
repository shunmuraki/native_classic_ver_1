// * ５秒おきに実行されるタイマー処理(setTimeout)をセットする関数.
export const set_timeout = () => {
    set("timeoutArray", s => s.push(the_timeout()));
}

// * ５秒ごとに実行される s_timeout (the_timeout によってセットされる) を解除する関数.
export const the_clear_timeout = () => {
    // 戻り値を取得しつつ、shift() 実行後の timeoutArray を取得しておく。
    let array = get("timeoutArray");
    let the_v = timeout.shift();
    set("timeoutArray", s => s = array);
    clearTimeout(the_v);
}

// * オートシーキング中に５秒おきに実行する処理を作成して返す関数.
export const the_timeout = (e, f, g, h, j) => {
    
    let scrap = e;
    let hor = f;
    let pause_when = g;
    let play_when = h;
    let the_seeking_time = j;

    // * 核となるタイマー処理.
    let s_timeout = setTimeout(() => {    
        let centering_you = document.getElementsByClassName("new_layer_centering")[0];
        if (centering_you.nextElementSibling && scrap.classList.contains("playing")) {
            let next_one_is_you = centering_you.nextElementSibling;
            let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);
            centering_marker(centering_you, next_one_is_you, "new_layer_centering");
            is_it_same_series(next_one_is_you);
           
            // 自身を次のタイマーとして追加(高等技術).
            set_timeout();
            centering = document.getElementsByClassName("new_layer_centering")[0];

            // このあたりをループにする connected に対応させる.
            for (let i = 0; i < scrap.children.length; i++) {
                // orange_space を弾く.
                if (i > 0) {
                    let horizon = scrap.children[i].lastElementChild;
                    for (let o = 0; o < horizon.children.length; o++) {
                        let the_block = horizon.children[the_block_num + 2];
                        let the_special_cov = which_special_is(the_block);
                        if (the_special_cov) {
                            // 新しいspecial_covが台頭する時.                                
                            if (! the_special_cov.isEqualNode(which_special_is(centering))) {
                                the_clear_timeout();
                                the_clear_interval();
                                let player;
                                if (the_special_cov.lastElementChild) {
                                    if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                                        player = yt_player_getter(the_special_cov.lastElementChild); 
                                    }
                                }
                                // * 次のブロックを参照してから続きの処理を決定.
                                // [* もう少しちゃんと理解したい.]
                                setTimeout(() => {
                                    if (player) {
                                        player.pauseVideo();
                                        let the_time = yt_resetter();
                                        player.seekTo(the_time);
                                        player.playVideo();
                                    }        
                                    // この setTimeout１秒分を考慮する.
                                    let ms = pause_when - play_when;
                                    the_seeking_time = (blocktime * 1000) - ms;
                                    set_timeout();
                                    set_interval();
                                }, 1000)
                            }
                        }
                    }
                }
            }
        } else {
            // * timeoutArray についても読み込む必要があったりするよね.
            the_clear_timeout();
        }
    }, the_seeking_time);

    // * タイマー処理を返す.
    return s_timeout;
}