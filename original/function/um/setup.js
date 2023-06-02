// * マークダウンスペースにキーワードが入力された状態で Enter が押された際に実行されるキータッチ関数.
// * UM を表示する. 
export const keytouch_um_setup = () => {
    let default_display = element(".default_display");
    if (default_display.classList.contains("ms")) {
        ms_close();
        let env = keytouch_setup();
        focus_checker(env.block);
        default_display.classList.add("um");
        env.current.value = '';
        element(".um").style.display = "block";
        env.block.style.height = 225 + "px";
        current.blur();
        env.block.style.opacity = 0;
        default_display.classList.remove("um_ready");
        adjust_box(env.block);
        um_positioning();
    }
}