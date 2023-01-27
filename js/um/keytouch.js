import { target_data } from "../base/tools.js";
import { video_load_then } from "../multiable/extends.js";
import { video_street_scroll, audio_street_scroll, um_positioning } from "./function.js";

let screen = document.querySelector(".screen");
let um = document.querySelector(".um_display");
um.style.display = "none";

document.addEventListener("keydown", (e) => {
    
    let current = document.activeElement;
    let k = e.key;
    let type_signiture;
    
    if (current.tagName == "TEXTAREA") {
        type_signiture = current.value;

        // 以下ユニバーサルマークダウン機能の例として「"ted"」が検索された場合の処理.
        if ( type_signiture.indexOf('ted') != -1) {
            document.querySelector(".ms_area").remove();
            if (document.querySelector(".centering").lastElementChild == "TEXTAREA") {
                document.querySelector(".centering").lastElementChild.focus();
            }
            screen.classList.add("um");
            current.value = '';
            document.querySelector(".centering").style.height = 225 + "px";
            current.blur();
            um.style.display = "block";
            um_positioning();
            screen.classList.remove("um_ready");
        }
    }

    if (screen.classList.contains("um")) {

        if (k == "Escape") {
            um.style.display = "none";
            let centering = document.querySelector(".centering");
            if (centering.lastElementChild.tagName == "TEXTAREA") {
                centering.lastElementChild.focus();
            }
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
                if (audio_null.classList.contains("um_centering")) {
                    // videoゾーンとaudioゾーンの切り替え.
                    video_street_scroll();
                }  else {
                    // [全共通！！！] 今の所属しているスコープを引数に渡して、隣の場所に移ったりスクロールする.
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
                                the_um_current.classList.remove("um_centering");
                                the_um_current.nextElementSibling.classList.add("um_centering");
                            }
                        }
                    } 
                }
            }

            if (k == "ArrowRight") {
                screen.classList.add("um_ready");
                if (video_null.classList.contains("um_centering")) {
                    // videoゾーンとaudioゾーンの切り替え.
                    audio_street_scroll();
                } else {
                    // 所属していたのが「img」[video][audio]で条件分岐して、それぞれで無効にしたり、移動をしたりする.
                    if (the_now_parent.classList.contains("um_audio")) {
                        if (the_um_current.previousElementSibling) {
                            if (! the_um_current.previousElementSibling.classList.contains("panc")) {
                                audio_list.scrollLeft += 400;
                                the_um_current.classList.remove("um_centering");
                                the_um_current.previousElementSibling.classList.add("um_centering");
                            }
                        }
                    } else if (the_now_parent.classList.contains("um_video")){
                        if (the_um_current.nextElementSibling) {
                            if (! the_um_current.nextElementSibling.classList.contains("panc")) {
                                video_list.scrollLeft += 400;
                                the_um_current.classList.remove("um_centering");
                                the_um_current.nextElementSibling.classList.add("um_centering");
                            }
                        }
                    } 
                }
            } 
        }        
    }

    if (screen.classList.contains("um_ready")) {

        // UMレイヤーに並んだ画像や動画のどれかが選択された際の処理.
        if (k == "Enter") { 
            let native_center = document.querySelector(".centering");    
            let um_centering = document.querySelector(".um_centering");
            console.log(um_centering);

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
        }
    }
});