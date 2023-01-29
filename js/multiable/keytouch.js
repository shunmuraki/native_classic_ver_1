import { same_data_counter } from "../base/tools.js";
import { make_it_img } from "./function.js";
import { video_load_then } from "./extends.js";
import { adjust_box, focus_checker } from "../base/function.js";

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
            adjust_box(document.querySelector(".centering"));
        }

        if ( type_signiture.indexOf('imag') != -1) {
            document.querySelector(".ms_area").remove();
            make_it_img(document.querySelector(".centering"), "image");
            focus_checker(document.querySelector(".centering"));        
            adjust_box(document.querySelector(".centering"));
        }
    }
    
    if(e.metaKey) {
        if (k == "e") {
            if (players_list.length > 0) {
                players_list[1].playVideo();
            }
        }
    }
})
