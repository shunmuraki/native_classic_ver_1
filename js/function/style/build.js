// - * - [A]を書く
// - JSONの値たちを取得するのは外でやった方がいいんじゃないかと、つまり running_b 側で実行してくれってこと。
// それで、配列をまとめて running_a に流し込むようにする。(running_a は中身があった時に実行される関数です)
const layer_maker = (e) => {
    // e にはタイトルたちを渡す。
    let container = document.querySelector(".container");
    let layer = document.createElement("div");
    layer.classList.add("style_layer");

    // -- 最新のレイヤーにのみ「current_layer」クラスをつけるようにする（つけ外しが必要）
    if (document.getElementsByClassName("current_s_layer")[0]) {
        document.getElementsByClassName("current_s_layer")[0].classList.remove("current_s_layer");
    }
    layer.classList.add("current_s_layer");

    // 選択項目の挿入
    for (let i = 0; i < e.length; i++) {
        let title = e[i];
        let election = document.createElement("div");
        election.textContent = String(title);
        layer.appendChild(election);
    } 
    // 最後に新しいレイヤーを実際に表示しましょう。
    container.appendChild(layer);
}

// e = running_a の titles
export const chart_maker = (e) => {
    // chart.js
    // 1. node を作る（<canvas id="sushi_circle" width="500" height="500"></canvas>）
    let c = document.createElement("div");
    c.classList.add("chart");  

    // 2. これを 2d の canvas に変えて、ここに chart.js で円グラフを描画する。
    let n = e.length;
    let per = 360 / n;
    // chart_rotator にて要素数を得る必要があるので、これをクラスに置いてしまうと楽かと。
    let the_class = "c_num_" + per;
    c.classList.add(the_class);

    let d = new Array();
    for (let i = 0; i < n; i++) {
        d.push(per);
    }
    // 最新のチャートを取得（= さっき作った要素）
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

    // 追加（描画）
    chartbox.appendChild(c);
}

// ***** choose が切り替わるごとにチャートの上にタイトルを描画する関
// 切り替える時には毎回前のタイトルを削除しましょう。
// e = title
export const title_drawer = (e) => {
    let t = document.createElement("span");
    t.classList.add("title");
    t.textContent = e;
    titlebox.appendChild(t);
}
  