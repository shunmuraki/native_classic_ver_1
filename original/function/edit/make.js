// * 対象の sp_cover に orange_space を追加する関数.
export function orange_space_make(edit_env) {
    // * Orange Space.
    let orange_space = document.createElement("div");
    orange_space.classList.add("orange_space");
    orange_space.classList.add("now_pointer_s");
    // * pointer spacies.
    let orange_pointer_space = document.createElement("div");
    orange_pointer_space.classList.add("orange_pointer_space");
    let orange_pointer_store_space = document.createElement("div");
    orange_pointer_space.classList.add("orange_line");
    orange_pointer_space.appendChild(orange_pointer_store_space);
    orange_space.appendChild(orange_pointer_space);
    // * stripe spacies.
    let orange_stripe_space = document.createElement("div");
    orange_stripe_space.classList.add("orange_stripe_space");
    let orange_stripe_store_space = document.createElement("div");
    orange_stripe_store_space.classList.add("orange_line");
    orange_stripe_space.appendChild(orange_stripe_store_space);
    // * 合体.
    orange_space.appendChild(orange_stripe_space);
    // * 追加.
    edit_env.wrapper_index.prepend(orange_space);
}

// * 分割された wrapper_index を生成する関数.
export const edit_wrapper_index_make = (edit_env) => {
    let list_wrapper_num = edit_env.wrapper_index.childElementCount;
    let edit_wrapper_index = wrapper_index_with_enough_container(list_wrapper_num, linesize);
    let orange_space = orange_space_make();
    edit_wrapper_index.prepend(orange_space);
    edit_wrapper_index.classList.add("pausing");
    return edit_wrapper_index;
}

// * 必要な数だけ edit_wrapper_index を編集レイヤーに挿入するオブジェクト.
//* e = env
export const setup_edit_wrapper_index_enough = (edit_env) => {
    let edit_wrapper_index_original = edit_wrapper_index_make();
    // * 横に 10 個ずつのブロックを展開し、縦にタイムラインを展開する.
    let block_num = edit_env.block_list.childElementCount - 2;
    let edit_wrapper_index_num = Math.ceil(block_num / linesize);
    // * scrap を必要な数だけ new_layer に追加。
    for (let i = 0; i < edit_wrapper_index_num; i++) {
        let cloned_edit_wraper_index = edit_wrapper_index_original.cloneNode(true);
        cloned_edit_wraper_index.firstElementChild.classList.add("orange_num_" + i);
        cloned_edit_wraper_index.classList.add("pointer_motion");
        element(".edit_display").appendChild(cloned_edit_wraper_index);
    }
}