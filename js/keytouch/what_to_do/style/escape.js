export const keytouch_style_command_escape = () => {
    let env = keytouch_setup();
    let centering = document.querySelector(".centering");
    e.preventDefault();

    // この waiting_wheel についても指定の仕方を改めた方がいいかもね。
    // 一番下のレイヤーが「old layer」なので、その指定の仕方に変えてあげた方が適切かもね。
    let w_w = document.querySelector(".waiting_wheel");
    if (w_w) {
        // セカンドレイヤーが表示中の場合の処理.
        w_w.classList.remove("waiting_wheel");
        w_w.style.display = "none";
        layer_base.style.opacity = 1;
    } else {
        // ファーストレイヤーが表示中の場合の処理.
        pointer_switch(the_pointer, "off");
        layerbase_switch(layer_base, "off");
        wheel_switch(wheel, "off");

        wheel.style.display = "none";
        screen.classList.remove("style");
        if (! centering.classList.contains("same")) {
        focus_checker(centering);
        } 
    }
}