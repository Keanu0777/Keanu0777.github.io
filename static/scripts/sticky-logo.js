document.addEventListener('DOMContentLoaded', function() {
    var logo = document.querySelector('.logo-img');
    var bottomRow = document.querySelector('.landing-bottom-row');
    if (!logo || !bottomRow) return;

    var isSticky = false;

    function flipAnimate(applySticky) {
        var first = logo.getBoundingClientRect();

        if (applySticky) {
            logo.classList.add('logo-fixed-top');
        } else {
            logo.classList.remove('logo-fixed-top');
        }

        var last = logo.getBoundingClientRect();

        var dx = first.left - last.left;
        var dy = first.top - last.top;
        var sx = first.width / (last.width || 1);
        var sy = first.height / (last.height || 1);

        logo.style.transformOrigin = 'top left';
        logo.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + sx + ',' + sy + ')';
        logo.getBoundingClientRect();
        logo.style.transition = 'transform 300ms ease';
        logo.style.transform = 'translate(0, 0) scale(1, 1)';

        function cleanup() {
            logo.style.transition = '';
            logo.style.transform = '';
            logo.style.transformOrigin = '';
            logo.removeEventListener('transitionend', cleanup);
        }
        logo.addEventListener('transitionend', cleanup);
    }

    function onScroll() {
        var bottomRowBottom = bottomRow.getBoundingClientRect().bottom;
        var shouldStick = bottomRowBottom <= 160;
        if (shouldStick !== isSticky) {
            flipAnimate(shouldStick);
            isSticky = shouldStick;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
});


