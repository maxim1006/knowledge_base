"use strict";

/// <reference path="./@types/jquery/index.d.ts" />
/// <reference path="./@types/velocity/index.d.ts" />



//Interfaces
interface BorderedRadialSvgOptions {
    r?:number;
    id?:string;
    strokeWidth?:number;
    circleStroke?:string;
    circleColorStroke?:string;
    innerCircleStroke?:string;
    innerCircleColorStroke?:string;
    html?:string;
    maxValue?:number;
    fontColor?:string;
    $container:JQuery;
    gradientStartColor:string;
    gradientStopColor:string;
}


interface CreateSvgCircleParams {
    className?:string;
    strokeDasharray?:number;
    strokeDashoffset?:number,
    strokeWidth?:number,
    stroke?:string,
    r?:number,
    cx?:number,
    cy?:number,
    fill?:string,
    transform?:string
}



class BorderedRadialSvg {
    //S = r*angle*pi/180; (S - length, Angle - in radians)
    private $circle: JQuery;
    private $innerCircle: JQuery;
    private $processValue: JQuery;

    public constructor(private options:BorderedRadialSvgOptions = {} as any) {
        this.appendSvg();
        this.initVars();
        this.startAnimation();
    }

    private initVars() {
        this.$circle = this.options.$container.find('.graph-radial__circle._colored');
        this.$innerCircle = this.options.$container.find('.graph-radial__inner-circle._colored');
        this.$processValue = this.options.$container.find('.graph-radial__text');
    }

    private appendSvg():void {
        this.options.$container.html(this.getHtml);
    }

    private startAnimation():void {
        let self = this,
            r = self.options.r,
            initMaxValue = this.options.maxValue,
            length = Math.ceil(2 * Math.PI * r),
            angle = 60,
            part = initMaxValue > 10 ? initMaxValue > 50 ? r*Math.PI*angle/180 : r*Math.PI*30/180 : r*initMaxValue*Math.PI/180;

        let maxValue = initMaxValue ? length - length*initMaxValue/100 + part : part;

        this.$circle.velocity({
            'stroke-dashoffset': maxValue
        }, {
            duration: 1000,
        });

        this.$innerCircle.velocity({
            'stroke-dashoffset': maxValue
        }, {
            duration: 1000,
            progress(elements, complete, remaining, start, tweenValue) {

                let percentage = 100 - (parseFloat(self.$circle.css('stroke-dashoffset')) - part)*100/length;

                self.$processValue.text(percentage.toFixed(0) + '%');
            }
        });
    }

