// * edit_wrapper_index から orange_space を取得
export const get_orange_space = (wrapper_index) => {
    return wrapper_index.firstElementChild;
}

// * edit_wrapper_index から orange_pointer_space を取得
export const get_orange_pointer_space = (wrapper_index) => {
    return wrapper_index.firstElementChild.firstElementChild;
}

// * orange_pointer_store_space の取得
export const get_orange_pointer_store_space = (wrapper_index) => {
    return wrapper_index.firstElementChild.firstElementChild.lastElementChild;
}

// * edit_wrapper_index から orange_stripe_space を取得
export const get_orange_stripe_space = (wrapper_index) => {
    return wrapper_index.firstElementChild.lastElementChild;
}

// * orange_stripe_store_space の取得
export const get_orange_stripe_store_space = (wrapper_index) => {
    return wrapper_index.firstElementChild.lastElementChild.lastElementChild;
}

// * ペアとなる orange_pointer, orange_stripe を返す関数.
export function get_orange_pair(trigger_pointer) { 
    let num = get_property_number(trigger_pointer, "num_");
    let the_key_classname = "num_" + num;
    let partner_stripe = null;
    let stripe_space = trigger_pointer.parentElement.parentElement.nextElementSibling.firstElementChild;
    let all_stripe = stripe_space.children;
    for (let i = 0; i < all_stripe.length; i++) {
        if (all_stripe[i].classList.contains(the_key_classname)) {
            partner_stripe = all_stripe[i];
        }
    }

    let partner_pointer = null;
    let pointer_space = trigger_pointer.parentElement;
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
    
    let orange_pair = [partner_stripe, partner_pointer];
    return orange_pair;
}