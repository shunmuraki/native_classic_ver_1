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