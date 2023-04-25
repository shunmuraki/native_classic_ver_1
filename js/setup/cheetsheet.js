import { focus_checker, blur_checker } from "../function/general";

// 以下チートシートの表示関連
// チートシートをJSONから動的に読み込むようにする。

// box を作って、中に引数に渡した文字列を配置する、ブロックの生成関数
let cs_flex = document.querySelector(".cs_flex");
let cs = document.querySelector(".cheet_sheet");

// 今のチートシートをJSON形式にする.
async function getCheetsheet() {
    const response = await fetch(
      "../cheetsheet.json"
    );
    const data = await response.json();
    return data;
}

// e = key
// f = value
const cheetsheet_block_maker = (e, f) => {
    // box
    let box = document.createElement("div");
    // h4
    let title = document.createElement("h4");
    title.textContent = String(e);
    // p
    let desc = document.createElement("p");
    desc.textContent = String(f);
    box.classList.add("box");
    box.appendChild(title);
    box.appendChild(desc);
    
    // 挿入
    cs_flex.appendChild(box);
}

// json からループで ブロック生成関数にデータを渡すループ処理
// const native_usages = getCheetsheet;

for (let key in native_usages) {
    let v = native_usages[key];
    cheetsheet_block_maker(key, v);
}

if (cs) {
    cs.style.top = 100 + "%";
}

let csb = document.querySelector(".usage_button");
// デフォルトのセットアップ
csb.classList.add("off");
csb.addEventListener("click", () => {
    let centering = document.querySelector(".centering");
    if (csb.classList.contains("on")) {
        cs.animate(
            [
                { top: '0%' },
                { top: '100%' }
            ], {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out"
            }
        );
        focus_checker(centering);
    } else if (csb.classList.contains("off")) {
        blur_checker(centering);
        cs.animate(
            [
            { top: '100%' },
            { top: '0%' }
            ], {
            duration: 600,
            fill: "forwards",
            easing: "ease-in-out"
        }
        );
    }
    csb.classList.toggle("on");
    csb.classList.toggle("off");
})