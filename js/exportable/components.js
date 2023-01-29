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

let the_text = document.createElement("p");
the_text.innerHTML = "This is Native, brand new writing interface produced by Odds Inc. <br>Corporate Site: <a href='https://odds-inc.com' class='url'>odds-inc.com</a>";
the_footer.appendChild(the_text);

let the_script = document.getElementsByTagName("script")[0];
the_script.before(the_footer);