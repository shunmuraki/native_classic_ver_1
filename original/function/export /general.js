// * 仕上がった最後のブロックを <object> の形にして <section> に append する関数.
export const object_setter = (e, f) => {
    let object_you = object_generation(e);
    classmover(object_you.lastElementChild, object_you, "style_", "add");
    object_you.removeAttribute('style');
    object_you.lastElementChild.removeAttribute("class");
    // * すでに <img> 形式にはなっているが、
    // * それが Linear においても正しく描画されるよう、追加でいくつか特定のクラスを付与.
    img_adaptation(object_you);
    f.appendChild(object_you);
}

// * blockから <object> を生成して返す関数.
export const object_generation = (e) => {
    let final_block = e.cloneNode(true);
    let classlist = final_block.classList;
    // * Linear にも必要なクラスだけを移し替える.
    for (let i = classlist.length - 1; i >= 0 ; i--) {
        if (classlist[i].indexOf("same_id_") == -1 && classlist[i].indexOf("same_deletable") == -1 && classlist[i].indexOf("anim_num_") == -1 && classlist[i].indexOf("outerstyle_") == -1 && classlist[i].indexOf("iframe") == -1) {
            final_block.classList.remove(classlist[i]);
        }
    }
    final_block.classList.add("object");
    return final_block;
}

// ---------------------------------------------------------------------------------------------------------------

// * 画像のパス を images 配列に加え、対応する画像のElementの src にもセットする関数.
export const img_src_getter = (e) => {
    let target = e.lastElementChild;
    if (target) {
        if (target.tagName == "IMG") {
            let the_src = target.getAttribute('src');
            // * 画像のパスの保存先のグローバル変数 images に追加.
            set("images", s => s.push(the_src));
            let the_num = Object.keys(get("the_img_blob_list")).length; 
            // * 画像のパスの保存先のグローバル変数 the_img_blob_list に追加.
            // * これと共有する the_num を target の src にも与えることで、書き出された Linear 自身が画像を表示できる.
            // [* しかしそもそも images の存在意義とは？同じ処理を the_img_blob_list にも施しているように見受けられるが.]
            set("the_img_blob_list", s => s["img_" + the_num] = the_src);
            let the_filename = "images/img_" + the_num + ".png";
            target.setAttribute("src", the_filename);
        }
    }
}

// * アップロードされた img ファイルを base64形式 へ変換し、
// * 画像ごとに "[:img]" を間に挿入した、単一の文字列とし final_textcontent に追記する関数.
export const image_make_it = (e) => {
    let the_textdata;
    let dec = e.slice(0, 1);
    if (dec == "[") {
        the_textdata = String(e) + "[:img]";
    } else {
        let image = new Image();
        image.src = String(e);
        let canvas = document.createElement("canvas");
        let w = image.width;
        let h = image.height;
        let d = Math.trunc(w / 1000);
        // * リサイズ.
        let trimed_w;
        let trimed_h;
        if (d > 0) {
            trimed_w = w / d;
            trimed_h = h / d;
        } else {
            trimed_w = w;
            trimed_h = h;
        }
        canvas.width = trimed_w;
        canvas.height = trimed_h;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, w, h, 0, 0, trimed_w, trimed_h);
        the_textdata = String(canvas.toDataURL("image/png")) + "[:img]";
    }
    set("final_textcontent", s => s += the_textdata);
}