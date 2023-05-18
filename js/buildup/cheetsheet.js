let cs = document.querySelector(".cheet_sheet");
let cs_flex = document.querySelector(".cs_flex");
let csb = document.querySelector(".usage_button");

// * 今のチートシートをJSON形式にする.
async function getCheetsheet() {
    const response = await fetch(
      "../cheetsheet.json"
    );
    const data = await response.json();
    return data;
}

// * チートシートの項目を作成して追加.
const cheetsheet_block_maker = (e, f) => {
    // * <div class="box">
    let box = document.createElement("div");
    // * <h4>
    let title = document.createElement("h4");
    title.textContent = String(e);
    // * <p>
    let desc = document.createElement("p");
    desc.textContent = String(f);
    box.classList.add("box");
    box.appendChild(title);
    box.appendChild(desc);
    // * 挿入
    cs_flex.appendChild(box);
}

// * json からループで ブロックを生成する関数 にデータを渡すループ処理.
for (let key in native_usages) {
    let v = native_usages[key];
    cheetsheet_block_maker(key, v);
}

// * 以下チートシートの初期設定.
if (cs) {
    cs.style.top = 100 + "%";
}
csb.classList.add("off");
csb.addEventListener("click", () => {
    let centering = document.querySelector(".centering");
    if (csb.classList.contains("on")) {
        cheetsheet_animation("on");
        focus_checker(centering);
    } else if (csb.classList.contains("off")) {
        blur_checker(centering);
        cheetsheet_animation("off");
    }
    csb.classList.toggle("on");
    csb.classList.toggle("off");
})