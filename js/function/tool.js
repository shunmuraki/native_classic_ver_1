import { screen } from "../elements.js";

// ブロックから指定の階層の要素を返す関数.
export const vertical_to_hor = (e) => {
    return e.parentElement;
};
export const vertical_to_sp = (e) => {
    return e.parentElement.parentElement;
};
export const vertical_to_sp_cover = (e) => {
    return e.parentElement.parentElement.parentElement;
};

// ターゲットの知りたい数字を返してくれる関数.
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
    const num = target_data(trigger_pointer, "num_");
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

// ソート関数.
export const sorter = (e, f) => {
    return e - f;
}

// クラスの付け替え関数.
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

// screen 要素に付与されている same　の数を取得する関数.
export const same_data_getter = () => { 
    let the_same_data_now = Number(target_data(screen, "same_data_"));
    return the_same_data_now;
}

// screen 要素に付与されている same　の数を更新する関数.
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

// 左右の移動でspecial_covの変更内容を same_end に反映させる関数
export const tracer_basis = (e) => {
    let special_cov = which_special_is(e);
    
    // たぶんここで opacity: 1; の content が same_end に append されていたんだね。
    if (special_cov) {
        let specon_cloned = special_cov.lastElementChild.cloneNode(true);
        specon_cloned.style.setProperty('opacity', 0, 'important');
        let same_name = "same_num_" + target_data(e, "same_num_");
        let sames = document.getElementsByClassName(same_name);
        sames[sames.length - 1].lastElementChild.remove();
        sames[sames.length - 1].appendChild(specon_cloned);
    }
}

// same がセンタリングしている間にスタイリングを変更した場合に、sameの外に出る時に対象となっていた special_cov の要素を複製して大元の same_end に格納する関数.
export const same_change_tracer = (e) => {
    if (e.previousElementSibling) {
        if (e.previousElementSibling.classList.contains("same_end")) {

            let special_cov = which_special_is(e.previousElementSibling);
            if (special_cov) {
                let specon_cloned = special_cov.lastElementChild.cloneNode(true);
                specon_cloned.style.setProperty('opacity', 0, 'important');
                if (e.previousElementSibling.lastElementChild) {
                    e.previousElementSibling.lastElementChild.remove();
                }
                e.previousElementSibling.appendChild(specon_cloned);
                console.log(e.previousElementSibling);
            }
        }
    } 
    if (e.nextElementSibling) {
        if (e.nextElementSibling.classList.contains("same_start")) {
            tracer_basis(e.nextElementSibling);
        }
    }
}

// 何番目のブロックかをカウントして返す関数.
export const elem_post_getter = (e) => {
    let parent = e.parentElement;
    let the_num = [].slice.call(parent.children).indexOf(e);
    return the_num;
}

// 対応する special_cov を返す関数.
export const which_special_is = (e) => {
    let the_name = "this_cov_is_" + target_data(e, "same_num_");
    let the_special_cov = document.getElementsByClassName(the_name)[0];
    return the_special_cov;
}

// style_ クラスから、実際のスタイル項目を取得して返す関数。
const data_layer_shift = (e, f) => {
  let in_process = Object.keys(e)[0];
  let v = in_process[f];
  return v;
}

const the_process = (e) => {
    let nums = e.split("_");
    // ここにタイトルを出し入れしていく。まずは階層からになる。
    let title;
    for (let i = 0; i < nums.length - 3; i++) {
        if (i % 2 == 0) {
            data_layer_shift(title, i);
        }
    }
    title = Object.keys(you)[0];
    return title;
}

// e = その要素
export const what_is_the_title = (e) => {
    let the_dev = "style";
    let classies = e.classList;
    let titles = new Array();

    for (let i = 0; i < classies.length; i++) {
        let yourname = classies[i];
        if (yourname.indexOf(the_dev) != -1) {
            yourname = yourname.replace(the_dev, '');
            let title = the_process(yourname);
            titles.push(title);
        }
    }
    return titles;
}