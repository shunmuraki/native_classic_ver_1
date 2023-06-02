// * 空のブロックの生成関数.
// * まだ same クラスを持たせる、といった処理はされていない、ただのブロックの挿入.
export const block_duplicate = (e, f) => {
    let block = document.createElement("div");
    block.classList.add("block");
    if (f == "before") {
        e.before(block);
    } else if (f == "after") {
        e.after(block);
    }
}

// * 隣の空のブロックについて、 same, same_num_N といったクラスを与え、
// * 同時にこの割り込みに応じて、その周辺のブロックのクラスも更新する.
export const duplicate_in_the_middle_of_same_group = (e, f) => {
    let next_block;
    if (f == "default") {
        next_block = e.previousElementSibling;
        if (! e.classList.contains("same")) {
            same_setup(e);
            e.classList.add("same_end");
            next_block.classList.add("same_start");
        }
    } else if (f == "connected") {
        // [* これはどういう場合だろう.]
        next_block = e.nextElementSibling;
        if (! e.classList.contains("same")) {
            same_setup(e);
            e.classList.add("same_start");
            next_block.classList.add("same_end");
        }

        // * クラス関係に伴う中身の移動.
        let the_content = e.lastElementChild;
        if (next_block.lastElementChild) {
            next_block.lastElementChild.remove();
            next_block.appendChild(the_content.cloneNode(true));
        }
        
        the_content.remove();
        centering_marker(e, next_block, "centering");
        if(e.classList.contains("same_end")) {
            e.classList.remove("same_end");
            next_block.classList.add("same_end");
        }
    }
    let the_name = "same_num_" + get("same_num");
    e.classList.add("same");
    next_block.classList.add("same");          
    e.classList.add(the_name);
    next_block.classList.add(the_name);
    // * command + U では必要のない処理.
    focus_checker(next_block);
}

// * same ブロックを新しく作り、同時に same_num の値も同期する関数.
export const same_setup = (e) => {
    e.classList.add("same");
    set("same_num", s => s += 1);
}