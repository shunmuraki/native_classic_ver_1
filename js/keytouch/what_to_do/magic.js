import { keytouch_basic, pointer_anim } from "../function/general.js";
import {the_magic_copy, the_magic_paste} from "../function/magic.js";
import { screen} from "../data/constant.js";
import { keytouch_setup } from "../../function/make.js";

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