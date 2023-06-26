// * 空のブロックの生成関数.
// * まだ same クラスを持たせる、といった処理はされていない、ただのブロックの挿入.
export const block_duplicate = (key_block, e) => {
    let new_block = document.createElement("div");
    new_block.classList.add("block");
    if (e == "before") {
        key_block.before(new_block);
    } else if (e == "after") {
        key_block.after(new_block);
    }
}

// * 隣の空のブロックについて、 same, same_num_N といったクラスを与え、
// * 同時にこの割り込みに応じて、その周辺のブロックのクラスも更新する.
export const duplicate_in_the_middle_of_same_group = (block, e) => {
    let next_block;
    if (f == "default") {
        next_block = block.previousElementSibling;
        if (! block.classList.contains("same")) {
            same_setup(block);
            block.classList.add("same_end");
            next_block.classList.add("same_start");
        }
    } else if (e == "connected") {
        // [* これはどういう場合だろう.]
        next_block = block.nextElementSibling;
        if (! block.classList.contains("same")) {
            same_setup(block);
            block.classList.add("same_start");
            next_block.classList.add("same_end");
        }

        // * クラス関係に伴う中身の移動.
        let content = e.lastElementChild;
        if (next_block.lastElementChild) {
            next_block.lastElementChild.remove();
            next_block.appendChild(content.cloneNode(true));
        }
        
        content.remove();
        centering_marker(block, next_block, "centered_block");
        if(block.classList.contains("same_end")) {
            block.classList.remove("same_end");
            next_block.classList.add("same_end");
        }
    }
    let same_classname = "same_num_" + get("same_num");
    block.classList.add("same");
    next_block.classList.add("same");          
    block.classList.add(same_classname);
    next_block.classList.add(same_classname);
    // * command + U では必要のない処理.
    focus_checker(next_block);
}

// * same ブロックを新しく作り、同時に same_num の値も同期する関数.
export const same_setup = (block) => {
    block.classList.add("same");
    set("same_num", s => s += 1);
}