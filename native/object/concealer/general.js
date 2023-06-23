import { get_the_block_index_num } from "../extra/tool";

// * 対応する special_cov を返す関数.
export const get_correspond_same_concealer = (e) => {
    let classname = "this_cov_is_" + value(e, "same_num_");
    let concealer = document.getElementsByClassName(classname)[0];
    return concealer;
}

// ---------------------------------------------------------------------------------------------------------------

// * special_cov関連の関数を束ねたもの.
export const concealer_management = (block) => {
    let list_wrappers = get_wrapper_index(block).children;
    let block_num = get_the_block_index_num(get_block_list(block), block);
    for (let i = 0; i < list_wrappers.length; i++) {
        if (i == 0 && list_wrappers[0].classList.contains("orange_space")) {
        } else {
            let blocks = list_wrappers[i].lastElementChild.children;
            concealer_activate_check(blocks[block_num]);
            concealer_inactivate_check(blocks[block_num]);
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * concealer の中身を same_start や same_end に戻すオブジェクト.
// * same(= special_cov) がセンタリングしている間にスタイリングを変更した場合に、sameの外に出る時に対象となっていた special_cov の要素を複製して大元の same_end に格納する関数.
export const trace_concealer_content_to_original = (block) => {
    let left_block = block.previousElementSibling;
    let right_block = block.nextElementSibling;
    if (left_block) {
        if (left_block.classList.contains("same_end")) {
            concealer_trace_essential(left_block);
        }
    } 
    if (right_block) {
        if (right_block.classList.contains("same_start")) {
            concealer_trace_essential(right_block);
        }
    }
}

// * 左右の移動でspecial_covの変更内容を same_end に反映させる関数.
export const concealer_trace_essential = (block) => {
    let concealer = get_correspond_concealer(block);
    if (concealer) {
        let cloned_concealer_content = concealer.lastElementChild.cloneNode(true);
        cloned_concealer_content.style.setProperty('opacity', 0, 'important');
        let classname = "same_num_" + value(block, "same_num_");
        // * ここ same_satrt にも same_end にも対応させる. 引数に渡したブロックに挿れてくれたらそれでいい。
        let sames = document.getElementsByClassName(classname);
        let original_same_end_block = sames[sames.length - 1];
        original_same_end_block.lastElementChild.remove();
        original_same_end_block.appendChild(cloned_concealer_content);
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * concealer を作成して追加する関数.
export const make_concealer_on_original = (same_num) => {
    let classname = "same_num_" + same_num;
    let concealer = concealer_make(e, same_num);
    // * これもオブジェクトにできるでしょ。 original_same_end_block を取得して返すオブジェクト。作りましょう。
    let original_same_end_block = document.getElementsByClassName(classname)[document.getElementsByClassName(classname).length - 1];
    // * もし iframe だった場合 YT player を生成するようにする。
    // * ！cloneNode() はここでは使用しない！
    if (original_same_end_block.lastElementChild) {
        if (original_same_end_block.lastElementChild.tagName == "IFRAME") {
            let concealer_playerlist = native_value("special_playerlist");
            let yt_id = value(hit_target, "id_is_");
            set("s_s_num", s => s+= 1);
            // * これやん、前間違ってたところ！！！！！！！！！！！！！！！！
            let key_classname = String("yt_editor_" + get("s_s_num"));
            // * これやん、前間違ってたところ！！！！！！！！！！！！！！！！
            let new_concealer_content = document.createElement("div");
            new_concealer_content.setAttribute("id", key_classname);
            classmover(original_same_end_block.lastElementChild, the_sp_if, "style_", "add");
            concealer.appendChild(new_concealer_content);
            
            let player = block_multiable(key_classname, yt_id);
            concealer_playerlist[key_classname] = player;
            // * ブロックのスタイル維持のため.
            concealer.classList.add("video");
            // * Escape後にiframeが復活するように id_is_ を複製したすべてにセット.
            // [* 正直意味が分からない.]
            concealer.classList.add("id_is_" + yt_id);
        } else {
            let cloned_original_content = original_same_end_block.lastElementChild.cloneNode(true);
            concealer.appendChild(cloned_original_content);
            if (cloned_original_content.tagName == "IMG") {
                // * スタイル維持のため.
                concealer.classList.add("img");
                concealer .style.height = 225 + "px";
            }
        }
        original_same_end_block.lastElementChild.style.setProperty('opacity', 0, 'important');
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * 上下左右の移動の際に special_cov が持つ要素(content) を same_end に反映させて special_cov を描画上の都合から削除する関数.
export const concealer_on_wrapper_index_delete = (e) => {
    // * なんか探し方がひどいし、中身を same_end に移すのは
    // * concealer_trace_to_original() でいいじゃん。
    let ends = e.querySelectorAll(".same_end");
    for (let i = 0; i < ends.length; i++) {
        concealer_trace_essential(ends[i]);
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * エディター上に存在するすべての concealer を削除するオブジェクト.
export const all_concealer_delete = () => {
    let concealers = document.querySelectorAll(".concealer");
    if (concealers.length > 0) {
        for (let i = concealers.length - 1; i >= 0; i--) {
            concealers[i].remove();
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

export const concealer_make = () => {
    let concealer = document.createElement("div");
    let classname = "same_num_" + get("same_num_");
    concealer.classList.add("video");
    concealer.classList.add(classname);
    return concealer;
}