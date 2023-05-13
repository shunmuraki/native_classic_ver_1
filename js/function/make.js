import { cs_bye } from "./general.js";
import { full_start_scrollwidth } from "../data/constant.js";

// sp_cover の生成関数
export const make_fragment = (e, f) => {

    const sp_cover = document.createElement("div");
    const sp = document.createElement("div");
    const horizontal = document.createElement("div");
    const adjuster = document.createElement("div");
    const vertical = document.createElement("div");
    const textarea = document.createElement("textarea");
    const end_adjuster = document.createElement("div");
    
    sp_cover.classList.add("sp_cover");
    sp_cover.classList.add("pausing");
    sp.classList.add("sp");

    horizontal.classList.add("horizontal");
    adjuster.classList.add("adjuster");
    vertical.classList.add("vertical");
    textarea.classList.add("write_area");
    textarea.classList.add("style_1_1_0_1");
    adjuster.classList.add("horizontal_child");
    vertical.classList.add("horizontal_child");
    end_adjuster.classList.add("adjuster");
    end_adjuster.classList.add("horizontal_child");

    vertical.appendChild(textarea);
    horizontal.appendChild(adjuster);
    horizontal.appendChild(vertical);
    horizontal.appendChild(end_adjuster);
    sp.appendChild(horizontal);
    sp_cover.appendChild(sp);
    
    let fragment = document.createDocumentFragment();
    fragment.append(sp_cover);
    
    if (f == "before") {
        e.before(fragment);
        e.previousElementSibling.lastElementChild.lastElementChild.scrollLeft = full_start_scrollwidth;
    } else if (f == "after") {
        e.after(fragment);        
        e.nextElementSibling.lastElementChild.lastElementChild.scrollLeft = full_start_scrollwidth;
    }

    cs_bye();
}

// ブロックの生成関数
export const make_ver_fragment = (e, f) => {

    const vertical = document.createElement("div");
    const textarea = document.createElement("textarea");

    vertical.classList.add("vertical");
    textarea.classList.add("write_area");
    textarea.classList.add("style_1_1_0_1");
    vertical.classList.add("horizontal_child");
    vertical.appendChild(textarea);

    let fragment = document.createDocumentFragment();
    fragment.append(vertical);

    if (f == "before") {
        e.before(fragment);
    } else if (f == "after") {
        e.after(fragment);
    }
    
    cs_bye();
}

// keytouch でインスタンスを作るためのもの。a
class keytouch_base {
    constructor() {
        this.current = document.activeElement;
        this.type_signiture = "native";
        this.current_vertical = null;
        this.current_horizontal = null;
        this.current_sp = null;
        this.current_sp_cover = null;
    }

    setText() {    
        if (document.activeElement.tagName != "BODY") {
            this.current = document.activeElement;
            this.type_signiture = current.value;
            this.current_vertical = document.querySelector(".centering");
        } else {
            this.current_vertical = document.querySelector(".centering");
        }
    }

    setGroup() {
        this.current_horizontal = vertical_to_hor(this.current_vertical);
        this.current_sp = vertical_to_sp(this.current_vertical);
        this.current_sp_cover = vertical_to_sp_cover(this.current_vertical);
    }
}

// クラスを new してそのインスタンスまでセットしてくれる関数. 最終的なインスタンスを return してくれる。
export const keytouch_setup = () => {
    let keytouch = new keytouch_base();
    keytouch.setText;
    keytouch.setGroup;
    return keytouch;
}