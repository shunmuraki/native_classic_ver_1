// * デフォルトレイヤーにて control + C が押された際に実行される関数.
// * マジックコピーを処理する.
export const keytouch_magic_command_c = () => {
    let env = keytouch_setup();
    pointer_anim();
    the_magic_copy(env.current_vertical);
}

// * デフォルトレイヤーにて control + V が押された際に実行される関数.
// * マジックペーストを処理する.
export const keytouch_magic_command_v = () => {
    let env = keytouch_setup();
    pointer_anim();
    the_magic_paste(env.current_vertical);
}