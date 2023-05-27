// * centering クラスを管理する関数.
export const centering_marker = (e, f, g) => {
    e.classList.remove(g);
    f.classList.add(g);
}

// * original_centering クラスを管理する関数.
export const original_centering_checker = (e, f) => {
    let sps = e.children;
    let centering = f;
    let centering_num = [].slice.call(vertical_to_hor(centering).children).indexOf(centering);
    for (let i = 0; i < sps.length; i++) {
        let vers = sps[i].lastElementChild.children;
        for (let o = 0; o < vers.length; o++) {
            if (o > 0) {
                if (vers[o].classList.contains("original_centering")) {
                    vers[o].classList.remove("original_centering");
                }
                if (o == centering_num) {
                    vers[o].classList.add("original_centering");
                }
            }
        }
    }    
}

// * scrap や sp_cover 内のスクロール位置をすべて最適化する関数.
export const all_view_changer = (e, f) => {
    if (e.children[0].classList.contains("orange_space")) {
        let orange = e.firstElementChild;
        let orange_pointer_space = orange.firstElementChild;
        let orange_stripe_space = orange.lastElementChild;
        let po_de = orange_pointer_space.scrollLeft;
        orange_pointer_space.scrollLeft = po_de + f;
        let st_de = orange_stripe_space.scrollLeft;
        orange_stripe_space.scrollLeft = st_de + f;

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
    let bol = false;
    let content = e.lastElementChild;
    if (content) {
        if (content.tagName == "TEXTAREA") {
            bol = true;
            let v = content.value;
            content.value = "";
            content.focus();
            content.value = v;
        }
    }
    return bol;
}

// * textarea の存在を確認して blur() を実行する関数.
export const blur_checker = (e) => {
    let bol = false;
    let content = e.lastElementChild;
    if (content) {
        if (content.tagName == "TEXTAREA") {
            bol = true;
            content.blur();
        }
    }
    return bol;
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
export const special_cleaner = (e) => {
    let ends = document.querySelectorAll(".same_end");
    for (let i = 0; i < ends.length; i++) {
        if (vertical_to_sp_cover(ends[i]).isEqualNode(e)) {
            let the_special_cov = which_special_is(ends[i]);
            if (the_special_cov) {
                let cont = the_special_cov.lastElementChild.cloneNode(true);
                cont.style.setProperty('opacity', 1, 'important');
                if (ends[i].lastElementChild) {
                    ends[i].lastElementChild.remove();
                }
                ends[i].appendChild(cont);
                the_special_cov.remove();
            }
        }
    }
}

// * センタリングしているブロックの位置を支点に window のスクロール位置(上下)を調整する関数.
export const adjust_box = (e) => {
    if (window_height - e.getBoundingClientRect().bottom < the_sunsetline) {
        let the_adjust_num = the_sunsetline + e.getBoundingClientRect().bottom - window_height;
        scrollBy(0, the_adjust_num);
        wheel_positioning();
    }
}

// * ブロックの生成やスプリット、ポインターを打つなどのタイミングで標準ポインターをアニメーションさせる際に使用する関数.
export const pointer_anim = () => {                    
    let pri_pointer = document.querySelector(".pointer");
    pointer_effect(pri_pointer);
}

// * 描画上の観点から center_special クラスを除去する（special_covは残す）
// * centering_special によって選択しているブロックに CSS から box-shadow がかかる.
export const cs_bye = () => {
    let specials = document.querySelectorAll(".special_cov");
    for (let i = 0; i < specials.length; i++) {
        if (specials[i].classList.contains("center_special")) {
            specials[i].classList.remove("center_special");
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * sameの途中にブロックが挿入された場合に対処する関数. 
export const same_cutter = (e, f) => { 
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
    if (screen.classList.contains("edit")) {
        centering = document.getElementsByClassName("new_layer_centering")[0];
    } else {
        centering = document.getElementsByClassName("centering")[0];
    }
    let the_focus_top = centering.getBoundingClientRect().top;
    let the_focus_left = centering.getBoundingClientRect().left;
    pointer.style.top = the_focus_top - 10 + "px";
    pointer.style.left = the_focus_left - 10 + "px";
}
  
// * 装飾ホイールを起動する関数.
export const wheel_seton = () => {
    pointer_switch(the_pointer, "on");
    wheel.style.display = "block";
    layerbase_switch(layer_base, "on");
    wheel_switch(wheel, "on");
}

// ---------------------------------------------------------------------------------------------------------------

// * "/" コマンドに伴tってブロックの中の要素の位置を調整する関数.
export const adjust_target_pos = (e, f) => {
    if (e) {
        let ms_top = getComputedStyle(e).top;
        let ms_st;
        if (f == "on") {
            set("default_pos", s => s = Number(ms_top.substring(0, ms_top.length - 2)));
            if (default_pos > 60) {
                ms_st = 60 + default_pos;
            } else {
                ms_st = 60;
            }
            let ms_st_code = ms_st + "px";
            e.style.setProperty('top', ms_st_code, 'important');
        } else if (f == "off") {
            e.style.top = '';
            set("default_pos", s => s = 0);
        }
    }
}

// * テキスト入力の過程で選択中のブロックの高さを最適化する関数.
export const optimize_writing = (e, f) => {
    e.style.height = 24 + 'px';
    let scrollHeight = e.scrollHeight;
    e.style.height = scrollHeight + 'px'; 
    let height = e.clientHeight;
    e.parentElement.style.height = height + "px";
    adjust_box(f);
}

// ---------------------------------------------------------------------------------------------------------------

// * 左右の移動でspecial_covの変更内容を same_end に反映させる関数.
export const tracer_basis = (e) => {
    let special_cov = which_special_is(e);
    if (special_cov) {
        let specon_cloned = special_cov.lastElementChild.cloneNode(true);
        specon_cloned.style.setProperty('opacity', 0, 'important');
        let same_name = "same_num_" + target_data(e, "same_num_");
        let sames = document.getElementsByClassName(same_name);
        sames[sames.length - 1].lastElementChild.remove();
        sames[sames.length - 1].appendChild(specon_cloned);
    }
}

// * same(= special_cov) がセンタリングしている間にスタイリングを変更した場合に、sameの外に出る時に対象となっていた special_cov の要素を複製して大元の same_end に格納する関数.
export const same_change_tracer = (e) => {
    if (e.previousElementSibling) {
        if (e.previousElementSibling.classList.contains("same_end")) {
            let special_cov = which_special_is(e.previousElementSibling);
            // * 以下を stracer_basis (concealer_reflecton) で処理する.
            if (special_cov) {
                let specon_cloned = special_cov.lastElementChild.cloneNode(true);
                specon_cloned.style.setProperty('opacity', 0, 'important');
                if (e.previousElementSibling.lastElementChild) {
                    e.previousElementSibling.lastElementChild.remove();
                }
                e.previousElementSibling.appendChild(specon_cloned); 
            }
        }
    } 
    if (e.nextElementSibling) {
        if (e.nextElementSibling.classList.contains("same_start")) {
            tracer_basis(e.nextElementSibling);
        }
    }
}

// * 何番目のブロックか、数字を返す関数.
export const elem_post_getter = (e) => {
    let parent = e.parentElement;
    let the_num = [].slice.call(parent.children).indexOf(e);
    return the_num;
}