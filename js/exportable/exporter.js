let the_values = new Array();

// ** ページ遷移から
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

    console.log("neee");
    // textarea が innerHTMLではコピーされないので、その配慮。
    let write_areas = document.querySelectorAll(".write_area");
    for (let i = 0; i < write_areas.length; i++) {
        let the_value = write_areas[i].value;
        the_values.push(the_value);
    }

    // ** ------------------------------------------------------------------------------

    let output_doms = screen.innerHTML;
    sessionStorage.setItem("output", output_doms);
    sessionStorage.setItem("the_values", JSON.stringify(the_values));

    // // エディターを現場復帰.
    // for (let i = musks.length; i >= 0; i--) {
    //     musks[i].remove();
    // }

    console.log(sessionStorage.getItem("output"));
    console.log(sessionStorage.getItem("the_values"));

    // * ここに一枚カバーが入るイメージかな。完成イメージとしてはそんな感じ。
    let redirect_cover = document.createElement("div");
    redirect_cover.classList.add("redirect_cover");
    screen.after(redirect_cover);

    // * animation ...
    let rc = document.querySelector(".redirect_cover");
    rc.animate(
        [
        { opacity: 0, },
        { opacity: 1 }
        ], {
        duration: 800,
        fill: "both"
        }
    );

    // ** ボタンが押されたら、sessionStorageにDOMを保存して into.html へ遷移.   
    setTimeout(() => {
        window.location.href = "update.html";
        rc.remove();
        let centering_content = document.querySelector(".centering").lastElementChild;
        if (centering_content.tagName == "TEXTAREA") {
            centering_content.focus();
        }
    }, 800) 
});

// ** ------------------------------------------------------------------------------