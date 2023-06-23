// * Escape key が押された際に実行される関数.
// * 装飾ホイールを閉じる、もしくはレイヤーをひとつ前に戻す.
export const keytouch_style_command_escape = (e) => {
    let env = keytouch_setup();
    e.preventDefault();
    // * 以下のレイヤーの切り替えは外部でオブジェクトにする.
    let waiting_wheel = document.querySelector(".waiting_wheel");
    if (waiting_wheel) {
        // * セカンドレイヤーが表示中の場合の処理.
        wheel_layer_back(env);
    } else {
        // * ファーストレイヤーが表示中の場合の処理.
        wheel_cancel(env);
    }
}