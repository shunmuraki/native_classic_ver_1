// * "/style" が押された際に実行される関数.
// * 装飾ホイールを起動する.
export const keytouch_style_setup = () => {
    if (screen.classList.contains("ms")) {
      let env = keytouch_setup();
      let centering = document.querySelector(".centering");
      // * 先にms調整箇所を戻してから複製させる. 
      let target = centering;
      if (centering.classList.contains("same")) {
          target = which_special_is(centering);
      } 
      adjust_target_pos(target.lastElementChild, "off");
      document.querySelector(".ms_area").remove();
      screen.classList.add("style"); 
      env.current.blur();
      // [* なぜ２回目の実行が必要なのか.]
      adjust_target_pos(centering.lastElementChild, "off");
      // * 装飾ホイールを起動.
      style_initial();
    }
}