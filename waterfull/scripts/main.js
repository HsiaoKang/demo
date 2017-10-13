window.onload = function () {
    // document.compatMode ='BackCompat'
    // 布局
    waterfull('main', 'box');
    // 数据加载
    var data = { obj: [{ src: '0.jpg' }, { src: '0.jpg' }, { src: '0.jpg' }, { src: '0.jpg' }, { src: '0.jpg' }, { src: '0.jpg' }] }
    window.onscroll = function () {
        if (checkScrollSlide()) {
            // 模拟
            var oParent = document.getElementById('main');

            for (var i = 0; i < data.obj.length; i++) {
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);

                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);

                var oImg = document.createElement('img');
                oImg.src = './images/' + data.obj[i].src;
                oPic.appendChild(oImg);
            }

            waterfull('main', 'box');
        }

    }
}
window.onresize = function () {
    waterfull('main', 'box');
}
function waterfull(parent, box) {
    // 将parent下所有的 class为 box的元素取出来;
    var oParent = document.getElementById(parent);
    // ie11 以下不支持
    // var oBox = oParent.querySelectorAll(box);

    var oBoxs = getByClass(oParent, box);
    console.log(oBoxs);

    //计算页面的列数
    var oBoxW = oBoxs[0].offsetWidth;
    var pageW = document.documentElement.clientWidth;
    var clos = Math.floor(pageW / oBoxW)
    console.log('列数', clos)

    // 设置main的宽度
    oParent.style.cssText = 'width:' + oBoxW * clos + "px";

    var hArr = [];  // 存储高度
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < clos) {
            hArr.push(oBoxs[i].offsetHeight);


        } else {


            var minH = Math.min.apply(null, hArr);
            // ie9以下不支持indexOf
            // var minInx = hArr.indexOf(minH);

            var minInx = getMinIndex(hArr, minH);


            // 设置位置
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxW * minInx + 'px';

            hArr[minInx] += oBoxs[i].offsetHeight;

        }

    }

}

//  将parent下所有的 class 元素取出来
function getByClass(parent, classN) {
    // 取出所有，遍历 判断
    var startT = new Date().getTime();
    var oBox = [];  // 存储 box
    var oElements = parent.getElementsByTagName('*');

    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == classN) {
            oBox.push(oElements[i])
        }
    }
    var endT = new Date().getTime()
    // console.log('元素get时间', endT - startT + ' ms')
    return oBox;

}

// 取得数组中值的索引
function getMinIndex(arr, num) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == num) {
            return i
        }
    }
}

// 检测是否具备加载数据条件
// 当已加载块的最后一个自身露出屏幕一半时加载下一段数据
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBox = getByClass(oParent, 'box');

    // 距离顶部的距离+自身一半高
    var lastBoxH = oBox[oBox.length - 1].offsetTop + Math.floor(oBox[oBox.length - 1].offsetHeight / 2);
    var scrollT = 0;
    var windowH = 0;
    // 考虑怪癖模式和标准模式
    if (document.compatMode == 'CSS1Compat') {
        scrollT = document.documentElement.scrollTop
        windowH = document.documentElement.clientHeight
        console.log('')

        console.log('Standards mode')
        console.log('body scrollTop:', document.body.scrollTop)
        console.log('doc scrollTop:', document.documentElement.scrollTop)
        console.log('body windowH', document.body.clientHeight)
        console.log('doc windowH', document.documentElement.clientHeight)
        console.log(document.documentElement.scrollTop || document.body.scrollTop)
        console.log(document.documentElement.clientHeight || document.body.clientHeight)
    }
    else if (document.compatMode == 'BackCompat') {
        scrollT = document.body.scrollTop;
        windowH = document.body.clientHeight;
        console.log('Quirks mode')  
        console.log('body scrollTop:', document.body.scrollTop)
        console.log('doc scrollTop:', document.documentElement.scrollTop)
        console.log('body windowH', document.body.clientHeight)
        console.log('doc windowH', document.documentElement.clientHeight)
        console.log(document.documentElement.scrollTop || document.body.scrollTop)
        console.log(document.documentElement.clientHeight || document.body.clientHeight)
        
    } else {
        console.log(document.compatMode)
        scrollT = document.body.scrollTop;
        windowH = document.body.clientHeight;
    }

    

    return lastBoxH < scrollT + windowH ? true : false
}