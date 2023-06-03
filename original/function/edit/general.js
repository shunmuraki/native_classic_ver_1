import { wrapper_index_make_essential } from "../make";

export const get_custom_scroll_left = (e) => {
    let scroll_left = e.scrollWidth - window.innerWidth - get("half_left_width") - get("block_width");
    return scroll_left;
}

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

// ---------------------------------------------------------------------------------------------------------------

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
        
        // [ * ここが書き換えられるはず. ------------------------------------------------------------------------------------- ]

        // * 最も近い場所にあるポインターの scrollLeft とは、 今の scrollLeft よりも小さい値の集合の中で最大値.
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
        // * 予め pointer は scrollLeft の値順に並べてあり、
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

        // [ * ここが書き換えられるはず. ------------------------------------------------------------------------------------- ]
    }

    let final_data = [the_elem, the_left];
    return final_data;
};

// ---------------------------------------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------------------------------------

// * 分割された wrapper_index を生成する関数.
export const edit_wrapper_index_make = (e) => {
    // 最初に wrapper_index_make() を実行して、次にこの関数で中に必要なブロックを詰めるようにしたらどうだろう.
    let fragment = wrapper_index_make_essential();

    // * すでに sp_cover には適切なラインが築かれているので、これを崩さずに再利用する. 
    // * 中身のブロックはクリア.
    let newla_sps = fragment.children;
    // * ここの処理をなんとかしたい.
    // * 中身も一緒に複製してクリーンアップして、という処理を省いて、
    // * 必要分を複製するところまで単一のオブジェクトにできたらいいんだろうか.
    for (let i = 0; i < newla_sps.length; i++) {
        let bye_once = newla_sps[i].lastElementChild.children;
        for (let o = bye_once.length - 1; o >= 0 ; o--) {
            // * adjusterを残す.
            if (o > 0) { 
                bye_once[o].remove();
            }
        }
        for (let o = 0; o < linesize; o++) {
            // * scrap(sp_cover) のclone の　horizontal に ver を10個詰める.
            make_ver_fragment(newla_sps[i].lastElementChild.lastElementChild, "after");
        }
        // * editモードは右半分のスペースまで利用するため、可動域を拡張する目的でお尻にも adjuster を挿入.
        let adjuster_element = document.createElement("div");
        adjuster_element.classList.add("adjuster");
        adjuster_element.classList.add("horizontal_child");
        newla_sps[i].lastElementChild.lastElementChild.after(adjuster_element);
    }

    for (let o = 0; o < linesize; o++) {
        // * scrap(sp_cover) のclone の　horizontal に ver を10個詰める.
        make_ver_fragment(fragment[i].lastElementChild.lastElementChild, "after");
    }

    // * Nativeにはラインごとのシーキング機能があるため、デフォルトでその状態をセット.
    new_sp_cov.classList.add("pausing");
    
    // * 挿入前にorange_space を追加.
    add_orange_space_for_everyone(new_sp_cov);

    return fragment;
}


// * 必要な数だけ edit_wrapper_index を編集レイヤーに挿入するオブジェクト.
export const duplicate_edit_wrapper_index_enough = () => {
    // * 横に 10 個ずつのブロックを展開し、縦にタイムラインを展開する.
    let vh_count = env.current_horizontal.childElementCount - 2;
    let sp_cover_will_num = Math.ceil(vh_count / linesize);    

    // * scrap を必要な数だけ new_layer に追加。
    // [* このあたりで「余計に scrap が生成されている」疑いがある.]
    for (let i = 0; i < sp_cover_will_num; i++) {
        let new_one = new_sp_cov.cloneNode(true);
        new_one.firstElementChild.classList.add("orange_num_" + i);
        new_one.classList.add("principle_pointer");
        new_layer.appendChild(new_one);
    }
}


