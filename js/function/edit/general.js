import { target_data, grab_auto } from "../function/tool.js";
import { wheel_positioning } from "./general.js";
import { blocksize, half_left_width, full_end_scrollwidth, full_start_scrollwidth, window_height } from "../data/constant.js";

// ポインターやブロックからして一番近いブロックかポインターを検出する関数.
export const best_related_element = (e, f, g) => {

    let the_elem = null;
    let the_left = 0;
    let scrap = e;
    let orange = scrap.firstElementChild;
    let orange_pointer_list = orange.firstElementChild.firstElementChild;

    // orange_data が修正ポイントの中心になりそうだね。
    if (g == "block") {
        let vers = scrap.firstElementChild.nextElementSibling.lastElementChild.children;
        let exact_distance = f + half_left_width - window.innerWidth;
        let the_num = Math.round(exact_distance / blocksize);
        the_elem = vers[the_num + 1];

        let boxes_width = blocksize * the_num;
        let the_final_num = window.innerWidth + boxes_width - half_left_width;
        the_left = the_final_num;

    } else if (g == "pointer") {
    
        // 今の scrap の orange_space が持つ orange_num_ を取得後、orange_data[orange_num_]["left"] で　そのscrapの pointer のscrollLeft 値の集合を取得して最も近いpointerを見つけ出す。
        let the_key_num = target_data(orange, "orange_num_");
        let dataset = get("orange_data")[the_key_num]["left"];
        let exact_distance = f;

        // それより小さいものの中で最大の値を取得. これが最も近い場所にあるポインターのscrollLeft.
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

        // DOMにおいて予め pointer はscrollLeftの値順に並べてあるため、データの中の「何番目」とそれが一致する.
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

// 今がポインター移動かブロック移動かを管理.
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

// orange_space を生成・追加する関数.
export function add_orange_space_for_everyone(e) {
    let orange_space = document.createElement("div");
    orange_space.classList.add("orange_space");
    orange_space.classList.add("now_pointer_s");

    let orange_pointer_zone = document.createElement("div");
    orange_pointer_zone.classList.add("orange_pointer_zone");

    let orange_pointer_line = document.createElement("div");
    orange_pointer_line.classList.add("orange_line");

    orange_pointer_zone.appendChild(orange_pointer_line);
    orange_space.appendChild(orange_pointer_zone);

    let orange_stripe_zone = document.createElement("div");
    orange_stripe_zone.classList.add("orange_stripe_zone");

    let orange_stripe_line = document.createElement("div");
    orange_stripe_line.classList.add("orange_line");

    orange_stripe_zone.appendChild(orange_stripe_line);
    orange_space.appendChild(orange_stripe_zone);

    let fragment = document.createDocumentFragment();

    fragment.appendChild(orange_space);
    e.prepend(fragment);
}

// センタリングしているブロックの位置から window のスクロール位置を調整する関数.
export const edit_mode_default_adjust = (e) => {
    let editor_height = window_height - 100;
    let the_up_comming = (editor_height - e.clientHeight) / 2;
    if (editor_height - e.getBoundingClientRect().bottom < the_up_comming) {
        let the_adjust_num = the_up_comming + e.getBoundingClientRect().bottom - editor_height;
        scrollBy(0, the_adjust_num);
        wheel_positioning();
    }
}