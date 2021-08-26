(function (doc, win) {
    var docEL = doc.documentElement;
    // 判断窗口有没有 orientationchange 这个方法，有就赋值给一个变量，没有就返回resize方法
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    // 这个值与编辑器设置的1rem值相对应
    var domfontSize = 14;
    var UA = navigator.userAgent;
    var recalc = function () {
        if (UA.toLowerCase().indexOf('iphone') !== -1 || UA.toLowerCase().indexOf('android') !== -1) {
            doc.querySelector('[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
        }

        var _Width = Math.min(docEL.clientWidth, window.innerWidth);
        if (!_Width) return;
        // 注意这里除的是375，domfontSize 是 50；（对应750设计图的100px）
        docEL.style.fontSize = domfontSize * (_Width / 375) + 'px';
    }
    recalc()
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    // doc.addEventListener('DOMContentLoaded', recalc, false); // 绑定浏览器缩放与加载时间

})(document, window)