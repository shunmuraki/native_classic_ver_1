import { target_data, classmover } from "./tool.js";

// actuar クラスへの対応や video_startpointのセットなど、 animation_data を更新する関数.
export const ac_vi_adaptation = (e, f, g) => {
    let classlist = e.classList;
    let animation_data = f;
    // まずはsame_end か same_start かだ.
    if (e.classList.contains("same_end")) {
        // 秒数に変換. (blocksize = 360)
        let act_num = 5 * (Math.floor(Number(target_data(e, "actuar_time_"))) / 360);
        act_num = Math.floor(act_num);
        for (let i = 0; i < classlist.length; i++) {
            let classname = classlist[i];
            if (classname.indexOf("this_video_st_") != -1) {
                if (g == "active_st") {
                    animation_data["video_startpoint"] = Math.floor(Number(target_data(e, "this_video_st_")));
                }
            }
            if (classname.indexOf("actuar_time_") != -1) {
                animation_data["finish_when"] = animation_data["finish_when"] - act_num + 5; 
            } 
        }    
    }
    if (e.classList.contains("same_start")) {
        let act_num = 5 * (Math.floor(Number(target_data(e, "actuar_time_"))) / 360);
        act_num = Math.floor(act_num);
        for (let i = 0; i < classlist.length; i++) {
            let classname = classlist[i];
            if (classname.indexOf("actuar_st") != -1) {
                animation_data["trigger_when"] = animation_data["trigger_when"] + act_num;
                if (g == "active_st") {
                    // actuar を video_startpoint にも反映.
                    animation_data["video_startpoint"] = animation_data["video_startpoint"] + act_num;
                }
            } 
        }
    }
    return animation_data;
}

// change クラスから スタイリングの変化前と変化後の値をセットにして返す関数.
export const en_change_adaptation = (e) => {    
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
                if (classname.indexOf("style_") !== -1) {                    
                    // ここ絶対ズレてる！！！！！ (2023.4.18)
                    let first = Number(classname.slice(8, 9));
                    let second = Number(classname.slice(10, 11));
                    let third = Number(classname.slice(12, 13));
                    let forth = Number(classname.slice(14, 15));
                    b_data = [first, second, third, forth];
                }
            }
            for (let i = 0; i < af_classlist.length; i++) {
                let classname = af_classlist[i];
                if (classname.indexOf("style_") != -1) {
                    // ここ絶対ズレてる！！！！！ (2023.4.18)
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
export const iframe_adaptation = (e) => {
    let the_content = e.lastElementChild;
    let value_id = target_data(e, "id_is_");
    yt_id_list.push(value_id);
    console.log(yt_id_list);
    let the_name = "yt_" + String(yt_id_list.length - 1);
    console.log(the_name);
    // same_end 同士見つけあってDOMを節約するために発見用のidをクラスに付与する.
    e.classList.add("iframe");
    e.classList.add("same_deletable");
    e.classList.add("same_id_" + value_id);
    let newElement = document.createElement("div");
    newElement.setAttribute("id", the_name);
    console.log(e);
    the_content.remove();
    console.log(the_content);
    console.log(e);
    e.appendChild(newElement);
    console.log(e);
    return e;
}

// textareaをpタグに置換する関数.
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

// imgタグの親要素に "img" クラスを付与する関数.
export const img_adaptation = (e) => {
    let the_content = e.lastElementChild;
    if (the_content) {
        if (the_content.tagName == "IMG") {
            e.classList.add("img");
            e.classList.add("img_v");
        }
    }
}

// blockから <object> を生成して返す関数.
export const object_generation = (e) => {
    let final_block = e.cloneNode(true);
    let classlist = final_block.classList;
    for (let i = classlist.length - 1; i >= 0 ; i--) {
        if (classlist[i].indexOf("same_id_") == -1 && classlist[i].indexOf("same_deletable") == -1 && classlist[i].indexOf("anim_num_") == -1 && classlist[i].indexOf("outerstyle_") == -1 && classlist[i].indexOf("iframe") == -1) {
            final_block.classList.remove(classlist[i]);
        }
    }
    final_block.classList.add("object");
    return final_block;
}

// 画像のパスを配列に加え、画像のElementにも対応するsrcの値をセットする関数.
export const img_src_getter = (e) => {
    let target = e.lastElementChild;
    if (target) {
        if (target.tagName == "IMG") {
            let the_src = target.getAttribute('src');
            images.push(the_src);
            let the_num = Object.keys(the_img_blob_list).length;
            the_img_blob_list["img_" + the_num] = the_src;
            let the_filename = "images/img_" + the_num + ".png";
            target.setAttribute("src", the_filename);
        }
    }
}

// ２つのスタイリング配列（[0, 0, 0, 0] など）を比較して、そのギャップから animation_generate_list へ格納するデータを生成して返す関数.
export const genedata_compare = (e, f) => {
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
        let new_prop_h = [["horizontal", f[1]], 1];
        output.push(new_prop_h);
    }
    if (scale_data != 0) {
        let new_prop_s = [["scale", f[2]], 1]; 
        output.push(new_prop_s);
    }
    if (opacity_data != 0) {
        let new_prop_o = [["opacity", f[3]], 1];
        output.push(new_prop_o);
    }
    return output;
}

// animation_generate_list に格納するデータを生成して返す関数.
export const generationdata_setup = (e, f) => {
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
                // 移動先で要素をすぐに消す。こっちはあくまでつなぎ役のため.
                // あとで複製した 3（>） 番目のanimationを消せるように多めに値を与えておくのがポイント.
                final_data = genedata_compare(f_data[0], f_data[1]); 
                // * → [["vertical", 0], ["scale", 2]]            
                final_data.push([["opacity", 0], 0, "re"]);
            }
        }
    } 
    return final_data;
}

