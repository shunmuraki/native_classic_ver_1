// * 同時に adaptation についてもここで処理させちゃう.
export const conversion_on_individual = (block, section) => {
    
    // * video 属性の場合は追加で video_animation を作成.
    if (block.classList.contains("video")) {

        // * same を持たない、単一の流れていくブロックについて start_animation と end_animation を生成.
        animation_datasetup_from_individual_block(block, the_imp_id, j, data_num, i);  
        video_animation_datasetup_from_individual();
        block.classList.add("anim_num_" + video_animation["anim_name"]);
        let object = iframe_conversion(block);
        section.appendChild(object);

    } else if (block.lastElementChild.tagName == "TEXTAREA") {
        
        // * エディター上でのブロック間の移動の過程でできた
        // * 「<textarea> を中身持つが value はないもの」というのは多く存在して、これを弾いておく必要がある.
        if (block.lastElementChild.value !== "") {
            // * same を持たない、単一の流れていくブロックについて start_animation と end_animation を生成.

            // * the_imp_id, j, data_num, i これら全部未定義。なんですか、これ。
            animation_datasetup_from_individual_block(block, the_imp_id, j, data_num, i);
            textarea_conversion(block);

            // * classname が定義されていない気がする。
            block.classList.add(classname);
            object_conversion(block, section);
        }

    } else if (block.lastElementChild.tagName == "IMG") {        
        // * same を持たない、単一の流れていくブロックについて start_animation と end_animation を生成.
        animation_datasetup_from_individual_block(block, the_imp_id, j, data_num, i);
        block.classList.add(classname);
        object_conversion(block, section);
    }    

}