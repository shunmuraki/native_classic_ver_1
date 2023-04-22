import { screen } from "../base/elements.js";
import { adjust_box } from "../base/function.js";
import { video_load_then } from "../base/multifuncs.js";
import { make_it_img } from "../base/multifuncs.js";
import { focus_checker } from "../base/function.js";

window.addEventListener("keydown", (e) => {
    
    let k = e.key;
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
