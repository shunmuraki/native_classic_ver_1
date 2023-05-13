import { ac_vi_adaptation, iframe_adaptation, textarea_adaptation, object_setter, for_ind, image_make_it, startblock_around, endblock_around, img_src_getter } from "./function.js";
import { target_data } from "../function/tool.js";
import { global_update } from "../data/variable.js";

// the_html, the_js, the_img_blob_list, animation_data, animation_generate_list, yt_id_list, section_-eletable_list

// < --------------------------------------------------------------------------------------------------- >

let export_space = document.querySelector(".exporter");
let button = document.querySelector(".sb_export").firstElementChild;

// < --------------------------------------------------------------------------------------------------- >

const zip = new JSZip();
let sp_covers = export_space.querySelectorAll(".sp_cover");

// 変換の手前、export.htmlから adjuster をすべて除去する.
let adjusters = export_space.querySelectorAll(".adjuster");
for (let i = adjusters.length - 1; i >= 0 ; i--) {
    adjusters[i].remove();
}

// < --------------------------------------------------------------------------------------------------- >

// section - object 構造へ仕上げる. この中で画像はリストにpushする。
for (let i = 0; i < sp_covers.length; i++) {
    // < -----------------------------------------------------------------------------
    let caset = document.createDocumentFragment();
    // * ループ内準備ゾーン
    let sps = sp_covers[i].children;
    let the_big_section = document.createElement("div");
    the_big_section.classList.add("section");
    let sp_num = sps.length;

    // * - * - * - * - animation_data をここで使っています！
    set("animation_data", s => s[String("section_" + i)] = {});
    set("animation_data", s => s[String("section_" + i)]["about_time"] = {});
    set("animation_data", s => s["section_" + i]["about_anims"] = {});

    // sectionごとに data_ は初期化.
    let data_num = -1;

    for (let o = 0; o < sp_num; o++) { 
        
        let sp = sps[o];
        let verticals = sp.lastElementChild.children;
        // * - * - * - * - animation_data をここで使っています！
        if (! get("animation_data")[String("section_" + i)]["about_time"]["section_duration"]) {
            set("animation_data", s => s[String("section_" + i)]["about_time"]["section_duration"] = verticals.length * 5);
        }

        let here = o + 1;
        let the_classname = "outerstyle_" + sp_num + "_" + here;
        the_big_section.classList.add("section_" + i);
        for (let j = 0; j < verticals.length; j++) {
            img_src_getter(verticals[j]);
        }
        
        // リニアだけを対象にする. * adjuster は削除済み.
        // hor の中のブロックが複数　or sameを持つブロックがひとつ入っている 場合に = true にして以下のブロックごとのループや linear クラスの付与を実行.
        let desider = false;
        if (verticals.length > 1) {
            desider = true;
        } else  {
            if (verticals[0].classList.contains("video") && verticals[0].classList.contains("same")) {
                desider = true;
            }
        }
        // 最後の要素は表示したままにしたいため.
        sp.lastElementChild.firstElementChild.classList.add("opening");
        sp.lastElementChild.lastElementChild.classList.add("ending");
        // * ループ内準備ゾーン
        // --------------------------------------------------------------------------------- >

        if (desider) {
            the_big_section.classList.add("linear");
            for (let j = 0; j < verticals.length; j++) {
                let block = verticals[j]; 
                let the_imp_id = "id_is_" + target_data(block, "id_is_");

                if (block.classList.contains("same")) {
                    
                    let the_same_name = "same_num_" + target_data(block, "same_num_");
                    // [実行内容]
                    // : 直前のブロックが存在した場合に same　を持っていなければ白、持っていても same_num を持っていてその番号が違ったら白.
                    // same_end: 直後のブロックが存在した場合にsameを持っていなければ白、持っていても same_num を持っていてその番号が違ったら白. 
                    // いずれにせよ video_animation は実行する.
                    // ブロックは消さないでおいてみる.
                    if (block.classList.contains("same_start")) {

                        //
                        // video_same_start() の跡地
                        //

                        // e f g h w 全部正しく渡すのが難しそう。
                        // それが面倒だから止まってしまっている。

                        if (! block.classList.contains("opening")) {
                                if (block.previousElementSibling) {
                                    if (! block.previousElementSibling.classList.contains("same")) {
                                        startblock_around(block, j, data_num, i, "video");
                                    } else {
                                        if (! the_imp_id) {
                                            startblock_around(block, j, data_num, i, "video");
                                        } else {
                                            if (! block.previousElementSibling.classList.contains(the_imp_id)) {
                                                startblock_around(block, j, data_num, i, "video");
                                            }
                                        }
                                    }
                                } else {
                                    startblock_around(block, j, data_num, i, "video");
                                }
                        }
                    } 
                    
                    if (block.classList.contains("same_end")) {

                        //
                        // video_same_end() の跡地
                        //

                        if (! block.classList.contains("ending")) {
                            if (block.nextElementSibling) {
                                if (! block.nextElementSibling.classList.contains("same")) {
                                    endblock_around(block, j, data_num, i);
                                } else {
                                    if (! the_imp_id) {
                                        endblock_around(block, j, data_num, i);
                                    } else {
                                        if (! block.nextElementSibling.classList.contains(the_imp_id)) {
                                            endblock_around(block, j, data_num, i);
                                        }
                                    }
                                }
                            } else {
                                endblock_around(block, j, data_num, i);
                            }
                        }

                        // video属性の場合は、それ用のvideo_animationを追加で作成.
                        if (block.classList.contains("video")) {   
                            
                            data_num += 1;
                            let video_animation = {};
                            // 同じ same_num_を持つ　same_start について処理.
                            let the_start_elems = document.getElementsByClassName(the_same_name)[0];
    
                            let v_start_when = Math.floor(Number(target_data(the_start_elems, "this_video_st_")));
                            let v_end_when = Math.floor(Number(target_data(block, "this_video_st_"))) + 5;
                            let v_duration = Number(v_end_when - v_start_when);
                        
                            video_animation["finish_when"] = (j * 5) + 5;
                            video_animation["trigger_when"] = video_animation["finish_when"] - v_duration;
                            // ここで　End しか渡していないことが問題なんだと思った.
                            video_animation = ac_vi_adaptation(block, video_animation, "active_st");

                            // same_startの方に付与されているactuarなども反映させる.
                            video_animation = ac_vi_adaptation(the_start_elems, video_animation, "active_st");

                            // * - * - * - * - animation_generate_list をここで使っています！
                            video_animation["anim_name"] = get("animation_generate_list").length;
                            video_animation["video_startpoint"] -= v_duration;
                            
                            // * - * - * - * - animation_generate_list をここで使っています！
                            set("animation_generate_list", s => s.push([]));
                            set("animation_data", s => s["section_" + i]["about_anims"]["data_" + data_num] = video_animation);
                            block.classList.add("anim_num_" + video_animation["anim_name"]);
                            
                            // iframe の id を取得し、リストに加える.
                            // そのリストの長さを測り、その数字を yt_？ というidに持ったdiv要素に置換.
                            iframe_adaptation(block);

                        } else if (block.lastElementChild.tagName == "TEXTAREA") {
                            textarea_adaptation(block);
                        }
                        block.classList.add(the_classname);            
                        object_setter(block, the_big_section);
                    }

                } 

                else {

                    // 
                    //  for_ind()の跡地
                    //
                    // for_ind(block, the_imp_id, j, data_num, i);

                    // video属性の場合は追加で video_animation を作成.
                    if (block.classList.contains("video")) {
                        for_ind(block, the_imp_id, j, data_num, i);
                        data_num += 1;
                        let video_animation = {};
                        video_animation["trigger_when"] = j * 5;
                        video_animation["finish_when"] = video_animation["trigger_when"] + 5;
                        video_animation = ac_vi_adaptation(block, video_animation, "active_st");
                        video_animation["anim_name"] = get("animation_generate_list").length + 1;
                        
                        // * - * - * - * - animation_generate_list をここで使っています！
                        set("animation_generate_list", s => s.push([]));
                        // * - * - * - * - animation_data をここで使っています！
                        set("animation_data", s => s["section_" + i]["about_anims"]["data_" + data_num] = video_animation);
                        block.classList.add("anim_num_" + video_animation["anim_name"]);
                        let object_you = iframe_adaptation(block);
                        the_big_section.appendChild(object_you);
                    } else if (block.lastElementChild.tagName == "TEXTAREA") {
                        // 「sameはないが、リニアである. そして p だが中身はないもの」というのは多く存在する. これをしっかり弾いておく必要がある.
                        if (block.lastElementChild.value !== "") {
                            for_ind(block, the_imp_id, j, data_num, i);
                            textarea_adaptation(block);
                            block.classList.add(the_classname);
                            object_setter(block, the_big_section);
                        }
                    } else if (block.lastElementChild.tagName == "IMG") {
                        for_ind(block, the_imp_id, j, data_num, i);
                        block.classList.add(the_classname);
                        object_setter(block, the_big_section);
                    }
                }
            }
            
        } else {
            let block = verticals[0];
            textarea_adaptation(block);
            object_setter(block, the_big_section);
        }
        
        // * - * - * - * - animation_data をここで使っています！ 
        set("animation_data", s => s["section_" + i]["about_time"]["section_current_time"] = 0);
    }

    // 最後の総召集.
    caset.appendChild(the_big_section);
}

