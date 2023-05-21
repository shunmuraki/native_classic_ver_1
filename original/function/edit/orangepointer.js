// * comesin クラス（最新のorange_pointerを表す）を管理する関数.
export const comesin_management = (e, f, g) => {
    if (document.querySelector(".comesin")) {
        if (e == "top") {
            let next_one = g.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.lastElementChild;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");
        } else if (e == "left") {
            let next_one = f.previousElementSibling;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");
        } else if (e == "bottom") {
            let next_one = g.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");
        } else if (e == "right") {
            let next_one = f.nextElementSibling;
            f.classList.toggle("comesin");
            next_one.classList.toggle("comesin");
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * 下記 pointer_control() の実行内容.
// * orange_pointer を追加し、他のデータについても同期する.
export const pointer_central = () => {
    if (orange.classList.contains("now_pointer_s")) {        
        // * [orange_pointer_s] scrap がnow_pointer_s を持っていた場合は、orange_pointer_sを追加.
        // * [orange_stripe] もし このhor の中でそれより scrollLeft が大きい pointer_s が存在したらそこまで、 そうじゃなかったら最後まで orange_stripe を引く.
        // * [width of orange_stripe] その pointer_s の scrollLeft より大きい値の中で最小の scrollLeft を取得して、両者の差分を orange_stripe に適応させる. 
        // [* orange_pointer の定義が抜けている.]
        orange_pointer.classList.add("orange_pointer_s");
        set("orange_data", s => s[the_o_num]["s_count"] += 1);
        orange_pointer.classList.add("num_" + get("orange_data")[the_o_num]["s_count"]);

        // [ * ここが書き換えられるはず. ------------------------------------------------------------------------------------- ]

        // * 実行時点の scrollLeft よりも大きかった値の集合.
        let this_orange_data = Object.create(get("orange_data")[the_o_num]["left"]);
        let orange_lager_data_classic = [];
        for (let i = 0; i < this_orange_data.length; i++) {
            if (this_orange_data[i] > orange_pointer_left) {
                orange_lager_data_classic.push(this_orange_data[i]);
            }
        }
        // * 以下orange_stripe についての処理.
        let orange_stripe = document.createElement("div");
        orange_stripe.classList.add("orange_stripe");
        orange_stripe.style.left = orange_pointer_left + half_left_width + "px";
        // * pointer_s と同じ num_ を stripe にも与える.
        orange_stripe.classList.add("num_" + get("orange_data")[the_o_num]["s_count"]);
        if (orange_lager_data_classic.length == 0) {
            // scrollLeftでより大きいものがなかったので、一番最後まで引っ張ってあげる場合.
            orange_stripe.style.width = full_end_scrollwidth - orange_pointer_left + "px";            
        } else {
            // * 初期の stripe のサイズを調整.
            let the_orange_lagerone = Math.min(...orange_lager_data_classic);
            orange_stripe.style.width = the_orange_lagerone - orange_pointer_left + "px";
        }

        // [ * ここが書き換えられるはず. ------------------------------------------------------------------------------------- ]

        // * stripe を追加.
        orange_stripe_space_store.appendChild(orange_stripe);
    } else if (orange.classList.contains("now_pointer_f")) {
            // * scrap が now_pointer_f クラスだった場合に orange_pointer_fを追加.  
            // * orange_pointer には scrollLeft の値も付与する.
            // * 対応する orange_stripe をリサイズ。（scrollLeftの差分を算出して width に適用）.
            orange_pointer.classList.add("orange_pointer_f");
            orange_pointer.classList.add("num_" + get("orange_data")[the_o_num]["s_count"]);
            // * 外部の関数を用いて 本 orange_pointer_f と同じ num_ を共有する stripe, pointer_s を取得.
            let the_comp_stripe = grab_auto(orange_pointer)[0];
            let the_comp_pointer = grab_auto(orange_pointer)[1];
            // * stripe のサイズを調整.
            let the_comp_s_pos = Number(target_data(the_comp_pointer, "scroll_left_"));            
            the_comp_stripe.style.width = orange_pointer_left - the_comp_s_pos + "px";
    }
    // * 最後に scrap の状態を更新.
    orange.classList.toggle("now_pointer_s");
    orange.classList.toggle("now_pointer_f");
}

// * orange_pointer を挿入する箇所を指定してポインター生成・挿入へ繋げる関数.
// * orange_data の 「scroll_left」 と DOM の「順番」を合わせる目的. （関数内の how_big が「上から何番目」を表している）.
// * 下記 orange_pointer_make() によって実行される.
export const pointer_control = () => {
    // [* orange_pointer も orange_pointer_space_store も定義できていない.]
    if (orange_pointer_space_store.childElementCount == 0) {
        orange_pointer_space_store.appendChild(orange_pointer);
    } else {
        if (orange_pointer_space_store.children[how_big]) {
            orange_pointer_space_store.children[how_big].before(orange_pointer);   
        } else {
            orange_pointer_space_store.children[how_big - 1].after(orange_pointer);   
        }
    }
    
    set("orange_data", s => s[the_o_num]["left"].push(orange_pointer_left));
    let comesin = document.querySelector(".comesin");
    if (comesin) {
        comesin.classList.remove("comesin");
    }
    orange_pointer.classList.add("comesin");
    // * 実際に orange_pointer を追加し、同時に orange_stirpe とか orange_data とかについても数を合わせる.
    pointer_central();
}

// ---------------------------------------------------------------------------------------------------------------

// * [ヘッド関数] orange_pointer の生成・追加をする関数.
export const orange_pointer_make = (e) => {
    let see = e;
    let orange = see.firstElementChild;
    let orange_pointer_space = orange.firstElementChild;
    let orange_stripe_space = orange.lastElementChild;
    let orange_pointer_space_store = orange_pointer_space.lastElementChild;
    let orange_stripe_space_store = orange_stripe_space.lastElementChild;
    let the_o_num = target_data(orange, "orange_num_");
    // * 実際に pointer を打つ地点の scrollLeft. （DOMの順番とは関係しない）
    let orange_pointer_left = orange_pointer_space.scrollLeft;
    let orange_pointer = document.createElement("div");
    orange_pointer.classList.add("orange_pointer");
    orange_pointer.style.left = orange_pointer_left + half_left_width + "px";
    // * scrollLeft は pointer 自身にも持たせておく.
    let the_sl_po = "scroll_left_" + orange_pointer_left;
    orange_pointer.classList.add(the_sl_po);
    // * orange_pointer が DOM にて scrollLeft の値順に挿入されるように工夫. (pointer_control()へ繋げる)
    let compare_classic = Object.create(get("orange_data")[the_o_num]["left"]);
    compare_classic.push(orange_pointer_left);
    compare_classic.sort(sorter);
    let how_big = compare_classic.indexOf(orange_pointer_left);
    // * 以下の検査で、ポインター同士が近すぎる場合 pointer_control() の実行を回避.
    if (how_big + 1 < compare_classic.length) {
        // * how_big が全体の中間地点に位置する場合.
        if (orange_pointer_space_store.children[how_big].classList.contains("orange_pointer_s")) {
            if (orange_pointer_space_store.children[how_big - 1]) {
                let beside_before_gap = orange_pointer_left - Number(target_data(orange_pointer_space_store.children[how_big - 1], "scroll_left_"));
                if (beside_before_gap > 50) {
                    pointer_control();
                } 
            } else {
                pointer_control();
            }
            let beside_after_gap = Number(target_data(orange_pointer_space_store.children[how_big], "scroll_left_")) - orange_pointer_left;                    
            if (beside_after_gap > 50) {
                pointer_control();
            } 
        }
    } else if (how_big == 0 || how_big == compare_classic.length - 1) {
        // * how_big が一番上か一番下に位置する場合.
        // * 単なる数字調整を兼ねる.
        if (orange_pointer_space_store.children[how_big - 1]) {
            let beside_before_gap = orange_pointer_left - Number(target_data(orange_pointer_space_store.children[how_big - 1], "scroll_left_"));
            if (beside_before_gap > 50) {
                pointer_control();
            } 
        } else {
            pointer_control();
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * orange_pointer を追加する処理をカプセル化した関数.
// * keytouch_edit_command_c - keytouch/edit/general.js にて実行される.
function pointer_setter() {
    pointer_anim();
    // * ここ他の条件分岐の中とも共通してるから統一し
    setTimeout(() => {
        set("orange_data", s => s = delete_orange_p(get("orange_data")));
    }, 200)
}

// * ポインターを削除する関数.
export const delete_orange_p = () => {
    let comesin = document.querySelector(".comesin");
    if (comesin) {
        let orange = comesin.parentElement.parentElement.parentElement;
        let the_o_num = Number(target_data(orange, "orange_num_"));
        // * ここで取れる pointer は、必ず「選択中のPointer」. これを削除する.
        // * 同時に同じ num を共有するポインター（ペア）も削除.
        let grab_list = grab_auto(comesin);
        // * 続いてデータの更新.
        // * 消去されるcomesinが持つ scroll_left_N クラスを取得して、配列から N を削除. 
        let the_remover_keydata = Number(target_data(comesin, "scroll_left_"));
        set("orange_data", s => s[the_o_num]["left"].splice(s[the_o_num]["left"].indexOf(the_remover_keydata), 1));
        // * 以下の処理で表示上の削除.
        comesin.classList.add("opac_cam");
        comesin.style.opacity = 0;
        grab_list[0].remove();
        // * orange_pointer_s と orange_pointer_f　の位置関係からポインターを打てる・打てないといった関係性に対応。
        // [* いまいちよく分からない. どうせ削除するのではないのか.]
        if (comesin.classList.contains("orange_pointer_f")) {
            comesin.classList.toggle("orange_pointer_f");
            comesin.classList.toggle("orange_pointer_s");
        }
        // * 相手（orange_pointer_f）がいなかったら、そのタイミング（ひとつ手前）で　now_pointer_s が now_pointer_f に変化したことになるのでこれについても修正.
        // * つまり orange_pointer_s を打った次にこの関数が実行された場合に実行される.
        if (grab_list[1] == null) {
            orange.classList.toggle("now_pointer_s");
            orange.classList.toggle("now_pointer_f");                
        } else {
            grab_list[1].remove();
            set("orange_data", s => [the_o_num]["left"].splice(s[the_o_num]["left"].indexOf(Number(target_data(grab_list[1], "scroll_left_"))), 1));
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// [* 不明.]
// [* opac_com の実態から分からない.]
function delete_opacam() {
    // [*「opac_cam」 を指標として利用し即削除.]
    if (document.querySelector(".opac_cam")) {
        document.querySelector(".opac_cam").remove();
    }                         
}