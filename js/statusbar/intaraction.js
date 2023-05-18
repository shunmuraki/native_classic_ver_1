// * Native のステータスバーにあるオプションすべてにインタラクティブなアニメーション機能を追加.
let els = document.querySelectorAll(".el");
for (let i = 0; i < els.length; i++) {
    els[i].addEventListener("click", () => {
        statusbar_animation(els[i]);
    })
}