function makeAdjMatrix () {     //根据标志点创建边，若有n个点，则边的数目为n(n-1)/2
    let distance = 0;

    for (let i = 0; i < Overlays.length; i++) {
        arr[i] = [];
        for (let j = 0; j < Overlays.length; j++) {
            arr[i][j] = 0;
        }
    }
    for (let i = 0; i < Overlays.length; i++) {         //一个点和其他点形成边
        for (let j = i + 1; j < Overlays.length; j++) {
            let pointi = new BMapGL.Point(Overlays[i][0], Overlays[i][1]);
            let pointj = new BMapGL.Point(Overlays[j][0], Overlays[j][1]);
            distance = parseFloat(map.getDistance(pointi, pointj).toFixed(2));
            arr[i][j] = distance;
            arr[j][i] = distance;
        }
    }
    download();
}

//展示的是导入文件后的矩阵
function showAdjMatrix() {
    let num = matrix.length;
    let html = "";
    html += "<table id='matrixTable'>";
    for (let i = 0; i < num; i++) {
        html += "<tr>";
        for (let j = 0; j < num; j++) {
            html += "<td>";
            html += matrix[i][j];
            html += "</td>";
        }
        html += "</tr>";
    }
    const information = document.getElementById("information");
    information.innerHTML = html;
}