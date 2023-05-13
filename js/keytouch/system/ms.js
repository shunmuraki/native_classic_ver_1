import { which_special_is } from "../function/tool.js";
import { adjust_target_pos } from "../function/general.js";
import { screen } from "../data/constant.js";
import { native_value } from "../data/variable.js";
import { keytouch_setup } from "../../function/make.js";



export const keytouch_ms_command_slash = () => {
  if (! screen.classList.contains("ms")) {

    let env = keytouch_setup();

    screen.classList.add("ms");
    let centering = document.querySelector(".centering");
    // ms_adjust_target の跡地

    // ms の生成.
    let ms = document.createElement("textarea");
    ms.classList.add("ms_area");
    ms.style.opacity = 0;

    // msの挿入先について条件分岐.「same」クラスがついている場合はカバーが被さっているので、対象を special_cov とする.
    if (centering.classList.contains("same")) {
      
      set("ms_adjust_target", s => s = which_special_is(centering).lastElementChild.before(ms));

    } else {
      if (document.activeElement.tagName == "BODY") {
        centering.lastElementChild.before(ms);
      } else {
        current.blur();
        current.before(ms);
      }
      set("ms_adjust_target", s => s = centering.lastElementChild);
    }
    
    adjust_target_pos(get("ms_adjust_target"), "on");

    ms.style.opacity = 1;
    ms.focus();
    setTimeout(() => {
      ms.value = "";
    }, 10) 
  }
}

export const keytouch_ms_command_escape_or_enter = () => {
  
  let env = keytouch_setup();
  
  if (k == "Escape") {
    e.preventDefault();
  }

  if (! screen.classList.contains("style")) {
    setTimeout(() => {
      if (document.querySelector(".ms_area")) {
        document.querySelector(".ms_area").remove();
      }
    }, 10)
    
    adjust_target_pos(get("ms_adjust_target"), "off");

    if (get("ms_adjust_target").tagName == "TEXTAREA") {

      get("ms_adjust_target").focus();
    
    }

    screen.classList.remove("ms");
  }
}