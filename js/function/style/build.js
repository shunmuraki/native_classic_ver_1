// * 装飾ホイールのレイヤーを生成する関数.
// * e にはタイトルたちを渡す。
const layer_maker = (e) => {
    let container = document.querySelector(".container");
    let layer = document.createElement("div");
    layer.classList.add("style_layer");
    // * 最新のレイヤーにのみ「current_layer」クラスを付与する.
    if (document.getElementsByClassName("current_s_layer")[0]) {
        document.getElementsByClassName("current_s_layer")[0].classList.remove("current_s_layer");
    }
    layer.classList.add("current_s_layer");
    // * レイヤーに、その階層に存在する選択肢を作成し挿入.
    for (let i = 0; i < e.length; i++) {
        let title = e[i];
        let election = document.createElement("div");
        election.textContent = String(title);
        layer.appendChild(election);
    } 
    // * 最後に新しいレイヤーを表示。
    container.appendChild(layer);
}

// * 選択肢を描画する関数.
export const chart_maker = (e) => {
    // * chart.js を併用.
    // * 1. element を作成（ex: <canvas id="sushi_circle" width="500" height="500"></canvas>）
    let c = document.createElement("div");
    c.classList.add("chart");  
    // * 2. これを 2d の canvas に置換し、ここに chart.js で円グラフを描画する。
    let n = e.length;
    let per = 360 / n;
    //　* 選択肢の数をチャートに控える.
    // [* のちのために]
    let the_class = "c_num_" + per;
    c.classList.add(the_class);
    let d = new Array();
    for (let i = 0; i < n; i++) {
        d.push(per);
    }
    // * 最新のチャートを取得（= さっき作った要素）
    let context = c.getContext('2d');
    new Chart(context, {
        type: 'doughnut',
        data: {
        labels: titles,
        datasets: [{
            data: d
        }]
        },
        options: {
        responsive: false,
        }
    });
    // * 追加（描画）
    chartbox.appendChild(c);
}

// * 装飾ホイール上に選択肢のタイトルを表示する関数.
export const title_drawer = (e) => {
    let t = document.createElement("span");
    t.classList.add("title");
    t.textContent = e;
    titlebox.appendChild(t);
}