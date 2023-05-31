// * "/style" が押された際に実行される関数.
// * 装飾ホイールを起動する.
export const keytouch_style_setup = () => {
    let default_display = element(".default_display");
    if (default_display.classList.contains("ms")) {
      let env = keytouch_setup();
      let centering = element(".centered_block");
      // * 先にms調整箇所を戻してから複製させる. 
      let target = centering;
      if (centering.classList.contains("same")) {
          target = which_special_is(centering);
      } 
      adjust_target_pos(target.lastElementChild, "off");
      element(".ms_area").remove();
      default_display.classList.add("style"); 
      env.current.blur();
      // [* なぜ２回目の実行が必要なのか.]
      adjust_target_pos(centering.lastElementChild, "off");
      // * 装飾ホイールを起動.
      style_initial();
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * "/style" コマンドが実行された時点で最初に実行される関数.
// * 装飾ホイールを生成し、 native_styles の最上位のジャンルを表示する.
export const style_initial = (e) => {   

    // * 装飾ホイールのデフォルトの「ジャンル」を設定.

    // * current_states, previsous_states を初期設定.
    let target = who_is_target();
    if (target.lastElementChild) {
        let tag = target.lastElementChild.tagName;
        // * state の初期設定.
        // * この設定で最初に装飾ホイールが開く.
        if (tag == "TEXTAREA") {
            set("current_states", s => s[0] = native_allstyles[0]);
            set("current_states", s => s[2].push(0));
            set("previous_states", s => s[0] = native_allstyles[0]);
            set("previous_states", s => s[2].push(0));
        } else if (tag == "IMG") {
            set("current_states", s => s[0] = native_allstyles[1]);
            set("current_states", s => s[2].push(1));
            set("previous_states", s => s[0] = native_allstyles[1]);
            set("previous_states", s => s[2].push(1));
        } else if (tag == "IFRAME") {
            set("current_states", s => s[0] = native_allstyles[2]);
            set("current_states", s => s[2].push(2));
            set("previous_states", s => s[0] = native_allstyles[2]);
            set("previous_states", s => s[2].push(2));
        }
    }

    // * デフォルトのジャンルレイヤーで装飾ホイールを起動.
    genre_clicked();

    // * 「ジャンル」の中の「項目」までデフォルトで選択をし、これも states データに反映.
    // * これで装飾レイヤーのセットアップが終了.

    // * genre_clicked() で choose クラスはいずれかの選択肢に設定される.
    // * それを待ってから以下を実行.
    // * choose が付いた選択肢のタイトルを取得してデータに格納.
    let title = String(document.querySelector(".choose").textContent);
    // [* これはどちらかといえば genre_clicked() もしくは value_clicked() と共通利用する.
    // [* 新しい states 管理オブジェクトで実行するべきだと思う.]
    set("current_states", s => s[1] = title);
    set("previous_states", s => s[1] = title);
}