// ---------- VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE 
// ---------- VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE 

import { half_left_width } from "../base/elements.js";
import { target_data, vertical_to_sp_cover, vertical_to_hor, classmover, same_data_getter, same_data_counter } from "../base/tools.js";

// *** ブロック内に iFrame を作成する関数, 引数に videoId と 挿入先のブロック
export const block_multiable = (e, f) => {

    // * さて、そろそろこの「player」についてまともに考えてもいい頃合いだが、いかがでしょうか。
    let the_box = document.getElementById(e).parentElement;
    // the_box.lastElementChild.remove();
    the_box.style.height = 225 + "px";

    var player;
    var duration_time;
        
    function onYouTubeIframeAPIReady(g, h) {

        window.YT.ready(function() {

            player = new window.YT.Player(g, {
                height: '225',
                width: '400',
                videoId: h,
                events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
                }
            });

        })

        // players_list.push(player);
        // console.log(player);
        // console.log(YT.Player);
        // console.log(players_list);
    }

    function onPlayerReady(event) {
        event.target.playVideo();
        duration_time = player.getDuration();
        console.log(duration_time);
        // * 初めて sessionStorage に頼った瞬間。
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
        player.stopVideo();
    }

    onYouTubeIframeAPIReady(e, f);

    // * 再生中じゃないといけないんだって！
    // let the_duration = duration_time;
    // console.log(the_duration);

    // duration を返してもらう.
    // return the_duration;
    return player;
}

// ---------- VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE 
// ---------- VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE VIDEOBASE 

// - * --------------------------------------------------------- 平常運転 --------------------------------------------------------------------------------------
// - * --------------------------------------------------------- 平常運転 --------------------------------------------------------------------------------------

// - * special_cov 関連.
// - * special_cov 関連.
// - * special_cov 関連.

// ** centering でも new_layer_centering でも実行するものたちです。
// !!! ***  same_alend から実行するようにする！！

// *** 特定のsp のセンターマイクに被せるようにぴっちりと special_cov を敷く
export const make_special_cov = (e, f) => {
    // *　問題はどうやって描画するかだよね。
    let special_cov = document.createElement("div");
    special_cov.style.position = "fixed";
    
    let bottom_distance = e.getBoundingClientRect().top + 10;
    let left_distance = half_left_width;
    
    special_cov.style.top = bottom_distance + "px";
    special_cov.style.left = left_distance + 10 + "px";

    let height_siz = e.clientHeight - 10;

    special_cov.style.width = 380 + "px";
    special_cov.style.height = height_siz + "px";

    let the_name = "this_cov_is_" + f;
    special_cov.classList.add("special_cov");
    special_cov.classList.add(the_name);

    let script_elem = document.getElementsByTagName('script')[0];
    script_elem.before(special_cov);

    return special_cov;
}

// ** 上下移動で削除されてもいい.a

// *** 左右上下の移動で使える、centering が same を持つか判定関数
export const is_it_same_start = (e) => {
    // special_cov の生成からコンテントの挿入まで.
    if (e.classList.contains("same")) {
        let the_num = target_data(e, "same_num_");
        
        function the_state() {
            let the_name = "same_num_" + the_num;
            let special_cov = make_special_cov(e, the_num);
            console.log(special_cov);
            let hit_target = document.getElementsByClassName(the_name)[document.getElementsByClassName(the_name).length - 1];

            let the_your_end = hit_target.cloneNode(true);
            
            //  editモード用に隠す.
            // hit_target.lastElementChild.style.opacity = 0;

            console.log(the_your_end);
            let the_one = the_your_end.lastElementChild.cloneNode(true);
            console.log(the_one);
            // let the_one = e.lastElementChild.cloneNode(true);
            // if (e.classList.contains("actuar_st")) {
            //     the_one.style.opacity = 0;
            // } 
            let spec = document.getElementsByClassName("this_cov_is_" + the_num)[0];
            spec.appendChild(the_one);
        }

        if (document.getElementsByClassName("this_cov_is_" + the_num)[0] == null) {
            the_state();
        }
    }
}

export const is_it_same_alend = (e) => {
    // * となりが same_endだったら.
    // special_cov の削除.
    function the_state(e) {
        let the_t = "same_num_" + target_data(e, "same_num_");
        let the_name = "this_cov_is_" + target_data(e, "same_num_");
        let the_special_cov = document.getElementsByClassName(the_name)[0];
        console.log(the_special_cov);
        if (the_special_cov) {
            the_special_cov.remove();
        }
        let hit_target = document.getElementsByClassName(the_t)[document.getElementsByClassName(the_t).length - 1];

        // 隠してきたものを戻す。
        // hit_target.lastElementChild.style.opacity = 1;
    }

    let the_target_left = e.previousElementSibling;
    let the_target_right = e.nextElementSibling;

    console.log(the_target_left);

    if (the_target_left) {
        if (the_target_left.classList.contains("same_end")) {
            the_state(the_target_left);
            console.log("www");
        }
    }

    if (the_target_right) {
        if (the_target_right.classList.contains("same_start")) {
            the_state(the_target_right);
        }
    }
}


