// * 装飾ホイールのレイヤーを生成する関数.
// * e にはタイトルたちを渡す。
export const layer_maker = (title_list) => {
    let style_wheel_layer = document.createElement("div");
    style_wheel_layer.classList.add("style_wheel_layer");
    // * 最新のレイヤーにのみ「current_layer」クラスを付与する.
    if (element(".current_wheel_layer")) {
        element(".current_wheel_layer").classList.remove("current_wheel_layer");
    }
    style_wheel_layer.classList.add("current_s_layer");
    // * レイヤーに、その階層に存在する選択肢を作成し挿入.
    for (let i = 0; i < title_list.length; i++) {
        let title = title_list[i];
        let election = document.createElement("div");
        election.textContent = String(title);
        style_wheel_layer.appendChild(election);
    } 
    // * 最後に新しいレイヤーを表示。
    element(".style_wheel_layer_index").appendChild(layer);
}

// * 選択肢を描画する関数.
export const chart_maker = (title_list) => {
    // * chart.js を併用.
    // * 1. element を作成（ex: <canvas id="sushi_circle" width="500" height="500"></canvas>）
    // * 2. これを 2d の canvas に置換し、ここに chart.js で円グラフを描画する。
    let num = title_list.length;
    let per = 360 / num;
    //　* 選択肢の数をチャートに控える.
    // [* のちのために]
    let classname = "c_num_" + per;
    chart.classList.add(classname);
    let new_list = new Array();
    for (let i = 0; i < num; i++) {
        new_list.push(per);
    }
    // * 最新のチャートを取得（= さっき作った要素）
    let context = chart.getContext('2d');
    let chart = new Chart(context, {
        type: 'doughnut',
        data: {
        labels: titles,
        datasets: [{
            data: new_list
        }]
        },
        options: {
        responsive: false,
        }
    });
    // * 追加（描画）
    element(".chartbox").appendChild(chart);
}

// * 装飾ホイール上に選択肢のタイトルを表示する関数.
export const title_drawer = (title) => {
    let title_space = document.createElement("span");
    title_space.classList.add("title");
    title_space.textContent = title;
    element(".titlebox").appendChild(title_space);
}