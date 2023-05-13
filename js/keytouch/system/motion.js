import { keytouch_basic, original_centering_checker } from "../function/general.js";
import { go_top, go_left, go_bottom, go_right } from "../function/motion.js";
import { screen } from "../data/constant.js";
import { keytouch_setup } from "../../function/make.js";


export const keytouch_motion_command_arrow_top = () => {
    let env = keytouch_setup();
    original_centering_checker(env.current_sp_cover, env.current_vertical);
    go_top(env.current_vertical, "centering");
}

export const keytouch_motion_command_arrow_left = () => {
    let env = keytouch_setup();
    go_left(env.current_vertical, "centering");
}

export const keytouch_motion_command_arrow_right = () => {
    let env = keytouch_setup();
    go_right(env.current_vertical, "centering");    
}

export const keytouch_motion_command_arrow_bottom = () => {
    let env = keytouch_setup();
    original_centering_checker(env.current_sp_cover, env.current_vertical);
    go_bottom(env.current_vertical, "centering");
}
