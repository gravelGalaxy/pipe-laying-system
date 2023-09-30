// var xmlRequest = new XMLHttpRequest;
/**
 * 将邻接矩阵和点的信息下载
 */
function download()
{
    const graph = {
        "adjMatrix" : arr,
        "vertex"    : Overlays,
    }
    const graph_JSON = JSON.stringify(graph);
    const blob = new Blob([graph_JSON], {
        type: 'application/json'
    })
    const objectURL = URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.href = objectURL;
    aTag.download = "matrix.json";
    aTag.click();
    URL.revokeObjectURL(objectURL);
}

/**
 * 读取JSON文件
 */
document.getElementById("fileInput")
.addEventListener('change', function selectedFileChanged() {
    if(this.files.length === 0){
        console.log("请选择文件！");
        return;
    }

    const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        console.log(reader.result);
        content = reader.result;
        const graph = JSON.parse(content);
        matrix = graph.adjMatrix;
        vertex = graph.vertex;
        showAdjMatrix();
        Overlays = [];
        makeMarkerAccToFile(vertex);
    };
    reader.readAsText(this.files[0]);
});