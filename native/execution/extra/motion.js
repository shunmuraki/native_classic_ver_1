// * デフォルトレイヤーにて command + ArrowTop が押された際に実行される関数.
// * 上のブロックに移動する(上に sp があればその中のブロックに、なければ上の sp_cover の一番下の sp のブロックに移動).
export const keytouch_motion_command_arrow_top = () => {
    let env = keytouch_setup();
    original_centering_checker(env.current_sp_cover, env.current_vertical);
    go_top(env.current_vertical, "centering");
}

// * 左のブロックに移動する.
export const keytouch_motion_command_arrow_left = () => {
    let env = keytouch_setup();
    go_left(env.current_vertical, "centering");
}

// * デフォルトレイヤーにて command + ArrowRight が押された際に実行される関数.
// * 右のブロックに移動する.
export const keytouch_motion_command_arrow_right = () => {
    let env = keytouch_setup();
    go_right(env.current_vertical, "centering");    
}

// * デフォルトレイヤーにて command + ArrowBottom`1 が押された際に実行される関数.
// * 下のブロックに移動する(下に sp があればその中のブロックに、なければ上の sp_cover の一番上の sp のブロックに移動).
export const keytouch_motion_command_arrow_bottom = () => {
    let env = keytouch_setup();
    original_centering_checker(env.current_sp_cover, env.current_vertical);
    go_bottom(env.current_vertical, "centering");
}
