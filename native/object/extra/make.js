// * 必要な数のブロックを持った、 block_list を含んだ wrapper_index とか
// * list_wrapper を生成してくれる関数.
// [* 縦と横を指定することになる.]
// e = 横, f = 縦
export const wrapper_index_with_enough_container = (block_num, list_wrapper_num) => {
    let new_wrapper_index = wrapper_index_make(false);
    let new_list_wrapper = list_wrapper_make(true);
    // * すでに一つは追加してあるので.
    for (let i = 0; i < block_num; i++) {
        let block = block_make(true);
        new_list_wrapper.lastElementChild.lastElementChild.before(block);
    }

    for (let i = 0; i < list_wrapper_num-1; i++) {
        let cloned_list_wrapper = new_list_wrapper.cloneNode(true);
        new_wrapper_index.appendChild(cloned_list_wrapper);
    }
    // これで完成
    return new_wrapper_index;
}

// * まだそんなのないけど.
export const list_wrapper_with_enough_container = (block_num) => {
    let new_list_wrapper = list_wrapper_make(true);
    // * すでに一つは追加してあるので.
    for (let i = 0; i < block_num-1; i++) {
        block_make(true);
    }
    return new_list_wrapper;
}

// ---------------------------------------------------------------------------------------------------------------

export const wrapper_index_make = (e) => {
    let wrapper_index = document.createElement("div");
    wrapper_index.classList.add("wrapper_index");
    if (e === true) {
        let list_wrapper = list_wrapper_make(true);
        wrapper_index.appendChild(list_wrapper);
    }
    return wrapper_index;
}

export const list_wrapper_make = (e) => {
    let new_list_wrapper = document.createElement("div");
    new_list_wrapper.classList.add("list_wrapper");
    if (e === true) {
        let  new_block_list = block_list_make(true);
        new_list_wrapper.appendChild( new_block_list);
    }
    return block_list;
}

export const block_list_make = (e) => {
    let block_list = document.createElement("div");
    block_list.classList.add("block_list");
    if (e === true) {
        let new_block = block_make(true);
        let new_head_adjuster = adjuster_make();
        let new_tale_adjuster = adjuster_make();
        block_list.appendChild(new_block);
        block_list.appendChild(new_head_adjuster);
        block_list.appendChild(new_tale_adjuster);
    }
    return block_list;
}

// * 要素を作るもの、セットするもの.
// * ってかなんかオールマイティーな関数を作るべきだと思った.
export const block_make = (e) => {
    let new_block = document.createElement("div");
    new_block.classList.add("block");
    if (e === true) {
        let new_textarea = textarea_make();
        new_block.appendChild(new_textarea);
    }
    return block;
}

export const textarea_make = () => {
    let new_textarea = document.createElement("textarea");
    new_textarea.classList.add("write_area");
    return new_textarea;
}

export const adjuster_make = () => {
    let new_adjuster = document.createElement("div");
    new_adjuster.classList.add("adjuster");
    return new_adjuster;
}
