// エクスポート機能を担うステータスバーを index.htmlとリンク先の export.html に挿入,
let the_footer = document.createElement("div");
the_footer.classList.add("statusbar");

let the_button = document.createElement("a");
the_button.classList.add("button");
the_button.innerText = "Export Article";
the_footer.appendChild(the_button);

let the_text = document.createElement("p");
the_text.innerHTML = "This is Native, new writing interface produced by Odds Inc. <br>Corporate Site: <a href='https://odds-inc.com' class='url'>odds-inc.com</a>";
the_footer.appendChild(the_text);

let the_script = document.getElementsByTagName("script")[0];
the_script.before(the_footer);