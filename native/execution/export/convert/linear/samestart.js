export const conversion_on_same_start = (block) => {
    if (! block.classList.contains("opening")) {
        if (block.previousElementSibling) {
            if (! block.previousElementSibling.classList.contains("same")) {
                // * j, data_num, i が未定義。
                animation_datasetup_from_start_block(block, j, data_num, i, "video");
                // * j, data_num, i が未定義。
            } else {
                if (! the_imp_id) {
                    animation_datasetup_from_start_block(block, j, data_num, i, "video");
                } else {
                    if (! block.previousElementSibling.classList.contains(the_imp_id)) {
                        animation_datasetup_from_start_block(block, j, data_num, i, "video");
                    }
                }
            }
        } else {
            animation_datasetup_from_start_block(block, j, data_num, i, "video");
        }
    }
}