import { get_correspond_same_concealer, get_property_number } from "./tool";

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

export const delete_all_concealer = () => {
    let concealers = document.querySelectorAll(".concealer");
    if (concealers.length > 0) {
        for (let i = concealers.length - 1; i >= 0; i--) {
            concealers[i].remove();
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * 追加した special_cov の YT Iframe を再生する関数.
export const yt_player_on_concealer_start = () => {
    if (player) {
        let the_name = "same_num_" + target_data(special_cov, "this_cov_is_");
        just_clear_yt_loop(the_name);
        setTimeout(() => {
            let the_time = yt_resetter(e);
            player.seekTo(the_time);
            player.playVideo();
            yt_loop_player(player, e, the_name);
        }, 1000)
    }
}



// ------------------ * 中で何をしているのか. --------------------------------------------------------

// [作る側]

// * 何をしているのか.




// ------------------ * 中で何をしているのか. --------------------------------------------------------



// * centering を持つブロックが same を持つか判定する関数.

// * 左右上下の移動で使える.
export const concealer_activate_check = (e) => {
    // * special_cov の生成からコンテントの挿入までを処理.
    if (e.classList.contains("same")) {

        let concealer = get_correspond_same_concealer(e);
        let the_num = get_value(e, "same_num_");
        
        if (concealer == null) {
            concealer_activation_setup();
            concealer = document.getElementsByClassName("this_cov_is_" + the_num)[0];
        }
 
        if (e.classList.contains("centered_block") || e.classList.contains(".edit_centered_block")) {
            concealer.classList.add("center_special");
        } else {
            concealer.classList.remove("center_special");
        }
        
        let player;
        // * dup ブロックであるケースを配慮.
        if (concealer.lastElementChild) {
            player = get_yt_player(concealer.lastElementChild);
            if (element(".default_display").classList.contains("edit")) {
                if (get_wrapper_index(e).classList.contains("pausing")) {
                    yt_player_on_concealer_start();
                }
            } else {
                yt_player_on_concealer_start();
            }
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// [ 解除する側 ]

// * 左側のブロックに対してチェックし、適切に処理を実行する関数.

// ------------------ * 中で何をしているのか. --------------------------------------------------------

// * 左側にブロックがあって、それが same_end ブロックだったら、
// * それまでの concealer 群で活躍していた concealer の YT - player を停止→削除
// * で、 concealer が持っていた中身も same_end に返す

// * 左側のブロックが same_start ブロックだったら、
// * その中身を消す(もうsame_concealerができているから？)

// * same_start に中身を移したりしているわけ？

// ------------------ * 中で何をしているのか. --------------------------------------------------------

export const concealer_inactivate_check_left_block = () => {
    if (the_target_left.classList.contains("same_end")) {
        // * 領域を出た YT の Player の再生を停止する.
        player_setup(the_target_left); 
        if (wrapper_index.classList.contains("pausing")) {
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



// ------------------ * 中で何をしているのか. --------------------------------------------------------

// [作る側]

// * 何をしているのか.


// * concealer 群に突入する際、まずはその中身を start にコピーする.

// ------------------ * 中で何をしているのか. --------------------------------------------------------



// * 左側のブロックに対してチェックし、適切に処理を実行する関数.
export const concealer_inactivate_check_right_block = () => {
    if (the_target_right.classList.contains("same_start")) {
        yt_player_setup(the_target_right);
        if (wrapper_index.classList.contains("pausing")) {
            if (player) {
                if (get_correspond_same_concealer(the_target_right)) {
                    let the_name = "same_num_" + get_value(get_correspond_same_concealer(the_target_right), "this_cov_is_");
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
        
        // * ここがカギ.
        the_target_right.appendChild(get("same_start_content"));

    } else if (the_target_right.classList.contains("same_end")) {
        if (the_target_right.lastElementChild) {
            the_target_right.lastElementChild.style.setProperty('opacity', 0, 'important');
        }
    }
}


// ---------------------------------------------------------------------------------------------------------------

// * となりのブロックが same_end クラスを持つ場合に対応する special_cov を削除する関数.
export const concealer_inactivate_check = (e) => {
    // * これをもっと使ってくれないと困る.
    let player;
    let the_target_left = e.previousElementSibling;
    let the_target_right = e.nextElementSibling;
    let wrapper_index = get_wrapper_index(e); 

    if (the_target_left) {
        concealer_inactivate_check_left_block();
    }

    if (the_target_right) {
        concealer_inactivate_check_right_block();
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