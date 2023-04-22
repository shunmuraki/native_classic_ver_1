// topへの移動
export const go_top = (e, f) => {

    let ver = e;
    let this_sc = vertical_to_sp_cover(ver);
    var sibling = vertical_to_sp(ver).previousElementSibling;
    var pre_sibling = this_sc.previousElementSibling;
    let connected_your_height = this_sc.clientHeight;
    let to_the_distance = vertical_to_sp(ver).getBoundingClientRect().top;
    let next_one;
    let sibling_height = 0;

    if (f == "centering") {

        if (sibling) {
            blur_checker(ver);
            let the_num = [].slice.call(vertical_to_hor(ver).children).indexOf(ver);
            sibling_height = sibling.clientHeight;
            next_one = sibling.lastElementChild.children[the_num];
            centering_marker(ver, next_one, f);
            focus_checker(next_one);
            is_it_same_series(next_one);
            wheel_positioning();
        } else if (pre_sibling) {
            blur_checker(ver);            
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.lastElementChild.lastElementChild.lastElementChild.previousElementSibling;
            centering_marker(ver, next_one, f);
            focus_checker(next_one);
            
            // 対応するspecial_covを削除. 本来は左右の移動コマンドで対応していたが、上下移動の際は自動的にラインごとの位置が右揃えになるので、ここでその処理を実行しておく必要がある。
            let now_position = pre_sibling.lastElementChild.lastElementChild.scrollLeft;
            let the_distance = custom_end_scrollwidth(pre_sibling.lastElementChild.lastElementChild) - now_position;
            all_view_changer(pre_sibling, the_distance);

            // 自分自身を変えろ。
            let my_position = this_sc.lastElementChild.lastElementChild.scrollLeft;
            let my_distance = full_start_scrollwidth - my_position;
            all_view_changer(this_sc, my_distance);

            special_cleaner(pre_sibling);
            cs_bye();
            // 上下方向の位置調整. これが将来的にはしっかり機能することが重要.
            if (sibling_height > to_the_distance) {
                scrollBy(0, - connected_your_height);
            } 
            is_it_same_series(next_one);
            wheel_positioning();
        }

    } else if (f == "new_layer_centering") {

        if (pre_sibling) {
            go_af_scroll();
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.children[1].lastElementChild.lastElementChild;
            centering_marker(ver, next_one, f);
            
            let now_position = pre_sibling.children[1].lastElementChild.scrollLeft;
            let the_distance = full_end_scrollwidth - now_position;
            all_view_changer(pre_sibling, the_distance);

            // 自分を変えろ！
            let my_position = this_sc.children[1].lastElementChild.scrollLeft;
            let my_distance = full_start_scrollwidth - my_position;
            all_view_changer(this_sc, my_distance);    

            special_cleaner(vertical_to_sp_cover(ver));   
            cs_bye();
            // edit モードは「see」ラインの位置を固定したい狙い.
            scrollBy(0, - connected_your_height);
            is_it_same_series(next_one);
        }

    }
}

// bottomへの移動
export const go_bottom = (e, f) => {

    let ver = e;
    let this_sc = vertical_to_sp_cover(ver);
    var sibling = vertical_to_sp(ver).nextElementSibling;
    var pre_sibling = this_sc.nextElementSibling;
    let connected_your_height = this_sc.clientHeight;
    let to_the_distance =  window.innerHeight - vertical_to_sp(ver).getBoundingClientRect().bottom;
    let sibling_height = 0;
    let next_one;

    if (f == "centering") {

        if (sibling) {
            blur_checker(ver);
            let the_num = [].slice.call(vertical_to_hor(ver).children).indexOf(ver);
            sibling_height = sibling.clientHeight;
            next_one = sibling.lastElementChild.children[the_num];
            centering_marker(ver, next_one, f);
            focus_checker(next_one);
            is_it_same_series(next_one);
            wheel_positioning();

        } else if (pre_sibling) {
            blur_checker(ver);
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.lastElementChild.lastElementChild.children[1];
            centering_marker(ver, next_one, f);
            focus_checker(next_one);
            let now_position = pre_sibling.lastElementChild.lastElementChild.scrollLeft;
            let the_distance = full_start_scrollwidth - now_position;
            all_view_changer(pre_sibling, the_distance);

            // 自分を変えろ。
            let my_position = this_sc.lastElementChild.lastElementChild.scrollLeft;
            let my_distance = custom_end_scrollwidth(this_sc.lastElementChild.lastElementChild) - my_position;
            all_view_changer(this_sc, my_distance);

            special_cleaner(pre_sibling);
            cs_bye();
            if (sibling_height > to_the_distance) {
                scrollBy(0, connected_your_height);
            } 
            is_it_same_series(next_one);
            wheel_positioning();
        }

    } else if (f == "new_layer_centering") {

        if (pre_sibling) {
            go_af_scroll();
            sibling_height = pre_sibling.clientHeight;
            next_one = pre_sibling.children[1].lastElementChild.children[1];
            centering_marker(ver, next_one, f);
            
            let now_position = pre_sibling.children[1].lastElementChild.scrollLeft;
            let the_distance = full_start_scrollwidth - now_position;
            all_view_changer(pre_sibling, the_distance);    
            
            // 自分を変えろ！
            let my_position = this_sc.children[1].lastElementChild.scrollLeft;
            let my_distance = full_end_scrollwidth - my_position;
            all_view_changer(this_sc, my_distance);

            special_cleaner(vertical_to_sp_cover(ver));     
            cs_bye();
            // edit モードは「see」ラインの位置を固定したい狙い.
            scrollBy(0, connected_your_height);
            is_it_same_series(next_one);
        }

    }

}

// leftへの移動
export const go_left = (e, f) => {
    go_af_scroll();
    let ver = e;
    if (ver.previousElementSibling) {
        if (! ver.previousElementSibling.classList.contains("adjuster")) {
            blur_checker(ver);
            let sp_cover = vertical_to_sp_cover(ver);
            all_view_changer(sp_cover, - blocksize);
            let next_one = ver.previousElementSibling;
            centering_marker(ver, next_one, f);
            
            if (f == "centering") {
                focus_checker(next_one);
            }
    
            // 変更があったとしたら今のラインなのでconnectedの影響によるループは必要なし.
            same_change_tracer(next_one);
            is_it_same_series(next_one);
        }
    }
}

// rightへの移動
export const go_right = (e, f) => {
    go_af_scroll();
    let ver = e;
    if (ver.nextElementSibling) {
        if (! ver.nextElementSibling.classList.contains("adjuster")) {
            blur_checker(ver);
            let sp_cover = vertical_to_sp_cover(ver);   
            all_view_changer(sp_cover, blocksize);
            let next_one = ver.nextElementSibling;
            centering_marker(ver, next_one, f);
    
            if (f == "centering") {
                focus_checker(next_one);
            }
    
            // 変更があったとしたら今のラインなのでconnectedの影響によるループは必要なし.
            same_change_tracer(next_one);
            is_it_same_series(next_one);
        }
    }
}