// * 編集モード中に command + C が押された際に実行される関数.
// * orange_pointer を追加/除去する.
export const keytouch_edit_command_c = () => {
    
    let env = edit_keytouch_setup();
    let edit_centerd_wrapper_index = document.querySelector(".edit_centerd_wrapper_index");
    
    if (env.block) {
        if (get_orange_space(edit_centerd_wrapper_index).scrollLeft == Number(target_data(env.block, "scroll_left_"))) {        
            
            if (edit_centerd_wrapper_index.classList.contains("pointer_motion") && env.block.classList.contains("deleted_pointer") == false){
                // * ポインター移動中でかつ今の orange_pointer が opac_cam ではない場合.    
                deleted_pointer_delete();
                remove_orange_pointer();
            } else if (env.block.classList.contains("deleted_pointer") == true) {       
                // * 今の orange_pointer が opac_cam だった場合.
                deleted_pointer_delete();
                add_orange_pointer();

            }

        } else {
            deleted_pointer_delete();
            add_orange_poitner();
        }
    } else {
        add_orange_pointer();
    }
}