let be = export_space.children;

for (let i = be.length - 1; i >= 0 ; i--) {
    be[i].remove();
}

// ここで export_space の中身が完全に書き出し後のDOMに切り替わる。
export_space.appendChild(caset);

// ------------------------------------------------------------------ 以下iframe一元化プログラム.

let sections = export_space.children;

for (let i = 0; i < sections.length; i++) {
    let final_big_objects = sections[i].children;
    for (let o = final_big_objects.length - 1; o >= 0; o--) {
        if (final_big_objects[o]) {
            if (final_big_objects[o].classList.contains("same_deletable")) {
                let the_deletable_key = "same_id_" + target_data(final_big_objects[o], "same_id_");
                if (get("section_deletable_list").indexOf(the_deletable_key) == -1) {
                    // 新種なので.
                    // * - * - * - * - section_deletable_list をここで使っています！ 
                    set("section_deletable_list", s => s.push(the_deletable_key));
                    let will_deleted = document.getElementsByClassName(the_deletable_key);
                    for (let l = will_deleted.length - 1; l >= 0; l--) {
                        if (! will_deleted[l].isEqualNode(final_big_objects[o])) {
                            // same_end（中身を持たせてる）を殺さないための処理。
                            if (! will_deleted[l].lastElementChild) {
                                // たぶん各自の anim_num_ から animation_generate_list を検索して [[], ]　← これを空にしたらいいと思う.
                                // で、そのクラス自体取っちゃうっていう.　であとは animation_data についても value から検索して
                                let del_list = will_deleted[l].classList;
                                for (let j = 0; j < del_list.length; j++) {
                                    if (del_list[j].indexOf("anim_num_") != -1) {
                                        // 移し替えて一元化.
                                        final_big_objects[o].classList.add(del_list[j]);
                                    }
                                }
                            }
                        }
                    }
                    for (let l = will_deleted.length - 1; l >= 0; l--) {
                        if (! will_deleted[l].isEqualNode(final_big_objects[o])) {
                            // same_end（中身を持たせてる）を殺さないための処理。
                            if (! will_deleted[l].lastElementChild) {
                                will_deleted[l].remove();
                            }
                        }
                    }
                }
                // このために残してきたクラスを今消すよ.
                if (final_big_objects[o]) {
                    classmover(final_big_objects[o], final_big_objects[o], "same_deletable", "remove");
                    classmover(final_big_objects[o], final_big_objects[o], "same_id_", "remove");
                }
            }
        }
    }

    if (sections[i].classList.contains("linear")) {
        // linearnativeのリニアにて最初の要素は描画しておくようにするため.
        if (sections[i].firstElementChild) {
            sections[i].firstElementChild.classList.add("fire");
        }
    } else {
        sections[i].classList.add("non");
        // 最初に何気なく追加した non の section を削除.
        // * - * - * - * - animation_data をここで使っています！ 
        let pre = get("animation_data");
        delete pre["section_" + i];
        set("animation_data", s => s = pre);
    }
}