// 土台のanimationを作る関数 (VIDEOを除く)
export const base_setup = (e, f, g) => {
    let new_animation = {};
    new_animation["trigger_when"] = f * 5;
    if (e.classList.contains("change") && g == "start") {
        // 前の要素のモーションアニメーションの終了を待ってからtriggerさせる.
        new_animation["trigger_when"] = new_animation["trigger_when"] + 1;
        new_animation["finish_when"] = new_animation["trigger_when"];
    } else {
        new_animation["finish_when"] = new_animation["trigger_when"] + 1;
    }
    new_animation["video_startpoint"] = 0;
    return new_animation;
}

// animation_generate_list と animation_data を紐付け、前者にデータを格納して後者をアップデートして返す関数.
export const animationdata_setup = (e, f, g, h) => {
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
        let the_keynum = animation_generate_list.length;
        new_typedata["anim_name"] = the_keynum;
        let the_name = "anim_num_" + the_keynum;
        the_block.classList.add(the_name); 
        // モーション後の opacity: 0 に該当するものかどうかの判別.
        if (new_gene_datas[i][2]) {
            // * 計算上 finish_when はそのまま変更せずに済むので trigger_when の方だけ.
            new_typedata["trigger_when"] = new_typedata["trigger_when"] + 1;           
            // 役目を果たすば現状復帰.
            new_gene_datas[i].pop();
        }
        let the_value = new_gene_datas[i];
        let final_animation = ac_vi_adaptation(the_block, new_typedata, h);
        animation_generate_list.push(the_value);
        animations.push(final_animation);
    }
    return animations;
}

// 仕上がった最後のブロックをobjectにして格納する関数.
export const object_setter = (e, f) => {
    let object_you = object_generation(e);
    classmover(object_you.lastElementChild, object_you, "style_", "add");
    object_you.removeAttribute('style');
    object_you.lastElementChild.removeAttribute("class");
    img_adaptation(object_you);
    f.appendChild(object_you);
}

export const image_make_it = (e, f) => {
    let dec = e.slice(0, 1);
    let the_textdata;
    if (dec == "[") {
        the_textdata = String(e) + "[:img]";
    } else {
        let image = new Image();
        image.src = String(e);
        let canvas = document.createElement("canvas");
        // canvas のサイズを調整しなくちゃ。どうやって画像ファイルのサイズを取得する？
        // どのみちimageタグからとることになるらしい。なるほど、だったら最初からそれで済むかもしれないね.
        // まず HTML でちゃんと画像を表示するようにしなくちゃ.
        // naturalWidth って初めて知ったわ。
        // console.log(img_blocks[f].lastElementChild);
        let w = image.width;
        let h = image.height;
        let d = Math.trunc(w / 1000);
        // リサイズはここでできるよ.
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
    final_textcontent += the_textdata;
}

// start_animationを構成する.
// [引数に渡す必要がある変数]
// え、これ上のやつと統一できるくね？？？？？？？？？？？？
// block 
// * startblock_around で統一

// start_animationを構成する.
// e = block
// f = j
// g = data_num
// h = i
// w = video or not.
// [old]
export const startblock_around = (e, f, g, h, w) => {
    let start_animation = base_setup(e, f, "start");
    let generative_data_start = generationdata_setup(e, "start");
    let the_same_name = "same_num_" + target_data(e, "same_num_");                        
    // ペアのsame_endを取得
    // この部分だけ外に出しましょうかね。
    // let target . もし w = "video" だったら
    // let block = document.getElementsByClassName(the_same_name)[document.getElementsByClassName(the_same_name).length - 1];
    let target;
    if (w == "video") {
        target = document.getElementsByClassName(the_same_name)[document.getElementsByClassName(the_same_name).length - 1];
    } else {
        target = e;
    }

    let final_animation_start = animationdata_setup(target, start_animation, generative_data_start, "none_st");
    for (let k = 0; k < final_animation_start.length; k++) {
        g += 1;
        animation_data["section_" + h]["about_anims"]["data_" + g] = final_animation_start[k];
    }
}

export const endblock_around = (e, f, g, h) => {
    let end_animation = base_setup(e, f + 1, "end");
    let generative_data_end = generationdata_setup(e, "end");
    let final_animation_end = animationdata_setup(e, end_animation, generative_data_end, "non_st");
    for (let k = 0; k < final_animation_end.length; k++) {
        g += 1;
        animation_data["section_" + h]["about_anims"]["data_" + g] = final_animation_end[k];
    }    
}

// [引数に渡す必要がある変数]
// e = block, f = the_imp_id
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