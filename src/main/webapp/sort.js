function sortRestCheck () {
    var info = document.getElementById("information");
    info.innerHTML += "<br/><p>SortResult\n";
    for (let i = 0; i < edges.length; i++) {
        info.innerHTML += "第" + i + "条边的两端点及长度为：" + edges[i].u + "----" + edges[i].v + " : " + edges[i].cost + "\n";
        info.innerHTML += "<br/>";
    }
    info.innerHTML += "</p>";
}
function quickSort(edges) {
    if (edges.length === 0 || edges.length === 1) {     //基准条件
        return edges;
    } else {
        var pivot = edges[0];
        var less = [];
        for (let i = 1; i < edges.length; i++) {
                if(edges[i].cost <= pivot.cost) {
                    less.push(edges[i]);
                }
            }
        var more = [];
        for (let i = 1; i < edges.length; i++) {
                if(edges[i].cost > pivot.cost) {
                    more.push(edges[i]);
                }
            }
        return (quickSort(less)).concat([pivot], quickSort(more));         //连接数组
    }
}
// function qsort() {
//
// }