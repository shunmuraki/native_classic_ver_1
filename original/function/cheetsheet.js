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
    let cs = document.querySelector(".cheet_sheet");
    let cs_flex = document.querySelector(".cs_flex");
    let csb = document.querySelector(".usage_button");
    // * <div class="box"> を生成.
    let box = document.createElement("div");
    // * <h4> を生成.
    let title = document.createElement("h4");
    title.textContent = String(e);
    // * <p> を生成.
    let desc = document.createElement("p");
    desc.textContent = String(f);
    box.classList.add("box");
    box.appendChild(title);
    box.appendChild(desc);
    // * 挿入,
    cs_flex.appendChild(box);
}