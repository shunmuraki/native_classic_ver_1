import { same_data_counter } from "../base/tools.js";
import { make_it_img } from "./function.js";
import { video_load_then } from "./extends.js";

window.addEventListener("keydown", (e) => {
    let k = e.key;

    let current;
    let type_signiture;
    
    if (document.activeElement.tagName != "BODY") {
        current = document.activeElement;
        type_signiture = current.value;
    } 

    if (type_signiture)  {
        // もし YouTubeの動画のURLがペーストされていたら.
        if ( type_signiture.indexOf('youtube.com') != -1) {
            video_load_then(type_signiture, current);
        }

        if ( type_signiture.indexOf('image') != -1) {
            document.querySelector(".ms_area").remove();
            make_it_img(document.querySelector(".centering"), "image");
            if (document.querySelector(".centering").lastElementChild == "TEXTAREA") {
                document.querySelector(".centering").lastElementChild.focus();
            }
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
