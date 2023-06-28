export const conversion_on_same_end = (block, section) => {
    if (! block.classList.contains("ending")) {
        if (block.nextElementSibling) {
            if (! block.nextElementSibling.classList.contains("same")) {
                // * j, data_num, i が未定義。
                animation_datasetup_from_end_block(block, j, data_num, i);
                // * j, data_num, i が未定義。
            } else {
                if (! the_imp_id) {
                    animation_datasetup_from_end_block(block, j, data_num, i);
                } else {
                    if (! block.nextElementSibling.classList.contains(the_imp_id)) {
                        animation_datasetup_from_end_block(block, j, data_num, i);
                    }
                }
            }
        } else {
            animation_datasetup_from_end_block(block, j, data_num, i);
        }
    }
    // * video属性の場合は、それ用の video_animation を併せて作成.
    // * 同時に adaptation についてもここで処理させちゃう.
    if (block.classList.contains("video")) {
        video_animation_datasetup_from_end_block();
        block.classList.add("anim_num_" + video_animation["anim_name"]);
        // * iframe自身 の YouTubeの 動画id を取得し、リストに加える.
        // * またそのリストの長さを測り、その数字を yt_N というidに持ったdiv要素に置換.
        iframe_conversion(block);

    } else if (block.lastElementChild.tagName == "TEXTAREA") {
        textarea_conversion(block);
    }
    // * classname が未定義。
    block.classList.add(classname);            
    object_conversion(block, section);
}