// **** だいぶ綺麗にかけたんじゃない？？？
export const is_it_same_series = (e) => {
    
    let sp_cover = vertical_to_sp_cover(e);
    let sps= sp_cover.children;
    let centering_num = [].slice.call(vertical_to_hor(e).children).indexOf(e);
    
    for (let i = 0; i < sps.length; i++) {
        if (i == 0 && sps[0].classList.contains("orange_space")) {
            // orange_spaceが対象ってことになる
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


// ** sameの途中で切っちゃった場合に対処する関数
export const same_cutter = (e, f) => {
    // * もしかして　その前の要素に end ,その次の要素にstart をつけたら済む話なのかもしかして？？
    // * 両サイドがsameであることが条件で、かつ両者が start , end は持たない場合にのみ実行する。
    let the_target_left = e.previousElementSibling;
    let the_target_right;

    if (f == "addon") {
        the_target_right = e.nextElementSibling;
    } else if (f == "replace") {
        the_target_right = e;
    }
    if (the_target_left && the_target_right) {
        console.log(the_target_left);
        console.log(the_target_right);
        console.log("nanana");
        if (the_target_left.classList.contains("same") && the_target_right.classList.contains("same")) {
            console.log("nanana");
            if (the_target_left.classList.contains("same_start") == false && the_target_left.classList.contains("same_end") == false && the_target_right.classList.contains("same_start") == false && the_target_right.classList.contains("same_end") == false) {
                
                let spe_cont = document.querySelector(".special_cov").lastElementChild;
                console.log("nanana");
                the_target_left.classList.add("same_end");
                
                // * 特徴的
                the_target_left.appendChild(spe_cont);
                the_target_right.classList.add("same_start");

                let same_name = "same_num_" + target_data(the_target_right, "same_num_");

                console.log(same_name);

                // * same_start　以降の same_num_ を更新せなあかんやんか。
                let sames = document.getElementsByClassName(same_name);
                let breakpoint = [].slice.call(sames).indexOf(the_target_right);
                console.log(breakpoint);
                
                let same_data = same_data_getter();
                same_data += 1;
                same_data_counter(same_data);
                
                for (let i = sames.length - 1; i >= breakpoint; i--) {
                    let same_block = sames[i];
                    classmover(same_block, same_block, "same_num_", "remove");
                    same_block.classList.add("same_num_" + same_data);
                    console.log(same_block);
                }
            }

            // same_startの上でこれやられたらまた違う対処になるんか？？？
        }
    }
}


// *** 直してね！

// **** 画像のアップロードできるようにするぞぉおおおおおおおおお！！！！

export const make_it_img = (e, m) => {
    const input = document.createElement("input");
    const label = document.createElement("label");

    input.setAttribute("type", "file")

    let inputs = document.getElementsByClassName("sp").length;
    
    input.id = "media_input" + inputs;
    input.classList.add("thisisinput" + inputs);
    
    label.setAttribute("for", input.id);
    // input.style.display = "none";
    
    label.appendChild(input);
    
    let multi_fragment = document.createDocumentFragment();
    multi_fragment.append(label);

    // 当初の textarea をリプレース。
    e.lastElementChild.remove();
    e.appendChild(multi_fragment);

    e.style.height = 225 +  "px";
    
    // set the media type.
    if (m == "image") {
        input.setAttribute("accept", ".jpg, .jpeg, .png")
        label.classList.add("image_input");
        // next action
        console.log(input);
        
        console.log(e);

        const uploaded_multi_media = document.createElement("img");
        uploaded_multi_media.classList.add("styling_0_0_1_1");
        let multi_one_fragment = document.createDocumentFragment();
        multi_one_fragment.append(uploaded_multi_media);

        e.appendChild(multi_one_fragment);
        
        input.addEventListener("change", function(o) {
            console.log(input);
            // 選択されたファイルの内容を代入
            var file = o.target.files;
            // FileReaderクラスをインスタンス化し、ファイル出力の準備をする
            var reader = new FileReader()
            // ファイルオブジェクトの一番最初のファイルのローカルURLを読み取り、それをreaderインスタンスのresultプロパティにセット
            reader.readAsDataURL(file[0])
            //読み取り終了後、読み取ったローカルURLをimgタグのsrc属性に代入する。

            reader.onload = function() {

                label.remove();
                uploaded_multi_media.src = reader.result;
                // 次のボックスの追加、focus()までを自動化したい.
                // make_fragment(screen);
                // var textarea = screen.lastElementChild.lastElementChild.lastElementChild.lastElementChild;
                // textarea.focus();
            }
        }, false);
    } 
};