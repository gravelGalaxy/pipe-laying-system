/**
 * 根据点击信息创建点
 * @param clickInfo
 */
function addMarker (clickInfo) {        //根据点击调用绘出标志点的方法，并保存标志点的信息，更新标志点的索引
    const iconSize = new BMapGL.Size(32, 32);
    const Icon = new BMapGL.Icon("markerIcon.ico", iconSize);
    const point = new BMapGL.Point(clickInfo[0], clickInfo[1]);
    markers.push(new BMapGL.Marker(point, {icon: Icon,}));
    Overlays.push(clickInfo);
    const markerIndex = markers.length - 1;
    map.addOverlay(markers[markerIndex]);  //将标注点添加到地图上

    const label = new BMapGL.Label(vexIndex, {
        offset: new BMapGL.Size(-5, -40),
    });
    label.setStyle({
        background: "none",
        color: "black",
        border: "none",
        fontSize: "16px",
        fontWeight: "bolder",
    });
    markers[markerIndex].setLabel(label);
    vexIndex++;
    markers[markerIndex].addEventListener("rightclick", function (e) {
        map.removeOverlay(markers[markerIndex]);
        markers.splice(markerIndex, 1);
        deleteOverlayInfo(clickInfo);
    });
}

/**
 * 右键删除标志点，用于在地图上选点时，但是还有错
 * @param clickInfo
 */
function deleteOverlayInfo (clickInfo) {        //删除标志点，并从Overlays数组中删除
    for (let i = 0; i < Overlays.length; i++) {
        if (Overlays[i][0] === clickInfo[0] && Overlays[i][1] === clickInfo[1]) {
            Overlays.splice(i, 1);
            edgeIndex = 0;          //一旦删除标识点，边索引从0开始
        }
    }
}

/**
 * 高亮选中的点
 * @param pointIndex
 */
function highLightAcceptedPoint (pointIndex) {
    const iconSize = new BMapGL.Size(32, 32);
    const Icon = new BMapGL.Icon("red.ico", iconSize);
    markers[pointIndex].setIcon(Icon);
}

/**
 * 高亮正在考虑的单个点
 * @param pointIndex
 */
function highLightConsideringPoint (pointIndex) {
    const iconSize = new BMapGL.Size(32, 32);
    const Icon = new BMapGL.Icon("yellow.ico", iconSize);
    //是红色的不高亮
    if (markers[pointIndex].getIcon().imageUrl === "red.ico") return;
    markers[pointIndex].setIcon(Icon);
}

/**
 * 高亮正在考虑的点
 * @param pointsArray
 */
function highLightConsideringPoints (pointsArray) {
    const iconSize = new BMapGL.Size(32, 32);
    const Icon = new BMapGL.Icon("yellow.ico", iconSize);
    for (let i = 0; i < pointsArray.length; i++) {
        //如果是红色的就不改
        if (markers[pointsArray[i]].getIcon().imageUrl === "red.ico") continue;
        markers[pointsArray[i]].setIcon(Icon);
    }
}

/**
 * 将正在考虑的点恢复成原来状态
 * @param pointsArray
 */
function restorePoints (pointsArray) {
    const iconSize = new BMapGL.Size(32, 32);
    const Icon = new BMapGL.Icon("markerIcon.ico", iconSize);
    for (let i = 0; i < pointsArray.length; i++) {
        //如果是红色的就不恢复
        if (markers[pointsArray[i]].getIcon().imageUrl === "red.ico") continue;
        markers[pointsArray[i]].setIcon(Icon);
    }
}

/**
 * 恢复一些正在考虑的点，接受选中的点
 * @param pointsArray
 * @param point
 */
function restorePointsAndAccept (pointsArray, point) {
    restorePoints(pointsArray);
    highLightAcceptedPoint(point[0]);
}

/**
 * 清除所有标记点
 */
function removeMarkers () {
    map.clearOverlays();
    vexIndex = 0;
    lines = [];
    markers = [];
}

/**
 * 根据文件创建点
 * @param markers   点数组
 */
function makeMarkerAccToFile (markers) {
    removeMarkers();
    for (let i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }
}