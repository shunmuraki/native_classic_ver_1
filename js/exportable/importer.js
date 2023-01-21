// 要素単位でループをさせて、”same”クラスの有無で条件分岐をする。”same”系統のクラスを持っていないのなら、
// trigger_whenを決定した上でそれに + 3 or 5 してfinish_whenとしたアニメーションを追加する。（JS）
import { target_data } from "../base/tools.js";

// ** 書き込み
const zip = new JSZip();
let the_html = "";
let the_js = "";
let the_img_blob_list = {};

console.log("ss");

let data_num = 0;
let animation_data = {};
let animation_generate_list = [];
let yt_id_list = [];

let screen = document.querySelector(".screen");
let caset = document.createDocumentFragment();

// ** ------------------------------------------------------------------------------
// * ここに一枚カバーが入るイメージかな。完成イメージとしてはそんな感じ。

// * animation ...
let button = document.querySelector(".button");
let contents = document.querySelector(".contents");
contents.animate(
    [
      { opacity: 0, },
      { opacity: 1 }
    ], {
      duration: 800,
      fill: "both"
    }
);

// import DOM!
let the_values = JSON.parse(sessionStorage.getItem("the_values"));
let the_output = sessionStorage.getItem("output");
screen.innerHTML = the_output;

// import textarea's VALUE!
let write_areas = document.querySelectorAll(".write_area");
for (let i = 0; i < write_areas.length ; i++) {
    write_areas[i].value = the_values[i];
}

let sp_covers = document.querySelectorAll(".sp_cover");
// ** ------------------------------------------------------------------------------