// * 分割された wrapper_index へ移動元の wrapper_index のブロック群を移す関数.
export const trace_to_edit_wrapper_index = (e) => {
    let screen_sps = e;
    for (let i = 0; i < e.length; i++) {
        let screen_vers = screen_sps[i].lastElementChild.children;
        // * 最後尾のadjuster をパス.
        for (let o = 0; o < screen_vers.length - 1; o++) {
            // * 前のadjuster をパス.  
            if (o > 0 ) {

                let the_num = o;
                let ver_side = Math.trunc(the_num / linesize);
                let hor_side = the_num % linesize;
                
                // 割り切れてしまった場合.
                if (ver_side == 0 && hor_side == 1) {
                    hor_side = 0;
                } else if (ver_side > 0 && hor_side == 0) {
                    ver_side -= 1;
                    // * ここを動的にする必要がある.
                    hor_side = 23;
                } else {
                    hor_side -= 1;
                }
                
                new_layer.children[ver_side].children[i + 1].lastElementChild.children[linesize].classList.add("you");
                
                // * 編集レイヤーにおけるデフォルトのセンタリングを決定. 編集レイヤーにおける centering は 「new_layer_centering」クラスによる管理.
                let the_block_into = new_layer.children[ver_side].children[i + 1].lastElementChild.children[hor_side + 1];        
                if (the_block_into.lastElementChild) {
                    the_block_into.lastElementChild.remove();
                }

                // * おそらくここで、デフォルトスクリーンのブロックたちから編集レイヤーの新しいブロックへ特定のクラスを移行している。
                for (let j = 0; j < the_name_list.length; j++) {
                    classmover(screen_vers[o], the_block_into, the_name_list[j], "add");
                }
                
                if (screen_vers[o].classList.contains("centering")) {
                    the_block_into.classList.add("new_layer_centering");
                } 
                
                // * dupブロックの場合を考えて条件分岐.
                if (screen_vers[o].lastElementChild) {
                    let imp_content = screen_vers[o].lastElementChild.cloneNode(true);
                    the_block_into.appendChild(imp_content);
                }
            }
        } 
    }
}


//[* これって same_cutter で実現できる処理じゃないのか？]
// * 編集モード展開時に強制的に 複数の edit_wrapper_index へ分割された same 群を調整するオブジェクト.
export const edit_wrapper_index_same_adaptation = (e) => {
    // * [linesize] 個ずつで強制的に区分けされたscrapによって same が分裂したケースに対応.
    for (let i = 0; i < new_layer.childElementCount; i++) {
        for (let o = 0; o < new_layer.children[i].childElementCount; o++) {
            if (o > 0) {
                let the_target_start = new_layer.children[i].children[o].lastElementChild.firstElementChild.nextElementSibling;
                let the_target_end = new_layer.children[i].children[o].lastElementChild.lastElementChild.previousElementSibling;
                if (the_target_start.classList.contains("same") && the_target_start.classList.contains("same_start") == false) {
                    the_target_start.classList.add("same_start");
                    // * 編集モードへの展開が、トリミング後に影響しないよう、エスケープ処理に備えて co クラスを付与.
                    the_target_start.classList.add("co");
                }
                if (the_target_end.classList.contains("same") && the_target_end.classList.contains("same_end") == false) {
                    the_target_end.classList.add("same_end"); 
                    // * 編集モードへの展開が、トリミング後に影響しないよう、エスケープ処理に備えて co クラスを付与.
                    the_target_end.classList.add("co");
                }
            }
        }
    }
}

// * 以下編集レイヤーのスクロール位置の調整.
export const edit_layer_positioning = (e) => {
 let centering_num = [].slice.call(layer_centering.parentElement.children).indexOf(layer_centering) - 1;
 let see = document.querySelector(".see");
 let see_num = [].slice.call(new_layer.children).indexOf(see);
 let scraps = new_layer.children;
 let the_default_scrollleft = blocksize * centering_num + window.innerWidth - half_left_width;
 
 for (let i = 0; i < scraps.length; i++) {
     let scrap = scraps[i];
     // * orange_dataと連携が開始.
     set("orange_data", s => s[i] = {});
     set("orange_data", s => s[i]["s_count"] = 0);
     set("orange_data", s => s[i]["left"] = []);
     if (i == see_num) {
         for (let o = 0; o < scrap.children.length; o++) {
             // orange_space をスキップ
             if (o == 0) {
                 scrap.children[o].children[0].scrollLeft = the_default_scrollleft;
                 scrap.children[o].children[1].scrollLeft = the_default_scrollleft;
             }
             if (o > 0) {
                 scrap.children[o].lastElementChild.scrollLeft = the_default_scrollleft;
             }
         }
     } else {
         for (let o = 0; o < scrap.children.length; o++) {
             // orange_space をスキップ
             if (o == 0) {
                 scrap.children[o].children[0].scrollLeft = full_start_scrollwidth;
                 scrap.children[o].children[1].scrollLeft = full_start_scrollwidth;
             }
             if (o > 0) {
                 scrap.children[o].lastElementChild.scrollLeft = full_start_scrollwidth;
             }
         }
     }
 }   
}