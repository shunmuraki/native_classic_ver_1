import { vertical_to_hor, vertical_to_sp_cover, vertical_to_sp, which_special_is, target_data } from "./tool.js";
import { all_view_changer } from "./edit.js";
import { make_dup_fragment } from "./duplicate.js";
import { screen, blocksize, blocktime, half_left_width } from "../data/constant.js";
import { native_value } from "../data/variable.js";

// extends
// special_cov 向けでない、通常の yt プレイヤーの束から該当するプレイヤーを返す関数.
export const yt_player_getter = (e) => {
    let the_keyid = e.id;
    let yt_iframe = null;
    if (the_keyid) {
        // 動画は必ずsameなのでspecialのみから検索.
        yt_iframe = get("special_playerlist")[the_keyid];;
    }
    return yt_iframe;
}

// yt のプレイヤーのシークポイントを最適化する関数.
export const yt_resetter = (e) => {
    let target;
    if (screen.classList.contains("edit")) {
        let the_see_centering = document.querySelector(".see");
        if (the_see_centering.classList.contains("principle_block")) {
            target = document.getElementsByClassName("new_layer_centering")[0];
          } else if (the_see_centering.classList.contains("principle_pointer")) {
            let orange_data = orange_data_getter();
            let orange_pointer_space = the_see_centering.firstElementChild.firstElementChild;
            target = best_related_element(the_see_centering, orange_pointer_space.scrollLeft, "block", orange_data)[0];
          }
    } else {
        target = e;
    }
    let the_time = Number(target_data(target, "this_video_st_"));
    return the_time;
}

// センタリングしたブロックの動画をブロック分再生（or ループ再生）する関数
export const yt_loop_player = (e, f, g) => {
    let the_time = yt_resetter(f);

    if (! get("yt_loop")[g]) {
        set("yt_loop", s => s = new Array());
    }
    get("yt_loop")[g].push(
        setInterval(() => {
            e.seekTo(the_time);
            e.playVideo();
        }, blocktime * 1000));
}

// 上の関数によってセットされた interval 処理をクリアする関数.
export const yt_loop_stopper = (e, f, g) => {
    let duration;
    e.pauseVideo();
    if (f == "start") {
        e.seekTo(0);
    } else if (f == "end") {
        duration = e.getDuration();
        e.seekTo(duration);
    }
    if (get("yt_loop")[g]) {
        // 直してー！
        clearInterval(get("yt_loop")[g].shift());
    } 
}

// 現在センタリングしているブロックが yt でループされているのを停止する関数.
export const just_clear_yt_loop = (e) => {;
    if (get("yt_loop")[e]) {
        for (let i = get("yt_loop")[e].length; i >= 0; i--)  {
            // 直してー！
            let v = set("yt_loop", s => s[e].shift());
            clearInterval(v);
        }
    }
}

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

// func

// same群のどこかがセンタリングしている際に、上に対象要素を被せて描画する関数.
export const make_special_cov = (e, f) => {
    let special_cov = document.createElement("div");    
    let bottom_distance = e.getBoundingClientRect().top + window.pageYOffset;
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

        // 中身が opacity 0 の same_end をコピーしたケースを想定して戻す.
        // here??
        // special_cov.lastElementChild.style.setProperty('opacity', 1, 'important');

        // centering クラスを持つ e なんだったら special_cov にも center_special を与えるようにしたり、そうじゃなかったら除去するようにしないと.
        if (e.classList.contains("centering") || e.classList.contains("new_layer_centering")) {
            special_cov.classList.add("center_special");
        } else {
            special_cov.classList.remove("center_special");
        }
        
        let player;
        let sp_cover = vertical_to_sp_cover(e);

        function play_around() {
            if (player) {
                let the_name = "same_num_" + target_data(special_cov, "this_cov_is_");
                just_clear_yt_loop(the_name);
                setTimeout(() => {
                    let the_time = yt_resetter(e);
                    player.seekTo(the_time);
                    player.playVideo();
                    yt_loop_player(player, e, the_name);
                }, 1000)
            }
        }

        // dupブロックであるケースを配慮.
        if (special_cov.lastElementChild) {
            player = yt_player_getter(special_cov.lastElementChild);
            if (screen.classList.contains("edit")) {
                if (sp_cover.classList.contains("pausing")) {
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
    let sp_cover = vertical_to_sp_cover(e);
    
    function the_state(e) {
        let the_special_cov = which_special_is(e);
        let content = null;
        
        // 削除する前に same_start が右隣の場合にコンテントを一時的に same_startへ移してあげる.
        // そして再度 same_start が centering した時にその中身を取り除くようにする.
        if (the_special_cov) {
            if (the_special_cov.lastElementChild) {
                content = the_special_cov.lastElementChild.cloneNode(true);
                set("same_start_content", s => s = content);
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
            // たぶんここが pausing も playing も複数存在する可能性を加味してないんだと思う.
            if (sp_cover.classList.contains("pausing")) {
                if (player) {
                    if (which_special_is(the_target_left)) {
                        let the_name = "same_num_" + target_data(which_special_is(the_target_left), "this_cov_is_");
                        player.pauseVideo();
                        let the_time = yt_resetter(the_target_left);
                        player.seekTo(the_time);
                        yt_loop_stopper(player, "end", the_name);
                    }
                }
            }

            the_state(the_target_left);
            if (the_target_left.lastElementChild) {
                // here??
                if (! the_target_left.classList.contains("stable")) {
                    the_target_left.lastElementChild.style.setProperty('opacity', 1, 'important');
                }
                // test //
                // console.log(the_target_left);
            } 
        } else if (the_target_left.classList.contains("same_start")) {
            // 同 same_num を持つ same_start の content があれば削除.
            if (the_target_left.lastElementChild) {
                the_target_left.lastElementChild.style.setProperty('opacity', 0, 'important');
                let d = the_target_left.lastElementChild;
                d.remove();
                console.log(the_target_left.lastElementChild);
                console.log(the_target_left);
            }
        }
    }

    if (the_target_right) {
        if (the_target_right.classList.contains("same_start")) {
            player_setup(the_target_right);
            if (sp_cover.classList.contains("pausing")) {
                if (player) {
                    if (which_special_is(the_target_right)) {
                        let the_name = "same_num_" + target_data(which_special_is(the_target_right), "this_cov_is_");
                        player.pauseVideo();
                        let the_time = yt_resetter(the_target_right);
                        player.seekTo(the_time);
                        yt_loop_stopper(player, "start", the_name);
                    }
                }
            }
            // same_start に special_cov の content を一時的に複製して格納.
            the_state(the_target_right);
            if (the_target_right.lastElementChild) {
                the_target_right.lastElementChild.remove();
            }
            the_target_right.appendChild(get("same_start_content"));

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

    // ここに新しく「e.classList.contains("stable")」みたいなものを追加してはどうだろう？
    if (e.classList.contains("stable_end")) {
        // 削除するバージョン。
        if (which_special_is(e)) {
            let s = which_special_is(e);
            s.classList.add("stable_end");
        }
    } else {
        // 削除するバージョン。
        if (which_special_is(e)) {
            let s = which_special_is(e);
            s.classList.remove("stable_end");
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
            is_it_same_start(vers[centering_num]);
            is_it_same_alend(vers[centering_num]);
        }
    }
}

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
