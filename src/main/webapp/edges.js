/**
 * 将矩阵转化成edges数组，kruscal用到
 */
function adjMatrixToEdges() {
    let k = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < matrix.length; j++) {
            edges[k] = new edge(i, j, matrix[i][j]);
            k++;
        }
    }
}

/**
 * 通过edges数组创建边
 */
function drawEdgesForKruscal() {
    for (let i = 0; i < edges.length; i++) {
        const pointi = new BMapGL.Point(vertex[edges[i].u][0], vertex[edges[i].u][1]);
        const pointj = new BMapGL.Point(vertex[edges[i].v][0], vertex[edges[i].v][1]);
        lines.push(new BMapGL.Polyline([pointi, pointj], polyLineOptions));
        map.addOverlay(lines[lines.length - 1]);
    }
}

/**
 * 通过邻接矩阵创建边
 */
function drawEdgesForPrim() {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < matrix.length; j++) {
            const pointI = new BMapGL.Point(vertex[i][0], vertex[i][1]);
            const pointJ = new BMapGL.Point(vertex[j][0], vertex[j][1]);
            lines.push(new BMapGL.Polyline([pointI, pointJ], polyLineOptions));
            map.addOverlay(lines[lines.length - 1]);
        }
    }
}

/**
 * 使用prim算法时需要得到地图上的线,但line是一维数组，通过此函数将返回矩阵第i行第j列对应的line
 * @param i 从0开始
 * @param j 从0开始
 * @return index    表示在lines数组中的索引
 */
function getLine (i, j) {
    if (i > j) {
        let temp = i;
        i = j;
        j = temp;
    }
    let index = 0;
    //第一行矩阵索引0～n-1,但对应n-1条边，因为(0,0)不是边;
    //累加0～i-1行
    for (let k = 0, num = vertex.length - 1; k < i; k++, num--) {
        index += num;
    }
    index += j - (i + 1) + 1;     //第i行的矩阵中权重从j=i+1开始,从i+1到j需要这么多个数
    index -= 1;                    //因为边的索引从1开始
    return index;
}

function highLightChoosenEdge (i) {    //高亮选中的边(改变颜色)
    lines[i].setStrokeColor("red");
    lines[i].setStrokeOpacity(1);
}
function highLightConsideringEdge (i) {      //高亮正在进行判断的边（展示遍历的过程）
    if (lines[i].getStrokeColor() === "red") {
        return;
    }
    lines[i].setStrokeColor("yellow");
    lines[i].setStrokeOpacity(0.75);
}
function highLightConsideringEdges (edgesArray) {
    for (let i = 0; i < edgesArray.length; i++) {
        highLightConsideringEdge(edgesArray[i]);
    }
}

/**
 * 忽略边，prim中用作恢复边
 * @param i
 */
function ignoreEdge(i) {
    if (lines[i].getStrokeColor() === "red") {
        return;
    }
    lines[i].setStrokeColor("gray");
    lines[i].setStrokeOpacity(0.10);
}

function ignoreEdges (edgesArray) {
    for (let i = 0; i < edgesArray.length; i++) {
        ignoreEdge(edgesArray[i]);
    }
}

/**
 * 在prim中用来恢复正在考虑的边，并且高亮选中的边
 * @param edgesArray
 * @param edge
 */
function ignoreEdgesAndAccept (edgesArray, edge) {
    ignoreEdges(edgesArray);
    highLightChoosenEdge(edge);
}