var Overlays = [];  //保存覆盖物的信息，包括经度纬度和点的标号
var markers = [];   //保存覆盖物(vertex)实体
var parent = [];    //保存根节点
const INF = Number.MAX_SAFE_INTEGER;    //最大安全值
var vexIndex = 0;      //点的标号索引,显示点的序号时用到

/*地图参数*/
var MapOptions = {
    minZoom:17,
    maxZoom:17,
    enableAutoResize:true,
}

/*线段参数*/
var polyLineOptions = {
    strokeColor: "gray",
    strokeWeight: 3,
    strokeOpacity: 0.25,
}

/*初始化地图*/
var map = new BMapGL.Map("container", MapOptions);

/*“边”类*/
class edge {
    u;
    v;
    cost;
    constructor(u, v, cost) {
        this.u = u;
        this.v = v;
        this.cost = cost;
    }
}

var arr = [];       //生成邻接矩阵
var edges = [];
var lines = [];  //与边对应的显示在地图上的线
var statusInited = false;

/*kruscal*/
var edgeIndex = 0;
var acceptedEdgesNum = 0;
var kruscalDone = false;

/*prim*/
var primDone = false;

/*文件*/
var content;
var matrix = [];        //读取的邻接矩阵
var vertex = [];

/*动画缓冲区*/
class codeAnimation{
    func;
    byword;
    message;
    constructor(func,byword) {
        this.func = func;
        this.byword = byword;
        this.getMessage();
    }
    getMessage() {
        const choice = getChoice();
        switch(choice){
            case "Kruscal":{
                 switch(this.byword){
                    case "code1":{
                        this.message = "排序结果如左列表所示";
                        break;
                    }
                    case "code2":{
                        this.message = "初始化已经选择的边集为空集";
                        break;
                    }
                    case "code3":{
                        this.message = "遍历排序后的每一条边，现在选中的边的两个顶点为：" + edges[edgeIndex].u +","+ edges[edgeIndex].v;
                        break;
                    }
                    case "code4":{
                        this.message = "判断添加该边后会不会形成环，即判断选中的边的两个顶点是否在同一集合中";
                        break;
                    }
                    case "code5":{
                        this.message = "选中的边的顶点" + edges[edgeIndex].u + "的根节点为：" + findRoot(edges[edgeIndex].u) +
                            ",另一个顶点" + edges[edgeIndex].v + "的根节点为：" + findRoot(edges[edgeIndex].v) + "两个点的根节点不相等，故将edge加入T";
                        break;
                    }
                    case "code6":{
                        this.message = "判断接受的边的数目是否是点的数目-1,如果是则说明算法结果已经得到。点的数目为：" + vertex.length + ",边的数目为："
                            + acceptedEdgesNum;
                        break;
                    }
                    case "code7":{
                        this.message = "因为接受的边的数目等于点的数目-1,故跳出循环";
                        break;
                    }
                    case "code8":{
                        this.message = "选中的边的顶点" + edges[edgeIndex].u + "的根节点为：" + findRoot(edges[edgeIndex].u) +
                            ",另一个顶点" + edges[edgeIndex].v + "的根节点为：" + findRoot(edges[edgeIndex].v) + "两个点的根节点相等，故忽略这条边";
                        break;
                    }
                    case "code9":{
                        this.message = "最小生成树生成完毕";
                        break;
                    }
                }
                break;
            }
            case "Prim":{
                switch(this.byword){
                    case "code1": {
                        this.message = "初始化已经到达的点的集合T={0};用来保存到父节点距离的数组key全部初始化为INF;用来保存某个点是否在集合T中的数组visited全部初始化为false";
                        break;
                    }
                    case "code2": {
                        this.message = "prim算法准备从点0开始进行，将该点的父节点parent设置为-1,key[0]=0";
                        break;
                    }
                    case "code3": {
                        this.message = "遍历每一个顶点,每一次必有且仅有一个点加入到集合，最终要让所有点加入到集合T中";
                        break;
                    }
                    case "code4": {
                        this.message = "该父节点一定是T集合中的，否则距离为INF";
                        break;
                    }
                    case "code5":{
                        this.message = "将找到的点加入到T集合中";
                        break;
                    }
                    case "code6":{
                        this.message = "更新未在T集合中的点到达在集合中的最短距离，并将该集合中的点设置为父节点，记录该最短路径长";
                        break;
                    }
                    case "code7": {
                        this.message = "对与u相连的每一个不在集合T中的点v,如果这个点比现在的最短路径小则将最短路径设置为该路径长，点v的父节点设置为u,这样能找到能使u--v之间路径最短的点v";
                        break;
                    }
                    case "code8": {
                        this.message = "点v与点u之间的距离比现在所知的最短路径短";
                        break;
                    }
                    case "code9": {
                        this.message = "最小生成树生成完毕";
                        break;
                    }
                }
                if(this.message === undefined) console.log("________________" + this.byword);
                break;
            }
        }

    }
    showCodeAnimation (){
        this.func(this.byword);
        statusInfo(this.message);
    };
}

/**
 * edgeAnimation类,边动画
 * @param func, 边动画函数
 * @param edgeIndex 边索引
 * @param rest, 可能的边索引数组，可以有多个参数，这些参数保存在rest数组中
 */
class edgeAnimation{
    func;
    edgeIndex;
    rest;
    constructor(func, edgeIndex, ...rest) {
        this.func = func;
        this.edgeIndex = edgeIndex;
        this.rest = rest;
    }
    showEdgeAnimation (){
        this.func(this.edgeIndex, this.rest);
    }
}

/**
 * pointAnimation类，点动画
 * @param func, 函数
 * @param pointIndex, 点索引
 * @param rest, 可能的点数组
 * */
class pointAnimation{
    func;
    pointIndex;
    rest;
    constructor(func, pointIndex, ...rest) {
        this.func = func;
        this.pointIndex = pointIndex;
        this.rest = rest;
    }
    showPointAnimation () {
        this.func(this.pointIndex, this.rest);
    }
}

var codeAnimations = [];
var edgeAnimations = [];
var pointAnimations = [];