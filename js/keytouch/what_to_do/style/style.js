import { focus_checker, adjust_target_pos, wheel_seton, focus_checker } from "../function/general.js";
import { which_special_is } from "../function/tool.js";
import { running_root, style_initial } from "../function/style.js";
import { screen, wheel, the_pointer, layer_base } from "../data/constant.js";
import { keytouch_setup } from "../../function/make.js";
import { layerbase_switch, pointer_switch, wheel_switch } from "../../function/animation.js";


export const keytouch_style_command_enter = () => {
  let env = keytouch_setup();
  let centering = document.querySelector(".centering");
  // 名前だけでリレーしたい。
  running_root();
}