    private get getHtml():string {

        let r = this.options.r,
            strokeWidth = this.options.strokeWidth,
            strokeWidthSmall = Math.ceil(this.options.strokeWidth/7*3),
            cx = Math.ceil(r + strokeWidth/2),
            cy = Math.ceil(r + strokeWidth/2),
            stroke = this.options.circleStroke,
            strokeInner = this.options.innerCircleStroke,
            strokeInnerColored = this.options.innerCircleColorStroke,
            circleLength = Math.ceil(2 * Math.PI * r),
            angle = 60,
            linearGradientID = Date.now() + "_linearGradient";

        const TRANSPARENT = "transparent";

        return `
                <svg class="graph-radial" id="${this.options.id}"
                     version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id=${linearGradientID} x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0%"  stop-color=${this.options.gradientStartColor}/>
                            <stop offset="100%" stop-color=${this.options.gradientStopColor}/>
                        </linearGradient>
                    </defs>

                    ${this.createSvgCircle({
                        className: "graph-radial__circle",
                        strokeDasharray: circleLength,
                        strokeDashoffset: 0,
                        fill: TRANSPARENT,
                        stroke, strokeWidth, r, cx, cy 
                    })}
                    
                    ${this.createSvgCircle({
                        className: "graph-radial__circle _colored",
                        strokeDasharray: circleLength,
                        strokeDashoffset: circleLength,
                        fill: TRANSPARENT,
                        transform: `rotate(${angle*2}, ${cx}, ${cy})`,
                        stroke: 'url(#' + `${linearGradientID}` + ')',
                        strokeWidth, r, cx, cy
                    })}
                    
                    ${this.createSvgCircle({
                        className: "graph-radial__inner-circle",
                        strokeDasharray: circleLength,
                        strokeDashoffset: 0,
                        fill: TRANSPARENT,
                        stroke: strokeInner, 
                        strokeWidth: strokeWidthSmall,
                        r, cx, cy
                    })}
                    
                    ${this.createSvgCircle({
                        className: "graph-radial__inner-circle _colored",
                        strokeDasharray: circleLength,
                        strokeDashoffset: circleLength,
                        fill: "#fff",
                        transform: `rotate(${angle*2}, ${cx}, ${cy})`,
                        stroke: strokeInnerColored,
                        strokeWidth: strokeWidthSmall,
                        r, cx, cy
                    })}
                    
                   ${this.createSvgCircle({
                        className: "graph-radial__circle-cover",
                        strokeDasharray: circleLength,
                        strokeDashoffset: circleLength - r*angle*(Math.PI / 180),
                        stroke: "#fff",
                        fill: "#fff",
                        transform: `rotate(${angle+1}, ${cx}, ${cy})`,
                        strokeWidth: strokeWidth,
                        r: r + 1,
                        cx: cx,
                        cy: cy
                    })}
                    
                    <text 
                        class="graph-radial__text" 
                        x=${cx} 
                        y=${cy + 6} 
                        font-size="36" 
                        fill="${this.options.fontColor}"
                        text-anchor="middle"
                        font-weight="700">
                        0%
                    </text>
                </svg>
            `
    }

    private createSvgCircle(params:CreateSvgCircleParams={}):string {
        return `
            <circle
                    class="${params.className}"
                    stroke-dasharray="${params.strokeDasharray}"
                    stroke-dashoffset="${params.strokeDashoffset}"
                    stroke-width="${params.strokeWidth}"
                    stroke="${params.stroke}"
                    r="${params.r}"
                    cx="${params.cx}"
                    cy="${params.cy}"
                    fill="${params.fill}"
                    transform="${params.transform}"
            ></circle>
        `
    }

    private toDegrees(rad):number {
        return rad * (180 / Math.PI);
    }

    private toRadians(angle):number {
        return angle * (Math.PI / 180);
    }

}

let borderedRadialSvg1 = new BorderedRadialSvg({
    r: 60,
    id: "id1",
    strokeWidth: 36,
    circleStroke: "#f0f1f3",
    innerCircleStroke: "#dcdcdd",
    innerCircleColorStroke: "#da7c0c",
    $container: $('.graph-wrapper1'),
    maxValue: 100,
    fontColor: "#ff9308",
    gradientStartColor: "#df3932",
    gradientStopColor: "#e5a353"
});



let borderedRadialSvg2 = new BorderedRadialSvg({
    r: 60,
    id: "id1",
    strokeWidth: 36,
    circleStroke: "#f0f1f3",
    innerCircleStroke: "#dcdcdd",
    innerCircleColorStroke: "#46a829",
    $container: $('.graph-wrapper2'),
    maxValue: 38,
    fontColor: "#48b524",
    gradientStartColor: "#6dbb5f",
    gradientStopColor: "#4fc12c"
});

let borderedRadialSvg3 = new BorderedRadialSvg({
    r: 60,
    id: "id2",
    strokeWidth: 36,
    circleStroke: "#f0f1f3",
    innerCircleStroke: "#dcdcdd",
    innerCircleColorStroke: "#d9ac0c",
    $container: $('.graph-wrapper3'),
    maxValue: 50,
    fontColor: "#ff9308",
    gradientStartColor: "#f5c30b",
    gradientStopColor: "#eaaa08"
});
