// * the_timeout から独立。
// setTimeout は外に出したらいいか？ func - return か？

// 引数に渡す必要があるものについてリストにしてほしい。
// scrap, hor. pause_when, play_when, the_seeking_time

// 厳密にはまだ引数の部分は接続し切れてないけどね。
export const the_timeout = (e, f, g, h, j) => {
    // push までをセットにしたいかな。
    let scrap = e;
    let hor = f;
    let pause_when = g;
    let play_when = h;
    let the_seeking_time = j;

    // 核となるタイマー処理.
    let s_timeout = setTimeout(() => {    
        let centering_you = document.getElementsByClassName("new_layer_centering")[0];
        if (centering_you.nextElementSibling && scrap.classList.contains("playing")) {
            let next_one_is_you = centering_you.nextElementSibling;
            let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);
            centering_marker(centering_you, next_one_is_you, "new_layer_centering");
            is_it_same_series(next_one_is_you);
            
            // 再帰
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
                            if (! the_special_cov.isEqualNode(which_special_is(centering))) {
                                // 新しいspecial_covが台頭する時.
                                // special_cov = which_special_is(centering);                                            
    
                                the_clear_timeout();
                                the_clear_interval();
    
                                let player;
                                if (the_special_cov.lastElementChild) {
                                    if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                                        player = yt_player_getter(the_special_cov.lastElementChild); 
                                    }
                                }

                                // これって１秒ごとに切り替わったかどうかをチェックしてるってこと？
                                // 5秒の setTime の間に？
                                // 次の要素があることを確認してから実行をしたいんだと思う。
                                // なかなか粋な計らいだと感じたが？
                                setTimeout(() => {
                                    if (player) {
                                        player.pauseVideo();
                                        let the_time = yt_resetter();
                                        player.seekTo(the_time);
                                        player.playVideo();
                                    }        
    
                                    // この setTimeout １秒分を考慮する.
                                    let ms = pause_when - play_when;
                                    // 4秒ってこと？？
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
            // variable
            // timeoutArray についても読み込む必要があったりするよね.
            the_clear_timeout();
        }
    }, the_seeking_time);

    // タイマー処理を返す。
    return s_timeout;
}

// the_interval から外部化したタイマー処理
// scrap, hor, the_scrolled_distance
export const the_interval = (e, f) => {
    
    let scrap = e;
    let hor = f;

    let s_interval = setInterval(() => {
        all_view_changer(scrap, blocksize / blocktime);
        let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);                        
        let the_pri_distance = window.innerWidth + (the_block_num * blocksize) - half_left_width;
                                        
        // 現在の、実際のhorのscrollLeft とそれがどれくらい離れているかの算出.
        let the_gap =  hor.scrollLeft - the_pri_distance;
        
        // actuar の変化処理については connected の場合を想定して scrap 内の　sp - hor でループさせる必要がある.
        for (let i = 0; i < scrap.children.length; i++) {
            // orange_space を弾く.
            if (i > 0) {
                let horizon = scrap.children[i].lastElementChild;
                for (let o = 0; o < horizon.children.length; o++) {
                    let the_block = horizon.children[the_block_num + 1];
                    let the_special_cov = which_special_is(the_block);
                    // 自動シーキング中のacutar 描画.    
                    if (the_block.classList.contains("actuar_st")) {
                        let the_actuar_distance = Math.floor(Number(target_data(the_block, "actuar_time_")));
                        if (the_gap > the_actuar_distance - 10) {
                            if (the_special_cov) {
                                the_special_cov.lastElementChild.style.setProperty('opacity', 1, 'important');
                            } else {
                                the_block.lastElementChild.style.setProperty('opacity', 1, 'important');
                            }
                        }
                    } else if (the_block.classList.contains("actuar_en")) {
                        let the_actuar_distance = Math.floor(Number(target_data(the_block, "actuar_time_")));
                        if (the_gap > the_actuar_distance - 10) {
                            if (the_special_cov) {
                                the_special_cov.lastElementChild.style.setProperty('opacity', 0.5, 'important');
                            } else {
                                the_block.lastElementChild.style.setProperty('opacity', 0.5, 'important');
                            }
                        }
                    }
                }   
            }
        }
    
        if (hor.scrollLeft > full_end_scrollwidth - 110) {
            // variable
            if (get("intervalArray").length > 0) {
                the_clear_interval();
            }
    
            scrap.classList.remove("playing");
            scrap.classList.add("pausing");
        }
    
        set("the_scrolled_distance", s => s + 1);
    
    }, 1000);

    return s_interval;
}


// 二大タイマー処理をここへ。
export const set_timeout = () => {
    // new する必要があるかも.
    set("timeoutArray", s => s.push(the_timeout()));
}

export const set_interval = () => {
    // new する必要があるかも.
    set("intervalArray", s => s.push(the_interval()));
}


export const the_clear_timeout = () => {
    // 戻り値を取得しつつ、shift() 実行後の timeoutArray を取得しておく。
    let array = get("timeoutArray");
    let the_v = timeout.shift();
    set("timeoutArray", s => s = array);
    // variable
    clearTimeout(the_v);
}

export const the_clear_interval = () => { 
    // 戻り値を取得しつつ、shift() 実行後の timeoutArray を取得しておく。
    let array = get("intervalArray");
    let the_v = array.shift();
    set("intervalArray", s => s = array);
    // variable
    clearTimeout(the_v);
}