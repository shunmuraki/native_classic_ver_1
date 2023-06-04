// ------------------ * 中で何をしているのか. --------------------------------------------------------

// * centering を持つブロックが same を持つか判定する関数.

// * 左右上下の移動で使える.
export const concealer_activate_check = (e) => {
    // * special_cov の生成からコンテントの挿入までを処理.
    if (e.classList.contains("same")) {

        let concealer = get_correspond_same_concealer(e);
        let the_num = get_value(e, "same_num_");
        
        if (concealer == null) {

            // * 下の関数使ってますよーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー！！！！！！！！！！！！！！
            // * 下の関数使ってますよーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー！！！！！！！！！！！！！！
            // * 下の関数使ってますよーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー！！！！！！！！！！！！！！
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
                    yt_player_on_concealer_start();
                    // player_loop_clear()
                    // player_loop_stasrt()
                }
            } else {
                yt_player_on_concealer_start();
                // player_loop_clear()
                // player_loop_stasrt()
            }
        }
    }
}