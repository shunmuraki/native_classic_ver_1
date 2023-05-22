// * animation について actuar を考慮して trigger_when | finish_when | video_startpoint を更新する関数.
export const ac_vi_adaptation = (e, f, g) => {
    
    let classlist = e.classList;
    let animation = f;

    if (e.classList.contains("same_end")) {
        // * 秒数に変換. (blocksize = 360)
        let act_num = 5 * (Math.floor(Number(target_data(e, "actuar_time_"))) / 360);
        // [* floor → trunc にした方が正しいか.]
        act_num = Math.floor(act_num);

        for (let i = 0; i < classlist.length; i++) {
            let classname = classlist[i];
            // * actuar を video_startpoint に反映.
            if (classname.indexOf("this_video_st_") != -1) {
                if (g == "active_st") {
                    animation["video_startpoint"] = Math.floor(Number(target_data(e, "this_video_st_")));
                }
            }
            // * acutuar を finish_when に反映.
            if (classname.indexOf("actuar_time_") != -1) {
                animation["finish_when"] = animation["finish_when"] - act_num + 5; 
            } 
        }
    }
    if (e.classList.contains("same_start")) {
        // * 秒数に変換. (blocksize = 360)
        let act_num = 5 * (Math.floor(Number(target_data(e, "actuar_time_"))) / 360);
        // [* floor → trunc にした方が正しいか.]
        act_num = Math.floor(act_num);

        for (let i = 0; i < classlist.length; i++) {
            let classname = classlist[i];
            if (classname.indexOf("actuar_st") != -1) {
                // * actuar を trigger_when に反映.
                animation["trigger_when"] = animation["trigger_when"] + act_num;
                if (g == "active_st") {
                    // * actuar を video_startpoint にも反映.
                    animation["video_startpoint"] = animation["video_startpoint"] + act_num;
                }
            } 
        }
    }
    return animation;
}

// * Linear において YouTubeの動画ID から YTプレイヤー(iframe) を生成するための仮置きのdiv要素を挿入する関数.
export const iframe_adaptation = (e) => {
    let the_content = e.lastElementChild;
    let value_id = target_data(e, "id_is_");
    set("yt_id_list", s => s.push(value_id));
    let the_name = "yt_" + String(get("yt_id_list").length - 1);
    // * same_end 同士見つけあってDOMを節約するために発見用のidをクラスに付与する.
    // * 同一の YouTube の動画がいくつかの same群　に分割されているケースを考慮し、
    // * 登録する ID は唯ひとつに留め、また同一ライン上に複数存在する same_end については
    // * 最後のひとつだけを残すよう、 same_deletable クラスをそれ以外に付与して予防線を張る.
    e.classList.add("iframe");
    e.classList.add("same_deletable");
    e.classList.add("same_id_" + value_id);
    let newElement = document.createElement("div");
    newElement.setAttribute("id", the_name); 
    the_content.remove();
    e.appendChild(newElement);
    return e;
}

// * <textarea> を <p> で置き換える関数.
export const textarea_adaptation = (e) => {
    let the_content = e.lastElementChild;
    if (the_content) {
        if  (the_content.tagName == "TEXTAREA") {
            let newElement;
            let the_value = the_content.value;
            newElement = document.createElement("p");        
            classmover(the_content, newElement, "style_", "add");
            newElement.innerText = String(the_value);
            the_content.remove();
            e.appendChild(newElement);
        }
    }
}

// * imgタグの親要素にクラス("img", "img_v")を付与する関数.
export const img_adaptation = (e) => {
    let the_content = e.lastElementChild;
    if (the_content) {
        if (the_content.tagName == "IMG") {
            e.classList.add("img");
            // [* img_v クラスは何に役立っているのだろう.]
            e.classList.add("img_v");
        }
    }
}