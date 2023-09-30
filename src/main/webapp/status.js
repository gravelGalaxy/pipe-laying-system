/**
 * 初始化kruscal或prim code栏
 */
function initStatus () {
    const choice = getChoice();
    const code = document.getElementById("code");
    switch(choice) {
        case "Kruscal":{
            code.innerHTML = "<p id='code1' class='code'>将生成的几条边按照权重递增排序</p>";
            code.innerHTML += "<p id='code2' class='code'>已经选择的边的集合T = {} </p>";
            code.innerHTML += "<p id='code3' class='code'>for(i = 0; i < edges.length; i++)</p>";
            code.innerHTML += "<p id='code4' class='code'>&emsp;if添加edge = edges[i]不会形成环</p>";
            code.innerHTML += "<p id='code5' class='code'>&emsp;&emsp;将edge加入T中</p>";
            code.innerHTML += "<p id='code6' class='code'>&emsp;&emsp;if edgesNum = VexNum - 1</p>";
            code.innerHTML += "<p id='code7' class='code'>&emsp;&emsp;&emsp;跳出循环</p>"
            code.innerHTML += "<p id='code8' class='code'>&emsp;else忽略edge</p>";
            code.innerHTML += "<p id='code9' class='code'>最小生成树 = T</p>";
            break;
        }
        case "Prim":{
            code.innerHTML = "<p id='code1' class='code'>初始化prim算法</p>";
            code.innerHTML += "<p id='code2' class='code'>parent[0] = -1; key[0] = 0;</p>";
            code.innerHTML += "<p id='code3' class='code'>for(let i = 0; i < length; i++)</p>";
            code.innerHTML += "<p id='code4' class='code'>&emsp;找到没有遍历过的节点中与父节点间距离最小的点u</p>";
            code.innerHTML += "<p id='code5' class='code'>&emsp;T = T U {u}</p>";
            code.innerHTML += "<p id='code6' class='code'>&emsp;for(let v = 0; v < length; v++)</p>";
            code.innerHTML += "<p id='code7' class='code'>&emsp;&emsp;if(v &#8713; T && u和v之间有路径graph[u][v] && graph[u][v] < key[v]</p>";
            code.innerHTML += "<p id='code8' class='code'>&emsp;&emsp;&emsp;key[v] = graph[u][v]; parent[v] = u;</p>"
            code.innerHTML += "<p id='code9' class='code'>最小生成树T结束</p>"
            break;
        }
    }
    statusInited = true;
}

/**
 * 用来解释code
 * @param message 解释的信息
 */
function statusInfo (message) {
    const info = document.getElementById("statusInfo");
    info.innerHTML = "<p id='statusInfo'>" + message + "</p>";
}