function ac_vi_adaptation(e, f) {
    
    let classlist = e.classList;
    let animation_data = f;

    for (let i = 0; i < classlist.length; i++) {

        let classname = classlist[i];
        if (classname.indexOf("this_video_st_") != -1) {
            animation_data["video_startpoint"] = Number(target_data(e, "this_video_st_"));
        } else if (classname.indexOf("actuar_time_") != -1) {
            // * ここで秒数に変換.
            let act_num = 5 * (Number(target_data(e, "actuar_time_")) / 300);

            if (classname.indexOf("actuar_st_") != -1) {
                animation_data["trigger_when"] = animation_data["trigger_when"] + act_num;
                // merge,
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

function en_change_adaptation(e, f) {    
    let target = e.nextElementSibling;
    let animation_data = f;

    if (target) {
        if (target.classList.contains("change")) {
            let be_classlist = e.lastElementChild.classList;
            let af_classlist = target.lastElementChild.classList;
    
            let b_data = [];
            let a_data = [];

    
            for (let i = 0; i < be_classlist.length; i++) {
                let classname = be_classlist[i];

                if (classname.indexOf("styling_") !== -1) {
                    // * styling_0_0_0
                    let first = Number(classname.slice(8, 9));
                    let second = Number(classname.slice(10, 11));
                    let third = Number(classname.slice(12, 13));
                    let forth = Number(classname.slice(14, 15));
                    // * 前から9番目と11番目と13番目
                    b_data = [first, second, third, forth];
                }
            }
    
            for (let i = 0; i < af_classlist.length; i++) {

                let classname = af_classlist[i];

                if (classname.indexOf("styling_") != -1) {
                    // * styling_0_0_0_0
                    let first = Number(classname.slice(8, 9));
                    let second = Number(classname.slice(10, 11));
                    let third = Number(classname.slice(12, 13));
                    let forth = Number(classname.slice(14, 15));
                    // * 前から9番目と11番目と13番目
                    a_data = [first, second, third, forth];
                }
            }

            let final_data = [b_data, a_data];
            
            return final_data;
        }
    }
}

function iframe_adaptation(e) {
    let the_content = e.lastElementChild;
    let value_id = target_data(the_content, "this_video_id_");
    yt_id_list.push(value_id);

    let the_name = "yt_" + yt_id_list.length;

    let newElement = document.createElement("div");
    newElement.setAttribute("id", the_name);
    the_content.remove();
    e.appendChild(newElement);
}

function textarea_adaptation(e) {
    let the_content = e.lastElementChild;
    let the_value = the_content.value;

    let newElement = document.createElement("p");
    newElement.innerText = String(the_value);
    the_content.remove();
    e.appendChild(newElement);
}


function object_generation(e) {

    let final_block = e.cloneNode(true);
    let classlist = final_block.classList;
    for (let i = classlist.length - 1; i >= 0 ; i--) {

        final_block.classList.remove(classlist[i]);
    }
    final_block.classList.add("object");
    return final_block;
}

function img_src_getter(e) {
    let target = e.lastElementChild;
    if (target.tagName == "IMG") {
        let the_src = target.getAttribute('src');
        let the_num = Object.keys(the_img_blob_list);
        the_img_blob_list["img_" + the_num] = the_src;

        the_filename = "images/img_" + the_num + ".png";
        target.setAttribute("src", the_filename);
    }
}

function genedata_compare(e, f) {
    // * 値が異なったプロパティをすべて洗い出して、その差分も教えてくれる.
    // * で、データについては [["opacity", 1], ["vertical", -1]] みたいな感じにしたものを戻り値にするのがいいと思った.
    let output = [];

    let vertical_data = f[0] - e[0];
    let horizontal_data = f[1] - e[1];
    let scale_data = f[2] - e[2];
    let opacity_data = f[3] - e[3];

    if (vertical_data != 0) {
        let new_prop_v = ["vertical", f[0]];
        output.push(new_prop_v);
    }
    if (horizontal_data != 0) {
        let new_prop_h = ["horizontal", f[0]];
        output.push(new_prop_h);
    }
    if (scale_data != 0) {
        let new_prop_s = ["scale", f[0]]; 
        output.push(new_prop_s);
    }

    if (opacity_data != 0) {
        let new_prop_o = ["opacity", f[0]];
        output.push(new_prop_o);
    }

    return output;
}

function generationdata_setup(e, f) {
    // e にブロックを渡す。 
    // f には start か end か　common
    let final_data = new Array();
    let anim_blockhas = [];
    
    if (f == "start") {
        // * ここは比較する必要がない
        anim_blockhas = ["opacity", 1];

        // // * このブロックが change を持っていたら
        if (e.classList.contains("change")) {
            // * finish_when = start_when にしてください.
            final_data = [anim_blockhas, 0];
        } else {
            final_data = [anim_blockhas, 1];
        }
        // * これは別のところでやるわ。ここはあくまでanimation生成についてだから.

    } else if (f == "end") {
        // * ここは比較する必要がない
        anim_blockhas = ["opacity", -1];

        // * 次のブロックが changeを持っていたら
        let the_nextblock = e.nextElementSibling;
        if (the_nextblock) {
            if (the_nextblock.classList.contains("change")) {
                // * finish_when = start_when にしてください. 
                let final_data = en_change_adaptation(e);
                anim_blockhas = genedata_compare(final_data[0], final_data[1]); 
            }
        }
        
        final_data = [anim_blockhas, 1];

    } else if (f == "common") {
        // * ここは比較する必要がない
        let before_data = ["opacity", 1];
        let after_data = ["opacity", -1];
        anim_blockhas = [before_data, after_data];
        final_data = [anim_blockhas, 1];

    } 
    
    return final_data;
}


// * 土台のanimationを作る関数
// * VIDEO系列以外！！！
function base_setup(e, f, g) {
    // * e にブロック、
    // * f には j を、
    // * g には start_animation か end_animation かをもらう.
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

function animationdata_setup(e, f, g) {
    // * e には ブロック、
    // * f には土台となるanimation をセットする.
    // * g には anim_blockhas をセットする.
    let the_block = e;
    let the_animation = f;
    let gene_datas = g;
    let the_num = gene_datas.length;

    // * ここで the_num 分のanimationを複製してやる.
    for (let i = 0; i < the_num; i++) {
        // * [最後にやること
        // - anim_name のセット ← animation_generation_list の何番目かの数字を格納.
        // - anim_num のセット
        // - ブロックに anim_num をadd
        let new_typedata = Object.create(the_animation);
        
        // * anim_blockhas の１つを格納し、それとセットになる the_animation にはその length を渡してあげる.
        animation_generate_list.push(gene_datas[i]);

        let the_keynum = animation_generate_list.length;

        new_typedata["anim_name"] = the_keynum;

        let the_name = "anim_num_" + the_keynum;

        the_block.classList.add(the_name);

        let final_animation = ac_vi_adaptation(the_block, new_typedata);

        return final_animation;
    }
}

// ** ------------------------------------------------------------------------------

// * 先に adjuster を消してしまう。整理したいので、
let adjusters = document.querySelectorAll(".adjuster");
for (let i = adjusters.length - 1; i >= 0 ; i--) {
    adjusters[i].remove();
}

// ** ------------------------------------------------------------------------------


for (let i = 0; i < sp_covers.length; i++) {
    let sps = sp_covers[i].children;

    // * section - object 構造へ仕上げる
    // * この中で画像については新しくblobを作成し、リストにpushする。
    let the_big_section = document.createElement("div");
    the_big_section.classList.add("section");

    let section_animation = {};
    let sp_num = sps.length;

    for (let o = 0; o < sp_num; o++) {
        let sp = sps[o];
        let verticals = sp.lastElementChild.children;
        // remove()する前に。
        animation_data[String("section_" + i)] = {};
        animation_data[String("section_" + i)]["about_time"] = {};
        animation_data["section_" + i]["about_anims"] = {};
        animation_data[String("section_" + i)]["about_time"]["section_duration"] = verticals.length * 5;
        
        let here = o + 1;
        let the_classname = "outerstyle_" + sp_num + "_" + here;


        console.log(verticals.length);
        // リニアだけを対象にする。
        if (verticals.length > 1) {
                    for (let j = 0; j < verticals.length; j++) {
                        let block = verticals[j];
            
                        if (block.classList.contains("same")) {
                            if (block.classList.contains("same_start")) {
            
                                // start
                                data_num += 1;
                                img_src_getter(block);
            
                                // * 作っているアニメーションはいくつ？？
                                // ** start_animation
                                let start_animation = base_setup(block, j, "start");
                                let generative_data_start = generationdata_setup(block, "start");
                                let final_animation_start = animationdata_setup(block, start_animation, generative_data_start);    
                                animation_data["section_" + i]["about_anims"]["data" + data_num] = final_animation_start;
            
                                textarea_adaptation(block);
                             
                                block.classList.add(the_classname);
            
                                let object = object_generation(block);
            
                                the_big_section.appendChild(object);
            
                            } else if (block.classList.contains("same_end")) {
            
                                // end
            
                                // * 作っているアニメーションはいくつ？？
                                // ** start_animation
                                data_num += 1;
                                // * - end_animationを作る場所 -
                                let end_animation = base_setup(block, j + 1, "end");
                                let generative_data_end = generationdata_setup(block, "end");
                                let final_animation_end = animationdata_setup(block, end_animation, generative_data_end);
                                animation_data["section_" + i]["about_anims"]["data" + data_num] = final_animation_end;
            
                                // video
                                if (block.classList.contains("video")) {
                                    // * 作っているアニメーションはいくつ？？               
                                    data_num += 1;
            
                                    let video_animation = {};
                                    let the_same_name = "same_num_" + target_data(block, "same_num_");
            
                                    // 同じ same_num_を持つ　same_start について処理
                                    let the_start_elems = document.getElementsByClassName(the_same_name)[0];
            
                                    let v_start_when = Number(target_data(the_start_elems, "this_video_st_"));
                                    let v_end_when = Number(target_data(block, "this_video_st_")) + 5;
                                    let v_duration = Number(v_end_when - v_start_when);
                                
                                    // When .
                                    video_animation["finish_when"] = (j * 5) + 5;
                                    video_animation["trigger_when"] = video_animation["finish_when"] - v_duration;
                                    video_animation["video_startpoint"] = v_start_when;
            
                                    // * tirrger_when, st_
                                    video_animation = ac_vi_adaptation(block, video_animation);
                                    video_animation["anim_name"] = data_num;
            
                                    animation_data["section_" + i]["about_anims"]["data" + data_num] = video_animation;
                                    block.classList.add("anim_num_" + data_num);
            
                                    // iframe の id を取得し、リストに加える。
                                    // そのリストの長さを測り、その数字を yt_？ というidに持ったdiv要素に置換。
                                    iframe_adaptation(block);
            
                                } else if (block.lastElementChild.tagName == "TEXTAREA") {
                                    textarea_adaptation(block);
                                }
            
                                block.classList.add(the_classname);
            
                                let object = object_generation(block);
            
                                the_big_section.appendChild(object);
                            }
                        } else {
                            // start / end
                            data_num += 1;
                            let start_animation = base_setup(block, j, "start");
                            let generative_data_start = generationdata_setup(block, "start");
            
                            let final_animation_start = animationdata_setup(block, start_animation, generative_data_start);
            
                            animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_start;
            
                            data_num += 1;
                            let end_animation = base_setup(block, j + 1, "end");
                            let generative_data_end = generationdata_setup(block, "end");
                            let final_animation_end = animationdata_setup(block, end_animation, generative_data_end);
                            animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_end;
                            // video
                            if (block.classList.contains("video")) {
                                data_num += 1;
                                let video_animation = {};
                                // When .
                                video_animation["trigger_when"] = j * 5;
                                video_animation["finish_when"] = video_animation["trigger_when"] + 5;
                                video_animation["video_startpoint"] = Number(v_start_when);
                                video_animation = ac_vi_adaptation(block, video_animation);
            
                                animation_data["section_" + i]["about_anims"]["data" + data_num] = video_animation;
            
                                iframe_adaptation(block);
            
                                the_big_section.appendChild(object);
                            } else if (block.lastElementChild.tagName == "TEXTAREA") {
                                textarea_adaptation(block);
                            }
            
                            let object = object_generation(block);
                            block.classList.add(the_classname);
            
                            the_big_section.appendChild(object);
                        }
                    }

        }
    }

    caset.appendChild(the_big_section);

    // 最後の総召集.
    animation_data["section_" + i]["about_time"]["section_current_time"] = 0;
    // animation_data["section_" + i] = section_animation;
    console.log(animation_data);
}


let be = screen.children;
for (let i = be.length - 1; i >= 0 ; i--) {
    be[i].remove();
}
screen.appendChild(caset);

// ** ------------------------------------------------------------------------------

// **** HTML GENERATION .
let final_dom = String(screen.innerHTML);
fetch('../js/exportable/commons/index_head.html') // (1) リクエスト送信
.then(response => response.text()) // (2) レスポンスデータを取得
.then(data => { // (3)レスポンスデータを処理

    console.log("hi");
    the_html += data;
    the_html += final_dom;

    fetch('../js/exportable/commons/index_bottom.html') // (1) リクエスト送信
    .then(response => response.text()) // (2) レスポンスデータを取得
    .then(data_second => { // (3)レスポンスデータを処理

        the_html += data_second;
        zip.file('index.html', the_html);
    });
    
});

// * Css GENERATION .
let css_url = '../js/exportable/commons/style.css';
let css_res = await fetch(css_url);
let cb = await css_res.text();
zip.file('style.css', cb);
console.log("hi");

// * ln JS GENERATION .
let lnjs_url_list = ["../js/exportable/commons/javascript/anim.js", "../js/exportable/commons/javascript/states.js", "../js/exportable/commons/javascript/setup.js", "../js/exportable/commons/javascript/parts.js"];
console.log("hi");

for (let i = 0; i < lnjs_url_list.length; i++) {
    console.log("hi");

    let url = lnjs_url_list[i];
    let res = await fetch(url);
    let text = await res.text();

    if (i == 1) {
        let final_animation_generate_list =  "let animation_generate_list = " + JSON.stringify(animation_generate_list) + ";";
        text = final_animation_generate_list + text;
    }

    console.log("hi");
    let the_e_num =  url.indexOf(".js");    

    let the_name =  url.slice(36, the_e_num) + ".js";
    console.log(the_name);

    zip.folder("javascript").file(the_name, text);
}

// **** MAIN GENERATION .
let final_animation_data = "let animation_data = " + JSON.stringify(animation_data) + ";";
let final_yt_id_list =  "let yt_id_list = " + JSON.stringify(yt_id_list);
// ここでようやく成果物を書き込み。
the_js = the_js + final_animation_data + final_yt_id_list;
console.log("hi");

let main_res = await fetch("../js/exportable/commons/javascript/main.js");
let main_text = await main_res.text();
the_js = the_js + main_text;
zip.folder("javascript").file("main.js", the_js);

zip.generateAsync( 
    {type:"blob",
     compression: "DEFLATE",
     compressionOptions: {level: 1} 
    }).then(function (b) {
        const del = new Blob([b], { type: 'application/zip' });
        console.log("hi");
        const uri = URL.createObjectURL(del);
        button.download = 'output.zip';
        button.href = uri;
});