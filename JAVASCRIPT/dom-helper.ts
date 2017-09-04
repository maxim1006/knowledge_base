export class UxDomHelper {

    private static zIndex: number = 1000;

    /**
     * hide constructor
     */
    private constructor() {}

    public static nextZIndex(): number {
        return ++UxDomHelper.zIndex;
    }

    public static addClass(element: HTMLElement, className: string): void {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += " " + className;
        }
    }

    public static removeClass(element: HTMLElement, className: string): void {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(
                new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
        }
    }

    public static hasClass(element: HTMLElement, className: string): boolean {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
        }
    }

    public static relativePosition(element: any, target: HTMLElement): void {
        let elementDimensions = element.offsetParent ? {
            width: element.outerWidth,
            height: element.outerHeight
        } : UxDomHelper.getHiddenElementDimensions(element);
        let targetHeight = target.offsetHeight;
        let targetWidth = target.offsetWidth;
        let targetOffset = target.getBoundingClientRect();
        let viewport = UxDomHelper.getViewport();
        let top, left;

        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
            top = -1 * (elementDimensions.height);
        } else {
            top = targetHeight;
        }

        if ((targetOffset.left + elementDimensions.width) > viewport.width) {
            left = targetWidth - elementDimensions.width;
        } else {
            left = 0;
        }

        element.style.top = top + "px";
        element.style.left = left + "px";
    }

    public static absolutePosition(element: HTMLElement, target: HTMLElement): void {
        let elementDimensions = element.offsetParent ? {
            width: element.offsetWidth,
            height: element.offsetHeight
        } : UxDomHelper.getHiddenElementDimensions(element);
        let elementOuterHeight = elementDimensions.height;
        let elementOuterWidth = elementDimensions.width;
        let targetOuterHeight = target.offsetHeight;
        let targetOuterWidth = target.offsetWidth;
        let targetOffset = target.getBoundingClientRect();
        let windowScrollTop = UxDomHelper.getWindowScrollTop();
        let windowScrollLeft = UxDomHelper.getWindowScrollLeft();
        let viewport = UxDomHelper.getViewport();
        let top, left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
        } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        }

        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
            left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
        } else {
            left = targetOffset.left + windowScrollLeft;
        }

        element.style.top = top + "px";
        element.style.left = left + "px";
    }

    public static getViewport(): any {
        let documentElement = document.documentElement,
            body = document.getElementsByTagName("body")[0],
            width = window.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = window.innerHeight || documentElement.clientHeight || body.clientHeight;

        return {width: width, height: height};
    }

    public static getHiddenElementDimensions(element: HTMLElement): { width, height } {
        let dimensions: any = {};
        let oldVisibility = element.style.visibility || "visible";
        let oldDisplay = element.style.display || "none";

        element.style.visibility = "hidden";
        element.style.display = "block";

        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;

        element.style.display = oldDisplay;
        element.style.visibility = oldVisibility;

        return dimensions;
    }

    public static fadeIn(element: HTMLElement, duration: number): void {
        element.style.opacity = "0";

        let last = Date.now();
        let opacity = 0;
        let tick = function () {
            opacity = +element.style.opacity + (Date.now() - last) / duration;
            element.style.opacity = "" + opacity;
            last = Date.now();

            if (+opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };

        tick();
    }

    public static fadeOut(element: HTMLElement, duration: number) {
        let opacity = 1,
            interval = 50,
            gap = interval / duration;

        let fading = setInterval(() => {
            opacity = opacity - gap;

            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }
            element.style.opacity = "" + opacity;
        }, interval);
    }

    public static getWindowScrollTop(): number {
        let documentElement = document.documentElement;
        return (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0);
    }

    public static getWindowScrollLeft(): number {
        let documentElement = document.documentElement;
        return (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0);
    }

    public static getOuterWidth(element: HTMLElement, margin?: number): number {
        let width = element.offsetWidth;
        if (margin) {
            let style = getComputedStyle(element);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }
        return width;
    }

    public static getOuterHeight(element: HTMLElement, margin?: number): number {
        let height = element.offsetHeight;
        if (margin) {
            let style = getComputedStyle(element);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }
        return height;
    }

    /**
     * @Deprecated. Use DomHelper.getDocumentRelativePosition() instead.
     */
    public static getOffset(element: any): { left: number, top: number } {
        let x = element.offsetLeft;
        let y = element.offsetTop;

        while (element = element.offsetParent) {
            x += element.offsetLeft;
            y += element.offsetTop;
        }

        return {left: x, top: y};
    }

    public static appendChild(element: HTMLElement, target: any): void {
        if (UxDomHelper.isElement(target)) {
            target.appendChild(element);
        } else if (target && target.nativeElement) {
            target.nativeElement.appendChild(element);
        } else {
            throw "Cannot append " + target + " to " + element;
        }
    }

    public static removeChild(element: HTMLElement, target: any): void {
        if (UxDomHelper.isElement(target)) {
            target.removeChild(element);
        } else if (target.element && target.element.nativeElement) {
            target.element.nativeElement.removeChild(element);
        } else {
            throw "Cannot remove " + element + " from " + target;
        }
    }

    public static isElement(object: any): boolean {
        return (typeof HTMLElement === "object" ? object instanceof HTMLElement :
                object && typeof object === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string"
        );
    }

    /**
     * Returns document relative client rect.
     *
     * @param {Element} element - target element
     * @returns {ClientRect}
     */
    public static getDocumentRelativePosition(element: Element): ClientRect {
        let clientRect = element.getBoundingClientRect();
        return {
            left: clientRect.left + pageXOffset,
            right: clientRect.right + pageXOffset,
            top: clientRect.top + pageYOffset,
            bottom: clientRect.bottom + pageYOffset,
            width: clientRect.width,
            height: clientRect.height
        }
    }

    /**
     * Returns document relative client rect.
     *
     * @param {Element} element - target element
     * @returns {ClientRect}
     */
    public static getOffsetParentRelativePosition(element: HTMLElement): ClientRect {
        return {
            left: element.offsetLeft,
            right: element.offsetLeft + element.offsetWidth,
            top: element.offsetTop,
            bottom: element.offsetTop + element.offsetHeight,
            width: element.offsetWidth,
            height: element.offsetHeight
        }
    }

    /**
     * Return viewport width and height minus scrollbar width and height.
     *
     * @returns clientSize: {{width: number; height: number}}
     */
    public static getClientSize(container: Element = document.documentElement): { width: number, height: number } {
        return {
            width: container.clientWidth,
            height: container.clientHeight
        }
    }

    public static findAncestor(element: HTMLElement, styleClass: string) {
        while ((element = element.parentElement) && !UxDomHelper.hasClass(element, styleClass));
        return element;
    }
}
