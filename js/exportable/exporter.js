let the_values = new Array();

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

let screen = document.querySelector(".screen");
const button = document.querySelector(".button");

button.addEventListener("click", () => {
    // textarea が innerHTMLではコピーされないため別に配列を用意して export.html側で再度同じ状況を再現.
    let write_areas = document.querySelectorAll(".write_area");
    for (let i = 0; i < write_areas.length; i++) {
        let the_value = write_areas[i].value;
        the_values.push(the_value);
    }

    let output_doms = screen.innerHTML;
    sessionStorage.setItem("output", output_doms);
    sessionStorage.setItem("the_values", JSON.stringify(the_values));

    // ここに一枚カバーが入る.
    let redirect_cover = document.createElement("div");
    redirect_cover.classList.add("redirect_cover");
    screen.after(redirect_cover);

    // ページ遷移のアニメーション.
    let rc = document.querySelector(".redirect_cover");
    rc.animate(
        [
        { opacity: 0, },
        { opacity: 1 }
        ], {
        duration: 800,
        fill: "forwards"
        }
    );

    // ボタンが押されたら、sessionStorageにDOMを保存して into.html へ遷移.
    setTimeout(() => {
        window.location.href = "export.html";
        let centering_content = document.querySelector(".centering").lastElementChild;
        if (centering_content.tagName == "TEXTAREA") {
            centering_content.focus();
        }
    }, 1000) 

    // エディターに戻った際にカバーを取り外す.
    setTimeout(() => {
        rc.remove();
    }, 3000)
});