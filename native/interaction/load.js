window.onload = () => {
    // * 以下 Native を開いて最初に走る処理.
    let dummy = document.createElement("div");
    dummy.classList.add("first_load_dummy");
    element(".default_display").appendChild(dummy);
    
    // * 以下Native のパーツの初期の表示位置の調整.
    element(".um_display").style.display = "none";
    $(function() {
        $('html,body').animate({ scrollTop: window_height - 200 }, {duration: 0});
        setTimeout(() => {
            wheel_positioning();
        }, 100)
    });
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
};

// ---------------------------------------------------------------------------------------------------------------

(function () {
    let all_writearea = document.getElementsByClassName("write_area");
    if (! sessionStorage.getItem("output")) {
        // * 以下通常のリロードに対応する処理.
        let d = document.querySelector(".first_load_dummy");
        make_fragment(d, "after");
        d.remove();
        // * 最初のcenteringを用意.
        all_writearea[0].parentElement.classList.add("centered_block");
        all_writearea[0].focus();
    }
}());

// ---------------------------------------------------------------------------------------------------------------

// * 仮で儲けている "TED" に関する動画のyt-ID のリスト. 
// * α版の名残.
// [* やめたい.] 
let yt_videolist_ted = ["441nwncPN28", "YddEiDSuOrY", "OlgcaYAO5VM", "5cbCYwgQkTE", "j-rw3x8VZxA", "abF_EfprTIE", "9XGm_uHit5g", "uEATpbQ9md4", "KYK6Tfb0snQ", "mYS2CcIdW1M"];

let the_video_width = blocksize * 10;
video_list.scrollLeft = the_video_width;

let the_audio_width = - blocksize * 10;
audio_list.scrollLeft = the_audio_width;

let video_list = document.querySelector(".um_video");
let audio_list = document.querySelector(".um_audio");

let video_null = video_list.lastElementChild;
let audio_null = audio_list.lastElementChild;

// * UMレイヤーに yt iframe を流し込む.
for (let i = 0; i < 10; i++) {
  let the_id = String(yt_videolist_ted[i]);
  let container = document.createElement("div");
  container.classList.add("box");
  let inner = document.createElement("img");
  // * サムネイルだけを読み込む.
  let the_srccode = 'http://img.youtube.com/vi/' + the_id + '/maxresdefault.jpg';
  inner.src = the_srccode;
  container.appendChild(inner);
  container.classList.add("this_yt_id_" + yt_videolist_ted[i]);
  let video_edge = document.querySelector(".um_video_edge_block");
  video_edge.after(container);
}

// * UMレイヤーに画像を流し込む.
for (let i = 0; i < 10; i++) {
  let container = document.createElement("div");
  container.classList.add("box");
  let inner = document.createElement("img"); 
  inner.src = "img/ted_" + i + ".png";
  container.appendChild(inner);
  let audio_edge = document.querySelector(".audio_edge");
  audio_edge.after(container);
}

// * デフォルトの設定.
audio_list.lastElementChild.classList.add("um_centered_block");

// * 以下デフォルトのスクロール位置の調整。
let video_list_scrollwidth = video_list.scrollWidth;
let audio_list_scrollwidth = audio_list.scrollWidth;
video_list.scrollLeft = video_list_scrollwidth - half_left_width;
audio_list.scrollLeft = - audio_list_scrollwidth;

// ---------------------------------------------------------------------------------------------------------------

// * Native のステータスバーにあるオプションすべてにインタラクティブなアニメーション機能を追加.
let els = document.querySelectorAll(".option");
for (let i = 0; i < els.length; i++) {
    els[i].addEventListener("click", () => {
        statusbar_animation(els[i]);
    })
}