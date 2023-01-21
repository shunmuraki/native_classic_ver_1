import { target_data } from "../base/tools.js";
import { video_load_then } from "../multiable/extends.js";
import { video_street_scroll, audio_street_scroll } from "./function.js";

// * これは別のイベントにする必要があるやろ。
let screen = document.querySelector(".screen");
let um = document.querySelector(".um_display");

um.style.display = "none";

// * etc → （そもそもの編集モードを止める)　wheelを消す。
document.addEventListener("keydown", (e) => {
    
    let current = document.activeElement;
    let k = e.key;
    let type_signiture;
    
    if (current.tagName == "TEXTAREA") {
        type_signiture = current.value;

        if ( type_signiture.indexOf('ted') != -1) {

            document.querySelector(".ms_area").remove();
            if (document.querySelector(".centering").lastElementChild == "TEXTAREA") {
                document.querySelector(".centering").lastElementChild.focus();
            }
            
            screen.classList.add("um");
            console.log(type_signiture);
            current.value = current.value.slice(0, -4);
            current.blur();

            // * 随所に存在するted 群をblock（ループ）
            um.style.display = "block";
        }
    }

    // screen に um クラスを付与した上で。

    if (screen.classList.contains("um")) {

        if (k == "Escape") {
            wheel.style.display = "none";
            // * focusを返す
            let centering = document.querySelector(".centering");
            centering.lastElementChild.focus();
    
            // um クラスを除去
            screen.classList.remove("um");
        }
    
        let the_um_current = document.querySelector(".um_centering");
        let the_now_parent = the_um_current.parentElement;

        if(e.shiftKey) {

            var video_list = document.querySelector(".um_video");
            var audio_list = document.querySelector(".um_audio");

            var video_null = video_list.lastElementChild;
            var audio_null = audio_list.lastElementChild;
                
            if (k == "ArrowLeft") {
                screen.classList.add("um_ready");
                // 上下左右で押されたときに、最低限の条件分岐。
                if (audio_null.classList.contains("um_centering")) {
                    // 切り替えポイント？
                    // image_street_scroll();
                    video_street_scroll();
                }  else {
                    // [全共通！！！] 今の所属しているスコープを引数に渡して、隣の場所に移ったりスクロールする。基本は他のところからパクれるでしょう。全共通。
                    if (the_now_parent.classList.contains("um_video")) {

                        if (the_um_current.previousElementSibling) {

                            if (! the_um_current.previousElementSibling.classList.contains("panc")) {
                                video_list.scrollLeft -= 400;
                                the_um_current.classList.remove("um_centering");
                                the_um_current.previousElementSibling.classList.add("um_centering");
                            }
                        }
                    } else if (the_now_parent.classList.contains("um_audio")){

                        if (the_um_current.nextElementSibling) {
                            if (! the_um_current.nextElementSibling.classList.contains("panc")) {
                                audio_list.scrollLeft -= 400;
                                // ひっくり返ってるかも。
                                the_um_current.classList.remove("um_centering");
                                the_um_current.nextElementSibling.classList.add("um_centering");
                            }
                        }
                    } else {
                        // 無効の処理。
                    }
                }
            }

            if (k == "ArrowRight") {
                screen.classList.add("um_ready");
                // 上下左右で押されたときに、最低限の条件分岐。
                if (video_null.classList.contains("um_centering")) {
                    // 切り替えポイント？
                    audio_street_scroll();
                } else {
                    // 所属していたのが「img」[video][audio]で条件分岐して、それぞれで無効にしたり、移動をしたりする。
                    if (the_now_parent.classList.contains("um_audio")) {
                        if (the_um_current.previousElementSibling) {
                            if (! the_um_current.previousElementSibling.classList.contains("panc")) {
                                audio_list.scrollLeft += 400;
                                the_um_current.classList.remove("um_centering");
                                console.log(the_um_current);
                                console.log(the_um_current.previousElementSibling);
                                the_um_current.previousElementSibling.classList.add("um_centering");
                            }
                        }
                    } else if (the_now_parent.classList.contains("um_video")){

                        if (the_um_current.nextElementSibling) {

                            if (! the_um_current.nextElementSibling.classList.contains("panc")) {
                                video_list.scrollLeft += 400;
                                // ひっくり返ってるかも。
                                console.log(the_um_current);
                                the_um_current.classList.remove("um_centering");
                                the_um_current.nextElementSibling.classList.add("um_centering");
                            }
                        }
                    } else {
                        // 無効の処理。
                    }
                }
            } 
        }        
    }

    if (screen.classList.contains("um_ready")) {
        // * なぜか UM がクラスとして挿入される前の時点でもenter が実行されてしまう。// 上下を変えたらいいのかしら
    
        if (k == "Enter") { 
            let native_center = document.querySelector(".centering");
    
            let um_centering = document.querySelector(".um_centering");
            console.log(um_centering);

            if (um_centering.lastElementChild.tagName == "IFRAME") {
                // どうやっても多分アクセス違反になるそうなので、別の方法を遠回りではあるが考える必要がある。
                let the_uri = target_data(um_centering, "this_yt_id_");
                // console.log("現在のiframeのURLは", url);
                console.log(the_uri);
                // ** multi の keytouch と同じことをするだけ。話はシンプルなのに”感じ”で難しく受け止めようとするな.
                video_load_then(the_uri, native_center.lastElementChild);
            } else {
                let new_elm = um_centering.lastElementChild.cloneNode(true);
                native_center.lastElementChild.remove();
                native_center.appendChild(new_elm);
                native_center.style.height = 225 + "px";
            }
            
    
            // um モード自体を終了しておく。
            um.style.display = "none";
    
            // um クラスを除去
            screen.classList.remove("um");
    
        }
    }
});