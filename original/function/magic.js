// * マジックコピーする関数.
export const magic_copy = (e) => {
    let env = keytouch_setup();
    // * スタイリング直後に実行されることを想定.
    same_concealer_tracer(env.block);
    // * 初期化
    set("magic_elems", s => s = []);

    // * 以降に残っているものを、動画に限らずすべてコピー.
    let c_num = get_the_block_index_num(env.block_list, env.block);
    
    // * 各spごとにコピーして以前のブロックをまとめて削除し fragment として変数に格納.
    for (let i = 0; i < env.get_wrapper_index.childElementCount; i++) {
        
        let line = env.get_wrapper_index.children[i].lastElementChild.children;
        let current_scrollleft = env.get_wrapper_index.children[i].lastElementChild.scrollLeft;
        let breaker = line[c_num + 1];

        if (breaker.classList.contains("same")) {
            let same_name = "same_num_" + target_data(breaker, "same_num_");
            let sames = document.getElementsByClassName(same_name);
            // * 実態を中身に持つ same_end をコピー。
            let c = sames[sames.length - 1].lastElementChild.cloneNode(true);
            // * same群の途中で実行された場合に コピー対象の最初のブロックに same_start を与えて same_num も更新する.
            // [* 以下 same_cutter() で代替できるようにする.]
            breaker.previousElementSibling.classList.add("same_end");
            breaker.previousElementSibling.appendChild(c);
            breaker.classList.add("same_start");
            let breakpoint = [].slice.call(sames).indexOf(breaker);
            set("same_num", s => s+= 1);
            for (let i = sames.length - 1; i >= breakpoint; i--) {
                let same_block = sames[i];
                classmover(same_block, same_block, "same_num_", "remove");
                same_block.classList.add("same_num_" + get("same_num"));
            }
        }

        // * コピー対象を sp 単位で保存しつつ、エディター上から取り除く.
        let new_folder = new Array();
        // * adjuster を削除させない。
        for (let o = line.length - 2; o >= c_num + 1; o--) {
            new_folder.unshift(line[o]);
            line[o].remove();
        }
        set("magic_elems", s => s.push(new_folder));
        env.wrapper_index.children[i].lastElementChild.scrollLeft = current_scrollleft;

    }
}

// ---------------------------------------------------------------------------------------------------------------

// * マジックペーストする関数.
export const magic_paste = (e) => {

    let env = keytouch_setup();
    // * コピーしてあるfragmentを貼り付ける. 
    // * 同時に不足するラインも追加する.
    let the_line_num = get("magic_elems").length;
    let whole_line_num = env.wrapper_index.childElementCount;

    let current_line_num = get_the_block_index_num(env.wrapper_index, env.list_wrapper) + 1;
    let c_num = get_the_block_index_num(env.block_list, env.block);

    let bottom_line_num = current_line_num + the_line_num - 1;
    let the_additional_num = bottom_line_num - whole_line_num;

    let current_ver_num = env.block_list.childElementCount;
    let current_scrollleft = env.block_list.scrollLeft;

    // ---------------------------------------------------------------------------------------------------------------

    let block_num = get_block_num(env.wrapper_index);
    // * ラインを複製.
    let added_line = list_wrapper_with_enough_block_make();

    for (let i = 0; i < the_additional_num; i++) {
        let final_copy = added_line.cloneNode(true);
        // * 初期化した 複製sp をエディターに追加.
        env.wrapper_index.appendChild(final_copy);
        final_copy.lastElementChild.scrollLeft = current_scrollleft;
    }

    // ---------------------------------------------------------------------------------------------------------------

    // 補填した「列」にブロックを追加して数を合わせる.
    for (let i = 1; i <= env.wrapper_index.childElementCount; i++) {
        // * ペーストした領域の外の sp 群に絞った処理.
        if (i < current_line_num || i > bottom_line_num) {
            for (let o = 0; o < get("magic_elems")[0].length; o++) {
                let c_v = env.wrapper_index.children[i - 1].lastElementChild.children[c_num + o];
                // * 挿入地点から右に向かってひとブロックずつ増やしていく. (とはいえ外の sp の話)
                if (c_v.classList.contains("same")) {
                    if (! c_v.classList.contains("same_end")) {
                        let addition = c_v.cloneNode(true);
                        c_v.before(addition);
                    } else if (c_v.classList.contains("same_end")) {
                        make_ver_fragment(c_v, "after");
                    }
                } else {
                    make_ver_fragment(c_v, "after");
                }
            }
        } else {
            // ※ 以下まさにペーストがされる sp での処理.
            let will_added_elems = get("magic_elems")[i - current_line_num];
            for (let o = 0; o < will_added_elems.length; o++) {
                env.wrapper_index.children[i - 1].lastElementChild.children[c_num + o].after(will_added_elems[o]);
            }    
        }
    }

    // ---------------------------------------------------------------------------------------------------------------

    // * 以下最終調整.
    let newblock = env.block.nextElementSibling;
    centered_block_management(env.block, newblock, "centering");
    original_centered_block_management(env.wrapper_index, newblock);
    same_cutter(newblock, "addon");
    is_it_same_series(newblock);
    all_view_changer(env.wrapper_index, blocksize);
    focus_checker(newblock);
    adjust_box(newblock);
}