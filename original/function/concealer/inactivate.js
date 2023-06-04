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

    // * ・・・・・・・・・・・・・・・・・・・「左から右へ向かって移動した時に移動元が same_end でした」ケース
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

        // * 上の関数がここで使われていますよーーーーーーーーーーーーーーーーーーーーーーーーーーーーー！！！！！！！！！！！！！！！！！！！！！！！！！！
        // * 上の関数がここで使われていますよーーーーーーーーーーーーーーーーーーーーーーーーーーーーー！！！！！！！！！！！！！！！！！！！！！！！！！！
        // * 上の関数がここで使われていますよーーーーーーーーーーーーーーーーーーーーーーーーーーーーー！！！！！！！！！！！！！！！！！！！！！！！！！！
        // * 領域の special_cov が役割を終えるので、中身を same_end にリプレースした上で削除.
        trace_concealer_to_original(the_target_left);

        if (the_target_left.lastElementChild) {
            if (! the_target_left.classList.contains("stable")) {
                the_target_left.lastElementChild.style.setProperty('opacity', 1, 'important');
            }
        } 
    } else if (the_target_left.classList.contains("same_start")) {
        // * ・・・・・・・・・・・・・・・・・・・「左から右に向かって移動した時に移動元が same_start でした」ケース
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


// * 右のブロックが存在して、そのブロックが same_start ブロックだった場合に
// * concealer 群に突入する際、まずはその中身を start にコピーする.
// * それまでの yt があたら

// ------------------ * 中で何をしているのか. --------------------------------------------------------

// * 左側のブロックに対してチェックし、適切に処理を実行する関数.
export const concealer_inactivate_check_right_block = () => {

    // * 俺が分からないのは、なぜ右のブロックが same_start であるときに
    // * なんか concealer が存在するのか.

    // * ・・・・・・・・・・・・・・・・・・・「右から左に向かって移動した時に移動元が same_start でした」ケース
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
        
        // * 上の関数がここで使われていますよーーーーーーーーーーーーーーーーーーーーーーーーーーーーー！！！！！！！！！！！！！！！！！！！！！！！！！！
        // * 上の関数がここで使われていますよーーーーーーーーーーーーーーーーーーーーーーーーーーーーー！！！！！！！！！！！！！！！！！！！！！！！！！！
        // * 上の関数がここで使われていますよーーーーーーーーーーーーーーーーーーーーーーーーーーーーー！！！！！！！！！！！！！！！！！！！！！！！！！！
        // * same_start に special_cov の content を一時的に複製して格納.
        trace_concealer_to_original(the_target_right);

        if (the_target_right.lastElementChild) {
            the_target_right.lastElementChild.remove();
        }
        
        // * ここがカギ.
        // * っていうか same_start_content とか絶対グローバルなのおかしいでしょ.
        the_target_right.appendChild(get("same_start_content"));

    // * ・・・・・・・・・・・・・・・・・・・「右から左に向かって移動した時に移動先が same_end でした」ケース <必要！！！！！>
    } else if (the_target_right.classList.contains("same_end")) {
        if (the_target_right.lastElementChild) {
            the_target_right.lastElementChild.style.setProperty('opacity', 0, 'important');
        }
    }
}