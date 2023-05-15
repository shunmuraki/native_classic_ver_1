import { target_data, classmover } from "../function/tool.js";
import { global_update } from "../data/variable.js";

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

// * 画像のパスを配列に加え、画像のElementにも対応するsrcの値をセットする関数.
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

// * 土台のanimationを生成して返す関数
export const base_setup = (e, f, g) => {
    let new_animation = {};
    new_animation["trigger_when"] = f * 5;
    // [* すでに change の使用はしないことにしているため、この条件分岐は簡素化できる.]
    if (e.classList.contains("change") && g == "start") {
        new_animation["trigger_when"] = new_animation["trigger_when"] + 1;
        new_animation["finish_when"] = new_animation["trigger_when"];
    } else {
        new_animation["finish_when"] = new_animation["trigger_when"] + 1;
    }
    new_animation["video_startpoint"] = 0;
    return new_animation;
}

// * animation_generate_data を生成して返す関数.
export const generationdata_setup = (e, f) => {
    let final_data = new Array();
    let anim_blockhas = [];
    if (f == "start") {
        anim_blockhas = 1;
        if (e.classList.contains("change")) {
            // * finish_when = trigger_when とすることで、duration なしで要素を表示.
            final_data = [anim_blockhas, 0];
        } else {
            final_data = [anim_blockhas, 1];
        }
    } else if (f == "end") {
        final_data = [0, 1];
    } 
    return final_data;
}

// * animation_generate_list と animation を紐付けながら、後者を animations に束ねて返す関数.
export const animationdata_setup = (e, f, g, h) => {
    let the_block = e;
    let the_animation = f;
    let gene_datas = g;
    let the_num = gene_datas.length;
    let animations = [];
    
    for (let i = 0; i < the_num; i++) {
        // * gene_datas の中の genedata ごとに animation を複製し、
        // * N: animation_generation_list の length
        // * animation の 「anim_name」 に N を、
        // * block へ anim_num_N を classList に追加.
        let new_typedata = JSON.parse(JSON.stringify(the_animation));
        let new_gene_datas = JSON.parse(JSON.stringify(gene_datas));
        let the_keynum = animation_generate_list.length;
        new_typedata["anim_name"] = the_keynum;
        let the_name = "anim_num_" + the_keynum;
        the_block.classList.add(the_name);
        let the_value = new_gene_datas[i];
        let final_animation = ac_vi_adaptation(the_block, new_typedata, h);
        set("animation_generate_list", s => s.push(the_value));
        animations.push(final_animation);
    }

    return animations;
}

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

// * start_animationを構成して格納する関数.
export const startblock_around = (e, f, g, h, w) => {
    // * まず start_animation の土台を作成.
    let start_animation = base_setup(e, f, "start");
    // * 次に animation_generate_data を作成して取得.
    let generative_data_start = generationdata_setup(e, "start");
    let the_same_name = "same_num_" + target_data(e, "same_num_");                         
    // * ペアの same_end を取得して target とする. 
    // [* 例えば w をこちらで取得して、本関数の引数を減らすことはできないだろうか.]
    let target;
    if (w == "video") {
        target = document.getElementsByClassName(the_same_name)[document.getElementsByClassName(the_same_name).length - 1];
    } else {
        target = e;
    }
    // * 標的が判ったら、あとは Linear にて animation_generate_data を実稼働させる指揮官としての animation を生成.
    let final_animation_start = animationdata_setup(target, start_animation, generative_data_start, "none_st");
    // * 最後に、いくつかの animation が束ねられた final_animation_start をループ処理し、
    // * data_N でそれぞれの animation に区別をつけながら大元の animation_data にそれらを適切な箇所に追加.
    for (let k = 0; k < final_animation_start.length; k++) {
        g += 1;
        set("animation_data", s => s["section_" + h]["about_anims"]["data_" + g] = final_animation_start[k]);
    }
}

// * end_animation を構成して格納する関数.
export const endblock_around = (e, f, g, h) => {
    // * まず end_animation の土台を作成.
    let end_animation = base_setup(e, f + 1, "end");
    // * 次に animation_generate_data を作成して取得.
    let generative_data_end = generationdata_setup(e, "end");
    // * Linear にて animation_generate_data を実稼働させる指揮官としての animation を生成.
    let final_animation_end = animationdata_setup(e, end_animation, generative_data_end, "non_st");
    // * 最後に、いくつかの animation が束ねられた final_animation_start をループ処理し、
    // * data_N でそれぞれの animation に区別をつけながら大元の animation_data にそれらを適切な箇所に追加.
    for (let k = 0; k < final_animation_end.length; k++) {
        g += 1;
        set("animation_data", s => s["section_" + h]["about_anims"]["data_" + g] = final_animation_end[k]);
    } 
}

// * リニアスペース上に存在する same クラスを持たないブロックについて、
// * start_animation と end_animation を作成する関数.
export const for_ind = (e, f, g, h, m) => {
    if (! e.classList.contains("opening")) {
        if (e.previousElementSibling) {
            if (! e.previousElementSibling.classList.contains("same")) {
                startblock_around(e, g, h, m, "not");
            } else {
                if (! f) {
                    startblock_around(e, g, h, m, "not");
                } else {
                    if (! e.previousElementSibling.classList.contains(f)) {
                        startblock_around(e, g, h, m, "not");
                    }
                }
            }
        } else {
            startblock_around(e, g, h, m, "not");
        }
    }
    if (! e.classList.contains("ending")) {
        if (e.nextElementSibling) {
            if (! e.nextElementSibling.classList.contains("same")) {
                endblock_around(e, g, h, m);
            } else {
                if (! f) {
                    endblock_around(e, g, h, m);
                } else {
                    if (! e.nextElementSibling.classList.contains(f)) {
                        endblock_around(e, g, h, m);
                    }
                }
            }
        } else {
            endblock_around(e, g, h, m);
        }
    }
}