const apiUrl = "https://dl.s-dev.ust21.kr/tz-bucket/web_viewer_img"
const latLngBounds = L.latLngBounds([
    [-10.0, 38.2],
    [-4.8, 43]
]);

// leaflet 생성
function createLeafletMap() {
    const map = L.map('map', {
        zoomControl: false,
        zoomSnap: 0.1,
        attributionControl: false,
    }).setView([-7.46, 41.25], 7.5);

    L.control.scale({imperial: true, metric: true}).addTo(map);

    L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {
        minZoom: 2.5,
        maxZoom: 8,
        crs: L.CRS.EPSG4326
    }).addTo(map);
    map.doubleClickZoom.disable();

    return map;
}

// 좌측 메뉴
function getTafiriMenu(){
    const customMenu = L.control({ position: 'topleft' });
    customMenu.onAdd = () => {
        const menuDiv = L.DomUtil.create('div', 'menu-wrapper');
        menuDiv.innerHTML =`
        <h1 class="nav-title"><b>Test Viewer</b></h1>
        <nav class="nav-list">
            <ul>
                <li><a class="button-label" href="/">
                    <i class="bi bi-house-fill"></i><span>Main</span>
                </a></li>
                <li><a class="button-label" href="#">
                    <i class="bi bi-droplet-half"></i><span>SST</span>
                </a></li>
                <li><a class="button-label" href="#">
                    <i class="bi bi-leaf-fill"></i><span>Chl-a</span>
                </a></li>
                <li><a class="button-label" href="/page/same">
                    <i class="bi bi-calendar3-event"></i><span>Same</span>
                </a></li>
                <li><a class="button-label" href="/page/slider">
                    <i class="bi bi-calendar3-week"></i><span>Slider</span>
                </a></li>
                <li><a class="button-label" href="#">
                    <i class="bi bi-bar-chart-line"></i><span>Chart</span>
                </a></li>
            </ul>
        </nav>`
        return menuDiv
    }
    customMenu.addTo(map)

    let customContainer = customMenu.getContainer();
    L.DomEvent.disableClickPropagation(customContainer);
    L.DomEvent.disableScrollPropagation(customContainer);
}

// 데이터 목록 UI 토글
function getTableUIToggle(tableId, btnId) {
    const data_table = document.getElementById(tableId)
    const data_toggle = document.getElementById(btnId)
    data_toggle.addEventListener("click", () => {
        data_table.classList.toggle("is-hidden")

        if (data_table.classList.contains('is-hidden') || data_table.classList.contains('is-collapsed')) {
            data_toggle.textContent = '▼';
        } else {
            data_toggle.textContent = '▲';
        }
    })
}


// 출력된 위성영상 이미지 초기화
function resetImageLayer(){
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }

        let checkUrl = layer._url;
        if (checkUrl && checkUrl.search('google') == -1) {
            layer.remove();
        }
    });
}