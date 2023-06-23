// * YouTube の動画を読み込んでブロックに展開する処理をカプセル化した関数.
export const load_image = () => {
    let env = keytouch_setup();
    let default_display = document.querySelector(".default_display");
    video_load_then(env.type_signiture, env.current);
    adjust_box(env.block);
    default_display.classList.remove("ms");
}

// * ファイルマネージャーから選択された画像を読み込んでブロックに表示する処理をカプセル化した関数.
export const load_video = () => {
    let env = keytouch_setup();
    let default_display = document.querySelector(".default_display");
    if (default_display.classList.contains("ms")) {
        ms_mode_inactivate(env.block);
        make_it_img(env.block, "image");
        focus_checker(env.block);
        adjust_box(env.block);
        default_display.classList.remove("ms");
    }
}