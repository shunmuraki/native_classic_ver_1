// * Native 上で UM が開かれた状態で command + ArrowLeft が押された際に実行される関数.
// * UM 上で左に移動する.
export const keytouch_um_command_arrow_left = () => {

    let um_centered_block = element(".um_centered_block");
    let um_scope = um_centered_block.parentElement;
    var video_list = element(".um_video");
    var audio_list = element(".um_audio");

    element(".default_display").classList.add("um_ready");
    if (element(".um_audio_edge_block").classList.contains("um_centered_block")) {
        // * videoゾーンとaudioゾーンの切り替え.
        um_switch_to_videozone();
    }  else {
        // * 今の所属しているスコープを引数に渡して、隣の場所に移ったりスクロールする.
        if (um_scope.classList.contains("um_video")) {
            if (um_centered_block.previousElementSibling) {
                if (! um_centered_block.previousElementSibling.classList.contains("um_adjuster")) {
                    video_list.scrollLeft -= blocksize;
                    um_centered_block.classList.remove("um_centered_block");
                    um_centered_block.previousElementSibling.classList.add("um_centered_block");
                }
            }
        } else if (um_scope.classList.contains("um_audio")){
            if (um_centered_block.nextElementSibling) {
                if (! um_centered_block.nextElementSibling.classList.contains("um_adjuster")) {
                    audio_list.scrollLeft -= blocksize;
                    um_centered_block.classList.remove("um_centered_block");
                    um_centered_block.nextElementSibling.classList.add("um_centered_block");
                }
            }
        } 
    }
}

// * Native 上で UM が開かれた状態で command + ArrowRight が押された際に実行されるキータッチ関数.
// * UM 上で右に移動する.
export const keytouch_um_command_arrow_right = () => {
    
    let um_centered_block = document.querySelector(".um_centered_block");
    let um_scope = um_centered_block.parentElement;

    var video_list = document.querySelector(".um_video");
    var audio_list = document.querySelector(".um_audio");

    element(".default_display").classList.add("um_ready");
    if (element(".um_video_edge_block").classList.contains("um_centered_block")) {
        // * videoゾーンとaudioゾーンの切り替え.
        um_switch_to_audiozone();
    } else {
        // * 所属していたのが 「img」[video][audio] で条件分岐して、それぞれで無効にしたり移動をする.
        if (um_scope.classList.contains("um_audio")) {
            if (um_centered_block.previousElementSibling) {
                if (! um_centered_block.previousElementSibling.classList.contains("um_adjuster")) {
                    audio_list.scrollLeft += blocksize;
                    um_centered_block.classList.remove("um_centered_block");
                    um_centered_block.previousElementSibling.classList.add("um_centered_block");
                }
            }
        } else if (um_scope.classList.contains("um_video")){
            if (um_centered_block.nextElementSibling) {
                if (! um_centered_block.nextElementSibling.classList.contains("um_adjuster")) {
                    video_list.scrollLeft += blocksize;
                    um_centered_block.classList.remove("um_centered_block");
                    um_centered_block.nextElementSibling.classList.add("um_centered_block");
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
    let um_centered_block = document.querySelector(".um_centered_block");
    if (um_centered_block.parentElement.classList.contains("um_video")) {
        let yt_id = value(um_centered_block, "this_yt_id_");
        load_player_as_block(yt_id, env.block.lastElementChild);
    } else {
        let new_elm = um_centered_block.lastElementChild.cloneNode(true);
        env.block.lastElementChild.remove();
        env.block.appendChild(new_elm);
        env.block.style.height = 225 + "px";
    }
    element(".um_display").style.display = "none";
    element(".default_display").classList.remove("um");
    element(".default_display").classList.remove("um_ready");
    env.block.style.opacity = 1;
}