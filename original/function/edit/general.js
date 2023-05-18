// * 実行時点でのポインターに最も近いブロック、もしくはブロックに最も近いポインターを返す関数.
export const best_related_element = (e, f, g) => {

    let the_elem = null;
    let the_left = 0;
    let scrap = e;
    let orange = scrap.firstElementChild;
    let orange_pointer_list = orange.firstElementChild.firstElementChild;

    // * ともに scrollLeft から探索.
    if (g == "block") {
        
        // * 選択中のポインターに最も近いブロック.
        let vers = scrap.firstElementChild.nextElementSibling.lastElementChild.children;
        let exact_distance = f + half_left_width - window.innerWidth;
        let the_num = Math.round(exact_distance / blocksize);
        the_elem = vers[the_num + 1];
        let boxes_width = blocksize * the_num;
        let the_final_num = window.innerWidth + boxes_width - half_left_width;
        the_left = the_final_num;

    } else if (g == "pointer") {
    
        // * 選択中のブロックに最も近いポインター.
        // * こちらは orange_data[orange_num_]["left"] の値の集合の中で実行時点での scrollLeft に最も近い値を見つけ、
        // * そこから それがどのポインターの位置に該当するのかを計算.
        let the_key_num = target_data(orange, "orange_num_");
        let dataset = get("orange_data")[the_key_num]["left"];
        let exact_distance = f;
        
        // * 最も近い場所にあるポインターのscrollLeft: 現 scrollLeft よりも小さい値の集合の中で最大値.
        let original_dataset_min = [];
        for (let i = 0; i < dataset.length; i++) {
            if (dataset[i] <= exact_distance) {
                original_dataset_min.push(dataset[i]);
            }
        }
        let original_dataset_max = [];
        for (let i = 0; i < dataset.length; i++) {
            if (dataset[i] > exact_distance) {
                original_dataset_max.push(dataset[i]);
            }
        }

        let nearly_left = 0;
        // * 予め pointer は scrollLeft の値順に並べてあって、
        // * データの中の「何番目」とDOMの中の「何番目」が一致する.
        if (original_dataset_min.length > 0) {
            nearly_left = Math.max(...original_dataset_min);
        } else if (original_dataset_min.length <= 0) { 
            nearly_left = Math.min(...original_dataset_max);
        }

        let the_name = "scroll_left_" + nearly_left;
        the_left = nearly_left;
        let the_pointers = orange_pointer_list.children;
        for (let i = 0; i < the_pointers.length; i++) {
            if (the_pointers[i].classList.contains(the_name)) {
                the_elem = the_pointers[i];
            }
        }
    }

    let final_data = [the_elem, the_left];
    return final_data;
};

// * 編集モード での 移動の仕方(ポインター移動 or ブロック移動) を管理する関数.
export const principle_management = (e, f) => {
    let scrap = e;
    if (scrap.classList.contains("principle_block")) {
        if ("principle_block" != f) {
            scrap.classList.remove("principle_block");
            scrap.classList.add(f);
        }
    } else if (scrap.classList.contains("principle_pointer")) {
        if ("principle_pointer" != f) {
            scrap.classList.remove("principle_pointer");
            scrap.classList.add(f);
        }
    } 
}

// * 対象の sp_cover に orange_space を追加する関数.
export function add_orange_space_for_everyone(e) {
    // * Orange Space.
    let orange_space = document.createElement("div");
    orange_space.classList.add("orange_space");
    orange_space.classList.add("now_pointer_s");
    // * Pointer Zone.
    let orange_pointer_zone = document.createElement("div");
    orange_pointer_zone.classList.add("orange_pointer_zone");
    let orange_pointer_line = document.createElement("div");
    orange_pointer_line.classList.add("orange_line");
    orange_pointer_zone.appendChild(orange_pointer_line);
    orange_space.appendChild(orange_pointer_zone);
    // * Stripe Zone.
    let orange_stripe_zone = document.createElement("div");
    orange_stripe_zone.classList.add("orange_stripe_zone");
    let orange_stripe_line = document.createElement("div");
    orange_stripe_line.classList.add("orange_line");
    orange_stripe_zone.appendChild(orange_stripe_line);
    // * 合体.
    // [* 果たして fragment を用いる必要があるのか.]
    orange_space.appendChild(orange_stripe_zone);
    let fragment = document.createDocumentFragment();
    fragment.appendChild(orange_space);
    // * 追加.
    e.prepend(fragment);
}

