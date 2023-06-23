// * 対応する special_cov を返す関数.
export const get_correspond_same_concealer = (e) => {
    let the_name = "this_cov_is_" + target_data(e, "same_num_");
    let the_special_cov = document.getElementsByClassName(the_name)[0];
    return the_special_cov;
}

// ---------------------------------------------------------------------------------------------------------------

// * special_cov関連の関数を束ねたもの.
export const concealer_management = (e) => {
    let wrapper_index = get_wrapper_index(e);
    let list_wrappers = wrapper_index.children;
    let centering_num = [].slice.call(get_block_list(e).children).indexOf(e);
    for (let i = 0; i < list_wrappers.length; i++) {
        if (i == 0 && list_wrappers[0].classList.contains("orange_space")) {
        } else {
            let blocks = list_wrappers[i].lastElementChild.children;
            concealer_activate_check(blocks[centering_num]);
            concealer_inactivate_check(blocks[centering_num]);
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * concealer の中身を same_start や same_end に戻すオブジェクト.
// * same(= special_cov) がセンタリングしている間にスタイリングを変更した場合に、sameの外に出る時に対象となっていた special_cov の要素を複製して大元の same_end に格納する関数.
export const concealer_trace_to_original = (e) => {
    if (e.previousElementSibling) {
        if (e.previousElementSibling.classList.contains("same_end")) {
            concealer_trace_essential(e.previousElementSibling);
        }
    } 
    if (e.nextElementSibling) {
        if (e.nextElementSibling.classList.contains("same_start")) {
            concealer_trace_essential(e.nextElementSibling);
        }
    }
}

// * concealer を作成して追加する関数.
export const trace_original_to_concealer = () => {
    let the_name = "same_num_" + the_num;
    let concealer = concealer_make(e, the_num);
    let hit_target = document.getElementsByClassName(the_name)[document.getElementsByClassName(the_name).length - 1];
    
    // * もし iframe だった場合 YT player を生成するようにする。
    // * ！cloneNode() はここでは使用しない！
    if (hit_target.lastElementChild) {

        if (hit_target.lastElementChild.tagName == "IFRAME") {

            let special_playerlist = native_value("special_playerlist");
            let the_code = target_data(hit_target, "id_is_");
            set("s_s_num", s => s+= 1);
            let the_keyname = String("yt_editor_" + get("s_s_num"));
            let the_sp_if = document.createElement("div");
            the_sp_if.setAttribute("id", the_keyname);
            classmover(hit_target.lastElementChild, the_sp_if, "style_", "add");
            special_cov.appendChild(the_sp_if);
            let pl = block_multiable(the_keyname, the_code);
            special_playerlist[the_keyname] = pl;
            // * ブロックのスタイル維持のため.
            concealer.classList.add("video");
            // * Escape後にiframeが復活するように id_is_ を複製したすべてにセット.
            // [* 正直意味が分からない.]
            concealer.classList.add("id_is_" + the_code);

        } else {

            let the_one = hit_target.lastElementChild.cloneNode(true);
            concealer.appendChild(the_one);
            if (the_one.tagName == "IMG") {
                // * スタイル維持のため.
                concealer.classList.add("img");
                concealer .style.height = 225 + "px";
            }
            
        }

        hit_target.lastElementChild.style.setProperty('opacity', 0, 'important');
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

// * 左右の移動でspecial_covの変更内容を same_end に反映させる関数.
export const concealer_trace_essential = (e) => {
    let concealer = get_correspond_concealer(e);
    if (concealer) {
        let cloned_concealer = concealer.lastElementChild.cloneNode(true);
        cloned_concealer.style.setProperty('opacity', 0, 'important');
        let same_name = "same_num_" + target_data(e, "same_num_");
        // * ここ same_satrt にも same_end にも対応させる. 引数に渡したブロックに挿れてくれたらそれでいい。
        let sames = document.getElementsByClassName(same_name);
        sames[sames.length - 1].lastElementChild.remove();
        sames[sames.length - 1].appendChild(specon_cloned);
    }
}


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
    let block = document.createElement("div");
    let the_name = "same_num_" + get("same_num");
    block.classList.add("video");
    block.classList.add(the_name);
    return block;
}