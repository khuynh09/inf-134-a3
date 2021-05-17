// File name: mytoolkit.js

import { SVG } from "./svg.min.js";

SVG.on(document, "DOMContentLoaded", function () {
    var btn = new MyToolkit.Button();

    btn.setText("My Button");
    btn.onclick(function (e) {
        console.log(e);
        console.log("Execute");
    });
    btn.move(100, 100);

    var checkBox = new MyToolkit.Checkbox();
    checkBox.setText("2");
    checkBox.move(100, 50);
    checkBox.onclick(function (e) {
        console.log(e);
    });

    var radios = new MyToolkit.Radio(3, ["Option1", "Option2", "Option3"]);
    radios.move(100, 0);
});

var MyToolkit = (function () {
    var Button = function () {
        var draw = SVG().addTo("body").size("100%", "100%");
        var group = draw.group();
        var rect = group.rect(100, 50).fill("#7892c2").radius(10);
        var text = group.text("Button");
        text.font({ fill: "#ffffff", size: 16, family: "Helvetica" });
        var len = text.length();
        text.attr({ x: (100 - len) / 2, y: (50 - 28) / 2 });
        var clickEvent = null;
        text.mouseover(null);

        group.mouseover(function () {
            rect.fill({ color: "#476e9e" });
        });
        group.mouseout(function () {
            rect.fill({ color: "#7892c2" });
        });

        group.mouseup(function () {
            console.log("State: Idle");
        });
        group.mousedown(function () {
            console.log("State: Pressed");
        });

        rect.click(function (event) {
            this.fill({ color: "#7892c2" });

            if (clickEvent != null) clickEvent(event);
        });

        text.click(function (event) {
            rect.fill({ color: "#7892c2" });

            if (clickEvent != null) clickEvent(event);
        });

        return {
            move: function (x, y) {
                rect.move(x, y);
                var len = text.length();
                text.attr({ x: x + (100 - len) / 2, y: y + (50 - 28) / 2 });
            },
            onclick: function (eventHandler) {
                clickEvent = eventHandler;
            },
            setText: function (t) {
                text.text(t);
                var len = text.length();
                text.attr({ x: (100 - len) / 2, y: (50 - 28) / 2 });
            },
        };
    };

    var Checkbox = function () {
        let checked = false;
        var draw = SVG().addTo("body").size("100%", "100%");
        var group = draw.group();
        var rect = group.rect(25, 25).attr({
            fill: "#fff",
            stroke: "#000",
            "stroke-width": "2px",
        });

        var text = group.text("Option");
        var image = group.image("./check.png").size(20, 20);
        image.hide();
        text.font({ fill: "#000", size: 16, family: "Helvetica" });
        text.attr({ x: 35, y: -2 });

        var clickEvent = null;

        group.click(function (event) {
            if (!checked) {
                rect.fill({ color: "#7892c2" });
                image.attr({ x: rect.x() + 3, y: rect.y() + 2 });
                image.show();
                rect.stroke("#fff");
            } else {
                rect.fill({ color: "#fff" });
                rect.stroke("#000");
                image.hide();
            }
            if (clickEvent != null) {
                if (!checked) {
                    console.log("State: Checked");
                } else {
                    console.log("State: Unchecked");
                }
                clickEvent(event);
            }
            checked = !checked;
        });

        // image.click(function (event) {

        //     if (checked){
        //         image.hide()
        //         rect.fill({ color: "#fff" });
        //         rect.stroke("#000")

        //     }
        //     if (clickEvent != null && checked) {clickEvent(event); console.log("State: Unchecked")}
        //     checked = !checked

        // });

        return {
            move: function (x, y) {
                rect.move(x, y);
                text.attr({ x: x + 35, y: y - 2 });
            },
            onclick: function (eventHandler) {
                clickEvent = eventHandler;
            },
            setText: function (t) {
                text.text(t);
                var len = text.length();
                text.attr({ x: (100 - len) / 2, y: (50 - 28) / 2 });
            },
        };
    };

    var Radio = function (n, options) {
        var count;
        if (!n) {
            count = 2;
        } else {
            count = n;
        }
        var draw = SVG().addTo("body").size("100%", "100%");
        var group = draw.group();

        var circleList = new SVG.List();
        var textList = new SVG.List();

        for (let i = 0; i < count; i++) {
            if (i == 0) {
                circleList.push(
                    group
                        .circle(25)
                        .attr({ stroke: "#000", fill: "#fff" })
                        .addClass(i)
                );

                textList.push(
                    group
                        .text(options ? options[i] : "Option")
                        .font({ fill: "#000", size: 16, family: "Helvetica" })
                        .attr({ x: 35, y: -2 })
                );
            } else {
                circleList.push(
                    group
                        .circle(25)
                        .attr({
                            stroke: "#000",
                            fill: "#fff",
                            cy: circleList[i - 1].cy() + 35,
                        })
                        .addClass(i)
                );
                textList.push(
                    group
                        .text(options ? options[i] : "Option")
                        .font({ fill: "#000", size: 16, family: "Helvetica" })
                        .attr({ x: 35, y: textList[i - 1].y() + 28 })
                );
            }
        }

        var index = 0;
        circleList.each(function (item) {
            item.click(function (event) {
                circleList.attr({
                    stroke: "#000",
                    fill: "#fff",
                });
                item.attr({
                    stroke: "#fff",
                    fill: "#7892c2",
                });
                var index = item.node.className.baseVal;
                console.log(options[index], "selected");
            });
        });

        // var circle2 = group.circle(25).move(100, 30).fill("#f09");

        // create a set and add the elements

        // list.push(circle2);
        // var draw = SVG().addTo("body").size("100%", "100%");
        // var group  = draw.group().addClass('radios')
        // var circle = draw.circle(20).attr({
        //     "fill": "#fff",
        //     "stroke": "#000",
        //     "stroke-width": "2px",
        //     x: 100,
        //     y: 10
        // })

        // text.font({fill:"#000", size: 16, family: 'Helvetica'});
        // text.attr({x:35,y:-2})

        var clickEvent = null;

        group.click(function (event) {
            if (clickEvent != null) {
                clickEvent(event);
            }
        });

        return {
            move: function (x, y) {
                group.move(x, y);
                // text.attr({x:x+35, y:y-2})
            },
            // onclick: function (eventHandler) {
            //     clickEvent = eventHandler;
            // },
            // setText: function(t){
            //     text.text(t)
            //     var len = text.length();
            //     text.attr({x:(100-len)/2, y:(50-28)/2})

            // }
        };
    };
    return { Button, Checkbox, Radio };
})();

// export { MyToolkit };
