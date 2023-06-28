// * <textarea> にて "/" が入力された際に実行されるキータッチ関数.
// * 選択中のブロックの中にマークダウンスペースを表示する.
export const keytouch_ms_command_slash = () => {
  if (! element(".default_display").classList.contains("ms")) {
    let env = keytouch_setup();
    element(".default_display").classList.add("ms");
    // * マークダウンスペースの生成.
    let ms = document.createElement("textarea");
    ms.classList.add("ms");
    ms.style.opacity = 0;
    // * msの挿入先について条件分岐.
    // * 「same」クラスがついている場合はカバーが被さっているので、対象を special_cov とする.
    if (env.block.classList.contains("same")) {
      set("ms_target", s => s = get_correspond_concealer(env.block).lastElementChild.before(ms));
    } else {
      if (document.activeElement.tagName == "BODY") {
        env.block.lastElementChild.before(ms);
      } else {
        env.current.blur();
        env.current.before(ms);
      }
      set("ms_target", s => s = env.block.lastElementChild);
    }
    
    ms_close(get("ms_adjust_target"), "on");
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
export const keytouch_ms_command_escape_or_enter = (event) => { 
  event.preventDefault();
  if (! element(".default_display").classList.contains("style")) {
    setTimeout(() => {
      if (element(".ms")) {
        element(".ms").remove();
      }
    }, 10)
    
    ms_close(get("ms_target"), "off");
    if (get("ms_target").tagName == "TEXTAREA") {
      get("ms_target").focus();
    }
    element(".default_display").classList.remove("ms");
  }
}