// < --------------------------------------------------------------------------------------------------- >
// 検証用のコアデータのエクスポート結果表示.

// dom
console.log("dom");
let dom_string = String(export_space.innerHTML);
dom_string = dom_string.split('</div>') // ["apple", "banana", "orange"]
dom_string.join('/n') // "apple banana orange"
console.log(dom_string);

// animation_data
console.log("animation_data");
console.log(get("animation_data"));

// animation_generate_list
console.log("animation_generate_list");
console.log(get("animation_generate_list"));

// yt_id_list
console.log("yt_id_list");
console.log(get("yt_id_list"));

// 検証用のコアデータのエクスポート結果表示.
// < --------------------------------------------------------------------------------------------------- >

// HTMLファイルのエクスポート.
let final_dom = String(export_space.innerHTML);
fetch('../linear/index_head.html') 
.then(response => response.text()) 
.then(data => { 
    set("the_html", s => s += data);
    set("the_html", s => s += final_dom);
    fetch('../linear/index_bottom.html')
    .then(response => response.text()) 
    .then(data_second => { 
        set("the_html", s => s += data_second);
        zip.file('index.html', get("the_html"));
    });
    
});

// CSSファイルのエクスポート
let css_url = '../linear/style.css';
let css_res = await fetch(css_url);
let cb = await css_res.text();
zip.file('style.css', cb);

