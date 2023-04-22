// centering クラスの調整関数
export const centering_marker = (e, f, g) => {
    e.classList.remove(g);
    f.classList.add(g);
}

// original_centering クラスの調整関数
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

// textarea の存在を確認してfocusを挿れる関数.
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

// textarea の存在を確認してblurする関数.
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

// Editモードにおけるスクロール位置の調整関数　(???)
export const go_af_scroll = () => {
    let the_scrap = document.querySelector(".scrolled");
    if (the_scrap) {
        the_scrap.classList.remove("scrolled");
        let the_dis = (Number(target_data(the_scrap, "scroll_over_")) * blocksize) / blocktime;
        all_view_changer(the_scrap, -the_dis);
    }
}

// 上下左右の移動の際に special_cov を same_end に反映させて special_cov を描画上の都合からも削除する関数.
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

// センタリングしているブロックの位置から window のスクロール位置を調整する関数.
export const adjust_box = (e) => {
    if (window_height - e.getBoundingClientRect().bottom < the_sunsetline) {
        let the_adjust_num = the_sunsetline + e.getBoundingClientRect().bottom - window_height;
        scrollBy(0, the_adjust_num);
        wheel_positioning();
    }
}

// ブロックの生成やスプリット、ポインターを打つなどのタイミングで標準ポインターをアニメーションさせる際に使用する関数.
export const pointer_anim = () => {                    
    let pri_pointer = document.querySelector(".pointer");
    pri_pointer.animate(
        [
            { scale: 1 },
            { scale: 0.8 }
        ], {
            duration: 300,
            fill: "both",
        }
    );
    pri_pointer.animate(
        [
            { scale: 0.8 },
            { scale: 1,  }
        ], {
            duration: 300,
            fill: "both",
            delay: 300,
        }
    );
}

// center_specialクラスを除去する（special_covは残す）
export const cs_bye = () => {
    let specials = document.querySelectorAll(".special_cov");
    for (let i = 0; i < specials.length; i++) {
        if (specials[i].classList.contains("center_special")) {
            specials[i].classList.remove("center_special");
        }
    }
}

// muliable からの移籍（2023.4.20）
// sameの途中に挿入がされる場合への対処関数. (両サイドがsameであることが条件で、かつ両者が start , end は持たない場合にのみ実行)
export const same_cutter = (e, f) => {
    let the_target_left = e.previousElementSibling;
    let the_target_right;

    if (f == "addon") {
        the_target_right = e.nextElementSibling;
    } else if (f == "replace") {
        the_target_right = e;
    }
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

                // same_start　以降の same_num_ を更新.
                let sames = document.getElementsByClassName(same_name);
                let breakpoint = [].slice.call(sames).indexOf(the_target_right);
                
                let same_data = same_data_getter();
                same_data += 1;
                same_data_counter(same_data);
                
                for (let i = sames.length - 1; i >= breakpoint; i--) {
                    let same_block = sames[i];
                    classmover(same_block, same_block, "same_num_", "remove");
                    same_block.classList.add("same_num_" + same_data);                    
                }
            } 
        }
    }
}

// stylable からの移籍（2023.4.20）
// style_ クラスを取り外すことで content の位置を ms のスペースに対応させる関数.
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
  
  // ホイールの描画アニメーションの関数.
export const wheel_seton = () => {
    the_pointer.animate(
        [
        { transform: 'scale(1)', opacity: 1, },
        { transform: 'scale(5)', opacity: 1 },
        ], {
        duration: 300,
        fill: "both",
        easing: "ease-in-out"
        }
    );
    wheel.style.display = "block";
    layer_base.animate(
        [
        { transform: 'rotate(270)', },
        { transform: 'rotate(360deg) ' }
        ], {
        duration: 700,        
        fill: "both",
        easing: "ease-in-out",
        delay: 200,
        }
    );
    wheel.animate(
        [
        { opacity: 0, },
        { opacity: 1, }, 
        ], {
        duration: 400,
        delay: 200,
        fill: "both",
        easing: "ease-in-out"
        }
    );
}

// ms からの移籍（2023.4.20）
// ホイールをブロックやポインター（編集時）に追従させる関数.
export const adjust_target_pos = (e, f) => {
    if (e) {
        let ms_top = getComputedStyle(e).top;
        let ms_st;
        if (f == "on") {
            default_pos = Number(ms_top.substring(0, ms_top.length - 2));
            if (default_pos > 60) {
                ms_st = 60 + default_pos;
            } else {
                ms_st = 60;
            }
            let ms_st_code = ms_st + "px";
            e.style.setProperty('top', ms_st_code, 'important');
        } else if (f == "off") {
            e.style.top = '';
            default_pos = 0;
        }
    }
}

// e = current
// f = current_vertical
export const optimize_writing = (e, f) => {
    e.style.height = 24 + 'px';
    let scrollHeight = e.scrollHeight;
    e.style.height = scrollHeight + 'px'; 
    let height = e.clientHeight;
    e.parentElement.style.height = height + "px";
    adjust_box(f);
}

// e = current
// f = type_signiture
// g = current_vertical
// h = current_horizontal
// i = current_sp_cover
export const keytouch_basic = (e, f, g) => {
    if (document.activeElement.tagName != "BODY") {
        e = document.activeElement;
        f = e.value;
        g = document.querySelector(".centering");
        if (document.activeElement.classList.contains("ms_area") == false) {
            optimize_writing(e, g);
        }
    } else {
        g = document.querySelector(".centering");
    }

    h = vertical_to_hor(g);
    i = vertical_to_sp_cover(g);
}