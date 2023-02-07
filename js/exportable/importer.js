const screen = document.querySelector(".screen");

export function target_data(e, f) {
    const list = e.classList;
    for (let i = 0; i < list.length; i++) {
        if (list[i].includes(f)) {
         var the_num = list[i].replace(f, '');
        }
    }
    return the_num;
}

// クラスの付け替え関数.
export const classmover = (e, f, g, h) => {
    let classlist = e.classList;
    for (let i = 0; i < classlist.length; i++) {
        if (classlist[i].indexOf(g) != -1) {    
            if (h == "add") {
                if (f.classList.contains(classlist[i]) == false) {
                    f.classList.add(classlist[i]);
                }
            } else if (h == "remove") {
                if (f.classList.contains(classlist[i]) == true) {
                    f.classList.remove(classlist[i]);
                }
            }
        }
    }
} 

const zip = new JSZip();

let the_html = "";
let the_js = "";
let the_img_blob_list = {};
let images = [];

let data_num = 0;
let animation_data = {};
let animation_generate_list = [];
let yt_id_list = [];
let caset = document.createDocumentFragment();
let section_deletable_list = [];

// ページ遷移アニメーション.
let button = document.querySelector(".download_button");
let contents = document.querySelector(".contents");

let rc = document.querySelector(".redirect_cover");
rc.style.top = 0 + "%";

contents.animate(
    [
      { opacity: 0, },
      { opacity: 1 }
    ], {
      duration: 800,
      fill: "both"
    }
);

// DOMのインポート.
let the_values = JSON.parse(sessionStorage.getItem("the_values"));
let the_output = sessionStorage.getItem("output");
screen.innerHTML = the_output;

// textareaの値を現状復帰.
let write_areas = document.querySelectorAll(".write_area");
for (let i = 0; i < write_areas.length ; i++) {
    write_areas[i].value = the_values[i];
}

let sp_covers = document.querySelectorAll(".sp_cover");

// actuar クラスへの対応や video_startpointのセットなど、 animation_data を更新する関数.
function ac_vi_adaptation(e, f) {
    
    let classlist = e.classList;
    let animation_data = f;

    for (let i = 0; i < classlist.length; i++) {
        let classname = classlist[i];
        if (classname.indexOf("this_video_st_") != -1) {
            animation_data["video_startpoint"] = Number(target_data(e, "this_video_st_"));
        } else if (classname.indexOf("actuar_time_") != -1) {
            
            // 秒数に変換.
            let act_num = 5 * (Number(target_data(e, "actuar_time_")) / 300);

            if (classname.indexOf("actuar_st_") != -1) {
                animation_data["trigger_when"] = animation_data["trigger_when"] + act_num;
                
                // actuar を video_startpoint にも反映.
                if (classname.indexOf('this_video_st_') != -1) {
                    animation_data["video_startpoint"] = animation_data["video_startpoint"] + act_num;
                }
            } else if (classname.indexOf('actuar_en') != -1) {
                animation_data["finish_when"] = animation_data["finish_when"] - act_num + 5; 
            }
        } else {
        }
    }
    return animation_data;
}

