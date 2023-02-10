// < --------------------------------------------------------------------------------------------------- >

// 普段使っているTools.

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

// < --------------------------------------------------------------------------------------------------- >

// 以下初期セットアップ.
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


// < --------------------------------------------------------------------------------------------------- >

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

// < --------------------------------------------------------------------------------------------------- >

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
function ac_vi_adaptation(e, f, g) {
    let classlist = e.classList;
    let animation_data = f;
    for (let i = 0; i < classlist.length; i++) {
        let classname = classlist[i];
        if (classname.indexOf("this_video_st_") != -1) {
            // JB
            if (g == "active_st") {
                animation_data["video_startpoint"] = Math.floor(Number(target_data(e, "this_video_st_")));
            }
        } 
        if (classname.indexOf("actuar_time_") != -1) {
            // 秒数に変換. (blocksize = 360)
            let act_num = 5 * (Math.floor(Number(target_data(e, "actuar_time_"))) / 360);
            if (classname.indexOf("actuar_st_") != -1) {
                animation_data["trigger_when"] = animation_data["trigger_when"] + act_num;     
                // JB.
                if (g == "active_st") {
                    // actuar を video_startpoint にも反映.
                    if (classname.indexOf('this_video_st_') != -1) {
                        animation_data["video_startpoint"] = animation_data["video_startpoint"] + act_num;
                    }
                }
            } else if (classname.indexOf('actuar_en') != -1) {
                animation_data["finish_when"] = animation_data["finish_when"] - act_num + 5; 
            }
        } 
    }
    return animation_data;
}

// < --------------------------------------------------------------------------------------------------- >

