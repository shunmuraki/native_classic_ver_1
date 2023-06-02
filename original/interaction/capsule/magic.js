// * デフォルトレイヤーにて control + C が押された際に実行される関数.
// * マジックコピーを処理する.
export const keytouch_magic_command_c = () => {
    let env = keytouch_setup();
    pointer_animate();
    magic_copy(env.block);
}

// * デフォルトレイヤーにて control + V が押された際に実行される関数.
// * マジックペーストを処理する.
export const keytouch_magic_command_v = () => {
    let env = keytouch_setup();
    pointer_animate();
    magic_paste(env.block);
}