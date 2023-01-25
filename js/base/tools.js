// Tools.

// vertical(centering) - horizontal
export const vertical_to_hor = (e) => {
    return e.parentElement;
};

// vertical(centering) - sp
export const vertical_to_sp = (e) => {
    return e.parentElement.parentElement;
};

// vertical(centering) - sp_cover
export const vertical_to_sp_cover = (e) => {
    return e.parentElement.parentElement.parentElement;
};

// ---------------------------------- * - * - * - * Editable シリーズ * - * - * - * ----------------------------------

// ターゲットの知りたい数字を返してくれる関数
export function target_data(e, f) {
    const list = e.classList;
    for (let i = 0; i < list.length; i++) {
        if (list[i].includes(f)) {
         var the_num = list[i].replace(f, '');
        }
    }
    return the_num;
}

// 同じ番号を持つ pointer, stripe を返す関数
// ** 取り方直す。
export function grab_auto(e) {
    const trigger_pointer = e;
    // まず num_ を取得. * num はファイルにおけるグローバル変数による管理にある。
    const num = target_data(trigger_pointer, "num_");
    const the_key_classname = "num_" + num;

    // stripeを特定
    let partner_stripe = null;
    // * ここ
    let stripe_space = e.parentElement.parentElement.nextElementSibling.firstElementChild;
    let all_stripe = stripe_space.children;
    for (let i = 0; i < all_stripe.length; i++) {
        if (all_stripe[i].classList.contains(the_key_classname)) {
            partner_stripe = all_stripe[i];
        }
    }
    
    // もうひとつのセットとなるpointerを取得
    // いやこんな取り方じゃダメでしょ。ちゃんと trigger_pointer が所属している orange_pointer_spaceとかから検索しないと。
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

// sorting.
export const sorter = (e, f) => {
    return e - f;
}

// remover
export const classmover = (e, f, g, h) => {
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

export const same_data_getter = () => {
    let screen = document.querySelector(".screen");
    let the_same_data_now = Number(target_data(screen, "same_data_"));
    return the_same_data_now;
}

export const same_data_counter = (e) => {

    let screen = document.querySelector(".screen");
    let screen_classlist = screen.classList;

    for (let i = 0; i < screen_classlist.length; i++) {
        let classname = screen_classlist[i];
        if (classname.indexOf("same_data_") !== -1) {
            screen.classList.remove(classname);
            screen.classList.add("same_data_" + e);
        }
    }
}

export const same_change_tracer = (e) => {
    if (e.previousElementSibling) {
        if (e.previousElementSibling.classList.contains("same_end")) {

            let the_name = "this_cov_is_" + target_data(e.previousElementSibling, "same_num_");
            let special_cov = document.getElementsByClassName(the_name)[0];

            if (special_cov) {
                let specon_cloned = special_cov.lastElementChild.cloneNode(true);
                e.previousElementSibling.lastElementChild.remove();
                e.previousElementSibling.appendChild(specon_cloned);
            }

        }
    } 
    if (e.nextElementSibling) {
        if (e.nextElementSibling.classList.contains("same_start")) {

            let the_name = "this_cov_is_" + target_data(e.nextElementSibling, "same_num_");
            let special_cov = document.getElementsByClassName(the_name)[0];

            if (special_cov) {
                
                let specon_cloned = special_cov.lastElementChild.cloneNode(true);
    
                let same_name = "same_num_" + target_data(e.nextElementSibling, "same_num_");
                let sames = document.getElementsByClassName(same_name);
            
                sames[sames.length - 1].lastElementChild.remove();
                sames[sames.length - 1].appendChild(specon_cloned);

            }


        }
    }
}