// change クラスから スタイリングの変化前と変化後の値をセットにして返す関数.
function en_change_adaptation(e) {    
    let target = e.nextElementSibling;

    console.log(target);

    if (target) {
        if (target.classList.contains("change")) {
            let be_classlist = e.lastElementChild.classList;

            // * この時に same_end を探してそのクラスを持たせるようにする.
            let af_classlist;
            if (target.classList.contains("same")) {
                if (! target.classList.contains("same_end")) {
                    let the_path = document.getElementsByClassName("same_num_" + target_data(target, "same_num_")).length - 1;
                    let pare = target.parentElement;
                    let the_num = [].slice.call(pare.children).indexOf(target) + the_path;
                    let the_same_end = pare.children[the_num];
                    console.log(the_same_end);
                    af_classlist = the_same_end.lastElementChild.classList;
                }
            } else {
                af_classlist = target.lastElementChild.classList;
            }
    
            let b_data = [];
            let a_data = [];

            for (let i = 0; i < be_classlist.length; i++) {
                let classname = be_classlist[i];
                if (classname.indexOf("styling_") !== -1) {                    
                    let first = Number(classname.slice(8, 9));
                    let second = Number(classname.slice(10, 11));
                    let third = Number(classname.slice(12, 13));
                    let forth = Number(classname.slice(14, 15));
                    b_data = [first, second, third, forth];
                }
            }
    
            for (let i = 0; i < af_classlist.length; i++) {
                let classname = af_classlist[i];
                if (classname.indexOf("styling_") != -1) {
                    let first = Number(classname.slice(8, 9));
                    let second = Number(classname.slice(10, 11));
                    let third = Number(classname.slice(12, 13));
                    let forth = Number(classname.slice(14, 15));
                    a_data = [first, second, third, forth];
                }
            }

            let final_data = [b_data, a_data];

            console.log(final_data);
            return final_data;
        }
    }
}

// yt-IDからyt-iframeを生成するための仮置きのdiv要素をセットする関数.
function iframe_adaptation(e) {
    let the_content = e.lastElementChild;

    console.log(the_content);
    let value_id = target_data(e, "id_is_");
    if (yt_id_list.indexOf(value_id) == -1) {
        yt_id_list.push(value_id);
    }
    
    // same_end 同士見つけあってDOMを節約するために発見用のidをクラスに付与する.
    e.classList.add("same_deletable");
    e.classList.add("same_id_" + value_id);

    let the_name = "yt_" + yt_id_list.length;
    let newElement = document.createElement("div");
    newElement.setAttribute("id", the_name);
    the_content.remove();
    e.appendChild(newElement);

    return e;
}

// textareaをpタグに置換する関数.
function textarea_adaptation(e) {
    let the_content = e.lastElementChild;
    if (the_content) {
        let newElement;
        let the_value = the_content.value;
        let style_data = "styling_" + target_data(the_content, "styling_");
        let third = Number(style_data.slice(12, 13));

        if (third == 0) {
            newElement = document.createElement("p");
        } else {
            newElement = document.createElement("h1");
        }
        
        classmover(the_content, newElement, "styling_", "add");
        newElement.innerText = String(the_value);
        the_content.remove();
        e.appendChild(newElement);
    }
}

// blockから <object> を生成して返す関数.
function object_generation(e) {
    let final_block = e.cloneNode(true);
    let classlist = final_block.classList;
    for (let i = classlist.length - 1; i >= 0 ; i--) {
        // 残しておくべきものはもっとあるだろ.
        // とりあえず全部残してみる.
        if (classlist[i].indexOf("same_id_") == -1 && classlist[i].indexOf("same_deletable") == -1 && classlist[i].indexOf("anim_num_") == -1) {
            final_block.classList.remove(classlist[i]);
        }
    }
    final_block.classList.add("object");
    return final_block;
}

// 画像のパスを配列に加え、画像のElementにも対応するsrcの値をセットする関数.
function img_src_getter(e) {
    let target = e.lastElementChild;
    if (target) {
        if (target.tagName == "IMG") {
            let the_src = target.getAttribute('src');

            // images [] に追加.
            images.push(the_src);
    
            let the_num = Object.keys(the_img_blob_list);
            the_img_blob_list["img_" + the_num] = the_src;
    
            let the_filename = "images/img_" + the_num + ".png";
            target.setAttribute("src", the_filename);
        }
    }
}

