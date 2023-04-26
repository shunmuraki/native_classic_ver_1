import { native_value } from "../data/variable.js";
import { centering_marker, focus_checker } from "../function/general.js";

// 空のブロックの生成関数（sameの場合に使用）
export const make_dup_fragment = (e, f) => {
    const vertical = document.createElement("div");
    vertical.classList.add("vertical");
    vertical.classList.add("horizontal_child");
    let fragment = document.createDocumentFragment();
    fragment.append(vertical);

    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
}

export const same_around = (e, f) => {
    
    let same_num = native_value("same_num");
    let next_one;

    function same_setup() {
        e.classList.add("same"); 
        same_num = native_value('same_num', 1);
    }

    if (f == "default") {
        next_one = e.previousElementSibling;
        if (! e.classList.contains("same")) {
            same_setup();
            e.classList.add("same_end");
            next_one.classList.add("same_start");
        }
    } else if (f == "connected") {
        next_one = e.nextElementSibling;
        if (! e.classList.contains("same")) {
            same_setup();
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


    // ここ変えてくれ。
    let the_name = "same_num_" + same_num;

    e.classList.add("same");
    next_one.classList.add("same");          
    e.classList.add(the_name);
    next_one.classList.add(the_name);
    // command + U では必要なかったが配慮.
    focus_checker(next_one);
}