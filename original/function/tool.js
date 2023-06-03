export const element = (e) => {
    let element = document.querySelector(e);
    return element;
}

// * ブロックの所属する block_list を返す関数.
export const get_block_list = (e) => {
    return e.parentElement;
};

// * ブロックの所属する list_wrapper を返す関数.
export const get_list_wrapper = (e) => {
    return e.parentElement.parentElement;
};

// * ブロックの所属する wrapper_index を返す関数.
export const get_wrapper_index = (e) => {
    return e.parentElement.parentElement.parentElement;
};

// * ターゲットの持つ特定のクラスに含まれる [意味のある数字] を返してくれる関数.
export function get_value(e, f) {
    const list = e.classList;
    for (let i = 0; i < list.length; i++) {
        if (list[i].includes(f)) {
         var the_num = list[i].replace(f, '');
        }
    }
    return the_num;
}

// * ペアとなる orange_pointer, orange_stripe を返す関数.
export function get_orange_pair(e) {
    const trigger_pointer = e;
    const num = get_property_number(trigger_pointer, "num_");
    const the_key_classname = "num_" + num;
    let partner_stripe = null;
    let stripe_space = e.parentElement.parentElement.nextElementSibling.firstElementChild;
    let all_stripe = stripe_space.children;
    for (let i = 0; i < all_stripe.length; i++) {
        if (all_stripe[i].classList.contains(the_key_classname)) {
            partner_stripe = all_stripe[i];
        }
    }

    let partner_pointer = null;
    let pointer_space = e.parentElement;
    let all_pointer = pointer_space.children;

    for (let i = 0; i < all_pointer.length; i++) {
        if (trigger_pointer.classList.contains("orange_pointer_s")) {
            if (all_pointer[i].classList.contains(the_key_classname) && all_pointer[i].classList.contains("orange_pointer_f")) {
                partner_pointer = all_pointer[i];
            }
        } else if (trigger_pointer.classList.contains("orange_pointer_f")) {
            if (all_pointer[i].classList.contains(the_key_classname) && all_pointer[i].classList.contains("orange_pointer_s")) {
                partner_pointer = all_pointer[i];
            }
        }
    }
    const grabed = [partner_stripe, partner_pointer];
    return grabed;
}

// * ソートする関数.
// [* この関数の使いどころが不明.]
export const sorter = (e, f) => {
    return e - f;
}

// * クラスを追加したり外したり、ある element から別の element へ付け替える関数.
export const classlist_move = (e, f, g, h) => {
    let classlist = e.classList;
    for (let i = 0; i < classlist.length; i++) {
        if (classlist[i].indexOf(g) != -1) {    
            if (h == "add") {
                if (f.classList.contains(classlist[i]) == false) {
                    f.classList.add(classlist[i]);
                }
            } else if (h == "remove") {
                if (f.classList.contains(classlist[i]) == true) {
                    f.classList.remove(classlist[i]);
                }
            }
        }
    }
}

// * special_cov を考慮した「選択中のターゲット」を探して返す関数.
export const get_real_target = (e) => {
    let centering = document.querySelector(".centering"); 
    if (centering.classList.contains("same")) {
      target = document.querySelector(".special_cov").lastElementChild;
    } else {
      target = centering.lastElementChild;
    }
    return target;
}  

// * 対応する special_cov を返す関数.
export const get_correspond_same_concealer = (e) => {
    let the_name = "this_cov_is_" + target_data(e, "same_num_");
    let the_special_cov = document.getElementsByClassName(the_name)[0];
    return the_special_cov;
}

// ---------------------------------------------------------------------------------------------------------------

// * wrapper_index から直接その中の block の数を返してくれる関数.
export const get_block_num = (e) => {
    let block_list = e.lastElementChild.lastElementChild;
    let block_num = block_list.children.length;
    return block_num;
}

// * 指定したクラスを持っているブロックが所蔵する block_list の番号を取得できる関数.
export const get_the_block_index_num = (e, f) => {
    let block;
    if (f.tagName) {
    block = f;
    } else {
        block = e.querySelector(f);
    }
    let the_index_num = [].slice.call(e.children).indexOf(block) + 1;
    return the_index_num;
}