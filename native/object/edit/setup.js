// * 編集モードを起動して次の入力を待機するまでの一連の処理.
export const keytouch_edit_setup = () => {
    let env = keytouch_setup();
    // * tracer_basis() から変更.
    same_concealer_trace_before_action(env.block);
    // * いろんな箇所で使うから外部オブジェクトに共通化した.
    ms_cancel();
    focus_check(env.block);
    // * デフォルトレイヤーからの離脱.
    blur_check(env.block);
    // * 外部オブジェクトへ共通化した.
    delete_all_concealer();
    // * 外部にオブジェクト化（すぐ上だけど）
    edit_layer_make();
    // * 編集モード終了後にデフォルトレイヤーへ回帰することを見越して、
    // * screenレイヤーの sp_cover にもクラスを付与.
    env.wrapper_index.classList.add("target_of_edition");
    // * edit_wrapper_index() を作成.
    let edit_wrapper_index_model = edit_wrapper_index_make();
    // * 必要な分だけ edit_wrapper_index を複製して編集レイヤーを構成.
    duplicate_edit_wrapper_index_enough(edit_wrapper_index_model);
    // * デフォルトレイヤーに存在する大元のブロックたちの中身を、編集レイヤーの対応するブロックへ移行.
    edit_wrapper_index_make(env.wrapper_index.children);
    edit_wrapper_index_same_adaptation();
    // * デフォルトで センタリング になったブロックを明示.
    let layer_centering = document.querySelector(".edit_centerd_block");
    let default_scrap = vertical_to_sp_cover(layer_centering);
    default_scrap.classList.add("edit_centerd_wrapper_index");
    // * 移行先でのms分のスペースを調整.            
    adjust_target_pos(layer_centering.lastElementChild, "off");
    // * 画面をデフォルトモードから編集モードに切り替える.
    mode_switch_to_edit();
    // * 位置調整
    edit_layer_positioning();
    // * 自動的な追加. ここから始まる.
    orange_pointer_initial();
    // * 「see」ラインを画面中央に配置. (height の方の調整)
    edit_mode_default_adjust(new_see);
    is_it_same_series(document.querySelector(".edit_centerd_block"));
    layer_centering.classList.remove("edit_centerd_block");
}

// ---------------------------------------------------------------------------------------------------------------

// * 編集モードの明示化. 編集レイヤー上での処理に限定.
export const edit_layer_make = () => {
    let edit_display = document.createElement("div");
    edit_display.classList.add("new_layer");
    edit_display.classList.add("block_layer");
    edit_display.style.display = "none";
    edit_display.style.opacity = 0;
    element(".default_display").after(edit_display);
    edit_display_setup();
}

export const edit_display_setup = () => { 
    element(".default_display").classList.add("edit");
    element(".edit_display").style.display = "block";
    element(".default_display").style.display = "none";
    element(".body").style.backgroundColor = "#0070D8";
    element(".body").classList.add("edit_mode");
}

// * 画面を切り替える.
export const mode_switch_to_edit = () => {
    element(".default_display").style.opacity = 0;
    element(".edit_display").style.opacity = 1;
}