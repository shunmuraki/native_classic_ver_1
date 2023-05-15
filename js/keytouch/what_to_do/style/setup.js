export const keytouch_style_setup = () => {
    if (screen.classList.contains("ms")) {
      let env = keytouch_setup();
      let centering = document.querySelector(".centering");
      // 先にms調整箇所を戻しておいてそれから複製させる. 
      let target = centering;
      if (centering.classList.contains("same")) {
          target = which_special_is(centering);
      } 
      adjust_target_pos(target.lastElementChild, "off");
      document.querySelector(".ms_area").remove();
      screen.classList.add("style");
      wheel_seton();
      env.current.blur();
      adjust_target_pos(centering.lastElementChild, "off");
      style_initial();
    }
}