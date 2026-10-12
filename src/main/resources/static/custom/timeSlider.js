const slideSetting = {
    dataList: [],
    timer: null,
    intervalTime: 1000,
    currentImageOverlay: null,
    preloadedImages: [],

    // 요소들을 매번 동적으로 바인딩하기 위해 내부 헬퍼 함수로 대체 관리합니다.
    getElements: function() {
        return {
            $range: $('#timeRange'),
            $display: $('#contentDisplay'),
            $playBtn: $('#playBtn'),
            $pauseBtn: $('#pauseBtn')
        };
    }
}

// 화면 및 슬라이더 바 위치 동기화
function updateSliderDisplay(index) {
    const app = slideSetting;
    const els = app.getElements();

    // 요소가 아직 생성되지 않았다면 실행 중지
    if (els.$range.length === 0 || els.$display.length === 0) return;

    // 데이터 방어 코드
    if (!app.dataList || app.dataList.length === 0) {
        els.$display.text("표시할 데이터가 없습니다.");
        return;
    }
    if (index < 0 || index >= app.dataList.length) return;

    // display
    els.$range.val(index);

    let currentText = app.dataList[index];
    let labelName = (currentText.split("/").pop()).replace("_web.png", "")
    els.$display.text(labelName);
    els.$display.text("test image name");

    if (app.currentImageOverlay) {
        map.removeLayer(app.currentImageOverlay);
    }

    const imageUrl = currentText;
    const latLngBounds = L.latLngBounds([
        [-10.0, 38.2],
        [-4.8, 43]
    ]);

    // 버퍼링 개선사항
    // 선 로드
    const nextLayer = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 1,
        interactive: true
    }).addTo(map);

    // 후 삭제
    if (app.currentImageOverlay) {
        map.removeLayer(app.currentImageOverlay);
    }

    app.currentImageOverlay = nextLayer;
}

// play
function startSlider() {
    const app = slideSetting;
    const els = app.getElements();

    // 데이터가 없거나 1개 이하이면 재생할 필요가 없음
    if (app.dataList.length <= 1) {
        alert("선택된 데이터가 1개이므로, 재생되지 않습니다.")
        return;
    }
    if (app.timer) return;

    app.timer = setInterval(function() {
        const currentEls = app.getElements();
        if (currentEls.$range.length === 0) {
            stopSlider();
            return;
        }

        let currentIndex = Number(currentEls.$range.val());
        const maxIndex = Number(currentEls.$range.attr('max'));

        // 마지막 아이템에 도달하면 정지
        if (currentIndex >= maxIndex) {
            stopSlider();
            return;
        }

        currentIndex++;
        updateSliderDisplay(currentIndex);
    }, app.intervalTime);
}

// stop
function stopSlider() {
    const app = slideSetting;
    if (app.timer) {
        clearInterval(app.timer);
        app.timer = null;
    }
}

// 특정 이벤트에서 dataList가 변경될 때 호출하는 함수
function updateSliderData(newList){
    const app = slideSetting;

    stopSlider();
    if (app.currentImageOverlay) {
        map.removeLayer(app.currentImageOverlay);
        app.currentImageOverlay = null;
    }

    app.dataList = newList || [];
    app.preloadedImages = [];

    app.dataList.forEach(function (url) {
        if (url && typeof url === 'string' && url.trim() !== '') {
            var img = new Image();
            img.src = url;
            app.preloadedImages.push(img);
        }
    })

    // 현재 화면에 생성되어 있는 요소를 잡아서 세팅
    const els = app.getElements();
    if (els.$range.length === 0) return;

    if (app.dataList.length > 0) {
        els.$range.attr('max', app.dataList.length - 1);
        els.$range.prop('disabled', false); // 슬라이더 활성화
        updateSliderDisplay(0);
    } else {
        els.$range.attr('max', 0).val(0).prop('disabled', true);
        els.$display.text("데이터가 존재하지 않습니다.");
    }
}

$(document).ready(function () {
    // 슬라이더 직접 드래그 및 수동 조작 이벤트 위임
    $(document).on('input change', '#timeRange', function () {
        const selectedIndex = Number($(this).val());
        updateSliderDisplay(selectedIndex);
    });

    // 재생 버튼 클릭 이벤트 위임
    $(document).on('click', '#playBtn', function () {
        startSlider();
    });

    // 일시정지 버튼 클릭 이벤트 위임
    $(document).on('click', '#pauseBtn', function () {
        stopSlider();
    });
})