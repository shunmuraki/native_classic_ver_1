// * Native 上で UM が開かれた状態で Escape が押された際に実行される関数.
// * UM を閉じる.
export const keytouch_um_command_escape = () => {
    let centered_block = element(".centered_block");
    e.preventDefault();
    element(".um_display").style.display = "none";
    focus_checker(centered_block);        
    element(".default_display").classList.remove("um");
    element(".default_display").classList.remove("um_ready");
    centered_block.style.opacity = 1;
}
