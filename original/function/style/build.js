// * 装飾ホイールのレイヤーを生成する関数.
// * e にはタイトルたちを渡す。
export const layer_maker = (e) => {
    let style_wheel_layer = document.createElement("div");
    style_wheel_layer.classList.add("style_wheel_layer");
    // * 最新のレイヤーにのみ「current_layer」クラスを付与する.
    if (element(".current_wheel_layer")) {
        element(".current_wheel_layer").classList.remove("current_wheel_layer");
    }
    style_wheel_layer.classList.add("current_s_layer");
    // * レイヤーに、その階層に存在する選択肢を作成し挿入.
    for (let i = 0; i < e.length; i++) {
        let title = e[i];
        let election = document.createElement("div");
        election.textContent = String(title);
        style_wheel_layer.appendChild(election);
    } 
    // * 最後に新しいレイヤーを表示。
    element(".style_wheel_layer_index").appendChild(layer);
}

// * 選択肢を描画する関数.
export const chart_maker = (e) => {
    // * chart.js を併用.
    // * 1. element を作成（ex: <canvas id="sushi_circle" width="500" height="500"></canvas>）
    let chart = document.createElement("div");
    chart.classList.add("chart");  
    // * 2. これを 2d の canvas に置換し、ここに chart.js で円グラフを描画する。
    let n = e.length;
    let per = 360 / n;
    //　* 選択肢の数をチャートに控える.
    // [* のちのために]
    let the_class = "c_num_" + per;
    chart.classList.add(the_class);
    let d = new Array();
    for (let i = 0; i < n; i++) {
        d.push(per);
    }
    // * 最新のチャートを取得（= さっき作った要素）
    let context = chart.getContext('2d');
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
    element(".chartbox").appendChild(c);
}

// * 装飾ホイール上に選択肢のタイトルを表示する関数.
export const title_drawer = (e) => {
    let title = document.createElement("span");
    title.classList.add("title");
    title.textContent = e;
    element(".titlebox").appendChild(t);
}