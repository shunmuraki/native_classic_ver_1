let export_space = document.querySelector(".exporter");

// ---------------------------------------------------------------------------------------------------------------

// * DOM
console.log("dom");
let dom_string = String(export_space.innerHTML);
dom_string = dom_string.split('</div>');
dom_string.join('/n');
console.log(dom_string);

// * animation_data
console.log("animation_data");
console.log(get("animation_data"));

// * animation_generate_list
console.log("animation_generate_list");
console.log(get("animation_generate_list"));

// * yt_id_list
console.log("yt_id_list");
console.log(get("yt_id_list"));