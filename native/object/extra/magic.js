// * マジックコピーする関数.
export const magic_copy = () => {
    let env = keytouch_setup();
    // * スタイリング直後に実行されることを想定.
    concealer_tracer(env.block);
    // * 初期化
    set("magic_elements", s => s = []);
    // * 以降に残っているものを、動画に限らずすべてコピー.
    let index_num = get_the_block_index_num(env.block_list, env.block);
    // * 各spごとにコピーして以前のブロックをまとめて削除し fragment として変数に格納.
    for (let i = 0; i < env.wrapper_index.childElementCount; i++) {
        let blocks = env.wrapper_index.children[i].lastElementChild.children;
        let current_scrollleft = env.wrapper_index.children[i].lastElementChild.scrollLeft;
        let break_block = blocks[index_num + 1];
        if (break_block.classList.contains("same")) {
            let same_classname = "same_num_" + value(break_block, "same_num_");
            let sames = document.getElementsByClassName(same_classname);
            // * 実態を中身に持つ same_end をコピー。
            let original_content = sames[sames.length - 1].lastElementChild.cloneNode(true);
            // * same群の途中で実行された場合に コピー対象の最初のブロックに same_start を与えて same_num も更新する.
            // [* 以下 same_cutter() で代替できるようにする.]
            break_block.previousElementSibling.classList.add("same_end");
            break_block.previousElementSibling.appendChild(original_content);
            break_block.classList.add("same_start");
            let breakpoint = [].slice.call(sames).indexOf(break_block);
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
        for (let o = line.length - 2; o >= index_num + 1; o--) {
            new_folder.unshift(blocks[o]);
            blocks[o].remove();
        }
        set("magic_elements", s => s.push(new_folder));
        env.wrapper_index.children[i].lastElementChild.scrollLeft = current_scrollleft;

    }
}

// ---------------------------------------------------------------------------------------------------------------

// * マジックペーストする関数.
export const magic_paste = (e) => {

    let env = keytouch_setup();
    // * コピーしてあるfragmentを貼り付ける. 
    // * 同時に不足するラインも追加する.
    let magic_list_wrapper_num = get("magic_elements").length;
    
    // ---------------------------------------------------------------------------------------------------------------
    
    let list_wrapper_num = env.wrapper_index.childElementCount;
    let list_wrapper_index_num = get_the_block_index_num(env.wrapper_index, env.list_wrapper) + 1;

    let tale_list_wrapper_index_num = magic_list_wrapper_num + list_wrapper_index_num - 1;
    let less_list_wrapper_num = tale_list_wrapper_index_num - list_wrapper_num;
    let current_scrollleft = env.block_list.scrollLeft;

    // ---------------------------------------------------------------------------------------------------------------

    // * ラインを複製.
    let new_list_wrapper = list_wrapper_with_enough_block_make();
    for (let i = 0; i < less_list_wrapper_num; i++) {
        let cloned_list_wrapper = new_list_wrapper.cloneNode(true);
        // * 初期化した 複製sp をエディターに追加.
        env.wrapper_index.appendChild(cloned_list_wrapper);
        cloned_list_wrapper.lastElementChild.scrollLeft = current_scrollleft;
    }

    // ---------------------------------------------------------------------------------------------------------------

    // * 中を詰める。
    let block_index_num = get_the_block_index_num(env.block_list, env.block);
    // 補填した「列」にブロックを追加して数を合わせる.
    for (let i = 1; i <= env.wrapper_index.childElementCount; i++) {
        // * ペーストした領域の外の sp 群に絞った処理.
        if (i < list_wrapper_index_num || i > tale_list_wrapper_index_num) {
            for (let o = 0; o < get("magic_elements")[0].length; o++) {
                let block = env.wrapper_index.children[i - 1].lastElementChild.children[block_index_num + o];
                // * 挿入地点から右に向かってひとブロックずつ増やしていく. (とはいえ外の sp の話)
                if (block.classList.contains("same")) {
                    if (! block.classList.contains("same_end")) {
                        let cloned_block = c_v.cloneNode(true);
                        block.before(cloned_block);
                    } else if (c_v.classList.contains("same_end")) {
                        make_ver_fragment(block, "after");
                    }
                } else {
                    make_ver_fragment(block, "after");
                }
            }
        } else {
            // ※ 以下まさにペーストがされる sp での処理.
            let magic_blocks = get("magic_elements")[i - list_wrapper_index_num];
            for (let o = 0; o < magic_blocks.length; o++) {
                env.wrapper_index.children[i - 1].lastElementChild.children[block_index_num + o].after(magic_blocks[o]);
            }    
        }
    }

    // ---------------------------------------------------------------------------------------------------------------

    // * 以下最終調整.
    let new_block = env.block.nextElementSibling;
    centered_block_management(env.block, new_block, "centering");
    last_block_management(env.wrapper_index, new_block);
    devide_same_group(new_block, "addon");
    concealer_management(new_block);
    all_view_changer(env.wrapper_index, blocksize);
    focus_check(new_block);
    window_positioning(new_block);
}