export const get_yt_id = (e) => {
    // e = block
    let code;
    // * "v="以降の11文字を取得して YouTube動画IDを取得.
    let st = e.indexOf("v="); 
    // * UMから取り込まれる場合と、通常のURLペーストの場合に対応。
    if (e.indexOf("v=") == -1) {
        code = e;
    } else {
        code = e.slice(st + 2, st + 13);
    }

    return code;
}


export const actuar_setup_initial = (e) => {
    let the_v_en_name = "this_video_st_" + e;
    // * actuar を反映.
    let the_actuar = the_duration - (the_block_num * blocktime);
    let the_actuar_name =  "actuar_time_" + the_actuar;
    the_box.classList.add("actuar_en");
    the_box.classList.add(the_v_en_name);
    the_box.classList.add(the_actuar_name);
    the_box.classList.add("same_end");
    the_box.classList.add("id_is_" + the_code);
}

export const video_block_make = () => {
    let block = document.createElement("div");
    let the_name = "same_num_" + get("same_num");
    block.classList.add("video");
    block.classList.add(the_name);
    return block;
}

// * おそらく enough でいけると思っている.
export const addition_of_video_pasted_list_wrapper_make = (e) => {
    let pasted_list_wrapper_fragment = document.createDocumentFragment();
    for (let i = 0; i < e; i++) {
        let block = video_block_make();
        // * ブロックごとの動画再生位置を付与. 
        let the_seek_num = blocktime * i;
        let the_v_st_name = "this_video_st_" + the_seek_num;
        block.classList.add(the_v_st_name);
        if (i == 0) {
            block.classList.add("same_start");
        }
        // * ID がペーストされた sp に挿入する fragment の生成
        pasted_list_wrapper_fragment.appendChild(the_newone);
    }
    return pasted_list_wrapper_fragment;
}


export const addition_of_video_other_list_wrapper_make = (e) => {
    let other_list_wrapper_fragment = document.createDocumentFragment();
    for (let i = 0; i < e; i++) { 
        // * 他の sp 用の fragment の生成
        let block = block_make(true);
        the_fragment_stable.appendChild(block);
    }
    return other_list_wrapper_fragment;
}

export const video_pasted_list_wrapper_fragment_add = () => {
    // * fragment を適切な箇所へ挿入.
    // * ここもなんか上手いことできるはず. tool.js のオブジェクトで代替できそうな処理に見える.
    let the_box_num = [].slice.call(vertical_to_hor(the_box).children).indexOf(the_box) - 1;
    the_box.before(the_fragment);
}


export const other_list_wrapper_fragment_add = () => {
    let current_sp_cover = vertical_to_sp_cover(the_box);
    let the_sp_num = [].slice.call(current_sp_cover.children).indexOf(vertical_to_sp(the_box));
    // * それ以外の sp へも同様に fragment を適切な箇所へ挿入.
    for (let i = 0; i < current_sp_cover.childElementCount; i++) {
        if (i != the_sp_num) {
            current_sp_cover.children[i].lastElementChild.children[the_box_num].before(the_fragment_stable);
        }
    } 
}

export const load_player_as_block = (e) => {
    let the_name = "same_num_" + get("same_num");
    // * 動画の尺 / ブロック単位の設定時間　分のブロックが必要であるため算出.
    let the_block_num = Math.floor(the_duration / blocktime);
    
    let the_box = e.parentElement;
    the_box.classList.add("same");
    the_box.classList.add(the_name);
    let the_duration = sessionStorage.getItem("the_duration");        

    // actuar 周りの設定.
    actuar_setup_initial(the_duration);

    let pasted_list_wrapper_fragment = addition_of_video_pasted_list_wrapper_make(the_block_num);
    video_pasted_list_wrapper_fragment_add(pasted_list_wrapper_fragment);

    let other_list_wrapper_fragment = addition_of_other_list_wrapper_make(the_block_num);
    other_list_wrapper_fragment_add(other_list_wrapper_fragment);
}

// * <textarea> にペーストされた YouTube動画ID から動画のメタデータを読み込み、
// * ブロックを duration 分複製しながら、動画をエディター上に展開する関数. (UM からの読み込みでも実行される)
export const video_load_then = (e, f) => {
   
    let the_code;
    set("same_num", s => s += 1);
    let the_id_name = "yt_editor_" + get("same_num");
    the_code = get_yt_id(e);
    
    let the_box = f.parentElement;
    the_box.lastElementChild.remove();
    let the_add_box = document.createElement("div");
    the_add_box.setAttribute("id",the_id_name);

    // * ブロック内の要素の変化に、スタイルも対応.
    the_box.appendChild(the_add_box);
    let player = video_loading_initial(the_id_name, the_code);
    players_list[the_id_name] = player;
    
    // * ここもっと上手く書けるでしょ.
    setTimeout(() => {
        load_player_as_block();
        let after_distance = blocksize * (the_block_num);
        all_view_changer(current_sp_cover, after_distance);
        same_concealer_management(element(".centered_block"));
    }, 1500);
}


// ---------------------------------------------------------------------------------------------------------------

export const process_after_image_uploaded = () => {
    let file = o.target.files;
    const sizeLimit = 2048 * 2048 * 1;
    console.log(file[0].size);
    if (file[0].size <= sizeLimit) {
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function() {
            label.remove();
            uploaded_multi_media.src = reader.result;
        }
    } else {
        e.lastElementChild.remove();
    }
}

// * ファイルマネージャーからアップロードされた画像をブロックに表示する関数.
export const make_it_img = (e, m) => {  
    image_loading_setup_initial();

    // * 以下ファイルがアップロードされた際に実行される処理.
    input.addEventListener("change", function(o) {
        process_after_image_uploaded();        
    }, false); 
};