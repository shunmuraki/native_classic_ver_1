import { adjust_box, focus_checker } from "../function/general.js";
import { video_load_then, make_it_img } from "../function/multi.js";
import { screen } from "../data/constant.js";


window.addEventListener("keydown", (e) => {
    
    let current;
    let type_signiture;
    
    if (document.activeElement.tagName != "BODY") {
        current = document.activeElement;
        type_signiture = current.value;
    } 

    if (type_signiture)  {
        // 以下YouTubeの動画のURLがペーストされた場合の処理.
        if ( type_signiture.indexOf('youtube.com') != -1) {
            video_load_then(type_signiture, current);
            let centering = document.querySelector(".centering");
            adjust_box(centering);
            screen.classList.remove("ms");
        }
        if ( type_signiture.indexOf('imag') != -1) {
            if (screen.classList.contains("ms")) {
                document.querySelector(".ms_area").remove();
                make_it_img(document.querySelector(".centering"), "image");
                focus_checker(document.querySelector(".centering"));        
                adjust_box(document.querySelector(".centering"));
                screen.classList.remove("ms");
            }
        }
    }
})