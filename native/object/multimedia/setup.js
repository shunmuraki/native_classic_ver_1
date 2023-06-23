// * <textarea> 内に記述された YouTube動画ID から YT Player を生成し、
// * player を返す関数.
export const video_loading_setup_initial = (e, f) => {
    let player;
    let duration_time;
    var done = false;
    let the_box = document.getElementById(e).parentElement;
    the_box.style.height = 225 + "px";
    the_box.classList.add("video");
    onYouTubeIframeAPIReady(e, f);
    return player;
}

export const image_loading_setup_initial = () => {
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.setAttribute("type", "file");
    
    let inputs = document.getElementsByClassName("list_wrapper").length;
    input.id = "media_input" + inputs;
    input.classList.add("thisisinput" + inputs);
    
    label.setAttribute("for", input.id);
    label.appendChild(input);
    
    let multi_fragment = document.createDocumentFragment();
    multi_fragment.append(label);

    // * ブロック内の <textarea> を削除して <img> に置換.
    e.lastElementChild.remove();
    e.classList.add("img");
    e.appendChild(multi_fragment);
    e.style.height = 225 +  "px";

    input.setAttribute("accept", ".png");
    label.classList.add("image_input");
    let uploaded_multi_media = document.createElement("img")    
    e.appendChild(uploaded_multi_media);
}