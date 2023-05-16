// 画像のアップロード処理を行う関数.
export const make_it_img = (e, m) => {
    const input = document.createElement("input");
    const label = document.createElement("label");

    input.setAttribute("type", "file");
    let inputs = document.getElementsByClassName("sp").length;
    input.id = "media_input" + inputs;
    input.classList.add("thisisinput" + inputs);
    label.setAttribute("for", input.id);
    label.appendChild(input);
    
    let multi_fragment = document.createDocumentFragment();
    multi_fragment.append(label);

    // 当初の textarea をリプレース。
    e.lastElementChild.remove();
    e.classList.add("img");
    e.appendChild(multi_fragment);
    e.style.height = 225 +  "px";
    
    if (m == "image") {
        input.setAttribute("accept", ".png");
        label.classList.add("image_input");
        const uploaded_multi_media = document.createElement("img");

        // contentが textarea から img, video に置換されるためスタリングもここで変更.
        uploaded_multi_media.classList.add("style_1_1_1_1");
        let multi_one_fragment = document.createDocumentFragment();
        multi_one_fragment.append(uploaded_multi_media);
        e.appendChild(multi_one_fragment);
        
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

// ---------------------------------------------------------------------------------------------------------------

// yt iframe　の読み込み
export const block_multiable = (e, f) => {
    let the_box = document.getElementById(e).parentElement;
    the_box.style.height = 225 + "px";
    the_box.classList.add("video");

    let player;
    let duration_time;
        
    function onYouTubeIframeAPIReady(g, h) {
        window.YT.ready(function() {
            player = new window.YT.Player(g, {
                width: blocksize,
                height: '202.5',
                videoId: h,
                events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
                }
            });
        })
    }

    function onPlayerReady(event) {
        event.target.mute();
        event.target.playVideo();
        duration_time = player.getDuration();
        // 時間差の存在を考慮してsessionStorageを唯一この箇所で利用.
        sessionStorage.removeItem("the_duration");
        sessionStorage.setItem("the_duration", duration_time);
        return duration_time;
    }

    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 100);
            done = true;
        }
    }
    
    function stopVideo() {
        player.pauseVideo();
    }
    
    onYouTubeIframeAPIReady(e, f);
    return player;
}

// ---------------------------------------------------------------------------------------------------------------

// 動画の読み込み・sp_cover内のラインの調整（ブロック数）などを行う関数. um と multiable にて共通利用.
export const video_load_then = (e, f) => {
    set("same_num", s => s += 1);
    let the_id_name = "yt_editor_" + get("same_num");
    let the_code;
    
    // "v="以降の11文字を取得してcodeとする。
    let spl = e.indexOf("v=");
    // UMから取り込まれる場合と、通常のURLペーストの場合に対応。
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

    // contentが textarea から img, video に置換されるためスタリングもここで変更.
    the_box.appendChild(the_add_box);
    let pl = block_multiable(the_id_name, the_code);
    players_list[the_id_name] = pl;
    
    setTimeout(() => {
        let the_duration = sessionStorage.getItem("the_duration");        
        let the_name = "same_num_" + get("same_num");
        the_box.classList.add("same");
        the_box.classList.add(the_name);
        
        // same は dupブロックで表現.
        make_dup_fragment(the_box, "before");
        
        let the_will_copied = the_box.previousElementSibling;
        the_will_copied.classList.add("same");
        the_will_copied.classList.add("video");
        the_will_copied.classList.add(the_name);

        // Escape後にiframeが復活するように id_is_ を複製したすべてにセット.
        let the_id_name = "id_is_" + the_code;
        the_will_copied.classList.add(the_id_name);
    
        // 動画の尺 / 3　分のブロックが必要であるため算出.
        let the_block_num = Math.floor(the_duration / blocktime);
        let the_fragment = document.createDocumentFragment();
        let the_fragment_stable = document.createDocumentFragment();
        
        for (let i = 0; i < the_block_num; i++) {
            let the_newone = the_will_copied.cloneNode(true);
            
            // ブロックごとの動画再生位置を付与. (編集に備えて)
            let the_seek_num = blocktime * i;
            let the_v_st_name = "this_video_st_" + the_seek_num;
            the_newone.classList.add(the_v_st_name);
            // 最初のsameには始点を与えておく.
            if (i == 0) {
                the_newone.classList.add("same_start");
            }
            // 本ライン用fragmentの生成
            the_fragment.appendChild(the_newone); 
            // 本ライン以外が対象のfragmentの生成
            let the_newone_stable = the_will_copied.cloneNode(true);
            the_fragment_stable.appendChild(the_newone_stable);
        }
        the_will_copied.remove();
        
        // 最後の中身を伴うsameには終点を与える.
        let the_v_en_name = "this_video_st_" + the_duration;
        
        // ACTUAR分を考慮.
        let the_actuar = the_duration - (the_block_num * blocktime);
        let the_actuar_name =  "actuar_time_" + the_actuar;
        the_box.classList.add("actuar_en");
        the_box.classList.add(the_v_en_name);
        the_box.classList.add(the_actuar_name);
        the_box.classList.add("same_end");
        the_box.classList.add("id_is_" + the_code);
        
        // video製のsame群を適切な箇所へ挿入.
        let the_box_num = [].slice.call(vertical_to_hor(the_box).children).indexOf(the_box) - 1;
        the_box.before(the_fragment);
        let current_sp_cover = vertical_to_sp_cover(the_box);
        let the_sp_num = [].slice.call(current_sp_cover.children).indexOf(vertical_to_sp(the_box));

        // 本ライン以外には stable_fragment を挿入.
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