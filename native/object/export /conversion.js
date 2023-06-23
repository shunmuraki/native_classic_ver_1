// * 仕上がった最後のブロックを <object> の形にして <section> に append する関数.
export const object_conversion = (block, section) => {
    let new_object = object_make(block);
    classmover(new_object.lastElementChild, new_object, "style_", "add");
    new_object.removeAttribute('style');
    new_object.lastElementChild.removeAttribute("class");
    // * すでに <img> 形式にはなっているが、
    // * それが Linear においても正しく描画されるよう、追加でいくつか特定のクラスを付与.
    img_conversion(new_object);
    section.appendChild(new_object);
}

// * Linear において YouTubeの動画ID から YTプレイヤー(iframe) を生成するための仮置きのdiv要素を挿入する関数.
export const iframe_conversion = (block) => {
    let old_content = block.lastElementChild;
    let yt_id = value(block, "id_is_");
    set("yt_id_list", s => s.push(value_id));
    let classname = "yt_" + String(get("yt_id_list").length - 1);
    // * same_end 同士見つけあってDOMを節約するために発見用のidをクラスに付与する.
    // * 同一の YouTube の動画がいくつかの same群　に分割されているケースを考慮し、
    // * 登録する ID は唯ひとつに留め、また同一ライン上に複数存在する same_end については
    // * 最後のひとつだけを残すよう、 same_deletable クラスをそれ以外に付与して予防線を張る.
    block.classList.add("iframe");
    block.classList.add("same_deletable");
    block.classList.add("same_id_" + yt_id);
    let new_content = document.createElement("div");
    new_content.setAttribute("id", classname); 
    old_content.remove();
    block.appendChild(new_content);
    return block;
}

// * <textarea> を <p> で置き換える関数.
export const textarea_conversion = (block) => {
    let content = block.lastElementChild;
    if (content) {
        if  (content.tagName == "TEXTAREA") {
            let new_content = document.createElement("p");        
            let value = content.value;
            classmover(content, new_content, "style_", "add");
            new_content.innerText = String(value);
            content.remove();
            block.appendChild(new_content);
        }
    }
}

// * imgタグの親要素にクラス("img", "img_v")を付与する関数.
export const img_conversion = (block) => {
    let content = block.lastElementChild;
    if (content) {
        if (content.tagName == "IMG") {
            block.classList.add("img");
            // [* img_v クラスは何に役立っているのだろう.]
            block.classList.add("img_v");
        }
    }
}