// * from /Multi
export const get_video_id = (textcontent) => {
    // e = block
    let code;
    // * "v="以降の11文字を取得して YouTube動画IDを取得.
    let index_num = textcontent.indexOf("v=");
    // * UMから取り込まれる場合と、通常のURLペーストの場合に対応。
    if (textcontent.indexOf("v=") == -1) {
        code = textcontent;
    } else {
        code = textcontent.slice(index_num + 2, index_num + 13);
    }
    return code;
}

// * centered_block, edit_centered_block クラスを管理する関数.
export const class_replace = (from_block, to_block, classname) => {
    from_block.classList.remove(classname);
    to_block.classList.add(classname);
}

// * last_centered_block クラスを管理する関数.
export const last_block_management = (env) => {
    let list_wrappers = env.wrapper_index.children;
    let centering_num = get_the_block_index_num(env.block.parentElement, env.block);
    for (let i = 0; i < list_wrappers.length; i++) {
        let blocks = list_wrappers[i].lastElementChild.children;
        for (let o = 0; o < blocks.length; o++) {
            if (o > 0) {
                if (blocks[o].classList.contains("last_block")) {
                    blocks[o].classList.remove("last_block");
                }
                if (o == centering_num) {
                    blocks[o].classList.add("last_block");
                }
            }
        }
    }    
}

// * scrap や sp_cover 内のスクロール位置をすべて最適化する関数.
export const all_view_changer = (env, gap) => {
    // e = children[e]
    function general_view_change(e) {
        let block_list_scrollleft = env.wrapper_index.children[e].lastElementChild.scrollLeft;
        env.wrapper_index.children[e].lastElementChild.scrollLeft = block_list_scrollleft + gap;
    }
    
    if (env.wrapper_index.children[0].classList.contains("orange_space")) {
        let p_scrollleft = env.orange_pointer_space.scrollLeft;
        env.orange_pointer_space.scrollLeft = p_scrollleft + gap;
        let s_scrollleft = env.orange_pointer_space.scrollLeft;
        env.orange_pointer_space.scrollLeft = s_scrollleft + gap;
        for (let i = 0; i < env.wrapper_index.children.length; i++) {
            if (i > 0) {
                general_view_change(i);
            }
        }
    } else {    
        for (let i = 0; i < env.wrapper_index.children.length; i++) {
            general_view_change(i);
        }
    }
};

// * textarea の存在を確認して focus() を挿れる関数.
export const focus_check = (block) => {
    let if_textarea = false;
    let content = block.lastElementChild;
    if (content) {
        if (content.tagName == "TEXTAREA") {
            if_textarea = true;
            let text_value = content.value;
            content.value = "";
            content.focus();
            content.value = text_value;
        }
    }
    return if_textarea;
}

// * textarea の存在を確認して blur() を実行する関数.
export const blur_check = (block) => {
    let if_textarea = false;
    let content = block.lastElementChild;
    if (content) {
        if (content.tagName == "TEXTAREA") {
            if_textarea = true;
            content.blur();
        }
    }
    return if_textarea;
}

// ---------------------------------------------------------------------------------------------------------------

// * センタリングしているブロックの位置を支点に window のスクロール位置(上下)を調整する関数.
export const window_positioning = (block) => {
    if (get("window_height") - block.getBoundingClientRect().bottom < get("the_sunsetline")) {
        let gap = get("the_sunsetline") + block.getBoundingClientRect().bottom - get("window_height");
        scrollBy(0, gap);
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
export const centered_concealer_cancel = () => {
    let concealers = document.querySelectorAll(".concealer");
    for (let i = 0; i < concealers.length; i++) {
        if (concealers[i].classList.contains("concealer")) {
            concealers[i].classList.remove("concealer");
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * sameの途中にブロックが挿入された場合に対処する関数. 
export const devide_same_group = (block, e) => {
    let left_block = block.previousElementSibling;
    let right_block;
    if (e == "addon") {
        right_block = block.nextElementSibling;
    } else if (e == "replace") {
        right_block = block;
    }
    // * 両サイドがsameであることが条件で、かつ両者が特定のクラス(same_start, same_end)を持たない場合にのみ実行.
    if (left_block && right_block) {
        if (left_block.classList.contains("same") && right_block.classList.contains("same")) {
            if (left_block.classList.contains("same_start") == false && left_block.classList.contains("same_end") == false && right_block.classList.contains("same_start") == false && right_block.classList.contains("same_end") == false) { 
                let content = document.querySelector(".concealer").lastElementChild;
                left_block.classList.add("same_end");
                if (content.tagName == "IMG") {
                    left_block.style.height = 225 + "px";
                }
                left_block.appendChild(spe_cont);
                right_block.classList.add("same_start");
                let classname = "same_num_" + value(right_block, "same_num_");
                // * same_start　以降の same_num_ を更新.
                let sames = document.getElementsByClassName(classname);
                let breakpoint = [].slice.call(sames).indexOf(right_block);            
                set("same_num", s => s += 1);
                for (let i = sames.length - 1; i >= breakpoint; i--) {
                    let same_block = sames[i];
                    classmove(same_block, same_block, "same_num_", "remove");
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
export const optimize_writing = (block) => {
    let textarea = block.lastElementChild;
    textarea.style.height = 24 + 'px';
    let scrollHeight = e.scrollHeight;
    textarea.style.height = scrollHeight + 'px'; 
    let height = textarea.clientHeight;
    block.style.height = height + "px";
    window_positioning(block);
}

// ---------------------------------------------------------------------------------------------------------------

// * 単一同士の sp - sp ごとに提供する.
// からのブロック群へ、ブロックの中身やクラスをトレースする関数.
// * e = 移動元
// * f = 移動先
// * g,= [移動元のst, 移動先のst]
// * h = 何個分のブロックを移すか.
export const trace_content_to_empties = (from_list_wrapper, to_list_wrapper, index_data, block_num) => {
    // * wrapper_index 内の話に過ぎない.
    let from_index_num = index_data[0];
    let to_index_num = index_data[1];
    let from_block_list = from_list_wrapper.lastElementChild;
    let to_block_list = to_list_wrapper.lastElementChild;
    // * 短い方をループ軸に採用すること.
    // * もしくはその数をパラメータで受け取るような書き方の方が親切だろうか.
    // * list_wrapper ごとに処理する.
    let adjuster = 0;
    for (let i = from_index_num; i < block_num; i++) {
        adjuster ++;
        // * 中身を移し替える.
        let from_block = from_block_list.children[i];
        let to_block = to_block_list.children[to_index_num + adjuster];
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

// 引数に渡したブロックを中央にした時の scrollLeft の値を返すオブジェクト.
export const get_custom_scroll_left = (e) => {
    let scrollleft = e.scrollWidth - window.innerWidth - get("half_left_width") - get("block_width");
    return scrollleft;
}