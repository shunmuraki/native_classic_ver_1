// * 上のブロックへ移動する際の共通処理.
// [* block_go_top へ名称を変更.]
// * 以下は全部 env() をパラメータで受け取る書き方をしよう.
export const block_go_top = (e, f) => {
    
    let env = e; 
    let next_one;
    var sibling = env.list_wrapper.previousElementSibling;
    var pre_sibling = env.wrapper_index.previousElementSibling;
    let connected_your_height = this_sc.clientHeight;
    let to_the_distance = env.list_wrapper.getBoundingClientRect().top;
    let sibling_height = 0;

    if (f == "centering") {

        if (sibling) {
            // * すぐ上に sp が存在した場合.
            blur_checker(env.block);
            let the_num = [].slice.call(env.block_list.children).indexOf(env.block);
            sibling_height = sibling.clientHeight;
            next_one = sibling.lastElementChild.children[the_num];
            centering_marker(env.block, next_one, f);
            focus_checker(next_one);
            same_concealer_management(next_one);
            wheel_positioning();

        } else if (pre_sibling) {
            // * 現在の sp が所属する sp_cover の最上層に位置していた場合.
            blur_checker(env.block);
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.lastElementChild.lastElementChild.lastElementChild.previousElementSibling;
            centering_marker(env.block, next_one, f);
            focus_checker(next_one); 
            let now_position = pre_sibling.lastElementChild.lastElementChild.scrollLeft;
            let the_distance = custom_end_scrollwidth(pre_sibling.lastElementChild.lastElementChild) - now_position;
            // * 移動先のラインの scrollLeft を調整.
            all_view_changer(pre_sibling, the_distance);
            let my_position = env.wrapper_index.lastElementChild.lastElementChild.scrollLeft;
            let my_distance = full_start_scrollwidth - my_position;
            // * 移動元のラインの scrollLeft を調整.
            all_view_changer(env.wrapper_index, my_distance);
            special_cleaner(pre_sibling);
            cs_bye();
            // *上下方向の位置調整.
            if (sibling_height > to_the_distance) {
                scrollBy(0, - connected_your_height);
            } 
            same_concealer_management(next_one);
            wheel_positioning();
        }

    } 
}

// * 下のブロックへ移動する際の共通処理.
// [* block_go_bottom へ名称を変更.]
export const block_go_bottom = (e, f) => {

    let env = e;
    let next_one; 
    var sibling = env.list_wrapper.nextElementSibling;
    var pre_sibling = env.wrapper_index.nextElementSibling;
    let connected_your_height = env.wrapper_index.clientHeight;
    let to_the_distance =  window.innerHeight - env.list_wrapper.getBoundingClientRect().bottom;
    let sibling_height = 0;

    if (f == "centering") {

        if (sibling) {
           
            // * すぐ下に sp が存在した場合.
            blur_checker(env.block);
            let the_num = [].slice.call(env.block_list.children).indexOf(env.block);
            sibling_height = sibling.clientHeight;
            next_one = sibling.lastElementChild.children[the_num];
            centering_marker(env.block, next_one, f);
            focus_checker(next_one);
            is_it_same_series(next_one);
            wheel_positioning();

        } else if (pre_sibling) {
         
            // * 現在の sp が所属する sp_cover の最下層に位置していた場合.
            blur_checker(env.block);
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.lastElementChild.lastElementChild.children[1];
            centering_marker(env.block, next_one, f);
            focus_checker(next_one);
            let now_position = pre_sibling.lastElementChild.lastElementChild.scrollLeft;
            let the_distance = full_start_scrollwidth - now_position;
            // * 移動先のラインの scrollLeft を調整.
            all_view_changer(pre_sibling, the_distance);
            let my_position = this_sc.lastElementChild.lastElementChild.scrollLeft;
            let my_distance = custom_end_scrollwidth(env.wrapper_index.lastElementChild.lastElementChild) - my_position;
            // * 移動元のラインの scrollLeft を調整.
            all_view_changer(env.wrapper_index, my_distance);
            special_cleaner(pre_sibling);
            cs_bye();
            if (sibling_height > to_the_distance) {
                scrollBy(0, connected_your_height);
            } 
            same_concealer_management(next_one);
            wheel_positioning();

        }
        
    } 
}

// * 左のブロックへ移動する際の共通処理.
export const block_go_left = (e, f) => {
    // [* これの存在意義が分からない.]
    go_af_scroll();
    let env = e;
    if (env.block.previousElementSibling) {
        if (! env.block.previousElementSibling.classList.contains("adjuster")) {
            blur_checker(env.block);            
            all_view_changer(env.wrapper_index, - blocksize);
            let next_one = env.block.previousElementSibling;
            centering_marker(env.block, next_one, f);
            if (f == "centering") {
                focus_checker(next_one);
            }            
            same_change_tracer(next_one);
            same_concealer_management(next_one);
        }
    }
}

// * 右のブロックへ移動する際の共通処理.
export const block_go_right = (e, f) => {
    // [* これの存在意義が分からない.]
    go_af_scroll();
    let env = e;
    if (env.block.nextElementSibling) {
        if (! env.block.nextElementSibling.classList.contains("adjuster")) {
            blur_checker(env.block);
            all_view_changer(env.wrapper_index, blocksize);
            let next_one = env.block.nextElementSibling;
            centering_marker(env.block, next_one, f);
            if (f == "centering") {
                focus_checker(next_one);
            }
            same_change_tracer(next_one);
            same_concealer_management(next_one);
        }
    }
}