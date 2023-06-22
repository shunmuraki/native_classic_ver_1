// * Nativeで提供する各コマンドの実行関数で最初に実行する「環境」としてのインスタンスのオリジナル.
class keytouch_base {
    constructor() {
        this.current = document.activeElement;
        this.type_signiture = "native";
        this.block = null;
        this.block_list = null;
        this.list_wrapper = null;
        this.wrapper_index = null;
    }

    setText() {
        if (document.activeElement.tagName != "BODY") {
            this.current = document.activeElement;
            this.type_signiture = current.value;
            this.block = document.querySelector(".centerd_block");
        } else {
            this.block = document.querySelector(".centerd_block");
        }
    }
    
    setGroup() {
        this.block_list = get_get_block_list(this.block);
        this.list_wrapper = get_list_wrapper(this.block);
        this.wrapper_index = get_wrapper_index(this.block);
    }
}

// * Nativeで提供する各コマンドの実行関数で最初に実行する「環境」としてのインスタンスのオリジナル.
class edit_keytouch_base {
    constructor() {
        this.block = null;
        this.block_list = null;
        this.list_wrapper = null;
        this.wrapper_index = null;
    }
    
    setGroup() {
        this.block = document.querySelector(".edit_centerd_block");
        this.block_list = get_get_block_list(this.block);
        this.list_wrapper = get_list_wrapper(this.block);
        this.wrapper_index = get_wrapper_index(this.block);
        this.orange_space = get_orange_space(this.wrapper_index);
        this.orange_pointer_space = get_orange_pointer_space(this.wrapper_index);
        this.orange_stripe_space = get_orange_stripe_space(this.wrapper_index);
        this.orange_pointer_store_space = get_orange_pointer_store_space(this.wrapper_index);
        this.orange_stripe_store_space = get_orange_stripe_store_space(this.wrapper_index);
        this.orange_data = target_data(this.orange_space, "orange_num_");
    }
}


// * keytouch_base のインスタンスを作成して返してくれる関数.
export const keytouch_setup = () => {
    let keytouch = new keytouch_base();
    keytouch.setText;
    keytouch.setGroup;
    return keytouch;
}

// * keytouch_base のインスタンスを作成して返してくれる関数.
export const edit_keytouch_setup = () => {
    let keytouch = new edit_keytouch_base();
    keytouch.setGroup;
    return keytouch;
}