// ２つのスタイリング配列（[0, 0, 0, 0] など）を比較して、そのギャップから animation_generate_list へ格納するデータを生成して返す関数.
function genedata_compare(e, f) {

    let output = [];

    let vertical_data = f[0] - e[0];
    let horizontal_data = f[1] - e[1];
    let scale_data = f[2] - e[2];
    let opacity_data = f[3] - e[3];

    console.log(horizontal_data);

    if (vertical_data != 0) {
        let new_prop_v = [["vertical", f[0]], 1];
        output.push(new_prop_v);
    }
    if (horizontal_data != 0) {
        let new_prop_h = [["horizontal", f[0]], 1];
        output.push(new_prop_h);
    }
    if (scale_data != 0) {
        let new_prop_s = [["scale", f[0]], 1]; 
        output.push(new_prop_s);
    }

    if (opacity_data != 0) {
        let new_prop_o = [["opacity", f[0]], 1];
        output.push(new_prop_o);
    }

    console.log(output);

    return output;
}

// animation_generate_list に格納するデータを生成して返す関数.
function generationdata_setup(e, f) {
    
    let final_data = new Array();
    let anim_blockhas = [];
    
    if (f == "start") {
        // ここは比較する必要がない.
        anim_blockhas = ["opacity", 1];

        // このブロックが change を持っていたら
        if (e.classList.contains("change")) {
            // finish_when = trigger_when.
            final_data = [[anim_blockhas, 0]];
        } else {
            final_data = [[anim_blockhas, 1]];
        }

    } else if (f == "end") {
        // ここは比較する必要がない
        console.log(e);
        anim_blockhas = [["opacity", 0], 1];
        console.log(e.parentElement);
        // 次のブロックが changeを持っていたら
        let the_nextblock = e.nextElementSibling;
        console.log(the_nextblock);
        if (the_nextblock) {
            if (the_nextblock.classList.contains("change")) {
                let final_data = en_change_adaptation(e);
                // * e: [0,0,0,0] - [1,1,1,1]
                anim_blockhas = genedata_compare(final_data[0], final_data[1]); 
                // * → [["vertical", 0], ["scale", 2]]
                console.log(anim_blockhas);
            }
        }
        
        final_data = anim_blockhas;

    } else if (f == "common") {
        // ここは比較する必要がない.
        let before_data = ["opacity", 1];
        let after_data = ["opacity", 0];
        final_data = [[before_data, 1], [after_data, 1]];
    } 

    console.log(final_data);
    
    return final_data;
}

// 土台のanimationを作る関数 (VIDEOを除く)
function base_setup(e, f, g) {
    let new_animation = {};
    new_animation["trigger_when"] = f * 5;

    if (e.classList.contains("change") && g == "start") {
        new_animation["trigger_when"] = new_animation["finish_when"];
    } else {
        new_animation["finish_when"] = new_animation["trigger_when"] + 1;
    }
    new_animation["video_startpoint"] = 0;
    return new_animation;
}

// animation_generate_list と animation_data を紐付け、前者にデータを格納して後者をアップデートして返す関数.
function animationdata_setup(e, f, g) {
    
    let the_block = e;
    let the_animation = f;
    let gene_datas = g;
    let the_num = gene_datas.length;

    let animations = [];

    console.log(gene_datas);
    console.log(the_num);

    // the_num 分のanimationを複製する.
    // [処理内容]
    // anim_name のセット. ← animation_generation_list の何番目かの数字を格納.
    // anim_num のセット.
    // ブロックに anim_num をadd.
    for (let i = 0; i < the_num; i++) {

        console.log(the_animation);
        
        // let new_typedata = Object.create(the_animation);
        let new_typedata = JSON.parse(JSON.stringify(the_animation));
        let new_gene_datas = JSON.parse(JSON.stringify(gene_datas));
        console.log(new_typedata);
        console.log(new_gene_datas);
        // anim_blockhas の１つを格納し、それとセットになる the_animation にはその length を渡してあげる.
        // console.log(JSON.stringify(gene_datas));
        console.log(new_gene_datas[i]);
        let the_value = new_gene_datas[i];

        console.log(the_value);
        animation_generate_list.push(the_value);
        console.log(animation_generate_list);

        let the_keynum = animation_generate_list.length;
        new_typedata["anim_name"] = the_keynum;

        console.log(new_typedata);
        let the_name = "anim_num_" + the_keynum;
        the_block.classList.add(the_name);
        let final_animation = ac_vi_adaptation(the_block, new_typedata);
        animations.push(final_animation);
    }
    return animations;
}

