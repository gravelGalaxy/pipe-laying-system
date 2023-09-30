/**
 * 找到没有遍历过的节点中--某个与父节点间距离最小的点（这个父节点肯定是被接受了的,否则key初始化为极大）
 * @param key 数组，到父节点的距离
 * @param visited   数组，保存某个点是否已经加入到集合T中
 * @param parent    数组，保存父节点
 * @returns {number}    找到的与父节点距离最小的点的索引
 */
function minKey (key, visited, parent) {
    //codeAnimation wating...
    let min = INF;                  //集合中点到非集合中点最小值
    let minIndex = -1;              //集合中点到非集合中点最短的边
    // let consideredIndex = -1;       //当前集合中点到非集合中点最短的边
    let consideredEdges = [];
    let consideredPoints = [];
    for (let i = 0; i < visited.length; i++) {
        if (!visited[i]){   //不到最后时刻总会有没有加入到集合中的点
            //对每个没有加入到集合中的点
            // addIntoPointAni(highLightConsideringPoint, i);
            // addIntoEdgeAni(waitOtherAnimation);
            //
            if(parent[i] !== -1 && parent[i] !== undefined) {
                consideredEdges.push(getLine(i, parent[i]));
                consideredPoints.push(i);
            }
            if(key[i] < min) {
                min = key[i];
                minIndex = i;

                if(parent[minIndex] !== -1) {
                    // addIntoPointAni(waitOtherAnimation);
                    // addIntoCodeAni(waitOtherAnimation);
                    // addIntoEdgeAni(highLightConsideringEdge, getLine(minIndex, parent[minIndex]));
                    // consideredEdges.push([minIndex, parent[minIndex]]);
                }
                // consideredIndex = minIndex;
            }

        }


    }
    addIntoCodeAni(highLightCode, "code4");
    if(consideredEdges.length !== 0) addIntoEdgeAni(highLightConsideringEdges, consideredEdges);
    else addIntoEdgeAni(waitOtherAnimation);
    if(consideredPoints.length !== 0) addIntoPointAni(highLightConsideringPoints, consideredPoints);
    else addIntoPointAni(waitOtherAnimation);

    addIntoCodeAni(highLightCode, "code5");
    if(parent[minIndex] !== -1 && parent[minIndex] !== undefined){
        addIntoEdgeAni(ignoreEdgesAndAccept, consideredEdges, getLine(minIndex, parent[minIndex]));
    }
    else{

        addIntoEdgeAni(ignoreEdges, consideredEdges);
    }
    addIntoPointAni(restorePointsAndAccept, consideredPoints, minIndex);
    return minIndex;
}
function prim (graph) {
    adjMatrixToEdges();
    drawEdgesForPrim();

    addIntoCodeAni(highLightCode, "code1");
    addIntoEdgeAni(waitOtherAnimation);
    addIntoPointAni(waitOtherAnimation);
    var key = []; //用来保存到父节点的距离
    var parent = [];  //用来保存父节点是谁
    var visited = []; //用来保存某个点是否已经加入了最小生成树中
    var length = graph.length;
    for (let i = 0; i < length; i++) {
        key[i] = INF;
        visited[i] = false;
    }
    /*动画*/
    let consideredEdges = [];
    let consideredPoints = [];

    addIntoCodeAni(highLightCode, "code2");
    addIntoEdgeAni(waitOtherAnimation);
    addIntoPointAni(waitOtherAnimation);
    parent[0] = -1;
    key[0] = 0;
    addIntoCodeAni(highLightCode, "code3");
    addIntoEdgeAni(waitOtherAnimation);
    addIntoPointAni(waitOtherAnimation);

    /*这里开始主要的过程*/
    for (let i = 0; i < length; i++) {
        let u = minKey(key, visited, parent);

        //第一次得到的应该是初始节点
        visited[u] = true;


        //如果接受了这个点，就要更新与这个点相连接的其他点到已接受点之间的距离
        addIntoCodeAni(highLightCode, "code6");
        addIntoPointAni(waitOtherAnimation);
        addIntoEdgeAni(waitOtherAnimation);
        for (let v = 0; v < length; v++) {
            //找没有被遍历的点v,如果这两个点之间有边graph[u][v]，并且这个边的权重小于现在的权值,循环(即找到最小的权值)
            addIntoCodeAni(highLightCode, "code7");
            addIntoEdgeAni(waitOtherAnimation);
            addIntoPointAni(waitOtherAnimation);
            if (!visited[v] && graph[u][v] && graph[u][v] < key[v]) {
                consideredEdges.push(getLine(u, v));
                consideredPoints.push(v);
                addIntoEdgeAni(highLightConsideringEdge, getLine(v, u));
                addIntoCodeAni(highLightCode, "code8");
                addIntoPointAni(highLightConsideringPoint, v);
                key[v] = graph[u][v];
                parent[v] = u;
                //TODO:到这里才开始连线,更新父节点
            }
        }
        addIntoEdgeAni(ignoreEdges, consideredEdges);
        addIntoCodeAni(waitOtherAnimation, "code8");
        addIntoPointAni(restorePoints, consideredPoints);
        consideredEdges = [];
        consideredPoints = [];
    }
    addIntoCodeAni(highLightCode, "code9");
    addIntoPointAni(waitOtherAnimation);
    addIntoEdgeAni(waitOtherAnimation);
    primDone = true;
    return { parent, key };
}