// change クラスから スタイリングの変化前と変化後の値をセットにして返す関数.
function en_change_adaptation(e) {    
    let target = e.nextElementSibling;
    if (target) {
        if (target.classList.contains("change")) {
            let be_classlist = e.lastElementChild.classList;
            // same_end を探してそのクラスを持たせるようにする.
            let af_classlist;
            if (target.classList.contains("same")) {
                if (! target.classList.contains("same_end")) {
                    let the_path = document.getElementsByClassName("same_num_" + target_data(target, "same_num_")).length - 1;
                    let pare = target.parentElement;
                    let the_num = [].slice.call(pare.children).indexOf(target) + the_path;
                    let the_same_end = pare.children[the_num];
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
            return final_data;
        }
    }
}

// yt-IDからyt-iframeを生成するための仮置きのdiv要素をセットする関数.
function iframe_adaptation(e) {
    let the_content = e.lastElementChild;
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
        newElement = document.createElement("p");        
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
        if (classlist[i].indexOf("same_id_") == -1 && classlist[i].indexOf("same_deletable") == -1 && classlist[i].indexOf("anim_num_") == -1 && classlist[i].indexOf("outerstyle_") == -1) {
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
    return output;
}

// animation_generate_list に格納するデータを生成して返す関数.
function generationdata_setup(e, f) {
    let final_data = new Array();
    let anim_blockhas = [];
    if (f == "start") {
        // 比較する必要がない.
        anim_blockhas = ["opacity", 1];
        // このブロックが change を持っていたら
        if (e.classList.contains("change")) {
            // finish_when = trigger_when.
            final_data = [[anim_blockhas, 0]];
        } else {
            final_data = [[anim_blockhas, 1]];
        }
    } else if (f == "end") {
        //  比較する必要がない.
        final_data = [[["opacity", 0], 1]];
        // 次のブロックが changeを持っていたら
        let the_nextblock = e.nextElementSibling;
        if (the_nextblock) {
            if (the_nextblock.classList.contains("change")) {
                let f_data = en_change_adaptation(e);
                // * e: [0,0,0,0] - [1,1,1,1]
                final_data = genedata_compare(f_data[0], f_data[1]); 
                // * → [["vertical", 0], ["scale", 2]]            
            }
        }
    } 
    return final_data;
}

// 土台のanimationを作る関数 (VIDEOを除く)
function base_setup(e, f, g) {
    let new_animation = {};
    new_animation["trigger_when"] = f * 5;
    if (e.classList.contains("change") && g == "start") {
        new_animation["finish_when"] = new_animation["trigger_when"];
    } else {
        new_animation["finish_when"] = new_animation["trigger_when"] + 1;
    }
    new_animation["video_startpoint"] = 0;
    return new_animation;
}

// animation_generate_list と animation_data を紐付け、前者にデータを格納して後者をアップデートして返す関数.
function animationdata_setup(e, f, g, h) {
    let the_block = e;
    let the_animation = f;
    let gene_datas = g;
    let the_num = gene_datas.length;
    let animations = [];
    // [処理内容]
    // the_num 分のanimationを複製　→
    // anim_name のセット. ← animation_generation_list の何番目かの数字を格納.
    // anim_num のセット.
    // ブロックに anim_num をadd.
    for (let i = 0; i < the_num; i++) {
        // let new_typedata = Object.create(the_animation);
        let new_typedata = JSON.parse(JSON.stringify(the_animation));
        let new_gene_datas = JSON.parse(JSON.stringify(gene_datas));
        // anim_blockhas の１つを格納し、それとセットになる the_animation にはその length を渡してあげる.
        let the_value = new_gene_datas[i];
        let the_keynum = animation_generate_list.length + 1;
        new_typedata["anim_name"] = the_keynum;
        let the_name = "anim_num_" + the_keynum;
        the_block.classList.add(the_name); 
        let final_animation = ac_vi_adaptation(the_block, new_typedata, h);
        animation_generate_list.push(the_value);
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

// < --------------------------------------------------------------------------------------------------- >

// section - object 構造へ仕上げる. この中で画像はリストにpushする。
for (let i = 0; i < sp_covers.length; i++) {
    
    let sps = sp_covers[i].children;
    let the_big_section = document.createElement("div");
    the_big_section.classList.add("section");
    let sp_num = sps.length;

    animation_data[String("section_" + i)] = {};
    animation_data[String("section_" + i)]["about_time"] = {};
    animation_data["section_" + i]["about_anims"] = {};
    
    for (let o = 0; o < sp_num; o++) {
        
        let sp = sps[o];
        let verticals = sp.lastElementChild.children;
        
        if (! animation_data[String("section_" + i)]["about_time"]["section_duration"]) {
            animation_data[String("section_" + i)]["about_time"]["section_duration"] = ((verticals.length + 1) * 5) + 1;
        }
        
        let here = o + 1;
        let the_classname = "outerstyle_" + sp_num + "_" + here;
        the_big_section.classList.add("section_" + i);

        // hor の中のブロックが複数　or sameを持つブロックがひとつ入っている 場合に = true にして以下のブロックごとのループや linear クラスの付与を実行.
        let desider = false;
        if (verticals.length > 1) {
            desider = true;
            the_big_section.classList.add("linear");
        } else  {
            if (verticals.firstElementChild.classList.contains("video") && verticals.firstElementChild.classList.contains("same")) {
                desider = true;
                verticals.firstElementChild.classList.add("onlyone");
            }
        }
        // 最後の要素は表示したままにしたいため.
        sp.lastElementChild.firstElementChild.classList.add("opening");
        sp.lastElementChild.lastElementChild.classList.add("ending");
        // リニアだけを対象にする.
        // adjuster は削除済み.
        if (desider) {

            for (let j = 0; j < verticals.length; j++) {
                let block = verticals[j]; 
                img_src_getter(block);

                if (block.classList.contains("same")) {
                    // たぶん same_num は絶対一緒にはならないよ. 分裂させてるんだもん. 
                    // なので「id_is_」で判別するように書いてみようか.
                    let the_same_name = "same_num_" + target_data(block, "same_num_");
                    let the_imp_id = "id_is_" + target_data(block, "id_is_");

                    // [実行内容]
                    // same_start: 直前のブロックが存在した場合に same　を持っていなければ白、持っていても same_num を持っていてその番号が違ったら白.
                    // same_end: 直後のブロックが存在した場合にsameを持っていなければ白、持っていても same_num を持っていてその番号が違ったら白. 
                    // いずれにせよ video_animation は実行する.
                    // ブロックは消さないでおいてみる.
                    if (block.classList.contains("same_start")) {

                        // start_animationを構成する.
                        function video_same_start() {
                            let start_animation = base_setup(block, j, "start");
                            let generative_data_start = generationdata_setup(block, "start");
                            let the_same_name = "same_num_" + target_data(block, "same_num_");
                          
                            // ペアのsame_endを取得
                            let the_passenger = document.getElementsByClassName(the_same_name)[document.getElementsByClassName(the_same_name).length - 1];
                            let final_animation_start = animationdata_setup(the_passenger, start_animation, generative_data_start, "none_st");

                            for (let k = 0; k < final_animation_start.length; k++) {
                                data_num += 1;
                                animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_start[k];
                            }
                        }

                        if (! block.classList.contains("opening")) {
                            if (! block.classList.contains("onlyone")) {
                                if (block.previousElementSibling) {
                                    if (! block.previousElementSibling.classList.contains("same")) {
                                        video_same_start();
                                    } else {
                                        if (! block.previousElementSibling.classList.contains(the_imp_id)) {
                                            video_same_start();
                                        }
                                    }
                                } else {
                                    video_same_start();
                                }
                            }
                        }
    
                    } else if (block.classList.contains("same_end")) {
                        
                        // end_animationを構成する.
                        function video_same_end() {
                            let end_animation = base_setup(block, j + 1, "end");
                            let generative_data_end = generationdata_setup(block, "end");
                            let final_animation_end = animationdata_setup(block, end_animation, generative_data_end, "non_st");
    
                            for (let k = 0; k < final_animation_end.length; k++) {
                                data_num += 1;
                                animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_end[k];
                            }    
                        }

                        if (! block.classList.contains("ending")) {
                            if (! block.classList.contains("onlyone")) {
                                if (block.nextElementSibling) {
                                    if (! block.nextElementSibling.classList.contains("same")) {
                                        video_same_end();
                                    } else {
                                        if (! block.nextElementSibling.classList.contains(the_imp_id)) {
                                            video_same_end();
                                        }
                                    }
                                } else {
                                    video_same_end();
                                }
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
    
                            video_animation = ac_vi_adaptation(block, video_animation, "active_st");
                            video_animation["anim_name"] = animation_generate_list.length + 1;
                            animation_generate_list.push([]);
    
                            animation_data["section_" + i]["about_anims"]["data_" + data_num] = video_animation;

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

                    function for_ind() {
                        // start_animationとend_animationの両方を構成する.
                        let start_animation = base_setup(block, j, "start");
                        let generative_data_start = generationdata_setup(block, "start");

                        // まず block が違う.
                        // あと中身があるかみるべき？
                        let final_animation_start = animationdata_setup(block, start_animation, generative_data_start, "active_st");
    
                        for (let k = 0; k < final_animation_start.length; k++) {
                            data_num += 1;
                            animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_start[k];
                        }
        
                        let end_animation = base_setup(block, j + 1, "end");
                        let generative_data_end = generationdata_setup(block, "end");
                        let final_animation_end = animationdata_setup(block, end_animation, generative_data_end, "active_st");

                        for (let k = 0; k < final_animation_end.length; k++) {
                            data_num += 1;
                            animation_data["section_" + i]["about_anims"]["data_" + data_num] = final_animation_end[k];
                        }
                    }

                    // video属性の場合は追加で video_animation を作成.
                    if (block.classList.contains("video")) {
                        for_ind();
                        data_num += 1;
                        let video_animation = {};
                        video_animation["trigger_when"] = j * 5;
                        video_animation["finish_when"] = video_animation["trigger_when"] + 5;
                        video_animation = ac_vi_adaptation(block, video_animation, "active_st");
                        video_animation["anim_name"] = animation_generate_list.length + 1;
                        animation_generate_list.push([]);
                        animation_data["section_" + i]["about_anims"]["data_" + data_num] = video_animation;
                        block.classList.add("anim_num_" + video_animation["anim_name"]);
                        let object_you = iframe_adaptation(block);
                        the_big_section.appendChild(object_you);
                    } else if (block.lastElementChild.tagName == "TEXTAREA") {
                        // 「sameはないが、リニアである. そして p だが中身はないもの」というのは多く存在する. これをしっかり弾いておく必要がある.
                        if (block.lastElementChild.value !== "") {
                            for_ind();
                            textarea_adaptation(block);
                            block.classList.add(the_classname);
                            object_setter(block, the_big_section);
                        }
                    }
                }
            }
            
        } else {
            let block = verticals[0];
            textarea_adaptation(block);
            object_setter(block, the_big_section);
        }
        if (verticals.length > 1) {
            animation_data["section_" + i]["about_time"]["section_current_time"] = 0;
        }
    }

    // 最後の総召集.
    caset.appendChild(the_big_section);
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
        if (final_big_objects[o]) {
            if (final_big_objects[o].classList.contains("same_deletable")) {
                let the_deletable_key = "same_id_" + target_data(final_big_objects[o], "same_id_");
                if (section_deletable_list.indexOf(the_deletable_key) == -1) {
                    // 新種なので.
                    section_deletable_list.push(the_deletable_key);
                    let will_deleted = document.getElementsByClassName(the_deletable_key);
                    for (let l = will_deleted.length - 1; l >= 0; l--) {
                        if (! will_deleted[l].isEqualNode(final_big_objects[o])) {
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
                    for (let l = will_deleted.length - 1; l >= 0; l--) {
                        if (! will_deleted[l].isEqualNode(final_big_objects[o])) {
                            will_deleted[l].remove();
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
        delete animation_data["section_" + i];
    }
}

// < --------------------------------------------------------------------------------------------------- >

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