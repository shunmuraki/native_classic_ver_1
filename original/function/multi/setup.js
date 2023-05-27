// * <textarea> にペーストされた YouTube動画ID から動画のメタデータを読み込み、
// * ブロックを duration 分複製しながら、動画をエディター上に展開する関数. (UM からの読み込みでも実行される)
export const video_load_then = (e, f) => {
    
    let the_code;
    set("same_num", s => s += 1);
    let the_id_name = "yt_editor_" + get("same_num");
    // * "v="以降の11文字を取得して YouTube動画IDを取得.
    let spl = e.indexOf("v=");
    
    // * UMから取り込まれる場合と、通常のURLペーストの場合に対応。
    if (e.indexOf("v=") == -1) {
        the_code = e;
    } else {
        the_code = e.slice(spl + 2, spl + 13);
    }
    
    let the_box = f.parentElement;
    the_box.lastElementChild.remove();
    let the_add_box = document.createElement("div");
    the_add_box.setAttribute("id",the_id_name);
    the_add_box.classList.add("style_1_1_1_1");

    // * ブロック内の要素の変化に、スタイルも対応.
    the_box.appendChild(the_add_box);
    let pl = block_multiable(the_id_name, the_code);
    players_list[the_id_name] = pl;
    
    setTimeout(() => {
        let the_duration = sessionStorage.getItem("the_duration");        
        let the_name = "same_num_" + get("same_num");
        the_box.classList.add("same");
        the_box.classList.add(the_name);
        
        // * same群 は dup として生成.
        make_dup_fragment(the_box, "before");
        
        let the_will_copied = the_box.previousElementSibling;
        the_will_copied.classList.add("same");
        the_will_copied.classList.add("video");
        the_will_copied.classList.add(the_name);

        // * Escape後にiframeが復活するよう、 id_is_ を複製したすべてにセット.
        // [* いまいち存在意義が把握しづらい.]
        let the_id_name = "id_is_" + the_code;
        the_will_copied.classList.add(the_id_name);
    
        // * 動画の尺 / ブロック単位の設定時間　分のブロックが必要であるため算出.
        let the_block_num = Math.floor(the_duration / blocktime);
        let the_fragment = document.createDocumentFragment();
        let the_fragment_stable = document.createDocumentFragment();
        
        for (let i = 0; i < the_block_num; i++) {
            let the_newone = the_will_copied.cloneNode(true);
            // * ブロックごとの動画再生位置を付与. 
            let the_seek_num = blocktime * i;
            let the_v_st_name = "this_video_st_" + the_seek_num;
            the_newone.classList.add(the_v_st_name);
            if (i == 0) {
                the_newone.classList.add("same_start");
            }
            // * ID がペーストされた sp に挿入する fragment の生成
            the_fragment.appendChild(the_newone); 
            // * 他の sp 用の fragment の生成
            let the_newone_stable = the_will_copied.cloneNode(true);
            the_fragment_stable.appendChild(the_newone_stable);
        }
        
        the_will_copied.remove();
        let the_v_en_name = "this_video_st_" + the_duration;
        
        // * actuar を反映.
        let the_actuar = the_duration - (the_block_num * blocktime);
        let the_actuar_name =  "actuar_time_" + the_actuar;
        the_box.classList.add("actuar_en");
        the_box.classList.add(the_v_en_name);
        the_box.classList.add(the_actuar_name);
        the_box.classList.add("same_end");
        the_box.classList.add("id_is_" + the_code);
        
        // * fragment を適切な箇所へ挿入.
        // * ここもなんか上手いことできるはず. tool.js のオブジェクトで代替できそうな処理に見える.
        let the_box_num = [].slice.call(vertical_to_hor(the_box).children).indexOf(the_box) - 1;
        the_box.before(the_fragment);
        let current_sp_cover = vertical_to_sp_cover(the_box);
        let the_sp_num = [].slice.call(current_sp_cover.children).indexOf(vertical_to_sp(the_box));

        // * それ以外の sp へも同様に fragment を適切な箇所へ挿入.
        for (let i = 0; i < current_sp_cover.childElementCount; i++) {
            if (i != the_sp_num) {
                current_sp_cover.children[i].lastElementChild.children[the_box_num].before(the_fragment_stable);
            }
        }

        let after_distance = blocksize * (the_block_num);
        all_view_changer(current_sp_cover, after_distance);
        is_it_same_series(document.querySelector(".centering"));
    }, 1500);
}

// * <textarea> 内に記述された YouTube動画ID から YT Player を生成し、
// * player を返す関数.
export const block_multiable = (e, f) => {
    let player;
    let duration_time;
    var done = false;
    let the_box = document.getElementById(e).parentElement;
    the_box.style.height = 225 + "px";
    the_box.classList.add("video");
    onYouTubeIframeAPIReady(e, f);
    return player;
}

// ---------------------------------------------------------------------------------------------------------------

// * ファイルマネージャーからアップロードされた画像をブロックに表示する関数.
export const make_it_img = (e, m) => {
    
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.setAttribute("type", "file");
    
    let inputs = document.getElementsByClassName("sp").length;
    input.id = "media_input" + inputs;
    input.classList.add("thisisinput" + inputs);
    
    label.setAttribute("for", input.id);
    label.appendChild(input);
    
    let multi_fragment = document.createDocumentFragment();
    multi_fragment.append(label);

    // * ブロック内の <textarea> を削除して <img> に置換.
    e.lastElementChild.remove();
    e.classList.add("img");
    e.appendChild(multi_fragment);
    e.style.height = 225 +  "px";
    
    if (m == "image") {
        input.setAttribute("accept", ".png");
        label.classList.add("image_input");
        const uploaded_multi_media = document.createElement("img");
        // * ブロック内の要素の変化に、スタイルも対応.
        // [* ここ最新にする.] 
        uploaded_multi_media.classList.add("style_1_1_1_1");
        let multi_one_fragment = document.createDocumentFragment();
        multi_one_fragment.append(uploaded_multi_media);
        e.appendChild(multi_one_fragment);

        // * 以下ファイルがアップロードされた際に実行される処理.
        input.addEventListener("change", function(o) {            
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
        }, false);
    } 
};