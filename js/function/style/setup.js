// style_initial の中で実行する。
const all_setup = (e) => { 
    // まずはデフォルトの選択項目を決めて、クラスを振ってあげる必要がある。
    // ひとまずは layer_1 (0枚目) が来るから、この最初のブロックに対して choose クラスをつけるようにしよう。
    // sl_1_1　←この子がそれ。
    let title = String(document.querySelector(".choose").textContent);
    set("current_states", s => s[1] = title);
    set("previous_states", s => s[1] = title);
}

export const style_initial = (e) => {   
    // 中身の条件分岐
    // current_zone のセット
    // running_a の実行.
    let target = who_is_target();
    if (target.lastElementChild) {
        let tag = target.lastElementChild.tagName;
        if (tag == "TEXTAREA") {
            // re
            set("current_states", s => s[0] = native_allstyles[0]);
            set("current_states", s => s[2].push(0));
            set("previous_states", s => s[0] = native_allstyles[0]);
            set("previous_states", s => s[2].push(0));
        } else if (tag == "IMG") {
            set("current_states", s => s[0] = native_allstyles[1]);
            set("current_states", s => s[2].push(1));
            set("previous_states", s => s[0] = native_allstyles[1]);
            set("previous_states", s => s[2].push(1));
        } else if (tag == "IFRAME") {
            set("current_states", s => s[0] = native_allstyles[2]);
            set("current_states", s => s[2].push(2));
            set("previous_states", s => s[0] = native_allstyles[2]);
            set("previous_states", s => s[2].push(2));
        }
    }
    running_a();
    // ↕︎ この間に choose は生じている。
    all_setup();
}