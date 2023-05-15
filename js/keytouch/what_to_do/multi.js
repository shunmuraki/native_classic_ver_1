import { adjust_box, focus_checker } from "../function/general.js";
import { video_load_then, make_it_img } from "../function/multi.js";
import { screen } from "../data/constant.js";
import { keytouch_setup } from "../../function/make.js";

export const keytouch_multi_youtube = () => {
    let env = keytouch_setup();
    video_load_then(env.type_signiture, env.current);
    let centering = document.querySelector(".centering");
    adjust_box(centering);
    screen.classList.remove("ms");
}

export const keytouch_multi_image = () => {
    if (screen.classList.contains("ms")) {
        let env = keytouch_setup();
        document.querySelector(".ms_area").remove();
        make_it_img(document.querySelector(".centering"), "image");
        focus_checker(document.querySelector(".centering"));        
        adjust_box(document.querySelector(".centering"));
        screen.classList.remove("ms");
    }
}