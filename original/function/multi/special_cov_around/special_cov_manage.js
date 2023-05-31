// * same群のどこかがセンタリングしている際に、上に対象要素を被せて描画する関数.
export const make_special_cov = (e, f) => {
    let special_cov = document.createElement("div");    
    let bottom_distance = e.getBoundingClientRect().top + window.pageYOffset;
    let left_distance = half_left_width;
    special_cov.style.top = bottom_distance + "px";
    
    // * borderの有無の違いから 1px を調整....
    special_cov.style.left = left_distance + 1 + "px";
    special_cov.style.width = blocksize + "px";
    special_cov.style.height = e.clientHeight + "px";

    let the_name = "this_cov_is_" + f;
    special_cov.classList.add("special_cov");
    special_cov.classList.add(the_name);

    let script_elem = document.getElementsByTagName('script')[0];
    script_elem.before(special_cov);

    return special_cov;
}

// ---------------------------------------------------------------------------------------------------------------

// * centering を持つブロックが same を持つか判定する関数.
// * 左右上下の移動で使える.
export const is_it_same_start = (e) => {
    // * special_cov の生成からコンテントの挿入までを処理.
    if (e.classList.contains("same")) {

        let special_cov = which_special_is(e);
        let the_num = target_data(e, "same_num_");
        
        if (special_cov == null) {
            the_state();
            special_cov = document.getElementsByClassName("this_cov_is_" + the_num)[0];
        }
 
        if (e.classList.contains("centering") || e.classList.contains("new_layer_centering")) {
            special_cov.classList.add("center_special");
        } else {
            special_cov.classList.remove("center_special");
        }
        
        let player;
        let sp_cover = vertical_to_sp_cover(e);

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

// * となりのブロックが same_end クラスを持つ場合に対応する special_cov を削除する関数.
export const is_it_same_alend = (e) => {
    
    let player;
    let the_target_left = e.previousElementSibling;
    let the_target_right = e.nextElementSibling;
    let sp_cover = vertical_to_sp_cover(e); 

    if (the_target_left) {
        if (the_target_left.classList.contains("same_end")) {
            // * 領域を出た YT の Player の再生を停止する.
            player_setup(the_target_left); 
            if (sp_cover.classList.contains("pausing")) {
                if (player) {
                    if (which_special_is(the_target_left)) {
                        let the_name = "same_num_" + target_data(which_special_is(the_target_left), "this_cov_is_");
                        player.pauseVideo();
                        let the_time = yt_resetter(the_target_left);
                        player.seekTo(the_time);
                        yt_loop_stopper(player, "end", the_name);
                    }
                }
            }
            // * 領域の special_cov が役割を終えるので、中身を same_end にリプレースした上で削除.
            the_state(the_target_left);
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
                    if (which_special_is(the_target_right)) {
                        let the_name = "same_num_" + target_data(which_special_is(the_target_right), "this_cov_is_");
                        player.pauseVideo();
                        let the_time = yt_resetter(the_target_right);
                        player.seekTo(the_time);
                        yt_loop_stopper(player, "start", the_name);
                    }
                }
            }
            // * same_start に special_cov の content を一時的に複製して格納.
            the_state(the_target_right);
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
 
    if (e.classList.contains("stable_end")) {
        if (which_special_is(e)) {
            let s = which_special_is(e);
            s.classList.add("stable_end");
        }
    } else {
        if (which_special_is(e)) {
            let s = which_special_is(e);
            s.classList.remove("stable_end");
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * special_cov関連の関数を束ねたもの.
export const is_it_same_series = (e) => {
    let sp_cover = vertical_to_sp_cover(e);
    let sps= sp_cover.children;
    let centering_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);
    for (let i = 0; i < sps.length; i++) {
        if (i == 0 && sps[0].classList.contains("orange_space")) {
        } else {
            let vers = sps[i].lastElementChild.children;
            is_it_same_start(vers[centering_num]);
            is_it_same_alend(vers[centering_num]);
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

export const delete_all_same_concealer = () => {
    let specials = document.querySelectorAll(".special_cov");
    if (specials.length > 0) {
        for (let i = specials.length - 1; i >= 0; i--) {
            specials[i].remove();
        }
    }
}