// * 対象の sp_cover に orange_space を追加する関数.
export function orange_space_make(e) {
    // * Orange Space.
    let orange_space = document.createElement("div");
    orange_space.classList.add("orange_space");
    orange_space.classList.add("now_pointer_s");
    // * Pointer Zone.
    let orange_pointer_zone = document.createElement("div");
    orange_pointer_zone.classList.add("orange_pointer_zone");
    let orange_pointer_line = document.createElement("div");
    orange_pointer_line.classList.add("orange_line");
    orange_pointer_zone.appendChild(orange_pointer_line);
    orange_space.appendChild(orange_pointer_zone);
    // * Stripe Zone.
    let orange_stripe_zone = document.createElement("div");
    orange_stripe_zone.classList.add("orange_stripe_zone");
    let orange_stripe_line = document.createElement("div");
    orange_stripe_line.classList.add("orange_line");
    orange_stripe_zone.appendChild(orange_stripe_line);
    // * 合体.
    // [* 果たして fragment を用いる必要があるのか.]
    orange_space.appendChild(orange_stripe_zone);
    // * 追加.
    e.prepend(orange_space);
}

// * 分割された wrapper_index を生成する関数.
// * e: list_wrapper の数
export const edit_wrapper_index_make = (e) => {
    // ** だから先に必要な縦と横を算出して wrapper_index_with_enough_container() に渡してしまうのが正しいプログラムだろう。
    let edit_wrapper_index = wrapper_index_with_enough_container(e, linesize);
    let orange_space = orange_space_make();
    edit_wrapper_index.prepend(orange_space);
    edit_wrapper_index.classList.add("pausing");
    return edit_wrapper_index;
}


// * 必要な数だけ edit_wrapper_index を編集レイヤーに挿入するオブジェクト.
export const setup_edit_wrapper_index_enough = () => {
    let edit_wrapper_index_original = edit_wrapper_index_make();
    // * 横に 10 個ずつのブロックを展開し、縦にタイムラインを展開する.
    let vh_count = env.block_list.childElementCount - 2;
    let num = Math.ceil(vh_count / linesize);    
    // * scrap を必要な数だけ new_layer に追加。
    for (let i = 0; i < num; i++) {
        let dup = edit_wrapper_index_original.cloneNode(true);
        dup.firstElementChild.classList.add("orange_num_" + i);
        dup.classList.add("pointer_motion");
        element(".edit_display").appendChild(dup);
    }
}
