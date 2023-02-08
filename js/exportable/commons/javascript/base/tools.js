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
    
    // 以下もうひとつのセットのpointerを取得
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

    // 仕上げ
    const grabed = [partner_stripe, partner_pointer];
    return grabed;
}

// 指定のクラスを移し取ったり削除する関数.
export const classmover = (e, f, g, h) => {
    let classlist = e.classList;
    for (let i = 0; i < classlist.length; i++) {
        if (classlist[i].indexOf(g) != - 1) {
            if (h == "add") {
                if (f.classList.contains(classlist[i]) == false) {
                    f.classList.add(classlist[i]);
                }
            } else if (h == "remove") {
                if (f.classList.contains(classlist[i]) == true) {
                    console.log(classlist[i]);
                    console.log(g);
                    f.classList.remove(classlist[i]);
                }
            }
        }
    }
} 