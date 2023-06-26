// * 今のチートシートをJSON形式にする.
async function getCheetsheet() {
    let response = await fetch(
      "../cheetsheet.json"
    );
    let data = await response.json();
    return data;
}

// * チートシートの項目を作成して追加.
const cheetsheet_block_maker = (title_text, desc_text) => {
    let container = document.querySelector(".cs_flex");
    let cs = document.querySelector(".cheet_sheet");
    let csb = document.querySelector(".usage_button");
    // * <div class="box"> を生成.
    let box = document.createElement("div");
    // * <h4> を生成.
    let title = document.createElement("h4");
    title.textContent = String(title_text);
    // * <p> を生成.
    let desc = document.createElement("p");
    desc.textContent = String(desc_text);
    box.classList.add("box");
    box.appendChild(title);
    box.appendChild(desc);
    // * 挿入,
    container.appendChild(box);
}