export const case_same_start = () => {
    if (! block.classList.contains("opening")) {
        if (block.previousElementSibling) {
            if (! block.previousElementSibling.classList.contains("same")) {
                animation_datasetup_from_start_block(block, j, data_num, i, "video");
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