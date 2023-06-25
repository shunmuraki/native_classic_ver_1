export const actuar_setup_initial = (block, start_time, yt_id) => {
    let classname = "this_video_st_" + start_time;
    // * actuar を反映.
    let actuar_time = the_duration - (the_block_num * blocktime);
    let actuar_classname =  "actuar_time_" + actuar_time;
    block.classList.add("actuar_en");
    block.classList.add(classname);
    block.classList.add(actuar_classname);
    block.classList.add("same_end");
    block.classList.add("id_is_" + yt_id);
}

// * おそらく enough でいけると思っている.
export const addition_of_video_pasted_list_wrapper_make = (num) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        let new_block = video_block_make();
        // * ブロックごとの動画再生位置を付与. 
        let start_time = blocktime * num;
        let classname = "this_video_st_" + start_time;
        new_block.classList.add(classname);
        if (i == 0) {
            new_block.classList.add("same_start");
        }
        // * ID がペーストされた sp に挿入する fragment の生成
        fragment.appendChild(new_block);
    }
    return fragment;
}

export const addition_of_video_other_list_wrapper_make = (num) => {
    let new_fragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) { 
        // * 他の sp 用の fragment の生成
        let block = block_make(true);
        new_fragment.appendChild(block);
    }
    return new_fragment;
}

export const load_player_as_block = (content) => {
    let classname = "same_num_" + get("same_num");
    // * 動画の尺 / ブロック単位の設定時間　分のブロックが必要であるため算出.
    let block_num = Math.floor(the_duration / blocktime);
    let block = content.parentElement;
    block.classList.add("same");
    block.classList.add(classname);
    let duration = sessionStorage.getItem("duration");
    // actuar 周りの設定.
    actuar_setup_initial(duration);
    let pasted_list_wrapper_fragment = addition_of_video_pasted_list_wrapper_make(the_block_num);
    video_pasted_list_wrapper_fragment_add(pasted_list_wrapper_fragment);
    let other_list_wrapper_fragment = addition_of_other_list_wrapper_make(the_block_num);
    other_list_wrapper_fragment_add(other_list_wrapper_fragment);
}

export const video_pasted_list_wrapper_fragment_add = (block, new_fragment) => {
    // * fragment を適切な箇所へ挿入.
    // * ここもなんか上手いことできるはず. tool.js のオブジェクトで代替できそうな処理に見える.
    let block_num = [].slice.call(get_block_list(block).children).indexOf(block) - 1;
    block.before(new_fragment);
}

export const other_list_wrapper_fragment_add = (env, block, num, new_fragment) => {    
    let list_wrapper_num = [].slice.call(env.wrapper_index.children).indexOf(get_list_wrapper(block));
    // * それ以外の sp へも同様に fragment を適切な箇所へ挿入.
    for (let i = 0; i < env.wrapper_index.childElementCount; i++) {
        if (i != list_wrapper_num) {
            env.wrapper_index.children[i].lastElementChild.children[num].before(new_fragment);
        }
    } 
}

// * <textarea> にペーストされた YouTube動画ID から動画のメタデータを読み込み、
// * ブロックを duration 分複製しながら、動画をエディター上に展開する関数. (UM からの読み込みでも実行される)
export const video_load_then = (e, f) => {
    let yt_id;
    set("same_num", s => s += 1);
    let id_name = "yt_editor_" + get("same_num");
    yt_id = get_yt_id(e);
    let block = f.parentElement;
    block.lastElementChild.remove();
    let new_content = document.createElement("div");
    new_content.setAttribute("id", id_name);
    // * ブロック内の要素の変化に、スタイルも対応.
    block.appendChild(new_content);
    let player = video_loading_initial(id_name, yt_id);
    players_list[id_name] = player;
    // * ここもっと上手く書けるでしょ.
    setTimeout(() => {
        load_player_as_block();
        let gap = blocksize * (block_num);
        all_view_changer(env.wrapper_index, gap);
        same_concealer_management(element(".centered_block"));
    }, 1500);
}

// ---------------------------------------------------------------------------------------------------------------

// * ファイルマネージャーからアップロードされた画像をブロックに表示する関数.
export const make_it_img = (input, uploaded_multi_media) => {  
    image_loading_setup_initial();
    // * 以下ファイルがアップロードされた際に実行される処理.
    input.addEventListener("change", function(event) {
        process_after_image_uploaded(event, uploaded_multi_media);
    }, false); 
};

export const process_after_image_uploaded = (event, uploaded_multi_media) => {
    let file = event.target.files;
    const sizeLimit = 2048 * 2048 * 1;
    if (file[0].size <= sizeLimit) {
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function() {
            label.remove();
            uploaded_multi_media.src = reader.result;
        }
    } else {
        element(".centered_block").lastElementChild.remove();
    }
}