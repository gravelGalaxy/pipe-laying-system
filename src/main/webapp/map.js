function mapInit () {       //初始化地图到燕山大学
    const point = new BMapGL.Point(119.52984, 39.9153985);
    map.centerAndZoom(point, 17);
    map.enableDragging();
    listenClick(map);
}

/**
 * 监听点击动作，用来形成标记点
 * @param map
 */
function listenClick (map) {
    map.addEventListener
    ("click",function(e){
        const tlng = e.latlng.lng;
        const tlat = e.latlng.lat;
        const clickInfo = [tlng, tlat];
            addMarker(clickInfo);
        }
    )
}
