// * 編集モード中に command + C が押された際に実行される関数.
// * orange_pointer を追加/除去する.
export const keytouch_edit_command_c = () => {
    let env = keytouch_setup();
    if (centering) {
        if (the_see_centering.firstElementChild.firstElementChild.scrollLeft == Number(target_data(centering, "scroll_left_"))) {
            if (the_see_centering.classList.contains("principle_pointer") && centering.classList.contains("opac_cam") == false){
                // * ポインター移動中でかつ今の orange_pointer が opac_cam ではない場合.    
                delete_opacam(); 
                pointer_setter();
                
            } else if (centering.classList.contains("opac_cam") == true) {
                // * 今の orange_pointer が opac_cam だった場合.
                delete_opacam();
                pointer_setter();
            }
        } else {
            delete_opacam();   
            pointer_setter();
        }
    } else {
        pointer_setter();
    }
}