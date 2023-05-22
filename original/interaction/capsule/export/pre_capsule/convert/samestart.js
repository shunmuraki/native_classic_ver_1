export const case_samestart = () => {
    if (! block.classList.contains("opening")) {
        if (block.previousElementSibling) {
            if (! block.previousElementSibling.classList.contains("same")) {
                startblock_around(block, j, data_num, i, "video");
            } else {
                if (! the_imp_id) {
                    startblock_around(block, j, data_num, i, "video");
                } else {
                    if (! block.previousElementSibling.classList.contains(the_imp_id)) {
                        startblock_around(block, j, data_num, i, "video");
                    }
                }
            }
        } else {
            startblock_around(block, j, data_num, i, "video");
        }
    }
}