// * YT ID から YT Iframe を作成する関数.
export const  onYouTubeIframeAPIReady = (g, h) => {
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

// * YT Iframe が再生可能状態になった際に実行される関数.
export const onPlayerReady = (event) => {
    event.target.mute();
    event.target.playVideo();
    duration_time = player.getDuration();
    // * 時間差の存在を考慮してsessionStorageを唯一この箇所で利用.
    sessionStorage.removeItem("the_duration");
    sessionStorage.setItem("the_duration", duration_time);
    return duration_time;
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