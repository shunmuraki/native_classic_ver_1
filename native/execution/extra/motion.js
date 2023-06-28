// * デフォルトレイヤーにて command + ArrowTop が押された際に実行される関数.
// * 上のブロックに移動する(上に sp があればその中のブロックに、なければ上の sp_cover の一番下の sp のブロックに移動).
export const keytouch_motion_command_arrow_top = () => {
    let env = keytouch_setup();
    last_centered_block_management(env.wrapper_index, env.block);
    block_go_top(env.block);
}

// * 左のブロックに移動する.
export const keytouch_motion_command_arrow_left = () => {
    let env = keytouch_setup();
    block_go_left(env.block);
}

// * デフォルトレイヤーにて command + ArrowRight が押された際に実行される関数.
// * 右のブロックに移動する.
export const keytouch_motion_command_arrow_right = () => {
    let env = keytouch_setup();
    block_go_right(env.block);
}

// * デフォルトレイヤーにて command + ArrowBottom が押された際に実行される関数.
// * 下のブロックに移動する(下に sp があればその中のブロックに、なければ上の sp_cover の一番上の sp のブロックに移動).
export const keytouch_motion_command_arrow_bottom = () => {
    let env = keytouch_setup();
    last_centered_block_management(env.wrapper_index, env.block);
    block_go_bottom(env.block);
}
