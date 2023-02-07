// 以下エクスポート機能を担うステータスバーを index.html とリンク先の export.html に挿入,
let the_footer = document.createElement("div");
the_footer.classList.add("statusbar");

let button_container = document.createElement("div");
button_container.classList.add("bc");

let the_button = document.createElement("a");
the_button.classList.add("export_button");
the_button.innerText = "Export Article";
button_container.appendChild(the_button);

let the_usage_button = document.createElement("a");
the_usage_button.classList.add("usage_button");
the_usage_button.innerText = "Cheet Sheet";
button_container.appendChild(the_usage_button);

the_footer.appendChild(button_container);


let right_container = document.createElement("div");
right_container.classList.add("rightside");
let icon_img = document.createElement("img");
let the_text = document.createElement("p");
icon_img.src = "img/icon.png";
the_text.innerHTML = "Native, a brand new writing interface produced by Odds Inc. <br>Corporate Site: <a href='https://odds-inc.com' class='url'>odds-inc.com</a>";
right_container.appendChild(icon_img);
right_container.appendChild(the_text);
the_footer.appendChild(right_container);

let the_script = document.getElementsByTagName("script")[0];
the_script.before(the_footer);