// * ブロックの所属する horizontal を返す関数.
export const vertical_to_hor = (e) => {
    return e.parentElement;
};
// * ブロックの所属する sp を返す関数.
export const vertical_to_sp = (e) => {
    return e.parentElement.parentElement;
};
// * ブロックの所属する sp_cover を返す関数.
export const vertical_to_sp_cover = (e) => {
    return e.parentElement.parentElement.parentElement;
};

// * ターゲットの持つ特定のクラスに含まれる [意味のある数字] を返してくれる関数.
export function target_data(e, f) {
    const list = e.classList;
    for (let i = 0; i < list.length; i++) {
        if (list[i].includes(f)) {
         var the_num = list[i].replace(f, '');
        }
    }
    return the_num;
}

// * ペアとなる orange_pointer, orange_stripe を返す関数.
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

// * ソートする関数.
// [* この関数の使いどころが不明.]
export const sorter = (e, f) => {
    return e - f;
}

// * クラスを追加したり外したり、ある element から別の element へ付け替える関数.
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

// * special_cov を考慮した「選択中のターゲット」を探して返す関数.
const who_is_target = (e) => {
    let centering = document.querySelector(".centering"); 
    if (centering.classList.contains("same")) {
      target = document.querySelector(".special_cov").lastElementChild;
    } else {
      target = centering.lastElementChild;
    }
    return target;
}  

// * 対応する special_cov を返す関数.
export const which_special_is = (e) => {
    let the_name = "this_cov_is_" + target_data(e, "same_num_");
    let the_special_cov = document.getElementsByClassName(the_name)[0];
    return the_special_cov;
}

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

// * 何番目のブロックか、数字を返す関数.
export const elem_post_getter = (e) => {
    let parent = e.parentElement;
    let the_num = [].slice.call(parent.children).indexOf(e);
    return the_num;
}

// * クリックされた「ジャンル」に対応する階層のデータを返す関数.
// * 下記 the_process() で実行される.
export const data_layer_shift = (e, f) => {
  let in_process = Object.keys(e)[0];
  let v = in_process[f];
  return v;
}

// * style_ にある番号のリストを用いて最後まで階層を掘る関数.
// * 下記 what_is_the_title() で実行される.
export const the_process = (e) => {
    let title;
    let nums = e.split("_");
    for (let i = 0; i < nums.length - 3; i++) {
        if (i % 2 == 0) {
            data_layer_shift(title, i);
        }
    }
    title = Object.keys(you)[0];
    return title;
}

// * style クラスから、その要素について最後に選択した「項目」をたどって返す関数.
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