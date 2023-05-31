// * １秒おきに実行されるタイマー処理(setInterval)をセットする関数.
export const seek_and_actuareffect_overwrap_activate = () => { 
    set("intervalArray", s => s.push(seek_and_actuareffect_overwrap()));
}

// * １秒ごとに実行される s_interval (the_interval によってセットされる) を解除する関数.
export const seek_and_actuareffect_overwrap_cancel = () => { 
    // * 戻り値を取得しつつ、shift() 実行後の timeoutArray を取得しておく。
    let array = get("intervalArray");
    let the_v = array.shift();
    set("intervalArray", s => s = array);
    clearTimeout(the_v);
}

// * オートシーキング中に 1秒ごとに実行する処理を作成して返す関数.
export const seek_and_actuareffect_overwrap = (e, f) => {
    
    let scrap = e;
    let hor = f;

    let s_interval = setInterval(() => {
        all_view_changer(scrap, blocksize / blocktime);
        let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);                        
        let the_pri_distance = window.innerWidth + (the_block_num * blocksize) - half_left_width;         
        // * 現在の 実際の hor の scrollLeft とそれがどれくらい離れているかの算出.
        let the_gap =  hor.scrollLeft - the_pri_distance;
        // * actuar の変化処理については connected の場合を想定して scrap 内の　sp - hor でループさせる必要がある.
        for (let i = 0; i < scrap.children.length; i++) {
            // * orange_space を弾く.
            if (i > 0) {
                let horizon = scrap.children[i].lastElementChild;
                for (let o = 0; o < horizon.children.length; o++) {
                    let the_block = horizon.children[the_block_num + 1];
                    let the_special_cov = which_special_is(the_block);
                    // * 自動シーキング中のacutar 描画.    
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
            if (get("intervalArray").length > 0) {
                seek_and_actuareffect_overwrap_cancel();
            }
            scrap.classList.remove("playing");
            scrap.classList.add("pausing");
        }

        set("the_scrolled_distance", s => s + 1);

    }, 1000);

    return s_interval;
}