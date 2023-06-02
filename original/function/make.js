// * 必要な数のブロックを持った、 block_list を含んだ wrapper_index とか
// * list_wrapper を生成してくれる関数.
// [* 縦と横を指定することになる.]
// e = 横, f = 縦
export const wrapper_index_with_enough_block = (e, f) => {
    let wrapper_index = wrapper_index_make(false);
    let list_wrapper = list_wrapper_make(true);
    // * すでに一つは追加してあるので.
    for (let i = 0; i < e; i++) {
        let block = block_make(true);
        list_wrapper.lastElementChild.lastElementChild.before(block);
    }

    for (let i = 0; i < f-1; i++) {
        let will_add_list_wrapper = list_wrapper.cloneNode(true);
        wrapper_index.appendChild(will_add_list_wrapper);
    }
    // これで完成
    return wrapper_index;
}

// * まだそんなのないけど.
export const list_wrapper_with_enough_block = () => {
    let list_wrapper = list_wrapper_make(true);
    // * すでに一つは追加してあるので.
    for (let i = 0; i < e-1; i++) {
        block_make(true);
    }
    return list_wrapper;
}

// ---------------------------------------------------------------------------------------------------------------

export const textarea_make = (e) => {
    let textarea = document.createElement("textarea");
    textarea.classList.add("write_area");
    return textarea;
}

export const adjuster_make = (e) => {
    let adjuster = document.createElement("div");
    adjuster.classList.add("adjuster");
    return adjuster;
}

// * 要素を作るもの、セットするもの.
// * ってかなんかオールマイティーな関数を作るべきだと思った.
export const block_make = (e) => {
    let block = document.createElement("div");
    block.classList.add("block");
    if (e === true) {
        let block = block_make(true);
        let head_adjuster = adjuster_make();
        let tale_adjuster = adjuster_make();
        block_list.appendChild(head_adjuster);
        block_list.appendChild(block);
        block_list.appendChild(tale_adjuster);
    }
    return block_list;
}

export const block_list_make = (e) => {
    let block_list = document.createElement("div");
    block_list.classList.add("block_list");
    if (e === true) {
        let block = block_make(true);
        let adjuster = document.createElement("div");
        adjuster.classList.add("adjuster");
        adjuster.classList.add("adjuster");
        block_list.appendChild(block_make);
    }
    return block_list;
}

export const list_wrapper_make = (e) => {
    let list_wrapper = document.createElement("div");
    list_wrapper.classList.add("list_wrapper");
    if (e === true) {
        let block_list = block_list_make(true);
        list_wrapper.appendChild(block_list);
    }
    return block_list;
}

export const wrapper_index_make = (e) => {
    let wrapper_index = document.createElement("div");
    wrapper_index.classList.add("wrapper_index");
    if (e === true) {
        let list_wrapper = list_wrapper_make(true);
        wrapper_index.appendChild(list_wrapper);
    }
    return wrapper_index;
}