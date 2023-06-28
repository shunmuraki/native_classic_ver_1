// * デフォルトレイヤーにて command + Enter が押された際に実行される関数.
// * 直下に新しいブロック（厳密には sp_cover）を作成する.
export const keytouch_make_command_enter = () => {
    let env = keytouch_setup();
    pointer_animate();
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
    let list_wrappers = env.wrapper_index.children;
    let centered_list_wrapper_index_num = get_block_index_num(env.wrapper_index, env.list_wrapper);
    let default_index_num = get_block_index_num(env.block_list, env.block);
    pointer_animate();

    for (let i = 0; i < list_wrappers.length; i++) {
        if (i == centered_list_wrapper_index_num) {
            block_make(env.current_vertical, "after");  
            let next_block = env.block.nextElementSibling;
            next_block.lastElementChild.focus();
            class_replace(env.block, next_block, "centered_block");
        } else {
            let key_block = list_wrappers[i].lastElementChild.children[default_index_num];
            if (key_block.classList.contains("same")) {
                if (! key_block.classList.contains("same_end")) {
                    let addition = key_block.cloneNode(true);
                    key_block.before(addition);
                } else if (key_block.classList.contains("same_end")) { 
                    block_make(key_block, "after");
                }
            } else  {
                block_make(key_block, "after");
            }
        }
    }
    
    // ---------------------------------------------------------------------------------------------------------------
    
    // * 以下各ラインへの挿入後の処理.
    let gap_num = 0;
    let final_centered_block = element(".centered_block");
    let final_index_num = [].slice.call(get_block_list(centered_block).children).indexOf(final_centered_block);
    gap_num = final_index_num - default_index_num;

    for (let i = 0; i < list_wrappers.length; i++) {
        sps[i].lastElementChild.scrollLeft = gap_num * blocksize + gap_num;
    }

    last_centered_block_management(env.wrapper_index, final_centered_block);
    same_devide(final_centered_block, "addon");
    concelaer_management(final_centered_block);
}