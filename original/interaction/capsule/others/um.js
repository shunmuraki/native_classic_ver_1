// * マークダウンスペースにキーワードが入力された状態で Enter が押された際に実行されるキータッチ関数.
// * UM を表示する. 
export const keytouch_um_setup = () => {
    if (screen.classList.contains("ms")) {
        let env = keytouch_setup();
        let centering;    
        centering = document.querySelector(".centering");
        document.querySelector(".ms_area").remove();
        focus_checker(centering);
        screen.classList.add("um");
        env.current.value = '';
        um.style.display = "block";
        centering.style.height = 225 + "px";
        current.blur();
        centering.style.opacity = 0;
        screen.classList.remove("um_ready");
        adjust_box(centering);
        um_positioning();
    }
}

// ---------------------------------------------------------------------------------------------------------------

// * Native 上で UM が開かれた状態で command + ArrowLeft が押された際に実行される関数.
// * UM 上で左に移動する.
export const keytouch_um_command_arrow_left = () => {
    let env = keytouch_setup();
    let centering;
    let the_um_current = document.querySelector(".um_centering");
    let the_now_parent = the_um_current.parentElement;
    var video_list = document.querySelector(".um_video");
    var audio_list = document.querySelector(".um_audio");
    var video_null = video_list.lastElementChild;
    var audio_null = audio_list.lastElementChild;
    screen.classList.add("um_ready");
    if (audio_null.classList.contains("um_centering")) {
        // * videoゾーンとaudioゾーンの切り替え.
        video_street_scroll();
    }  else {
        // * 今の所属しているスコープを引数に渡して、隣の場所に移ったりスクロールする.
        if (the_now_parent.classList.contains("um_video")) {
            if (the_um_current.previousElementSibling) {
                if (! the_um_current.previousElementSibling.classList.contains("panc")) {
                    video_list.scrollLeft -= blocksize;
                    the_um_current.classList.remove("um_centering");
                    the_um_current.previousElementSibling.classList.add("um_centering");
                }
            }
        } else if (the_now_parent.classList.contains("um_audio")){
            if (the_um_current.nextElementSibling) {
                if (! the_um_current.nextElementSibling.classList.contains("panc")) {
                    audio_list.scrollLeft -= blocksize;
                    the_um_current.classList.remove("um_centering");
                    the_um_current.nextElementSibling.classList.add("um_centering");
                }
            }
        } 
    }
}

// * Native 上で UM が開かれた状態で command + ArrowRight が押された際に実行されるキータッチ関数.
// * UM 上で右に移動する.
export const keytouch_um_command_arrow_right = () => {
    let env = keytouch_setup();
    let centering;
    let the_um_current = document.querySelector(".um_centering");
    let the_now_parent = the_um_current.parentElement;
    var video_list = document.querySelector(".um_video");
    var audio_list = document.querySelector(".um_audio");
    var video_null = video_list.lastElementChild;
    var audio_null = audio_list.lastElementChild;
    screen.classList.add("um_ready");
    if (video_null.classList.contains("um_centering")) {
        // * videoゾーンとaudioゾーンの切り替え.
        audio_street_scroll();
    } else {
        // * 所属していたのが 「img」[video][audio] で条件分岐して、それぞれで無効にしたり移動をする.
        if (the_now_parent.classList.contains("um_audio")) {
            if (the_um_current.previousElementSibling) {
                if (! the_um_current.previousElementSibling.classList.contains("panc")) {
                    audio_list.scrollLeft += blocksize;
                    the_um_current.classList.remove("um_centering");
                    the_um_current.previousElementSibling.classList.add("um_centering");
                }
            }
        } else if (the_now_parent.classList.contains("um_video")){
            if (the_um_current.nextElementSibling) {
                if (! the_um_current.nextElementSibling.classList.contains("panc")) {
                    video_list.scrollLeft += blocksize;
                    the_um_current.classList.remove("um_centering");
                    the_um_current.nextElementSibling.classList.add("um_centering");
                }
            }
        } 
    }
}

// * Native 上で UM が開かれた状態で Enter が押された際に実行される関数.
// * UM 上で選択中のブロックの中身をデフォルトレイヤーのブロックに取り込んだり、
// * 選択した YT動画 をブロックに展開する.
export const keytouch_um_command_enter = () => {
    let env = keytouch_setup();
    let centering;
    let native_center = document.querySelector(".centering");    
    let um_centering = document.querySelector(".um_centering");

    if (um_centering.parentElement.classList.contains("um_video")) {
        let the_uri = target_data(um_centering, "this_yt_id_");
        video_load_then(the_uri, native_center.lastElementChild);
    } else {
        let new_elm = um_centering.lastElementChild.cloneNode(true);
        native_center.lastElementChild.remove();
        native_center.appendChild(new_elm);
        native_center.style.height = 225 + "px";
    }
    um.style.display = "none";
    screen.classList.remove("um");
    screen.classList.remove("um_ready");
    native_center.style.opacity = 1;
}

// ---------------------------------------------------------------------------------------------------------------

// * Native 上で UM が開かれた状態で Escape が押された際に実行される関数.
// * UM を閉じる.
export const keytouch_um_command_escape = () => {
    let env = keytouch_setup();
    let centering;
    e.preventDefault();
    um.style.display = "none";
    centering = document.querySelector(".centering");
    focus_checker(centering);        
    screen.classList.remove("um");
    screen.classList.remove("um_ready");
    centering.style.opacity = 1;
}
