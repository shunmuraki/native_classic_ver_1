// 仮で儲けている "TED" に関する動画のyt-ID のリスト. α版ならでは.
let yt_videolist_ted = ["441nwncPN28", "YddEiDSuOrY", "OlgcaYAO5VM", "5cbCYwgQkTE", "j-rw3x8VZxA", "abF_EfprTIE", "9XGm_uHit5g", "uEATpbQ9md4", "KYK6Tfb0snQ", "mYS2CcIdW1M"];

let the_video_width = blocksize * 10;
video_list.scrollLeft = the_video_width;

let the_audio_width = - blocksize * 10;
audio_list.scrollLeft = the_audio_width;

let video_list = document.querySelector(".um_video");
let audio_list = document.querySelector(".um_audio");
let video_null = video_list.lastElementChild;
let audio_null = audio_list.lastElementChild;

// UMレイヤーに yt iframe を流し込む.
for (let i = 0; i < 10; i++) {
  let the_id = String(yt_videolist_ted[i]);
  let container = document.createElement("div");
  container.classList.add("box");
  let inner = document.createElement("img");
  // サムネイルだけを読み込む.
  let the_srccode = 'http://img.youtube.com/vi/' + the_id + '/maxresdefault.jpg';
  inner.src = the_srccode;
  container.appendChild(inner);
  container.classList.add("this_yt_id_" + yt_videolist_ted[i]);
  let video_panc = document.querySelector(".video_panc");
  video_panc.after(container);
}

// UMレイヤーに画像を流し込む.
for (let i = 0; i < 10; i++) {
  let container = document.createElement("div");
  container.classList.add("box");
  let inner = document.createElement("img");
  inner.classList.add("style_1_1_1_1");
  inner.src = "img/ted_" + i + ".png";
  container.appendChild(inner);
  let audio_panc = document.querySelector(".audio_panc");
  audio_panc.after(container);
}

// デフォルトの設定.
audio_list.lastElementChild.classList.add("um_centering");

// 以下デフォルトのスクロール位置の調整。
let video_list_scrollwidth = video_list.scrollWidth;
let audio_list_scrollwidth = audio_list.scrollWidth;
video_list.scrollLeft = video_list_scrollwidth - half_left_width;
audio_list.scrollLeft = - audio_list_scrollwidth;