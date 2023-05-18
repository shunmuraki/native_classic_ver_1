let export_space = document.querySelector(".exporter");
let button = document.querySelector(".sb_export").firstElementChild;

// ---------------------------------------------------------------------------------------------------------------

// * HTMLファイルのエクスポート.
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

// * CSSファイルのエクスポート
let css_url = '../linear/style.css';
let css_res = await fetch(css_url);
let cb = await css_res.text();
zip.file('style.css', cb);

// * JavaScriptファイル群のエクスポート. (commons系列)
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
    let the_s_num =  url.indexOf("/javascript/") + String("/javascript/").length;
    let the_e_num =  url.indexOf(".js");
    let the_name =  url.slice(the_s_num, the_e_num) + ".js";
    zip.folder("javascript").file(the_name, text);
}

// * JavaScriptファイルのエクスポート part. 1
let base_file = await fetch("../linear/javascript/base/tools.js");
let base_text = await base_file.text();
zip.folder("javascript").folder("base").file("tools.js", base_text);

// JavaScriptファイルのエクスポート. part. 2
let final_animation_data = "let animation_data = " + JSON.stringify(get("animation_data")) + ";";
set("the_js", s => s += final_animation_data);
let main_res = await fetch("../linear/javascript/main.js");
let main_text = await main_res.text();
set("the_js", s => s += main_text);
zip.folder("javascript").file("main.js", get("the_js"));

// * 予め用意された image ファイル群のエクスポート. 
let img_url_list = ["../linear/images/native_logod.png", "../linear/images/olo.png", "../linear/images/spinner.png"];
for (let i = 0; i < img_url_list.length; i++) {
    let url = img_url_list[i];
    let res = await fetch(url);
    let img = await res.blob();
    let the_s_num =  url.indexOf("/images/") + String("/images/").length;
    let the_e_num =  url.indexOf(".png");    
    let the_name =  url.slice(the_s_num, the_e_num) + ".png";
    zip.folder("images").file(the_name, img);
}

// * img ファイルのエクスポート.
for (let i = 0; i < images.length; i++){
    zip.folder("images").file('img_'+[i]+'.png', images[i].split(',')[1], {base64: true});
}

// ---------------------------------------------------------------------------------------------------------------

// * 全体を包括する zipファイルのエクスポート.

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

// ---------------------------------------------------------------------------------------------------------------

// * Glimpse との接続

// * DOM
let dom_text = String(screen.innerHTML) + "[:dom]";
final_textcontent += dom_text;
// * 画像
for (let i=0; i < images.length; i++) {
    image_make_it(images[i], i);
}
// * JSON類
let yi_text = JSON.stringify(get("yt_id_list")) + "[:yt_id_list]";
final_textcontent += yi_text;
let ad_text = JSON.stringify(get("animation_data")) + "[:animation_data]";
final_textcontent += ad_text;
let ag_text = JSON.stringify(get("animation_generate_list")) + "[:animation_generate_list]";
final_textcontent += ag_text;
// * glimpse.txt の書き出し
let blob = new Blob([final_textcontent], { type:"text/plain"});
let url = URL.createObjectURL(blob);
let glil = document.querySelector(".glimpse_link");
glil.href = url;
glil.download = "glimpse.txt";

// ---------------------------------------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------------------------------------

// 「編集に戻る」ボタンがクリックされた場合の処理.
let getback = document.querySelector(".additional");
getback.addEventListener("click", () => { 
})