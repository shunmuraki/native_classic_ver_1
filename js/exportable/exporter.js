import { screen } from "../base/elements.js";

let the_values = new Array();

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
        fill: "forwards",
        easing: "ease-in-out"
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