// * デフォルトレイヤーにて command + Enter が押された際に実行される関数.
// * 直下に新しいブロック（厳密には sp_cover）を作成する.
export const keytouch_make_command_enter = () => {
    let env = keytouch_setup();
    pointer_anim();
    original_centering_checker(env.current_sp_cover, env.current_vertical);
    adjust_box(env.current_vertical);
    make_fragment(env.current_sp_cover, "after");    
    special_cleaner();
    let next_one = env.current_sp_cover.nextElementSibling.lastElementChild.lastElementChild.lastElementChild.previousElementSibling;
    var next_textarea = next_one.lastElementChild;
    centering_marker(env.current_vertical, next_one, "centering");
    next_textarea.focus();
    is_it_same_series(next_one);
    wheel_positioning();
}

// ---------------------------------------------------------------------------------------------------------------

// * デフォルトレイヤーにて command + U が押された際に実行される関数.
// * 実行時に選択中のブロックの隣に新しいブロックを作成する.
export const keytouch_make_command_u = () => {
    
    let env = keytouch_setup();
    let sps = env.wrapper_index.children;
    let c_v_num = [].slice.call(env.block_list.children).indexOf(env.current_vertical);
    let scrollleft_b = env.block_list.scrollLeft;
    let balanc = 0;
    let center_num = [].slice.call(sps).indexOf(vertical_to_sp(env.current_vertical)); 
    pointer_anim();

    for (let i = 0; i < sps.length; i++) {
        if (i == center_num) {
            make_ver_fragment(env.current_vertical, "after");  
            let next_one = env.block.nextElementSibling;
            next_one.lastElementChild.focus();
            centering_marker(env.current_vertical, next_one, "centering");
        } else {
            let c_v = sps[i].lastElementChild.children[c_v_num];
            if (c_v.classList.contains("same")) {
                if (! c_v.classList.contains("same_end")) {
                    let addition = c_v.cloneNode(true);
                    c_v.before(addition);
                } else if (c_v.classList.contains("same_end")) { 
                    make_ver_fragment(c_v, "after");
                }
            } else  {
                make_ver_fragment(c_v, "after");
            }
        }
    }
    
    // ---------------------------------------------------------------------------------------------------------------
    // * 以下各ラインへの挿入後の処理.
    let center = document.querySelector(".centering");
    let the_center_num_b = [].slice.call(vertical_to_hor(center).children).indexOf(center);
    
    balanc = the_center_num_b - c_v_num;
    for (let i = 0; i < sps.length; i++) {
        sps[i].lastElementChild.scrollLeft = balanc * blocksize + scrollleft_b;
    }

    original_centering_checker(env.current_sp_cover, center);
    same_cutter(center, "addon");
    is_it_same_series(center);
}