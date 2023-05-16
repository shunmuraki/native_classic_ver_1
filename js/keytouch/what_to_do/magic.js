export const keytouch_magic_command_c = () => {
    let env = keytouch_setup();
    pointer_anim();
    the_magic_copy(env.current_vertical);
}

export const keytouch_magic_command_v = () => {
    let env = keytouch_setup();
    pointer_anim();
    the_magic_paste(env.current_vertical);
}