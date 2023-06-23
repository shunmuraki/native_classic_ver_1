// * 編集モード中に control + S が押された際に実行される関数.
// * オートシーキングモードを開始/停止する.
export const keytouch_edit_command_s = () => {

    let edit_env = edit_keytouch_setup();
    let edit_display = document.querySelector(".edit_display");
    
    let play_when;
    let pause_when;
    let the_seeking_time;

    edit_display.classList.add("autoseekingmode");

    let the_block_num = Math.floor((edit_env.block_list.scrollLeft + half_left_width - window.innerWidth) / blocksize);

    pointer_anim();    
    // * actuar_st は途中から始まるわけだから、最初に opacity をいじっておく必要がある.
    actuar_st_effect_activate();

    for (let i = 0; i < edit_env.wrapper_index.children.length; i++) {
        // * orange_space を弾く.
        if (i > 0) {
            let horizon = edit_env.wrapper_index.children[i].lastElementChild;
            for (let o = 0; o < horizon.children.length; o++) {
                let the_block = horizon.children[the_block_num + 1];
                let the_special_cov = which_special_is(the_block);
                if (the_special_cov) {
                    if (the_special_cov.lastElementChild) {
                        if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                            let player = yt_player_getter(the_special_cov.lastElementChild);
                            player.pauseVideo();
                            // * この時点で動画が再生されていた場合にループをストップ.
                            let the_name = "same_num_" + target_data(the_special_cov, "this_cov_is_");
                            just_clear_yt_loop(the_name);
                        }
                    }
                }
            }
        }
    }

    if (edit_env.block_list.scrollLeft < full_end_scrollwidth) {
        
        // * 初期値を設定.
        the_seeking_time = blocktime * 1000;

        if (edit_env.wrapper_index.classList.contains("playing")) {                     
            // * すべての special_cov からすべての player を取って全部止める.
            let specials = document.getElementsByClassName("special_cov");
            for (let i = 0; i < specials.length; i++) {
                let player;
                let the_special_cov = specials[i];
                if (the_special_cov.lastElementChild) {
                    if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                        player = yt_player_getter(the_special_cov.lastElementChild); 
                        if (player) {
                            player.pauseVideo();
                            // * また再開した際にすべてのラインで YT の再生を開始できるように.
                            set("players_list", s => s.push(player));
                        }
                    }
                }
            }
            
            edit_env.wrapper_index.classList.remove("playing");
            edit_env.wrapper_index.classList.add("pausing");
        
            let the_b_name = "scroll_over_" + get("the_scrolled_distance");
            let the_a = get("the_scrolled_distance") % blocktime;
            let the_a_name = "scroll_over_" + the_a;
            if (edit_env.wrapper_index.classList.contains(the_b_name)) {
                edit_env.wrapper_index.classList.remove(the_b_name);
            }

            edit_env.wrapper_index.classList.add(the_a_name);
            same_concealer_overwrap_cancel();
            seek_and_actuareffect_overwrap_cancel();

            let stop = new Date();
            pause_when = stop.getTime();

            // * 経過時間をミリ秒で取得.
            let ms = pause_when - play_when;
            the_seeking_time = (blocktime * 1000) - ms;                            

        } else if (edit_env.wrapper_index.classList.contains("pausing")) {

            let start = new Date();
            play_when = start.getTime();
            edit_env.wrapper_index.classList.remove("pausing");
            edit_env.wrapper_index.classList.add("playing");

            // * 現在表示しているすべての player の再生を開始する.
            if (get("players_list").length == 0) {
                let specials = document.getElementsByClassName("special_cov");
                for (let i = 0; i < specials.length; i++) {
                    let player;
                    let the_special_cov = specials[i];
                    if (the_special_cov.lastElementChild) {
                        if (the_special_cov.lastElementChild.tagName == "IFRAME") {
                            player = yt_player_getter(the_special_cov.lastElementChild); 
                            if (player) {
                                autoseek_yt_play(player);
                            }
                        }
                    }
                }
            } else { 
                for (let i = 0; i < get("players_list").length; i++) {
                    let player = get("players_list")[i];
                    autoseek_yt_play(player);
                }
            }

            // * 再実行.
            same_concealer_overwrap_activate();
            seek_and_actuareffect_overwrap_activate();
        } 
    }
}
