// * edit_wrapper_index から orange_space を取得
export const get_orange_space = (e) => {
    return e.firstElementChild;
}

// * edit_wrapper_index から orange_pointer_space を取得
export const get_orange_pointer_space = (e) => {
    return e.firstElementChild.firstElementChild;
}

// * orange_pointer_store_space の取得
export const get_orange_pointer_store_space = (e) => {
    return e.firstElementChild.firstElementChild.lastElementChild;
}

// * edit_wrapper_index から orange_stripe_space を取得
export const get_orange_stripe_space = (e) => {
    return e.firstElementChild.lastElementChild;
}

// * orange_stripe_store_space の取得
export const get_orange_stripe_store_space = (e) => {
    return e.firstElementChild.lastElementChild.lastElementChild;
}