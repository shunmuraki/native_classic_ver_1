import { centering_marker, focus_checker } from "../function/general.js";
import { global_update } from "../data/variable.js";

// * 空のブロックの生成関数.
// * まだ same クラスを持たせる、といった処理はされていない、ただのブロックの挿入.
export const make_dup_fragment = (e, f) => {
    const vertical = document.createElement("div");
    vertical.classList.add("vertical");
    vertical.classList.add("horizontal_child");
    // [* わざわざ毎度 fragment に格納をする必要があるのか.]
    let fragment = document.createDocumentFragment();
    fragment.append(vertical);
    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
}

// * same ブロックを新しく作り、同時に same_num の値も同期する関数.
export const same_setup = (e) => {
    e.classList.add("same");
    set("same_num", s => s += 1);
}

// * 隣の空のブロックについて、 same, same_num_N といったクラスを与え、
// * 同時にこの割り込みに応じて、その周辺のブロックのクラスも更新する.
export const same_around = (e, f) => {
    let next_one;
    if (f == "default") {
        next_one = e.previousElementSibling;
        if (! e.classList.contains("same")) {
            same_setup(e);
            e.classList.add("same_end");
            next_one.classList.add("same_start");
        }
    } else if (f == "connected") {
        // * これってどういう場合？
        next_one = e.nextElementSibling;
        if (! e.classList.contains("same")) {
            same_setup(e);
            e.classList.add("same_start");
            next_one.classList.add("same_end");
        }
        let the_content = e.lastElementChild;
        if (next_one.lastElementChild) {
            next_one.lastElementChild.remove();
            next_one.appendChild(the_content.cloneNode(true));
        }
        the_content.remove();
        centering_marker(e, next_one, "centering");
        if(e.classList.contains("same_end")) {
            e.classList.remove("same_end");
            next_one.classList.add("same_end");
        }
    }
    let the_name = "same_num_" + get("same_num");
    e.classList.add("same");
    next_one.classList.add("same");          
    e.classList.add(the_name);
    next_one.classList.add(the_name);
    // command + U では要らない配慮.
    focus_checker(next_one);
}