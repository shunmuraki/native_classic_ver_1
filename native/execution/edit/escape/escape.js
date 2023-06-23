export const keytouch_edit_command_mode_escape = () => {
    
    let env = keytouch_setup();
    e.preventDefault();
    let orange_pease = document.querySelectorAll(".orange_pointer").length;
    
    // * pointer が片方しか打たれていないまま escape キーの処理が実行されるのを回避。
    if (orange_pease % 2 == 0) {
        
        // * 編集を終了する時点でorange_pointer_f が存在したら初めて実行。存在しなかったら周辺のorange群を放棄する.
        if (document.querySelector(".orange_pointer_f")) {

            let extract_data = new Array();
            let edit_wrapper_indexies = document.querySelector(".edit_display").children;
            // * 編集していた もともとの sp_coverを取得. 
            let original_wrapper_index = document.querySelector(".edit_target");

            cleanup_original_wrapper_index(original_wrapper_index);

            // * 実行（データ成形）
            extract_data = extract_data_make(scraps);
            trace_to_defaultdisplay(edit_wrapper_indexies, extract_data);

            // * same_end のみについけていた stable クラスを、 same_start にも配る。
            // * same_end のstable の次のブロックは必ず stable である、という考えに基づいて。
            let middlejumpers = document.getElementsByClassName("middlejumper");
            complete_middlejumper(middlejumpers);

            // * スタイリングやクラスの付け替えなどの新調.
            if (document.querySelector(".centered_block")) {
                document.querySelector(".centered_block").classList.remove("centered_block");
            }
            
            // * the_new_focusdblock の中に要素が入っていないことが問題になっている。
            // * 確かに same_end を作る際に、大元から中身をコピーしていないことが問題なんじゃないか。
            document.querySelector(".edit_centered_block").classList.remove("edit_centered_block");
            default_landing_setup(original_wrapper_index);
        } 
        
        // * edit モードをリセット.
        back_to_defaultmode();
        
        // * 編集モードが終了してからデフォルトレイヤーに戻って最初のフォーカス.
        let final_centering = document.querySelector(".centering");
        focus_checker(final_centering);
        adjust_box(final_centering);

        // * 編集直後のMS起動への対策.
        same_concealer_management(final_centering);
        wheel_positioning();
    
    }
}