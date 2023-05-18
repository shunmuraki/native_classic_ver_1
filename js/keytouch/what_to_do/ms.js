// * <textarea> にて "/" が入力された際に実行されるキータッチ関数.
// * 選択中のブロックの中にマークダウンスペースを表示する.
export const keytouch_ms_command_slash = () => {
  if (! screen.classList.contains("ms")) {
    let env = keytouch_setup();
    screen.classList.add("ms");
    let centering = document.querySelector(".centering");
    // * マークダウンスペースの生成.
    let ms = document.createElement("textarea");
    ms.classList.add("ms_area");
    ms.style.opacity = 0;
    // * msの挿入先について条件分岐.
    // * 「same」クラスがついている場合はカバーが被さっているので、対象を special_cov とする.
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

// ---------------------------------------------------------------------------------------------------------------

// * マークダウンスペースが開かれた状態のエディターにて Enter/Escape が押された際に実行される関数.
// * マークダウンスペースを削除する.
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