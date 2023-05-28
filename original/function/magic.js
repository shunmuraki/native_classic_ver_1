// * マジックコピーする関数.
export const the_magic_copy = (e) => {
    // * スタイリング直後に実行されることを想定.
    tracer_basis(document.querySelector(".centering"));
    // * 初期化
    set("magic_elems", s => s = []);
    // * 以降に残っているものを、動画に限らずすべてコピー.
    let sp_cover = vertical_to_sp_cover(e);
    let c_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);
    
    // * 各spごとにコピーして以前のブロックをまとめて削除し fragment として変数に格納.
    for (let i = 0; i < sp_cover.childElementCount; i++) {
        let line = sp_cover.children[i].lastElementChild.children;
        let current_scrollleft = sp_cover.children[i].lastElementChild.scrollLeft;
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
        sp_cover.children[i].lastElementChild.scrollLeft = current_scrollleft;
    }
}

// * マジックペーストする関数.
export const the_magic_paste = (e) => {
    // * コピーしてあるfragmentを貼り付ける. 
    // * 同時に不足するラインも追加する.
    let the_line_num = get("magic_elems").length;
    let sp_cover = vertical_to_sp_cover(e);
    let whole_line_num = sp_cover.childElementCount;

    let current_line_num = [].slice.call(sp_cover.children).indexOf(vertical_to_sp(e)) + 1;
    let c_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);

    let bottom_line_num = current_line_num + the_line_num - 1;
    let the_additional_num = bottom_line_num - whole_line_num;

    let current_ver_num = vertical_to_hor(e).childElementCount;
    let current_scrollleft = vertical_to_hor(e).scrollLeft;

    // * ラインを複製.
    let added_line = vertical_to_sp(e).cloneNode(true);
    let edit_contents = added_line.lastElementChild.children;

    // [* the_name_list を import する.]
    the_name_list.push("centering");
    the_name_list.push("original_centering");

    // 足りない sp（列） を新しく生成.
    if (the_additional_num > 0) {
        for (let i = 1; i < current_ver_num; i++) {
            for (let o = 0; o < the_name_list.length; o++) {
                // * 複製した sp のブロックから無駄なクラスを除去.
                classmover(edit_contents[i], edit_contents[i], the_name_list[o], "remove");
            }
            // * 複製したものは中身まで整える.
            edit_contents[i].lastElementChild.remove();
            let new_textarea = document.createElement("textarea");
            new_textarea.classList.add("write_area");
            edit_contents[i].appendChild(new_textarea);
        }
        for (let i = 0; i < the_additional_num; i++) {
            let final_copy = added_line.cloneNode(true);
            // * 初期化した 複製sp をエディターに追加.
            sp_cover.appendChild(final_copy);
            final_copy.lastElementChild.scrollLeft = current_scrollleft;
        }
    }

    // 補填した「列」にブロックを追加して数を合わせる.
    for (let i = 1; i <= sp_cover.childElementCount; i++) {
        // * ペーストした領域の外の sp 群に絞った処理.
        if (i < current_line_num || i > bottom_line_num) {
            for (let o = 0; o < get("magic_elems")[0].length; o++) {
                let c_v = sp_cover.children[i - 1].lastElementChild.children[c_num + o];
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
                sp_cover.children[i - 1].lastElementChild.children[c_num + o].after(will_added_elems[o]);
            }    
        }
    }

    // * 以下最終調整.
    let old_center = document.querySelector(".centering");
    let center = old_center.nextElementSibling;
    centering_marker(old_center, center, "centering");
    original_centering_checker(sp_cover, center);
    same_cutter(center, "addon");
    is_it_same_series(center);
    all_view_changer(sp_cover, blocksize);
    focus_checker(center);
    adjust_box(center);
}