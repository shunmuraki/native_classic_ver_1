// * centering を持つブロックが same を持つか判定する関数.
// * 左右上下の移動で使える.
export const concealer_activation_check = (e) => {
    // * special_cov の生成からコンテントの挿入までを処理.
    if (e.classList.contains("same")) {

        let concealer = get_correspond_same_concealer(e);
        let the_num = get_value(e, "same_num_");
        
        if (concealer == null) {
            trace_original_to_concealer();
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
                    player_loop_clear();
                    player_loop_stasrt();
                }
            } else {
                player_loop_clear();
                player_loop_stasrt();
            }
        }
    }
}

// * となりのブロックが same_end クラスを持つ場合に対応する special_cov を削除する関数.
export const concealer_inactivation_check = (e) => {

    // * これをもっと使ってくれないと困る.
    let player;
    let the_target_left = e.previousElementSibling;
    let the_target_right = e.nextElementSibling;
    let wrapper_index = get_wrapper_index(e); 

    // * 俺が分からないのは、なぜ右のブロックが same_start であるときに
    // * なんか concealer が存在するのか.
    // * ・・・・・・・・・・・・・・・・・・・「右から左に向かって移動した時に移動元が same_start でした」ケース
    if (the_target_right.classList.contains("same_start")) {
        go_left_from_samestart_block();

    // * ・・・・・・・・・・・・・・・・・・・「右から左に向かって移動した時に移動先が same_end でした」ケース <必要！！！！！>
    } else if (the_target_right.classList.contains("same_end")) {
        go_left_from_sameend_block();
    }

    // * ・・・・・・・・・・・・・・・・・・・「左から右へ向かって移動した時に移動元が same_end でした」ケース
    if (the_target_left.classList.contains("same_end")) {
        go_right_from_sameend_block();
    } else if (the_target_left.classList.contains("same_start")) {
        go_right_from_samestart_block();
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