import { target_data, grab_auto } from "../function/tool.js";
import { wheel_positioning } from "./general.js";
import { blocksize, half_left_width, full_end_scrollwidth, full_start_scrollwidth, window_height } from "../data/constant.js";

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