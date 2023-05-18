// * 編集モード中に command + C が押された際に実行される関数.
// * orange_pointer を追加/除去する.
export const keytouch_edit_command_c = () => {
    let env = keytouch_setup();
    if (centering) {
        if (the_see_centering.firstElementChild.firstElementChild.scrollLeft == Number(target_data(centering, "scroll_left_"))) {
            if (the_see_centering.classList.contains("principle_pointer") && centering.classList.contains("opac_cam") == false){
                delete_opacam(); 
                pointer_setter();
                
            } else if (centering.classList.contains("opac_cam") == true) {
                delete_opacam();
                pointer_setter();
            }
        } else {
            delete_opacam();   
            pointer_setter();
        }
    } else {
        pointer_setter();
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * 編集モード中に control + S が押された際に実行される関数.
// * オートシーキングモードを開始/停止する.
export const keytouch_edit_command_s = () => {

    let env = keytouch_setup();
    pointer_anim();
    // * actuar_st は途中から始まるわけだから、最初に opacity をいじっておく必要がある.
    actuar_st_allon();
    new_layer.classList.add("autoseekingmode");
    let centering = document.getElementsByClassName("new_layer_centering")[0];
    let scrap = vertical_to_sp_cover(centering);
    let hor = vertical_to_hor(centering);
    let the_seeking_time;
    let play_when;
    let pause_when;

    let the_block_num = Math.floor((hor.scrollLeft + half_left_width - window.innerWidth) / blocksize);
    for (let i = 0; i < scrap.children.length; i++) {
        // * orange_space を弾く.
        if (i > 0) {
            let horizon = scrap.children[i].lastElementChild;
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

    if (hor.scrollLeft < full_end_scrollwidth) {
        // * 初期値を設定.
        the_seeking_time = blocktime * 1000;

        if (scrap.classList.contains("playing")) {                     
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
            
            scrap.classList.remove("playing");
            scrap.classList.add("pausing");
        
            let the_b_name = "scroll_over_" + get("the_scrolled_distance");
            let the_a = get("the_scrolled_distance") % blocktime;
            let the_a_name = "scroll_over_" + the_a;
            if (scrap.classList.contains(the_b_name)) {
                scrap.classList.remove(the_b_name);
            }

            scrap.classList.add(the_a_name);
            the_clear_timeout();
            the_clear_interval();

            let stop = new Date();
            pause_when = stop.getTime();

            // * 経過時間をミリ秒で取得.
            let ms = pause_when - play_when;
            the_seeking_time = (blocktime * 1000) - ms;                            

        } else if (scrap.classList.contains("pausing")) {

            let start = new Date();
            play_when = start.getTime();
            scrap.classList.remove("pausing");
            scrap.classList.add("playing");

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
                                player_starter(player);
                            }
                        }
                    }
                }
            } else { 
                for (let i = 0; i < get("players_list").length; i++) {
                    let player = get("players_list")[i];
                    player_starter(player);
                }
            }

            // * 再実行.
            set_timeout();
            set_interval();
        } 
    }
}
