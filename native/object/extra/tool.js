export const element = (keyname) => {
    let element = document.querySelector(keyname);
    return element;
}

// * ブロックの所属する block_list を返す関数.
export const get_block_list = (block) => {
    return block.parentElement;
};

// * ブロックの所属する list_wrapper を返す関数.
export const get_list_wrapper = (block) => {
    return block.parentElement.parentElement;
};

// * ブロックの所属する wrapper_index を返す関数.
export const get_wrapper_index = (block) => {
    return block.parentElement.parentElement.parentElement;
};

// * ターゲットの持つ特定のクラスに含まれる [意味のある数字] を返してくれる関数.
export function value(element, keyname) {
    let value;
    let classlist = element.classList;
    for (let i = 0; i < classlist.length; i++) {
        if (classlist[i].includes(keyname)) {
            value = classlist[i].replace(keyname, '');
        }
    }
    return value;
}

// * ソートする関数.
// [* この関数の使いどころが不明.]
export const sorter = (e, f) => {
    return e - f;
}

// * クラスを追加したり外したり、ある element から別の element へ付け替える関数.
export const class_move = (from_block, to_block, keyname, e) => {
    let classlist = from_block.classList;
    for (let i = 0; i < classlist.length; i++) {
        if (classlist[i].indexOf(keyname) != -1) {    
            if (e == "add") {
                if (to_block.classList.contains(classlist[i]) == false) {
                    to_block.classList.add(classlist[i]);
                }
            } else if (e == "remove") {
                if (to_block.classList.contains(classlist[i]) == true) {
                    to_block.classList.remove(classlist[i]);
                }
            }
        }
    }
}

// * special_cov を考慮した「選択中のターゲット」を探して返す関数.
export const get_target = (block) => {
    if (block.classList.contains("same")) {
      target = get_correspond_concealer(block);
    } else {
      target = block;
    }
    return target;
}  

// ---------------------------------------------------------------------------------------------------------------

// * wrapper_index から直接その中の block の数を返してくれる関数.
export const get_block_num = (wrapper_index) => {
    let block_list = wrapper_index.lastElementChild.lastElementChild;
    let block_num = block_list.children.length;
    return block_num;
}

// * 指定したクラスを持っているブロックが所蔵する block_list の番号を取得できる関数.
export const get_the_block_index_num = (container, element) => {
    let index_num = [].slice.call(container).indexOf(element) + 1;
    return index_num;
}

// ---------------------------------------------------------------------------------------------------------------

// * 配列の中から近似値を取得するオブジェクト.
export const get_nearest_number = (data, value) => {
    let nearest_value = 0; 
    let min_datas = [];
    for (let i = 0; i < data.length; i++) {
        if (dataset[i] <= value) {
            min_datas.push(data[i]);
        }
    }
    let max_datas = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i] > value) {
            max_datas.push(data[i]);
        }
    }
    // * 予め pointer は scrollLeft の値順に並べてあり、
    // * データの中の「何番目」とDOMの中の「何番目」が一致する.
    if (min_datas.length > 0) {
        nearest_value = Math.max(...min_datas);
    } else if (min_datas.length <= 0) { 
        nearest_value = Math.min(...max_datas);
    } 
    return nearest_value;
}