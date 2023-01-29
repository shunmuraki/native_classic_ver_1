import { screen, half_left_width, blocksize } from "../base/elements.js";
import { target_data, vertical_to_sp_cover, vertical_to_hor, classmover, same_data_getter, same_data_counter } from "../base/tools.js";
import { yt_player_getter, yt_resetter, yt_loop_player, yt_loop_stopper } from "./extends.js";

let special_playerlist = {};
let s_n = 100;

// special_cov用に毎度作成する yt のリストを外部のJSファイルへ渡す関数.
export const special_playlist_getter = () => {
    console.log(special_playerlist);
    return special_playerlist;
}

// yt iframe　の読み込み
export const block_multiable = (e, f) => {

    let the_box = document.getElementById(e).parentElement;
    the_box.style.height = 225 + "px";
    the_box.classList.add("video");

    var player;
    var duration_time;
        
    function onYouTubeIframeAPIReady(g, h) {
        window.YT.ready(function() {
            player = new window.YT.Player(g, {
                height: '225',
                width: blocksize,
                videoId: h,
                events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
                }
            });
        })
    }

    function onPlayerReady(event) {
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

// same群のどこかがセンタリングしている際に、上に対象要素を被せて描画する関数.
export const make_special_cov = (e, f) => {

    let special_cov = document.createElement("div");
    special_cov.style.position = "fixed";
    
    let bottom_distance = e.getBoundingClientRect().top;
    let left_distance = half_left_width;
    
    special_cov.style.top = bottom_distance + "px";
    special_cov.style.left = left_distance + "px";

    let height_siz = e.clientHeight;

    special_cov.style.width = (blocksize) + "px";
    special_cov.style.height = height_siz + "px";

    let the_name = "this_cov_is_" + f;
    special_cov.classList.add("special_cov");
    special_cov.classList.add(the_name);

    let script_elem = document.getElementsByTagName('script')[0];
    script_elem.before(special_cov);

    return special_cov;
}

// 左右上下の移動で使える、centering が same を持つか判定する関数.
export const is_it_same_start = (e) => {
    
    // special_cov の生成からコンテントの挿入までを処理.
    if (e.classList.contains("same")) {
        console.log("ddd");
        let the_num = target_data(e, "same_num_");
        let special_cov = document.getElementsByClassName("this_cov_is_" + the_num)[0];
        console.log(special_cov);
        
        function the_state() {
            let the_name = "same_num_" + the_num;
            let special_cov = make_special_cov(e, the_num);
            let hit_target = document.getElementsByClassName(the_name)[document.getElementsByClassName(the_name).length - 1];
            
            // もし iframe だったら、yt idを取得して、新しく yt playerを生成するようにする。cloneNodeはしない.            
            if (hit_target.lastElementChild.tagName == "IFRAME") {
                let the_code = target_data(hit_target, "id_is_");
                console.log(hit_target);
                console.log(the_code);
                s_n += 1;
                let the_keyname = String("yt_editor_" + s_n);
                let the_sp_if = document.createElement("div");
                the_sp_if.setAttribute("id", the_keyname); 
                special_cov.appendChild(the_sp_if);
                let pl = block_multiable(the_keyname, the_code);
                special_playerlist[the_keyname] = pl;
                console.log(pl);
                console.log(special_playerlist);
            } else {
                let the_one = hit_target.lastElementChild.cloneNode(true);
                special_cov.appendChild(the_one);
            }
        }
        
        if (special_cov == null) {
            the_state();
            special_cov = document.getElementsByClassName("this_cov_is_" + the_num)[0];
        } 
        
        let player;
        // dupブロックであるケースを配慮.
        if (special_cov.lastElementChild) {
            player = yt_player_getter(special_cov.lastElementChild);
        }

        if (player) {
            // yt_resetter(player);
            // console.log(player);
            // player.playVideo();
            // yt_loop_player(player, block_pos);
        }
    }
}

// となりのブロックが same_end クラスを持つ場合に対応する special_cov を削除する関数.
export const is_it_same_alend = (e) => {
    
    let player;
    let the_target_left = e.previousElementSibling;
    let the_target_right = e.nextElementSibling;

    function the_state(e) {
        let the_name = "this_cov_is_" + target_data(e, "same_num_");
        let the_special_cov = document.getElementsByClassName(the_name)[0];
        if (the_special_cov) {
            console.log(the_special_cov);
            the_special_cov.remove();
        }
    }

    function player_setup(e) {
        if (e.lastElementChild) {
            player = yt_player_getter(e.lastElementChild);
        }
    }

    if (the_target_left) {
        if (the_target_left.classList.contains("same_end")) {
            player_setup(the_target_left);

            if (player) {
                player.pauseVideo();
                // yt_resetter(player);
                // yt_loop_stopper(player, "end");
            }
            the_state(the_target_left);
        }
    }

    if (the_target_right) {
        if (the_target_right.classList.contains("same_start")) {
            player_setup(the_target_right);
            if (player) {
                player.pauseVideo();
                // yt_resetter(player);
                // yt_loop_stopper(player, "start");
            }
            the_state(the_target_right);
        }
    }
}

// special_cov関連の関数を束ねたもの.
export const is_it_same_series = (e) => {
    let sp_cover = vertical_to_sp_cover(e);
    let sps= sp_cover.children;
    let centering_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);
    
    for (let i = 0; i < sps.length; i++) {
        if (i == 0 && sps[0].classList.contains("orange_space")) {
        } else {
            let vers = sps[i].lastElementChild.children;
            for (let o = 0; o < vers.length; o++) {
                if (o > 0) {
                    if (o == centering_num) {
                        is_it_same_alend(vers[o]);
                        is_it_same_start(vers[o]);
                    }
                }
            }
        }
    }
}

