import { get_correspond_same_concealer, get_the_block_index_num } from "./tool";

// * centering クラスを管理する関数.
export const centered_block_management = (e, f, g) => {
    e.classList.remove(g);
    f.classList.add(g);
}

// * original_centering クラスを管理する関数.
export const origin_block_management = (e, f) => {
    let list_wrappers = e.children;
    let centering_num = get_the_block_index_num(f.parentElement, f);
    for (let i = 0; i < list_wrappers.length; i++) {
        let blocks = list_wrappers[i].lastElementChild.children;
        for (let o = 0; o < blocks.length; o++) {
            if (o > 0) {
                if (blocks[o].classList.contains("origin_block")) {
                    blocks[o].classList.remove("origin_block");
                }
                if (o == centering_num) {
                    blocks[o].classList.add("origin_block");
                }
            }
        }
    }    
}

// * scrap や sp_cover 内のスクロール位置をすべて最適化する関数.
export const all_view_changer = (e, f) => {
    if (e.children[0].classList.contains("orange_space")) {
        let po_de = get_orange_pointer_space(e).scrollLeft;
        get_orange_pointer_space(e).scrollLeft = po_de + f;
        let st_de = get_orange_stripe_space(e).scrollLeft;
        get_orange_stripe_space(e).scrollLeft = st_de + f;
        for (let i = 0; i < e.children.length; i++) {
            if (i > 0) {
                let hor_de = e.children[i].lastElementChild.scrollLeft;
                e.children[i].lastElementChild.scrollLeft = hor_de + f;
            }
        }
    } else {    
        for (let i = 0; i < e.children.length; i++) {
            let hor_de = e.children[i].lastElementChild.scrollLeft;
            e.children[i].lastElementChild.scrollLeft = hor_de + f;
        }
    }
};

// * textarea の存在を確認して focus() を挿れる関数.
export const focus_checker = (e) => {
    let if_textarea = false;
    let content = e.lastElementChild;
    if (content) {
        if (content.tagName == "TEXTAREA") {
            if_textarea = true;
            let v = content.value;
            content.value = "";
            content.focus();
            content.value = v;
        }
    }
    return if_textarea;
}

// * textarea の存在を確認して blur() を実行する関数.
export const blur_checker = (e) => {
    let if_textarea = false;
    let content = e.lastElementChild;
    if (content) {
        if (content.tagName == "TEXTAREA") {
            if_textarea = true;
            content.blur();
        }
    }
    return if_textarea;
}

// * Editモードにおけるスクロール位置を管理する関数.
// [* これが未だにどんな機能を持っているのかが分からない.]
export const go_af_scroll = () => {
    let the_scrap = document.querySelector(".scrolled");
    if (the_scrap) {
        the_scrap.classList.remove("scrolled");
        let the_dis = (Number(target_data(the_scrap, "scroll_over_")) * blocksize) / blocktime;
        all_view_changer(the_scrap, -the_dis);
    }
}

// * 上下左右の移動の際に special_cov が持つ要素(content) を same_end に反映させて special_cov を描画上の都合から削除する関数.
export const same_concealer_cleaner = (e) => {
    let ends = document.querySelectorAll(".same_end");
    for (let i = 0; i < ends.length; i++) {
        if (get_wrapper_index(ends[i]).isEqualNode(e)) {
            let same_concealer = get_correspond_same_concealer(ends[i]);
            if (same_concealer) {
                let content = same_concealer.lastElementChild.cloneNode(true);
                content.style.setProperty('opacity', 1, 'important');
                if (ends[i].lastElementChild) {
                    ends[i].lastElementChild.remove();
                }
                ends[i].appendChild(content);
                same_concealer.remove();
            }
        }
    }
}

// * センタリングしているブロックの位置を支点に window のスクロール位置(上下)を調整する関数.
export const window_positioning = (e) => {
    if (get("window_height") - e.getBoundingClientRect().bottom < get("the_sunsetline")) {
        let the_adjust_num = get("the_sunsetline") + e.getBoundingClientRect().bottom - get("window_height");
        scrollBy(0, the_adjust_num);
        wheel_positioning();
    }
}

// * ブロックの生成やスプリット、ポインターを打つなどのタイミングで標準ポインターをアニメーションさせる際に使用する関数.
export const pointer_animate = () => {                    
    let pointer = document.querySelector(".pointer");
    pointer_animation(pointer);
}

