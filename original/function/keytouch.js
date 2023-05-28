// * Nativeで提供する各コマンドの実行関数で最初に実行する「環境」としてのインスタンスのオリジナル.
class keytouch_base {
    constructor() {
        this.current = document.activeElement;
        this.type_signiture = "native";
        this.current_vertical = null;
        this.current_horizontal = null;
        this.current_sp = null;
        this.current_sp_cover = null;
    }
    setText() {
        if (document.activeElement.tagName != "BODY") {
            this.current = document.activeElement;
            this.type_signiture = current.value;
            this.current_vertical = document.querySelector(".centering");
        } else {
            this.current_vertical = document.querySelector(".centering");
        }
    }
    setGroup() {
        this.current_horizontal = vertical_to_hor(this.current_vertical);
        this.current_sp = vertical_to_sp(this.current_vertical);
        this.current_sp_cover = vertical_to_sp_cover(this.current_vertical);
    }
}

// * keytouch_base のインスタンスを作成して返してくれる関数.
export const keytouch_setup = () => {
    let keytouch = new keytouch_base();
    keytouch.setText;
    keytouch.setGroup;
    return keytouch;
}