// sameの途中に挿入がされる場合への対処関数. (両サイドがsameであることが条件で、かつ両者が start , end は持たない場合にのみ実行)
export const same_cutter = (e, f) => {

    let the_target_left = e.previousElementSibling;
    let the_target_right;

    if (f == "addon") {
        the_target_right = e.nextElementSibling;
    } else if (f == "replace") {
        the_target_right = e;
    }
    if (the_target_left && the_target_right) {

        if (the_target_left.classList.contains("same") && the_target_right.classList.contains("same")) {
        
            if (the_target_left.classList.contains("same_start") == false && the_target_left.classList.contains("same_end") == false && the_target_right.classList.contains("same_start") == false && the_target_right.classList.contains("same_end") == false) {
                
                let spe_cont = document.querySelector(".special_cov").lastElementChild;
                the_target_left.classList.add("same_end");
                the_target_left.appendChild(spe_cont);
                the_target_right.classList.add("same_start");
                let same_name = "same_num_" + target_data(the_target_right, "same_num_");

                // * same_start　以降の same_num_ を更新.
                let sames = document.getElementsByClassName(same_name);
                let breakpoint = [].slice.call(sames).indexOf(the_target_right);
                
                let same_data = same_data_getter();
                same_data += 1;
                same_data_counter(same_data);
                
                for (let i = sames.length - 1; i >= breakpoint; i--) {
                    let same_block = sames[i];
                    classmover(same_block, same_block, "same_num_", "remove");
                    same_block.classList.add("same_num_" + same_data);                    
                }
            } 
        }
    }
}

// 画像のアップロード処理を行う関数.
export const make_it_img = (e, m) => {
    const input = document.createElement("input");
    const label = document.createElement("label");

    input.setAttribute("type", "file")
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
        input.setAttribute("accept", ".jpg, .jpeg, .png")
        label.classList.add("image_input");
        const uploaded_multi_media = document.createElement("img");

        // contentが textarea から img, video に置換されるためスタリングもここで変更.
        uploaded_multi_media.classList.add("styling_1_1_1_1");
        let multi_one_fragment = document.createDocumentFragment();
        multi_one_fragment.append(uploaded_multi_media);

        e.appendChild(multi_one_fragment);
        
        input.addEventListener("change", function(o) {            
            var file = o.target.files;
            var reader = new FileReader()
            reader.readAsDataURL(file[0])
            reader.onload = function() {
            label.remove();
            uploaded_multi_media.src = reader.result;
            }
        }, false);
    } 
};