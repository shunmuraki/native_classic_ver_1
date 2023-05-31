// * Glimpse との接続
export const native_glimpse = () => {
    // * DOM
    let dom_text = String(element(".default_display").innerHTML) + "[:dom]";
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
    let glimpse_button = document.querySelector(".glimpse_link");
    glimpse_button.href = url;
    glimpse_button.download = "glimpse.txt";

    let glimpse_open_seeking = setInterval(() => {
        if (glimpse_button.classList.contains("change")) {
            // 別タブで開くには？
            window.open("https://glimpse.tokyo/publish.html");
        }
    }, 1000)


    glimpse_button.addEventListener("click", () => {
        glimpse_button.classList.add("change");
        glimpse_open_seeking;
    })
}