// 仕上がった最後のブロックをobjectにして格納する関数.
function object_setter(e, f) {
    let object_you = object_generation(e);
    classmover(object_you.lastElementChild, object_you, "styling_", "add");
    object_you.removeAttribute('style');
    object_you.lastElementChild.removeAttribute("class");
    f.appendChild(object_you);
}

// 変換の手前、export.htmlから adjuster をすべて除去する.
let adjusters = document.querySelectorAll(".adjuster");
for (let i = adjusters.length - 1; i >= 0 ; i--) {
    adjusters[i].remove();
}

// section - object 構造へ仕上げる. この中で画像はリストにpushする。
for (let i = 0; i < sp_covers.length; i++) {
    
    let sps = sp_covers[i].children;
    let the_big_section = document.createElement("div");
    the_big_section.classList.add("section");
    let sp_num = sps.length;

    for (let o = 0; o < sp_num; o++) {
        
        let sp = sps[o];
        let verticals = sp.lastElementChild.children;
        
        // remove()する前に実行.
        animation_data[String("section_" + i)] = {};
        animation_data[String("section_" + i)]["about_time"] = {};
        animation_data["section_" + i]["about_anims"] = {};
        animation_data[String("section_" + i)]["about_time"]["section_duration"] = verticals.length * 5;
        
        let here = o + 1;
        let the_classname = "outerstyle_" + sp_num + "_" + here;

        // リニアだけを対象にする.
        if (verticals.length > 1) {
            for (let j = 0; j < verticals.length; j++) {
                let block = verticals[j]; 
                img_src_getter(block);

                if (block.classList.contains("same")) {
                    if (block.classList.contains("same_start")) {

                        // start_animationを構成する.
                        let start_animation = base_setup(block, j, "start");
                        let generative_data_start = generationdata_setup(block, "start");
                        let final_animation_start = animationdata_setup(block, start_animation, generative_data_start);

                        for (let k = 0; k < final_animation_start.length; k++) {
                            data_num += 1;
                            animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_start[j];
                        }
    
                        // textarea_adaptation(block);
                        // block.classList.add(the_classname);
                        // let object_you = object_generation(block);
    
                        // the_big_section.appendChild(object_you);
    
                    } else if (block.classList.contains("same_end")) {
    
                        data_num += 1;
                        
                        // end_animationを構成する.
                        let end_animation = base_setup(block, j + 1, "end");
                        let generative_data_end = generationdata_setup(block, "end");
                        let final_animation_end = animationdata_setup(block, end_animation, generative_data_end);
                        animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_end;

                        for (let k = 0; k < final_animation_end.length; k++) {
                            data_num += 1;
                            animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_end[j];
                        }
    
                        // video属性の場合は、それ用のvideo_animationを追加で作成.
                        if (block.classList.contains("video")) {         
                            
                            data_num += 1;
    
                            let video_animation = {};
                            let the_same_name = "same_num_" + target_data(block, "same_num_");
    
                            // 同じ same_num_を持つ　same_start について処理.
                            let the_start_elems = document.getElementsByClassName(the_same_name)[0];
    
                            let v_start_when = Number(target_data(the_start_elems, "this_video_st_"));
                            let v_end_when = Number(target_data(block, "this_video_st_")) + 5;
                            let v_duration = Number(v_end_when - v_start_when);
                        
                            video_animation["finish_when"] = (j * 5) + 5;
                            video_animation["trigger_when"] = video_animation["finish_when"] - v_duration;
                            video_animation["video_startpoint"] = v_start_when;
    
                            video_animation = ac_vi_adaptation(block, video_animation);
                            video_animation["anim_name"] = data_num;
    
                            animation_data["section_" + i]["about_anims"]["data_" + data_num] = video_animation;
                            block.classList.add("anim_num_" + data_num);
                            
                            animation_generate_list.push([]);

                            // seekto ..
    
                            // iframe の id を取得し、リストに加える.
                            // そのリストの長さを測り、その数字を yt_？ というidに持ったdiv要素に置換.
                            iframe_adaptation(block);
    
                        } else if (block.lastElementChild.tagName == "TEXTAREA") {
                            textarea_adaptation(block);
                        }
    
                        block.classList.add(the_classname);            
                        object_setter(block, the_big_section);
                    }
                } else {
                    // start_animationとend_animationの両方を構成する.
                    let start_animation = base_setup(block, j, "start");
                    let generative_data_start = generationdata_setup(block, "start");
    
                    let final_animation_start = animationdata_setup(block, start_animation, generative_data_start);

                    for (let k = 0; k < final_animation_start.length; k++) {
                        data_num += 1;
                        animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_start[j];
                    }
    
                    let end_animation = base_setup(block, j + 1, "end");
                    
                    console.log(end_animation);
                    let generative_data_end = generationdata_setup(block, "end");
                    console.log(generative_data_end);

                    let final_animation_end = animationdata_setup(block, end_animation, generative_data_end);
                    for (let k = 0; k < final_animation_end.length; k++) {
                        data_num += 1;
                        animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_end[j];
                    }

                    console.log(final_animation_end);

                    // video属性の場合は追加で video_animation を作成.
                    if (block.classList.contains("video")) {
                        data_num += 1;
                        let video_animation = {};

                        video_animation["trigger_when"] = j * 5;
                        video_animation["finish_when"] = video_animation["trigger_when"] + 5;
                        video_animation["video_startpoint"] = Number(v_start_when);
                        video_animation = ac_vi_adaptation(block, video_animation);
    
                        animation_data["section_" + i]["about_anims"]["data_" + data_num] = video_animation;
    
                        let object_you = iframe_adaptation(block);
    
                        the_big_section.appendChild(object_you);
                    } else if (block.lastElementChild.tagName == "TEXTAREA") {
                        textarea_adaptation(block);
                    }
    
                    block.classList.add(the_classname);
                    object_setter(block, the_big_section);
                }
            }
        } else {
            let block = verticals[0];
            textarea_adaptation(block);
            object_setter(block, the_big_section);
        }
    }

    caset.appendChild(the_big_section);

    // 最後の総召集.
    animation_data["section_" + i]["about_time"]["section_current_time"] = 0;
}

