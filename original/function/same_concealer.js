// * special_cov関連の関数を束ねたもの.
export const same_concealer_management = (e) => {
    let wrapper_index = get_wrapper_index(e);
    let list_wrappers = wrapper_index.children;
    let centering_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);
    for (let i = 0; i < list_wrappers.length; i++) {
        if (i == 0 && list_wrappers[0].classList.contains("orange_space")) {
        } else {
            let blocks = list_wrappers[i].lastElementChild.children;
            same_concealer_activate_check(blocks[centering_num]);
            same_concealer_inactivate_check(blocks[centering_num]);
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

export const delete_all_same_concealer = () => {
    let same_concealers = document.querySelectorAll(".same_concealer");
    if (same_concealers.length > 0) {
        for (let i = same_concealers.length - 1; i >= 0; i--) {
            same_concealers[i].remove();
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * centering を持つブロックが same を持つか判定する関数.

// * 左右上下の移動で使える.
export const same_concealer_activate_check = (e) => {
    // * special_cov の生成からコンテントの挿入までを処理.
    if (e.classList.contains("same")) {

        let special_cov = which_special_is(e);
        let the_num = target_data(e, "same_num_");
        
        if (special_cov == null) {
            same_concealer_activation_setup();
            special_cov = document.getElementsByClassName("this_cov_is_" + the_num)[0];
        }
 
        if (e.classList.contains("centered_block") || e.classList.contains(".edit_centered_block")) {
            special_cov.classList.add("center_special");
        } else {
            special_cov.classList.remove("center_special");
        }
        
        let player;
        let sp_cover = get_wrapper_index(e);

        // * dup ブロックであるケースを配慮.
        if (special_cov.lastElementChild) {
            player = yt_player_getter(special_cov.lastElementChild);
            if (screen.classList.contains("edit")) {
                if (sp_cover.classList.contains("pausing")) {
                    play_around();
                }
            } else {
                play_around();
            }
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * となりのブロックが same_end クラスを持つ場合に対応する special_cov を削除する関数.
export const same_concealer_inactivate_check = (e) => {
    
    let player;
    let the_target_left = e.previousElementSibling;
    let the_target_right = e.nextElementSibling;
    let sp_cover = get_wrapper_index(e); 

    if (the_target_left) {
        if (the_target_left.classList.contains("same_end")) {
            // * 領域を出た YT の Player の再生を停止する.
            player_setup(the_target_left); 
            if (sp_cover.classList.contains("pausing")) {
                if (player) {
                    if (get_correspond_same_concealer(the_target_left)) {
                        let the_name = "same_num_" + target_data(get_correspond_same_concealer(the_target_left), "this_cov_is_");
                        player.pauseVideo();
                        let the_time = yt_player_reset(the_target_left);
                        player.seekTo(the_time);
                        yt_loop_stop(player, "end", the_name);
                    }
                }
            }
            // * 領域の special_cov が役割を終えるので、中身を same_end にリプレースした上で削除.
            same_concealer_inactivation_setup(the_target_left);
            if (the_target_left.lastElementChild) {
                if (! the_target_left.classList.contains("stable")) {
                    the_target_left.lastElementChild.style.setProperty('opacity', 1, 'important');
                }
            } 
        } else if (the_target_left.classList.contains("same_start")) {
            // * 同じ same_num を持つ same_start の content があれば削除.
            if (the_target_left.lastElementChild) {
                the_target_left.lastElementChild.style.setProperty('opacity', 0, 'important');
                let d = the_target_left.lastElementChild;
                d.remove();
            }
        }
    }

    if (the_target_right) {
        if (the_target_right.classList.contains("same_start")) {
            player_setup(the_target_right);
            if (sp_cover.classList.contains("pausing")) {
                if (player) {
                    if (get_correspond_same_concealer(the_target_right)) {
                        let the_name = "same_num_" + target_data(get_correspond_same_concealer(the_target_right), "this_cov_is_");
                        player.pauseVideo();
                        let the_time = yt_player_reset(the_target_right);
                        player.seekTo(the_time);
                        yt_loop_stop(player, "start", the_name);
                    }
                }
            }
            // * same_start に special_cov の content を一時的に複製して格納.
            same_concealer_inactivation_setup(the_target_right);
            if (the_target_right.lastElementChild) {
                the_target_right.lastElementChild.remove();
            }
            the_target_right.appendChild(get("same_start_content"));

        } else if (the_target_right.classList.contains("same_end")) {
            if (the_target_right.lastElementChild) {
                the_target_right.lastElementChild.style.setProperty('opacity', 0, 'important');
            }
        }
    }

    if (e.classList.contains("same_start") ||  e.classList.contains("same_end")) {
        if (e.lastElementChild) {
            e.lastElementChild.style.setProperty('opacity', 0, 'important');
        }
    }
 
    if (e.classList.contains("middlejumper_end")) {
        if (get_correspond_same_concealer(e)) {
            let s = get_correspond_same_concealer(e);
            s.classList.add("middlejumper_end");
        }
    } else {
        if (get_correspond_same_concealer(e)) {
            let s = get_correspond_same_concealer(e);
            s.classList.remove("middlejumper_end");
        }
    }
}