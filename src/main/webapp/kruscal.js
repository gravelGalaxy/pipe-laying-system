/**
 * 用来查找根节点
 * @param i 需要查找根节点的节点索引
 * @returns {*}
 */
function findRoot (i) {
    if(parent[i] === i) return i;
    else return findRoot(parent[i]);
}

/**
 * 将i和j连接成一个集合，即设置j的根节点为i的根节点
 * @param i
 * @param j
 * @param edgeIndex
 */
function union (i, j, edgeIndex) {
    const iSet = findRoot(i);
    const jSet = findRoot(j);
    if (iSet !== jSet) {
        addIntoCodeAni(highLightCode, "code5");
        addIntoEdgeAni(highLightChoosenEdge, edgeIndex);
        parent[iSet] = jSet;
        acceptedEdgesNum++;
    }

}

function kruscal () {
    initKruscal();
    while ( edgeIndex < edges.length ) {
        addIntoEdgeAni(highLightConsideringEdge, edgeIndex);
        addIntoCodeAni(highLightCode, "code4");
        if(findRoot(edges[edgeIndex].u) !== findRoot(edges[edgeIndex].v)) {
            union(edges[edgeIndex].u, edges[edgeIndex].v, edgeIndex);

            addIntoCodeAni(highLightCode, "code6");
            addIntoEdgeAni(waitOtherAnimation, edgeIndex);
            if(acceptedEdgesNum >= vertex.length - 1) {
                addIntoCodeAni(highLightCode, "code7");
                addIntoEdgeAni(waitOtherAnimation, edgeIndex);

                addIntoCodeAni(highLightCode, "code9");
                addIntoEdgeAni(waitOtherAnimation,edgeIndex);
                break;
            }
        }
        else{
            addIntoCodeAni(highLightCode, "code8");
            addIntoEdgeAni(ignoreEdge, edgeIndex);
        }
        edgeIndex++;
    }
    kruscalDone = true;
}

function initKruscal () {
    edgeIndex = 0;
    acceptedEdgesNum = 0;
    kruscalDone = false;
    //FIXME:如果地图上有线则将线去掉，还有错误
    if (lines !== undefined) {
        for (let i = 0; i < lines.length; i++) {
            map.removeOverlay(lines[i]);
        }
        lines = [];
    }
    adjMatrixToEdges();
    addIntoEdgeAni(waitOtherAnimation, edgeIndex);
    addIntoCodeAni(highLightCode, "code1");
    edges = quickSort(edges);
    console.log(edges);
    drawEdgesForKruscal();
    addIntoCodeAni(highLightCode, "code2");
    addIntoEdgeAni(waitOtherAnimation, edgeIndex);
    sortRestCheck();
    for (let i = 0; i < vertex.length; i++) {
        parent[i] = i;
    }
}