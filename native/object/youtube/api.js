// * YT ID から YT Iframe を作成する関数.
export const  onYouTubeIframeAPIReady = (block, yt_id) => {
    window.YT.ready(function() {
        player = new window.YT.Player(block, {
            width: blocksize,
            height: '202.5',
            videoId: yt_id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    })
}

// * YT Iframe が再生可能状態になった際に実行される関数.
export const onPlayerReady = (event) => {
    event.target.mute();
    event.target.playVideo();
    duration = player.getDuration();
    // * 時間差の存在を考慮してsessionStorageを唯一この箇所で利用.
    // * うーん、なるべく作りたくないーー。
    sessionStorage.removeItem("the_duration");
    sessionStorage.setItem("the_duration", duration);
    return duration;
}

// var done = false;
// * YT Iframe の状態が 再生 に変わった時点で実行される関.
export const onPlayerStateChange = (event) => {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 100);
        done = true;
    }
}

// * YT PLAYER API
function stopVideo() {
    player.pauseVideo();
}