let be = screen.children;
for (let i = be.length - 1; i >= 0 ; i--) {
    be[i].remove();
}

screen.appendChild(caset);

// 以下iframe一元化プログラム.
let sections = screen.children;

for (let i = 0; i < sections.length; i++) {
    let final_big_objects = sections[i].children;
    for (let o = final_big_objects.length - 1; o >= 0; o--) {
        if (final_big_objects[o].classList.contains("same_deletable")) {
            let the_deletable_key = "same_id_" + target_data(final_big_objects[o], "same_id_");
            if (section_deletable_list.indexOf(the_deletable_key) == -1) {
                // 新種なので.
                section_deletable_list.push(the_deletable_key);
                let will_deleted = document.getElementsByClassName(the_deletable_key);
                for (let l = will_deleted.length - 1; l >= 0; l--) {
                    if (! will_deleted[l].isEqualNode(final_big_objects[o])) {
                        let del_list = will_deleted[l].classList;
                        for (let j = 0; j < del_list.length; j++) {
                            if (del_list[j].indexOf("same_num_")) {
                                // 移し替えて一元化.
                                final_big_objects[o].classList.add(del_list[j]);
                            }
                        }
                    }
                }
                for (let l = will_deleted.length - 1; l >= 0; l--) {
                    if (! will_deleted[l].isEqualNode(final_big_objects[o])) {
                        console.log(will_deleted[l]);
                        will_deleted[l].remove();
                    }
                }
            }
    
            // このために残してきたクラスを今消すよ.
            classmover(final_big_objects[o], final_big_objects[o], "same_deletable", "remove");
            classmover(final_big_objects[o], final_big_objects[o], "same_id_", "remove");
        }
    }

    if (sections[i].childElementCount > 1) { 
        sections[i].classList.add("linear");
        // linearnativeのリニアにて最初の要素は描画しておくようにするため.
        console.log(sections[i].firstElementChild);
        sections[i].firstElementChild.classList.add("fire");
    } else {
        sections[i].classList.add("non");
    }
}

