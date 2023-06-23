// * [ヘッド関数] orange_pointer の生成・追加をする関数.
export const orange_pointer_make = (edit_env) => {

    let orange_num = target_data(orange, "orange_num_");
    // * 実際に pointer を打つ地点の scrollLeft. （DOMの順番とは関係しない）
    let orange_pointer_scrollleft = edit_env.orange_pointer_space.scrollLeft;
    
    let new_orange_pointer = document.createElement("div");
    new_orange_pointer.classList.add("orange_pointer");
    new_orange_pointer.style.left = orange_pointer_scrollleft + half_left_width + "px";
    // * scrollLeft は pointer 自身にも持たせておく.
    let scrollleft_classname = "scroll_left_" + orange_pointer_scrollleft;
    new_orange_pointer.classList.add(scrollleft_classname);

    // * orange_pointer が DOM にて scrollLeft の値順に挿入されるように工夫. (pointer_control()へ繋げる)
    let pointers_scrollleft_data = Object.create(get("orange_data")[orange_num]["left"]);
    pointers_scrollleft_data.push(orange_pointer_scrollleft);
    pointers_scrollleft_data.sort(sorter);
    
    let how_big = pointers_scrollleft_data.indexOf(orange_pointer_scrollleft);
    // * 以下の検査で、ポインター同士が近すぎる場合 pointer_control() の実行を回避.
    if (how_big + 1 < pointers_scrollleft_data.length) {
        // * how_big が全体の中間地点に位置する場合.
        if (edit_env.orange_pointer_space_store.children[how_big].classList.contains("orange_pointer_s")) {
            if (edit_env.orange_pointer_space_store.children[how_big - 1]) {
                let head_gap = orange_pointer_scrollleft - Number(target_data(edit_env.orange_pointer_space_store.children[how_big - 1], "scroll_left_"));
                if (head_gap > 50) {
                    pointer_control(edit_env, new_orange_pointer, orange_num);
                } 
            } else {
                pointer_control(edit_env, new_orange_pointer, orange_num);
            }
            let tale_gap = Number(target_data(edit_env.orange_pointer_space_store.children[how_big], "scroll_left_")) - orange_pointer_scrollleft;
            if (tale_gap > 50) {
                pointer_control(edit_env, new_orange_pointer, orange_num);
            } 
        }
    } else if (how_big == 0 || how_big == pointers_scrollleft_data.length - 1) {
        // * how_big が一番上か一番下に位置する場合.
        // * 単なる数字調整を兼ねる.
        if (edit_env.orange_pointer_space_store.children[how_big - 1]) {
            let head_gap = orange_pointer_scrollleft - Number(target_data(edit_env.orange_pointer_space_store.children[how_big - 1], "scroll_left_"));
            if (head_gap > 50) {
                pointer_control(edit_env, new_orange_pointer, orange_num);
            } 
        } else {
            pointer_control(edit_env, new_orange_pointer, orange_num);
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * orange_pointer を挿入する箇所を指定してポインター生成・挿入へ繋げる関数.
// * orange_data の 「scroll_left」 と DOM の「順番」を合わせる目的. （関数内の how_big が「上から何番目」を表している）.
// * 下記 orange_pointer_make() によって実行される.
export const pointer_control = (edit_env, new_orange_pointer) => {
    // [* orange_pointer も orange_pointer_space_store も定義できていない.]
    if (edit_env.orange_pointer_space_store.childElementCount == 0) {
        edit_env.orange_pointer_space_store.appendChild(new_orange_pointer);
    } else {
        if (edit_env.orange_pointer_space_store.children[how_big]) {
            edit_env.orange_pointer_space_store.children[how_big].before(new_orange_pointer);
        } else {
            edit_env.orange_pointer_space_store.children[how_big - 1].after(new_orange_pointer);
        }
    }
    set("orange_data", s => s[edit_env.orange_num]["left"].push(orange_pointer_scrollleft));
    let centered_pointer = document.querySelector(".centered_pointeer");
    if (centered_pointer) {
        centered_pointer.classList.remove("centered_pointer");
    }
    centered_pointer.classList.add("centered_pointer");
    // * 実際に orange_pointer を追加し、同時に orange_stirpe とか orange_data とかについても数を合わせる.
    pointer_central(edit_env, new_orange_pointer);
}

// ---------------------------------------------------------------------------------------------------------------

// * 下記 pointer_control() の実行内容.
// * orange_pointer を追加し、他のデータについても同期する.
export const pointer_central = (edit_env, new_orange_pointer) => {
    if (edit_env.orange_space.classList.contains("now_pointer_s")) {
        // * [orange_pointer_s] scrap がnow_pointer_s を持っていた場合は、orange_pointer_sを追加.
        // * [orange_stripe] もし このhor の中でそれより scrollLeft が大きい pointer_s が存在したらそこまで、 そうじゃなかったら最後まで orange_stripe を引く.
        // * [width of orange_stripe] その pointer_s の scrollLeft より大きい値の中で最小の scrollLeft を取得して、両者の差分を orange_stripe に適応させる. 
        // [* orange_pointer の定義が抜けている.]
        new_orange_pointer.classList.add("orange_pointer_s");
        set("orange_data", s => s[the_o_num]["s_count"] += 1);
        new_orange_pointer.classList.add("num_" + get("orange_data")[edit_env.orange_num]["s_count"]);

        // [ * ここが書き換えられるはず. ------------------------------------------------------------------------------------- ]

        // * 実行時点の scrollLeft よりも大きかった値の集合.
        let pointers_scrollleft_data = Object.create(get("orange_data")[edit_env.orange_num]["left"]);
        let larger_scrollleft_data = [];
        for (let i = 0; i < this_orange_data.length; i++) {
            if (pointers_scrollleft_data[i] > orange_pointer_left) {
                edit_env.orange_lager_data_classic.push(pointers_scrollleft_data[i]);
            }
        }
        // * 以下orange_stripe についての処理.
        let new_orange_stripe = document.createElement("div");
        new_orange_stripe.classList.add("orange_stripe");
        new_orange_stripe.style.left = orange_pointer_left + half_left_width + "px";
        // * pointer_s と同じ num_ を stripe にも与える.
        new_orange_stripe.classList.add("num_" + get("orange_data")[edit_env.orange_num]["s_count"]);
        if (larger_scrollleft_data.length == 0) {
            // scrollLeftでより大きいものがなかったので、一番最後まで引っ張ってあげる場合.
            new_orange_stripe.style.width = full_end_scrollwidth - orange_pointer_left + "px";            
        } else {
            // * 初期の stripe のサイズを調整.
            let beside_orange_pointer_scrollleft = Math.min(...orange_lager_data_classic);
            new_orange_stripe.style.width = beside_orange_pointer_scrollleft - orange_pointer_left + "px";
        }

        // [ * ここが書き換えられるはず. ------------------------------------------------------------------------------------- ]

        // * stripe を追加.
        edit_env.orange_stripe_space_store.appendChild(new_orange_stripe);

    } else if (edit_env.orange_space.classList.contains("now_pointer_f")) {
        // * scrap が now_pointer_f クラスだった場合に orange_pointer_fを追加.  
        // * orange_pointer には scrollLeft の値も付与する.
        // * 対応する orange_stripe をリサイズ。（scrollLeftの差分を算出して width に適用）.
        new_orange_pointer.classList.add("orange_pointer_f");
        new_orange_pointer.classList.add("num_" + get("orange_data")[edit_env.orange_num]["s_count"]);
        // * 外部の関数を用いて 本 orange_pointer_f と同じ num_ を共有する stripe, pointer_s を取得.
        let orange_pair_stripe = grab_auto(orange_pointer)[0];
        let orange_pair_pointer = grab_auto(orange_pointer)[1];
        // * stripe のサイズを調整.
        let final_scrollleft = Number(target_data(orange_pair_pointer, "scroll_left_"));            
        orange_pair_stripe.style.width = orange_pointer_scrollleft - final_scrollleft + "px";

    }
    // * 最後に scrap の状態を更新.
    edit_env.orange_space.classList.toggle("now_pointer_s");
    edit_env.orange_space.classList.toggle("now_pointer_f");
}

// ---------------------------------------------------------------------------------------------------------------

// * 編集モードに切り替えてから orange_pointer と orange_stripe を自動的に追加する.
export const orange_pointer_initial = (edit_env) => {    
    // * 本当にこんなやり方で orange_data を最新にできるの？？どんくらい本気やねん。。
    orange_pointer_make(edit_env.wrapper_index, get("orange_data"));
    get_orange_pointer_store_space(edit_env.wrapper_index).firstElementChild.classList.add("centered_pointer");
}

// ---------------------------------------------------------------------------------------------------------------

// ** ここってデータに限った話じゃないのーーーーー？？？

// * orange_pointer を追加する処理をカプセル化した関数.
// * keytouch_edit_command_c - keytouch/edit/general.js にて実行される.
export const add_orange_pointer = () => {
    pointer_anim();
    // * ここ他の条件分岐の中とも共通してるから統一し
    setTimeout(() => {
        set("orange_data", s => s = orange_pointer_make(get("orange_data")));
    }, 200)
} 

export const remove_orange_pointer = () => {
    pointer_anim();
    // * ここ他の条件分岐の中とも共通してるから統一し
    setTimeout(() => {
        set("orange_data", s => s = orange_pointer_delete(get("orange_data")));
    }, 200)
}

// ---------------------------------------------------------------------------------------------------------------

// * ポインターを削除する関数.
export const orange_pointer_delete = () => {
    let centered_pointer = document.querySelector(".centered_pointer");
    if (centered_pointer) {
        let orange_space = centered_pointer.parentElement.parentElement.parentElement;
        let orange_num = Number(target_data(orange_space, "orange_num_"));
        // * ここで取れる pointer は、必ず「選択中のPointer」. これを削除する.
        // * 同時に同じ num を共有するポインター（ペア）も削除.
        let orange_pair = grab_auto(centered_pointer);
        // * 続いてデータの更新.
        // * 消去されるcomesinが持つ scroll_left_N クラスを取得して、配列から N を削除. 
        let key_scrollleft = Number(target_data(centered_pointer, "scroll_left_"));
        set("orange_data", s => s[orange_num]["left"].splice(s[orange_num]["left"].indexOf(key_scrollleft), 1));
        // * 以下の処理で表示上の削除.
        centered_pointer.classList.add("deleted_pointer");
        centered_pointer.style.opacity = 0;
        orange_pair[0].remove();
        // * orange_pointer_s と orange_pointer_f　の位置関係からポインターを打てる・打てないといった関係性に対応。
        // [* いまいちよく分からない. どうせ削除するのではないのか.]
        // <><><><><><><><><><> こういうのはデータで、それこそグローバルに管理しませんか？
        if (centered_pointer.classList.contains("orange_pointer_f")) {
            centered_pointer.classList.toggle("orange_pointer_f");
            centered_pointer.classList.toggle("orange_pointer_s");
        }
        // <><><><><><><><><><> こういうのはデータで、それこそグローバルに管理しませんか？
        // * 相手（orange_pointer_f）がいなかったら、そのタイミング（ひとつ手前）で　now_pointer_s が now_pointer_f に変化したことになるのでこれについても修正.
        // * つまり orange_pointer_s を打った次にこの関数が実行された場合に実行される.

        if (orange_pair[1] == null) {
            // <><><><><><><><><><> こういうのはデータで、それこそグローバルに管理しませんか？
            orange_space.classList.toggle("now_pointer_s");
            orange_space.classList.toggle("now_pointer_f");
            // <><><><><><><><><><> こういうのはデータで、それこそグローバルに管理しませんか？
        } else {
            orange_pair[1].remove();
            set("orange_data", s => [orange_num]["left"].splice(s[orange_num]["left"].indexOf(Number(target_data(orange_pair[1], "scroll_left_"))), 1));
        }
    }
}

export const deleted_pointer_delete = () => {
    // [*「opac_cam」 を指標として利用し即削除.]
    if (document.querySelector(".deleted_pointer")) {
        document.querySelector(".deleted_pointer").remove();
    }                         
}