// * 編集モードを実行した際の編集レイヤーの初期位置を調整する関数.
export const edit_mode_default_adjust = (e) => {
    let editor_height = window_height - 100;
    let the_up_comming = (editor_height - e.clientHeight) / 2;
    if (editor_height - e.getBoundingClientRect().bottom < the_up_comming) {
        let the_adjust_num = the_up_comming + e.getBoundingClientRect().bottom - editor_height;
        scrollBy(0, the_adjust_num);
        wheel_positioning();
    }
}

// * orange_stripe 上にあるブロックだけを抽出する関数.
// * トリミングの際に実行される.　(/keytouch/what_to_do/edit/escape)
let stripe_inner_or_out = (e) => {
                
    let w_col = new Array();
    // * scrapごとに処理をする。
    let po_and_st = scraps[e].firstElementChild.firstElementChild.firstElementChild.children;
    
    // * stripe ごとに処理する。
    // * stripeの先頭と最後尾のブロックを検出し、それらについての情報を調べて
    // * 「同一scrap内のsp間で共通の選択範囲を示すデータ」を作成する。
    for (let o = 0; o < po_and_st.length; o++) {
        if (po_and_st[o].classList.contains("orange_pointer_s")) {
            let the_pointer_s = po_and_st[o];
            let the_pointer_f = grab_auto(the_pointer_s)[1];
            let the_pointer_scrollleft_st = Number(target_data(the_pointer_s, "scroll_left_"));
            let the_pointer_scrollleft_en = Number(target_data(the_pointer_f, "scroll_left_"));

            // * stripeごとの選択範囲を示すデータ。scrap - orange_space ごとに束ねることになる。
            let stcl = new Array();
            let w = full_start_scrollwidth;

            // * pointer_s と pointer_f のポジションをブロック数に変換。
            let st = Math.trunc((the_pointer_scrollleft_st - w) / blocksize) + 1;
            let en = Math.trunc((the_pointer_scrollleft_en - w) / blocksize);

            // * 以下 [st] について
            // 差分を取得してこれが 50 以上なら actuar と認定し、same_start と一緒にデータに格納する。
            // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ]]
            let st_d = Math.trunc(the_pointer_scrollleft_st - w - (blocksize * (st - 1)));
            
            if (st_d > 50) {
                let rsd = blocksize - st_d;
                stcl.push([st, rsd]);
            } else {
                stcl.push([st, "NONE"]);
            }

            // 以下 [en] について
            // 差分を取得してこれが 50 以上なら actuar と認定し、same_start と一緒にデータに格納する。
            // * BANS: [[何番目のst, actuar_stの大きさ], [何番目のen, actuar_enの大きさ], coの関係かどうか]
            let en_d = Math.trunc(the_pointer_scrollleft_en - w - (blocksize * en)); 
            
            if (en_d > 50) {
                stcl.push([en, en_d]);
            } else {
                // co についても処理。
                stcl.push([en, "NONE"]);
            }

            w_col.push(stcl);
        }
    }

    cool.push(w_col);
}

// [* 不明.]
// [* opac_com の実態から分からない.]
function delete_opacam() {
    // [*「opac_cam」 を指標として利用し即削除.]
    if (document.querySelector(".opac_cam")) {
        document.querySelector(".opac_cam").remove();
    }                         
}

// * オートシーキングモード中のラインの YT の再生をする関数.
function player_starter(e) {
    e.pauseVideo();
    let the_time = yt_resetter();
    e.seekTo(the_time);
    e.playVideo();
}