// JavaScriptファイル群のエクスポート. (commons系列)
let lnjs_url_list = ["../linear/javascript/anim.js", "../linear/javascript/states.js", "../linear/javascript/setup.js", "../linear/javascript/parts.js", "../linear/javascript/ytp.js"];
for (let i = 0; i < lnjs_url_list.length; i++) {
    let url = lnjs_url_list[i];
    let res = await fetch(url);
    let text = await res.text();
    if (i == 1) {
        let final_animation_generate_list =  "let animation_generate_list = " + JSON.stringify(get("animation_generate_list")) + ";";
        text = final_animation_generate_list + text;
    }
    if (i == 2) {
        let final_yt_id_list =  "let yt_id_list = " + JSON.stringify(get("yt_id_list")) + ";";
        text = final_yt_id_list + text;
    }

    // &&&&&&&&&& ここが直せるぞ indexOF
    // 先頭の文字を取得したらいい。
    // "/javascript/" で取得してちょっと調整
    let the_s_num =  url.indexOf("/javascript/") + String("/javascript/").length;
    let the_e_num =  url.indexOf(".js");
    let the_name =  url.slice(the_s_num, the_e_num) + ".js";
    zip.folder("javascript").file(the_name, text);
}

// JavaScriptファイルのエクスポート, (in Base)
let base_file = await fetch("../linear/javascript/base/tools.js");
let base_text = await base_file.text();
zip.folder("javascript").folder("base").file("tools.js", base_text);

// image ファイル群のエクスポート. 
let img_url_list = ["../linear/images/native_logod.png", "../linear/images/olo.png", "../linear/images/spinner.png"];
for (let i = 0; i < img_url_list.length; i++) {
    let url = img_url_list[i];
    let res = await fetch(url);
    let img = await res.blob();

    let the_s_num =  url.indexOf("/images/") + String("/images/").length;
    let the_e_num =  url.indexOf(".png");
    // &&&&&&&&&& ここが直せるぞ indexOF
    // "/images/" で取得してちょっと調整
    let the_name =  url.slice(the_s_num, the_e_num) + ".png";
    zip.folder("images").file(the_name, img);
}

// JavaScriptファイルのエクスポート. (main.js)
let final_animation_data = "let animation_data = " + JSON.stringify(get("animation_data")) + ";";
set("the_js", s => s += final_animation_data);
let main_res = await fetch("../linear/javascript/main.js");
let main_text = await main_res.text();
set("the_js", s => s += main_text);
zip.folder("javascript").file("main.js", get("the_js"));

// img ファイルのエクスポート.
for (let i = 0; i < images.length; i++){
    zip.folder("images").file('img_'+[i]+'.png', images[i].split(',')[1], {base64: true});
}


// このあたりで redirect_cover に対してアニメーションをさせてあげないと。

// 全体を包括する zipファイルのエクスポート.
zip.generateAsync( 
    {type:"blob",
     compression: "DEFLATE",
     compressionOptions: {level: 1} 
    }).then(function (b) {
        const del = new Blob([b], { type: 'application/zip' });
        const uri = URL.createObjectURL(del);
        button.download = 'output.zip';
        button.href = uri;
});

// 以下 Glimpseとの接続処理 ---------------------------
// blobリストがほしい (images)
// 最終的な dom と json３つがほしい (final_dom, animation_data, animation_generate_list, yt_id_list)

// glimpse.txt の中身.
// let img_blocks = document.querySelectorAll(".img_v");
// * - DOM
let dom_text = String(screen.innerHTML) + "[:dom]";
final_textcontent += dom_text;
// * - 画像
for (let i=0; i < images.length; i++) {
    image_make_it(images[i], i);
}
// * - JSON類
let yi_text = JSON.stringify(get("yt_id_list")) + "[:yt_id_list]";
final_textcontent += yi_text;
let ad_text = JSON.stringify(get("animation_data")) + "[:animation_data]";
final_textcontent += ad_text;
let ag_text = JSON.stringify(get("animation_generate_list")) + "[:animation_generate_list]";
final_textcontent += ag_text;

// * - glimpse.txt の書き出し
let blob = new Blob([final_textcontent], { type:"text/plain"});
let url = URL.createObjectURL(blob);
let glil = document.querySelector(".glimpse_link");
glil.href = url;
glil.download = "glimpse.txt";
let int = setInterval(() => {
    if (glil.classList.contains("change")) {
        // 別タブで開くには？
        window.open("https://glimpse.tokyo/publish.html");
    }
}, 1000)

glil.addEventListener("click", () => {
    glil.classList.add("change");
    int;
})

// そして「編集に戻る」ボタンがクリックされた場合の処理についても記述するようにする.
let getback = document.querySelector(".additional");
// 戻る処理を書いてくれ。
getback.addEventListener("click", () => {
    // <.exporter> を削除.
    // redirect_cover を無くす.
})