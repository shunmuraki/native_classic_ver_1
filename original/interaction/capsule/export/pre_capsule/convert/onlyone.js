// * 同時に adaptation についてもここで処理させちゃう.
export const case_not_same = () => {

    // * video 属性の場合は追加で video_animation を作成.
    if (block.classList.contains("video")) {
        
        // * same を持たない、単一の流れていくブロックについて start_animation と end_animation を生成.
        for_ind(block, the_imp_id, j, data_num, i);
        data_num += 1;
        let video_animation = {};
        video_animation["trigger_when"] = j * 5;
        video_animation["finish_when"] = video_animation["trigger_when"] + 5;
        video_animation = ac_vi_adaptation(block, video_animation, "active_st");
        video_animation["anim_name"] = get("animation_generate_list").length + 1;
        set("animation_generate_list", s => s.push([]));
        set("animation_data", s => s["section_" + i]["about_anims"]["data_" + data_num] = video_animation);
        block.classList.add("anim_num_" + video_animation["anim_name"]);
        let object_you = iframe_adaptation(block);
        the_big_section.appendChild(object_you);

    } else if (block.lastElementChild.tagName == "TEXTAREA") {
        
        // * エディター上でのブロック間の移動の過程でできた
        // * 「<textarea> を中身持つが value はないもの」というのは多く存在して、これを弾いておく必要がある.
        if (block.lastElementChild.value !== "") {
            // * same を持たない、単一の流れていくブロックについて start_animation と end_animation を生成.
            for_ind(block, the_imp_id, j, data_num, i);
            textarea_adaptation(block);
            block.classList.add(the_classname);
            object_setter(block, the_big_section);
        }

    } else if (block.lastElementChild.tagName == "IMG") {        
        // * same を持たない、単一の流れていくブロックについて start_animation と end_animation を生成.
        for_ind(block, the_imp_id, j, data_num, i);
        block.classList.add(the_classname);
        object_setter(block, the_big_section);
    }    

}