export const isElementInViewPort = (id) => {
    var el = document.getElementById(id);
    var rect = el && el.getBoundingClientRect();
    return (
        rect &&
        rect.top >= 0 &&
        rect &&
        rect.left >= 0 &&
        rect &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

export const getElementRect = (id) => {
    var el = document.getElementById(id);
    return el.getBoundingClientRect();
};