// HTMLファイルのエクスポート.
let final_dom = String(screen.innerHTML);
fetch('../js/exportable/commons/index_head.html') 
.then(response => response.text()) 
.then(data => { 
    the_html += data;
    the_html += final_dom;

    fetch('../js/exportable/commons/index_bottom.html')
    .then(response => response.text()) 
    .then(data_second => { 
        the_html += data_second;
        zip.file('index.html', the_html);
    });
    
});

// CSSファイルのエクスポート
let css_url = '../js/exportable/commons/style.css';
let css_res = await fetch(css_url);
let cb = await css_res.text();
zip.file('style.css', cb);

// JavaScriptファイル群のエクスポート. (commons系列)
let lnjs_url_list = ["../js/exportable/commons/javascript/anim.js", "../js/exportable/commons/javascript/states.js", "../js/exportable/commons/javascript/setup.js", "../js/exportable/commons/javascript/parts.js"];
for (let i = 0; i < lnjs_url_list.length; i++) {
    let url = lnjs_url_list[i];
    let res = await fetch(url);
    let text = await res.text();
    if (i == 1) {
        let final_animation_generate_list =  "let animation_generate_list = " + JSON.stringify(animation_generate_list) + ";";
        text = final_animation_generate_list + text;
    }
    if (i == 2) {
        let final_yt_id_list =  "let yt_id_list = " + JSON.stringify(yt_id_list) + ";";
        text = final_yt_id_list + text;
    }
    let the_e_num =  url.indexOf(".js");    
    let the_name =  url.slice(36, the_e_num) + ".js";
    zip.folder("javascript").file(the_name, text);
}

// JavaScriptファイルのエクスポート, (in Base)
let base_file = await fetch("../js/exportable/commons/javascript/base/tools.js");
let base_text = await base_file.text();
zip.folder("base").file("tools.js", base_text);

// image ファイル群のエクスポート. 
let img_url_list = ["../js/exportable/commons/images/native_logod.png", "../js/exportable/commons/images/olo.png", "../js/exportable/commons/images/spinner.png"];
for (let i = 0; i < img_url_list.length; i++) {
    let url = img_url_list[i];
    let res = await fetch(url);
    let img = await res.blob();
    let the_e_num =  url.indexOf(".png");
    let the_name =  url.slice(32, the_e_num) + ".png";
    zip.folder("images").file(the_name, img);
}

// JavaScriptファイルのエクスポート. (main.js)
let final_animation_data = "let animation_data = " + JSON.stringify(animation_data) + ";";
the_js = the_js + final_animation_data;
let main_res = await fetch("../js/exportable/commons/javascript/main.js");
let main_text = await main_res.text();
the_js = the_js + main_text;
zip.folder("javascript").file("main.js", the_js);

// img ファイルのエクスポート.
for (let i = 0; i < images.length; i++){
    zip.folder("images").file('img_'+[i]+'.png', images[i].split(',')[1], {base64: true});
}

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