// * 描画上の観点から center_special クラスを除去する（special_covは残す）
// * centering_special によって選択しているブロックに CSS から box-shadow がかかる.
export const centered_same_concealer_cancel = () => {
    let same_concealers = document.querySelectorAll(".same_concealer");
    for (let i = 0; i < same_concealers.length; i++) {
        if (same_concealers[i].classList.contains("centered_same_concealer")) {
            same_concealers[i].classList.remove("centered_same_concealer");
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * sameの途中にブロックが挿入された場合に対処する関数. 
export const same_devide = (e, f) => { 
    
    let the_target_left = e.previousElementSibling;
    let the_target_right;
    if (f == "addon") {
        the_target_right = e.nextElementSibling;
    } else if (f == "replace") {
        the_target_right = e;
    }

    // * 両サイドがsameであることが条件で、かつ両者が特定のクラス(same_start, same_end)を持たない場合にのみ実行.
    if (the_target_left && the_target_right) {
        if (the_target_left.classList.contains("same") && the_target_right.classList.contains("same")) {
            if (the_target_left.classList.contains("same_start") == false && the_target_left.classList.contains("same_end") == false && the_target_right.classList.contains("same_start") == false && the_target_right.classList.contains("same_end") == false) { 
         
                let spe_cont = document.querySelector(".special_cov").lastElementChild;
                the_target_left.classList.add("same_end");
         
                if (spe_cont.tagName == "IMG") {
                    the_target_left.style.height = 225 + "px";
                }
         
                the_target_left.appendChild(spe_cont);
                the_target_right.classList.add("same_start");
                let same_name = "same_num_" + target_data(the_target_right, "same_num_");
                
                // * same_start　以降の same_num_ を更新.
                let sames = document.getElementsByClassName(same_name);
                let breakpoint = [].slice.call(sames).indexOf(the_target_right);            
                set("same_num", s => s += 1);
                for (let i = sames.length - 1; i >= breakpoint; i--) {
                    let same_block = sames[i];
                    classmover(same_block, same_block, "same_num_", "remove");
                    same_block.classList.add("same_num_" + get("same_num"));
                }
            } 
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * 常駐のポインターの位置を決定する関数.
export const wheel_positioning = () => {
    let centering;
    if (element(".default_display").classList.contains("edit")) {
        centering = element(".origin_block");
    } else {
        centering = element(".centered_block");
    }
    let the_focus_top = centering.getBoundingClientRect().top;
    let the_focus_left = centering.getBoundingClientRect().left;
    element(".pointer").style.top = the_focus_top - 10 + "px";
    element(".pointer").style.left = the_focus_left - 10 + "px";
}
  
// * 装飾ホイールを起動する関数.
export const wheel_activate = () => {
    pointer_switch_animation(the_pointer, "on");
    element("wheel").style.display = "block";
    layerbase_switch(element(".layer_base"), "on");
    wheel_switch_animaion(element("wheel"), "on");
}

// ---------------------------------------------------------------------------------------------------------------

// * テキスト入力の過程で選択中のブロックの高さを最適化する関数.
export const optimize_writing = (e, f) => {
    e.style.height = 24 + 'px';
    let scrollHeight = e.scrollHeight;
    e.style.height = scrollHeight + 'px'; 
    let height = e.clientHeight;
    e.parentElement.style.height = height + "px";
    window_positioning(f);
}

// ---------------------------------------------------------------------------------------------------------------

// * same(= special_cov) がセンタリングしている間にスタイリングを変更した場合に、sameの外に出る時に対象となっていた special_cov の要素を複製して大元の same_end に格納する関数.
export const same_concealer_tracer = (e) => {
    if (e.previousElementSibling) {
        if (e.previousElementSibling.classList.contains("same_end")) {
            let same_concealer = get_correspond_same_concealer(e.previousElementSibling);
            // * 以下を stracer_basis (concealer_reflecton) で処理する.
            if (same_concealer) {
                let cloned_same_concealer = special_cov.lastElementChild.cloneNode(true);
                cloned_same_concealer.style.setProperty('opacity', 0, 'important');
                if (e.previousElementSibling.lastElementChild) {
                    e.previousElementSibling.lastElementChild.remove();
                }
                e.previousElementSibling.appendChild(cloned_same_concealer); 
            }
        }
    } 
    if (e.nextElementSibling) {
        if (e.nextElementSibling.classList.contains("same_start")) {
            same_concealer_tracer(e.nextElementSibling);
        }
    }
}

// * 左右の移動でspecial_covの変更内容を same_end に反映させる関数.
export const same_concealer_trace_essential = (e) => {
    let same_concealer = get_correspond_same_concealer(e);
    if (same_concealer) {
        let cloned_same_concealer = same_concealer.lastElementChild.cloneNode(true);
        cloned_same_concealer.style.setProperty('opacity', 0, 'important');
        let same_name = "same_num_" + target_data(e, "same_num_");
        let sames = document.getElementsByClassName(same_name);
        sames[sames.length - 1].lastElementChild.remove();
        sames[sames.length - 1].appendChild(specon_cloned);
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * 単一同士の sp - sp ごとに提供する.
// からのブロック群へ、ブロックの中身やクラスをトレースする関数.
// * e = 移動元
// * f = 移動先
// * g,= [移動元のst, 移動先のst]
// * h = 何個分のブロックを移すか.
export const trace_block_to_empties = (e, f, g, h) => {
    // * wrapper_index 内の話に過ぎない.
    let from_st = g[0];
    let to_st = g[1];
    let block_num = h;
    let from_block_list = e.lastElementChild;
    let to_block_list = f.lastElementChild;
    // * 短い方をループ軸に採用すること.
    // * もしくはその数をパラメータで受け取るような書き方の方が親切だろうか.
    // * list_wrapper ごとに処理する.
    let i_to_st = 0;
    for (let i = from_st; i < block_num; i++) {
        i_to_st ++;
        // * 中身を移し替える.
        let from_block = from_block_list.children[i];
        let to_block = to_block_list.children[to_st + i_to_st];
        let from_block_content = from_block.lastElementChild;
        to_block.lastElementChild.remove();
        to_block.appendChild(from_block_content.cloneNode(true));
        // * クラスとスタイルをトレース.
        for (let o = 0; o < the_name_list.length; o++) {
            classlist_move(from_block, to_block, the_name_list[o], "add");
            let from_style = getComputedStyle(from_block);
            to_block.style.height = from_style.height;
        }

    }
}