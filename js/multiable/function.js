import { screen, half_left_width, blocksize } from "../base/elements.js";
import { target_data, vertical_to_sp_cover, vertical_to_hor, classmover, same_data_getter, same_data_counter, which_special_is } from "../base/tools.js";
import { yt_player_getter, yt_resetter, yt_loop_player, yt_loop_stopper, just_clear_yt_loop } from "./extends.js";

let special_playerlist = {};
let s_n = 100;
let same_start_content = null;

// special_cov用に毎度作成する yt のリストを外部のJSファイルへ渡す関数.
export const special_playlist_getter = () => {
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

// same群のどこかがセンタリングしている際に、上に対象要素を被せて描画する関数.
export const make_special_cov = (e, f) => {

    let special_cov = document.createElement("div");
    special_cov.style.position = "fixed";
    
    let bottom_distance = e.getBoundingClientRect().top;
    let left_distance = half_left_width;
    
    special_cov.style.top = bottom_distance + "px";
    // borderの有無の違いから 1px を調整....
    special_cov.style.left = left_distance + 1 + "px";

    special_cov.style.width = blocksize + "px";
    special_cov.style.height = e.clientHeight + "px";

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

        let special_cov = which_special_is(e);
        let the_num = target_data(e, "same_num_");

        function the_state() {
            let the_name = "same_num_" + the_num;
            let special_cov = make_special_cov(e, the_num);
            let hit_target = document.getElementsByClassName(the_name)[document.getElementsByClassName(the_name).length - 1];
            
            // もし iframe だったら、yt idを取得して、新しく yt playerを生成するようにする。cloneNodeはしない.            
            if (hit_target.lastElementChild) {
                if (hit_target.lastElementChild.tagName == "IFRAME") {
    
                    let the_code = target_data(hit_target, "id_is_");
                    s_n += 1;
                    let the_keyname = String("yt_editor_" + s_n);
                    let the_sp_if = document.createElement("div");
                    the_sp_if.setAttribute("id", the_keyname); 
                    
                    classmover(hit_target.lastElementChild, the_sp_if, "styling_", "add");
                    special_cov.appendChild(the_sp_if);
                    let pl = block_multiable(the_keyname, the_code);
                    special_playerlist[the_keyname] = pl;

                    // スタイル維持のため.
                    special_cov.classList.add("video");

                    // Escape後にiframeが復活するように id_is_ を複製したすべてにセット.
                    special_cov.classList.add("id_is_" + the_code);

                } else {
                    let the_one = hit_target.lastElementChild.cloneNode(true);
                    special_cov.appendChild(the_one);

                    if (the_one.tagName == "IMG") {
                        // スタイル維持のため.
                        special_cov.classList.add("img");
                        special_cov.style.height = 225 + "px";
                    }
                }
                hit_target.lastElementChild.style.setProperty('opacity', 0, 'important');
            }
        }
        
        if (special_cov == null) {
            the_state();
            special_cov = document.getElementsByClassName("this_cov_is_" + the_num)[0];
        }
        
        let player;

        function play_around() {
            if (player) {
                just_clear_yt_loop();
                setTimeout(() => {
                    let the_time = yt_resetter(e);
                    player.seekTo(the_time);
                    player.playVideo();
                    yt_loop_player(player, e);
                }, 1000)
            }
        }

        // dupブロックであるケースを配慮.
        if (special_cov.lastElementChild) {
            player = yt_player_getter(special_cov.lastElementChild);
            if (screen.classList.contains("edit")) {
                if (document.querySelector(".pausing")) {
                    play_around();
                }
            } else {
                play_around();
            }
        }
    }
}

// となりのブロックが same_end クラスを持つ場合に対応する special_cov を削除する関数.
export const is_it_same_alend = (e) => {
    
    let player;
    let the_target_left = e.previousElementSibling;
    let the_target_right = e.nextElementSibling;

    function the_state(e) {
        let the_special_cov = which_special_is(e);
        let content = null;

        // 削除する前に same_start が右隣の場合にコンテントを一時的に same_startへ移してあげる.
        // そして再度 same_start が centering した時にその中身を取り除くようにする.
        if (the_special_cov) {
            if (the_special_cov.lastElementChild) {
                content = the_special_cov.lastElementChild.cloneNode(true);
                same_start_content = content;
            }
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

            if (document.querySelector(".pausing")) {
                if (player) {
                    player.pauseVideo();
                    let the_time = yt_resetter();
                    player.seekTo(the_time);
                    yt_loop_stopper(player, "end");
                }
            }
            the_state(the_target_left);
            if (the_target_left.lastElementChild) {
                the_target_left.lastElementChild.style.setProperty('opacity', 1, 'important');
            } 
        } else if (the_target_left.classList.contains("same_start")) {
            // 同 same_num を持つ same_start の content があれば削除.
            if (the_target_left.lastElementChild) {
                the_target_left.lastElementChild.remove();
            }
        }
    }

    if (the_target_right) {
        if (the_target_right.classList.contains("same_start")) {
            player_setup(the_target_right);
            if (document.querySelector(".pausing")) {
                if (player) {
                    player.pauseVideo();
                    let the_time = yt_resetter();
                    player.seekTo(the_time);
                    yt_loop_stopper(player, "start");
                }
            }
            // same_start に special_cov の content を一時的に複製して格納.
            the_state(the_target_right);
            the_target_right.appendChild(same_start_content);

        } else if (the_target_right.classList.contains("same_end")) {
            if (the_target_right.lastElementChild) {
                the_target_right.lastElementChild.style.setProperty('opacity', 0, 'important');
            }
        }
    }

    if (e.classList.contains("same_start") ||  e.classList.contains("same_end")) {
        if (e.lastElementChild) {
            e.lastElementChild.style.setProperty('opacity', 0, 'important');
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
                        is_it_same_start(vers[o]);
                        is_it_same_alend(vers[o]);
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
                if (spe_cont.tagName == "IMG") {
                    the_target_left.style.height = 225 + "px";
                }
                the_target_left.appendChild(spe_cont);
                the_target_right.classList.add("same_start");
                let same_name = "same_num_" + target_data(the_target_right, "same_num_");

                // same_start　以降の same_num_ を更新.
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