// *** ブロック内に iFrame を作成する関数, 引数に videoId と 挿入先のブロック
export const block_multiable = (e, f, z) => {

    // * さて、そろそろこの「player」についてまともに考えてもいい頃合いだが、いかがでしょうか。
    let the_box = document.getElementById(e).parentElement;
    // the_box.lastElementChild.remove();
    // the_box.style.height = 225 + "px";
    let the_related_name = "yt_num_" + z;
    the_box.classList.add(the_related_name);

    var player;
    var duration_time;
        
    function onYouTubeIframeAPIReady(g, h) {
        player = new YT.Player(g, {
            width: '500',
            height: '300',
            playerVars: { 'controls': 0 },
            videoId: h,
            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(pauseVideo, 10000);
            done = true;
        }
    }

    function pauseVideo() {
        player.pauseVideo();
        player.seekTo(0);
        console.log("loaded!");
    }

    onYouTubeIframeAPIReady(e, f);
    return player;
}