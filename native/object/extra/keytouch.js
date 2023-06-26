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

// * keytouch_base のインスタンスを作成して返してくれる関数.
export const keytouch_setup = () => {
    let keytouch = new keytouch_base();
    keytouch.setText;
    keytouch.setGroup;
    return keytouch;
}