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