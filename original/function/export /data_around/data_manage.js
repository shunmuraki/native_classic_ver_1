// * animation_generate_list と animation を紐付けながら、後者を animations に束ねて返す関数.
export const animation_frontend_backend_push = (e, f, g, h) => {
   
    let the_block = e;
    let the_animation = f;
    let gene_datas = g;
    let the_num = gene_datas.length;
    let animations = [];

    for (let i = 0; i < the_num; i++) {
        // * gene_datas の中の genedata ごとに animation を複製し、
        // * N: animation_generation_list の length
        // * animation の 「anim_name」 に N を、
        // * block へ anim_num_N を classList に追加.
        let new_typedata = JSON.parse(JSON.stringify(the_animation));
        let new_gene_datas = JSON.parse(JSON.stringify(gene_datas));
        let the_keynum = animation_generate_list.length;
        new_typedata["anim_name"] = the_keynum;
        let the_name = "anim_num_" + the_keynum;
        the_block.classList.add(the_name);
        let the_value = new_gene_datas[i];
        let final_animation = animation_backend_shapeup(the_block, new_typedata, h);
        set("animation_generate_list", s => s.push(the_value));
        animations.push(final_animation);
    }

    return animations;
}

// * animation について actuar を考慮して trigger_when | finish_when | video_startpoint を更新する関数.
export const animation_backend_shapeup = (e, f, g) => {
    
    let classlist = e.classList;
    let animation = f;

    if (e.classList.contains("same_end")) {
        // * 秒数に変換. (blocksize = 360)
        let act_num = 5 * (Math.floor(Number(target_data(e, "actuar_time_"))) / 360);
        // [* floor → trunc にした方が正しいか.]
        act_num = Math.floor(act_num);
        for (let i = 0; i < classlist.length; i++) {
            let classname = classlist[i];
            // * actuar を video_startpoint に反映.
            if (classname.indexOf("this_video_st_") != -1) {
                if (g == "active_st") {
                    animation["video_startpoint"] = Math.floor(Number(target_data(e, "this_video_st_")));
                }
            }
            // * acutuar を finish_when に反映.
            if (classname.indexOf("actuar_time_") != -1) {
                animation["finish_when"] = animation["finish_when"] - act_num + 5; 
            } 
        }
    }
    if (e.classList.contains("same_start")) {
        // * 秒数に変換. (blocksize = 360)
        let act_num = 5 * (Math.floor(Number(target_data(e, "actuar_time_"))) / 360);
        // [* floor → trunc にした方が正しいか.]
        act_num = Math.floor(act_num);

        for (let i = 0; i < classlist.length; i++) {
            let classname = classlist[i];
            if (classname.indexOf("actuar_st") != -1) {
                // * actuar を trigger_when に反映.
                animation["trigger_when"] = animation["trigger_when"] + act_num;
                if (g == "active_st") {
                    // * actuar を video_startpoint にも反映.
                    animation["video_startpoint"] = animation["video_startpoint"] + act_num;
                }
            } 
        }
    }
    return animation;
}