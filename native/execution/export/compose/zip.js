export async function native_zip() {

    let export_space = element(".export_space");

    // ---------------------------------------------------------------------------------------------------------------
    
    // * HTMLファイルのエクスポート.
    let dom_output = String(export_space.innerHTML);
    fetch('../linear/index_head.html') 
    .then(response => response.text()) 
    .then(head_data => { 
        set("output_html", s => s += head_data);
        set("output_html", s => s += dom_output);
        fetch('../linear/index_bottom.html')
        .then(response => response.text()) 
        .then(bottom_data => { 
            set("output_html", s => s += bottom_data);
            zip.file('index.html', get("output_html"));
        });
    });

    // ---------------------------------------------------------------------------------------------------------------
    
    // * CSSファイルのエクスポート
    let css_url = '../linear/style.css';
    let css_res = await fetch(css_url);
    let css_text = await css_res.text();
    zip.file('style.css', css_text);

    // ---------------------------------------------------------------------------------------------------------------
    
    // * JavaScriptファイル群のエクスポート part. 1 (commons系列)
    let lnjs_url_list = ["../linear/javascript/anim.js", "../linear/javascript/states.js", "../linear/javascript/setup.js", "../linear/javascript/parts.js", "../linear/javascript/ytp.js"];
    for (let i = 0; i < lnjs_url_list.length; i++) {
        let url = lnjs_url_list[i];
        let res = await fetch(url);
        let text = await res.text();
        if (i == 1) {
            let animation_front_data_text =  "let animation_front_data = " + JSON.stringify(get("animation_front_data")) + ";";
            text = animation_front_data_text + text;
        }
        if (i == 2) {
            let final_yt_id_list =  "let yt_id_list = " + JSON.stringify(get("yt_id_list")) + ";";
            text = final_yt_id_list + text;
        }
        let start_num =  url.indexOf("/javascript/") + String("/javascript/").length;
        let end_num =  url.indexOf(".js");
        let file_name =  url.slice(start_num, end_num) + ".js";
        zip.folder("javascript").file(file_name, text);
    }
    
    // ---------------------------------------------------------------------------------------------------------------

    // * JavaScriptファイルのエクスポート part. 2
    let tools_file = await fetch("../linear/javascript/base/tools.js");
    let tools_text = await tools_file.text();
    zip.folder("javascript").folder("base").file("tools.js", tools_text);

    // ---------------------------------------------------------------------------------------------------------------
    
    // JavaScriptファイルのエクスポート. part. 3
    let animation_back_data_text = "let animation_data = " + JSON.stringify(get("animation_data")) + ";";
    set("the_js", s => s += animation_back_data_text);
    let main_res = await fetch("../linear/javascript/main.js");
    let main_text = await main_res.text();
    set("the_js", s => s += main_text);
    zip.folder("javascript").file("main.js", get("the_js"));

    // ---------------------------------------------------------------------------------------------------------------
    
    // * 予め用意された image ファイル群のエクスポート. 
    let img_url_list = ["../linear/images/native_logod.png", "../linear/images/olo.png", "../linear/images/spinner.png"];
    for (let i = 0; i < img_url_list.length; i++) {
        let url = img_url_list[i];
        let res = await fetch(url);
        let image_blob = await res.blob();
        let start_num =  url.indexOf("/images/") + String("/images/").length;
        let end_num =  url.indexOf(".png");    
        let file_name =  url.slice(start_num, end_num) + ".png";
        zip.folder("images").file(file_name, image_blob);
    }
    
    // ---------------------------------------------------------------------------------------------------------------

    // * img ファイルのエクスポート.
    for (let i = 0; i < get("images").length; i++){
        zip.folder("images").file('img_'+[i]+'.png', images[i].split(',')[1], {base64: true});
    }
    
    // ---------------------------------------------------------------------------------------------------------------
   
    // * 全体を包括する zipファイルのエクスポート.
    let zip_button = document.querySelector(".zip_button").firstElementChild;
    zip.generateAsync( 
        {type:"blob",
         compression: "DEFLATE",
         compressionOptions: {level: 1} 
        }).then(function (b) {
            const del = new Blob([b], { type: 'application/zip' });
            const uri = URL.createObjectURL(del);
            zip_button.download = 'output.zip';
            zip_button.href = uri;
    });
}