// ブロック内に iFrame を作成する関数, 引数に videoId と 挿入先のブロック
export const block_multiable = (e, f, z) => {
    
    let the_box = document.getElementById(e).parentElement;
    let the_related_name = "yt_num_" + z;
    the_box.classList.add(the_related_name);
    let player;
    let the_video_height = window.innerHeight * 0.98;
    let the_video_width = (the_video_height / 9) * 16;
    
    function onYouTubeIframeAPIReady(g, h) {
        player = new YT.Player(g, {
            width: the_video_width,
            height: the_video_height,
            playerVars: { 'controls': 0 },
            videoId: h,
            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            }
        });
    }

    function onPlayerReady(event) {
        event.target.mute();
        event.target.playVideo();
    }

    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(pauseVideo, 5000);
            done = true;
        }
    }

    function pauseVideo() {
        player.pauseVideo();
        player.seekTo(0);
    }

    onYouTubeIframeAPIReady(e, f);
    return player;
    
}