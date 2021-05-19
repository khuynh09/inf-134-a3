// File name: mytoolkit.js

import { SVG } from "./svg.min.js";

SVG.on(document, "DOMContentLoaded", function () {
    var btn = new MyToolkit.Button();

    btn.setText("My Button");
    btn.onclick(function (e) {
        console.log("Button: ", e);
    });
    btn.move(100, 50);

    var checkBox = new MyToolkit.Checkbox();
    checkBox.setText("Checkbox");
    checkBox.move(100, 50);
    checkBox.onclick(function (e) {
        console.log("Checkbox: ", e);
    });

    var radios = new MyToolkit.Radio(3, ["Option1", "Option2", "Option3"]);
    radios.move(100, 10);
    radios.onclick(function (e) {
        console.log("Radio: ", e);
    });

    var textBox = new MyToolkit.Textbox();
    textBox.move(100, 10);

    var scrollBar = new MyToolkit.Scrollbar();
    scrollBar.move(100, 10);
    scrollBar.height(200);

    var progressBar = new MyToolkit.ProgressBar();
    progressBar.move(100, 10);
    progressBar.width(300);
    progressBar.value(70);
    progressBar.value(70);
    progressBar.value(70);
    progressBar.value(70);
    progressBar.increment(5);

    var toggle = new MyToolkit.Toggle();
    toggle.move(100, 10);
});

var MyToolkit = (function () {
    /**
     * Represents a button with text.
     * @constructor
     */
    var Button = function () {
        var draw = SVG().addTo("body").size("100%", "100px");
        var group = draw.group();
        var rect = group
            .rect(100, 50)
            .fill("#7892c2")
            .radius(10)
            .addClass("button");
        var text = group.text("Button").addClass("buttonText");
        text.font({ fill: "#ffffff", size: 16 });
        var len = text.length();
        text.attr({ x: (100 - len) / 2, y: (50 - 28) / 2 });
        var clickEvent = null;
        var defaultState = "idle";

        group.mouseover(function (e) {
            rect.fill({ color: "#476e9e" });
            if (
                e.path[0].className.baseVal == "button" &&
                e.fromElement.tagName &&
                e.fromElement.tagName != "tspan"
            ) {
                defaultState = "hovered";
                console.log("State: ", defaultState);
            }
        });
        group.mouseout(function (e) {
            rect.fill({ color: "#7892c2" });
            if (
                e.path[0].className.baseVal == "button" &&
                e.toElement.tagName &&
                e.toElement.tagName != "tspan"
            ) {
                defaultState = "idle";
                console.log("State: ", defaultState);
            }
        });

        group.mouseup(function () {
            defaultState = "idle";
            console.log("State: ", defaultState);
        });
        group.mousedown(function () {
            defaultState = "pressed";
            console.log("State: ", defaultState);
        });

        group.click(function (event) {
            rect.fill({ color: "#7892c2" });

            if (clickEvent != null) clickEvent(event);
        });

        return {
            /**
             * Position component given x and y positions
             * @param {integer} x - x position
             * @param {integer} y - y position
             */
            move: function (x, y) {
                rect.move(x, y);
                var len = text.length();
                text.attr({ x: x + (100 - len) / 2, y: y + (50 - 28) / 2 });
            },
            /**
             * Run passed in eventHandlder
             */
            onclick: function (eventHandler) {
                clickEvent = eventHandler;
            },

            /**
             * Sets text of button
             */
            setText: function (t) {
                text.text(t);
                var len = text.length();
                text.attr({ x: (100 - len) / 2, y: (50 - 28) / 2 });
            },
        };
    };
    /**
     * Represents a checkbox.
     * @constructor
     */
    var Checkbox = function () {
        let checked = false;
        var draw = SVG().addTo("body").size("100%", "100px");
        var group = draw.group();
        var rect = group.rect(25, 25).attr({
            fill: "#fff",
            stroke: "#000",
            strokeWidth: "1px",
        });

        var text = group.text("Checkbox");
        var image = group.image("./check.png").size(20, 20);
        image.hide();
        text.font({ fill: "#000", size: 16 });
        text.attr({ x: 35, y: -2 });

        var clickEvent = null;
        group.mousedown(function (event) {
            console.log("State: pressed");
        });
        group.mouseup(function (event) {
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
    /**
     * Represents radio buttons.
     * @constructor
     * @param {string} n - Number of radios from 2-n
     * @param {string} options - The option/text of each n radio
     */
    var Radio = function (n, options) {
        var count;
        if (!n) {
            count = 2;
        } else {
            count = n;
        }
        var draw = SVG().addTo("body").size("100%", "120px");
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
                        .font({ fill: "#000", size: 16 })
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
                        .font({ fill: "#000", size: 16 })
                        .attr({ x: 35, y: textList[i - 1].y() + 28 })
                );
            }
        }

        var selected;
        circleList.each(function (item) {
            item.mousedown(function (event) {
                console.log("State: pressed");
            });
            item.mouseup(function (event) {
                var index = item.node.className.baseVal;

                if (selected != index) {
                    circleList.attr({
                        stroke: "#000",
                        fill: "#fff",
                    });
                    item.attr({
                        stroke: "#fff",
                        fill: "#7892c2",
                    });
                    console.log("State:", options[index], "selected");
                } else {
                    circleList.attr({
                        stroke: "#000",
                        fill: "#fff",
                    });
                    console.log("State:", options[index], "unselected");
                }

                selected = index;

                if (clickEvent != null) {
                    clickEvent(event);
                }
            });
        });

        var clickEvent = null;

        return {
            /**
             * Position component given x and y positions
             * @param {integer} x - x position
             * @param {integer} y - y position
             */
            move: function (x, y) {
                group.move(x, y);
            },

            /**
             * Run passed in eventHandlder
             */
            onclick: function (eventHandler) {
                clickEvent = eventHandler;
            },

            /**
             * Sets text of radio given the position starting from 0
             */
            setText: function (n, text) {
                textList[n].text(text);
            },
        };
    };
    /**
     * Represents a checkbox.
     * @constructor
     */
    var Textbox = function () {
        var draw = SVG()
            .addTo("body")
            .size("100%", "100px")
            .addClass("textboxWrapper");
        var group = draw.group();
        var textbox = group
            .rect(200, 30)
            .fill("white")
            .stroke("black")
            .radius(5)
            .addClass("textbox");

        var text = group.text("").move(4, 5).addClass("textbox");
        var caret = group
            .line(30, 4, 30, 25)
            .stroke({ width: 1, color: "#7892c2" });
        caret.hide();
        var clicked = false;
        group.mouseover(function (e) {
            clicked = true;
            caret.show();
            console.log("State: Textbox Focused");
        });
        SVG.on(document, "keydown", function (e) {
            if (clicked) {
                var newText;
                if (e.key == "Backspace") {
                    newText = text.text().substring(0, text.text().length - 1);
                    text.text(newText);
                    var len = text.length();
                    caret.plot(
                        group.x() + len + 8,
                        4 + group.y(),
                        group.x() + len + 8,
                        25 + group.y()
                    );
                } else if (
                    e.which != 9 &&
                    e.which != 20 &&
                    e.which != 16 &&
                    e.which != 17
                ) {
                    e.preventDefault();
                    newText = text.text() + e.key;

                    text.text(newText);
                    var len = text.length();
                    caret.plot(
                        group.x() + len + 8,
                        4 + group.y(),
                        group.x() + len + 8,
                        25 + group.y()
                    );
                }
                console.log("Text Changed");
            }
        });

        group.mouseout(function (e) {
            if (e.fromElement.className.baseVal === "textbox") {
                clicked = false;
                caret.hide();
                console.log("State: Textbox Unfocused");
            }
        });
        return {
            /**
             * Position component given x and y positions
             * @param {integer} x - x position
             * @param {integer} y - y position
             */
            move: function (x, y) {
                group.move(x, y);
                var len = text.length();
                caret.plot(
                    group.x() + len + 8,
                    4 + y,
                    group.x() + len + 8,
                    25 + y
                );
            },
            /**
             * If given param, this will set text of textbox. Otherwise, return the
             * @param {string} t - The text to be set.
             * @return {string} The text
             */
            text: function (t) {
                if (!t) {
                    return text.text();
                }
                text.text(t);
                var len = text.length();
                caret.plot(
                    group.x() + len + 8,
                    4 + group.y(),
                    group.x() + len + 8,
                    25 + group.y()
                );
            },
        };
    };
    /**
     * Represents a checkbox.
     * @constructor
     */
    var Scrollbar = function () {
        var draw = SVG()
            .addTo("body")
            .size("100%", "250px")
            .addClass("scrollbar");
        var group = draw.group();
        var scrollBar = group
            .rect(10, 200)
            .fill("white")
            .stroke("black")
            .radius(3)
            .addClass("scrollbar");

        var scrollThumb = group
            .rect(8, scrollBar.height() / 4)
            .move(scrollBar.x() + 1, scrollBar.y() + 1)
            .radius(3)
            .fill("#7892c2")
            .addClass("scrollthumb");

        var pressed = false;

        group.mouseover(function (e) {
            if (
                !pressed &&
                e.path[0].className.baseVal == "scrollbar" &&
                e.fromElement.className.baseVal != "scrollthumb"
            )
                console.log("State: hovered");
        });

        group.mouseout(function (e) {
            if (
                !pressed &&
                e.path[0].className.baseVal == "scrollbar" &&
                e.toElement.className.baseVal != "scrollthumb"
            )
                console.log("State: idle");
        });
        scrollThumb.mousedown(function (e) {
            pressed = true;
            console.log("State: pressed");
        });

        SVG.on(document, "mousemove", function (e) {
            if (
                pressed == true &&
                e.path[0].className.baseVal === "scrollbar"
            ) {
                if (
                    e.offsetY <=
                        scrollBar.height() - scrollThumb.height() + 8 &&
                    e.offsetY > scrollBar.y() + 1
                ) {
                    scrollThumb.y(e.offsetY);
                    console.log(
                        "State: moved",
                        e.movementY > 0 ? "down" : "up"
                    );
                }
            }
        });

        SVG.on(document, "mouseup", function (e) {
            if (pressed) {
                pressed = false;
            }
        });

        return {
            /**
             * Position component given x and y positions
             * @param {integer} x - x position
             * @param {integer} y - y position
             */
            move: function (x, y) {
                group.move(x, y);
            },
            /**
             * Set the height of the scroll bar
             * @param {integer} y - The height of scroll bar
             */
            height: function (y) {
                scrollBar.height(y);
                draw.height(y + 50);
                scrollThumb.height(scrollBar.height() / 4);
            },
        };
    };
    /**
     * Represents a checkbox.
     * @constructor
     */
    var ProgressBar = function () {
        var draw = SVG().addTo("body").size("100%", "80px");
        var group = draw.group();
        var progressBar = group
            .rect(200, 15)
            .fill("white")
            .stroke("black")
            .radius(3)
            .addClass("progressbar");

        var progress = group.rect(0, 15).fill("#7892c2").addClass("progress");

        group.mouseover(function (e) {
            if (
                (e.path[0].className.baseVal == "progressbar" &&
                    e.fromElement.className.baseVal != "progress") ||
                (e.path[0].className.baseVal == "progress" &&
                    e.fromElement.className.baseVal != "progressbar")
            )
                console.log("State: hovered");
        });

        group.mouseout(function (e) {
            if (
                (e.path[0].className.baseVal == "progressbar" &&
                    e.toElement.className.baseVal != "progress") ||
                (e.path[0].className.baseVal == "progress" &&
                    e.toElement.className.baseVal != "progressbar")
            )
                console.log("State: idle");
        });

        return {
            /**
             * Position component given x and y positions
             * @param {integer} x - x position
             * @param {integer} y - y position
             */
            move: function (x, y) {
                group.move(x, y);
            },

            /**
             * Set width of progress bar
             * @param {integer} y - height of progress bar to set
             */
            width: function (y) {
                progressBar.width(y);
            },
            /**
             * If given param, this will set value of progress. Otherwise, return the value
             * @param {string} t - The value to be set.
             * @return {string} The value
             */
            value: function (value) {
                if (!value) {
                    return (progress.width() / progressBar.width()) * 100;
                }
                var p = progressBar.width() * (value / 100);
                progress.width(p);
            },
            /**
             * Increment progress bar's value
             * @param {integer} value - value to increment between 0 - 100
             */
            increment: function (value) {
                var newValue;
                if (value > 0 && value <= 100) {
                    newValue =
                        (progress.width() / progressBar.width()) * 100 + value;

                    if (
                        progressBar.width() * (newValue / 100) <=
                        progressBar.width()
                    )
                        progress.width(progressBar.width() * (newValue / 100));
                    else {
                        progress.width(progressBar.width());
                    }
                }
            },
        };
    };
    /**
     * Represents a checkbox.
     * @constructor
     */
    var Toggle = function () {
        var draw = SVG().addTo("body").size("100%", "500px").addClass("toggle");
        var group = draw.group();
        var toggle = group
            .rect(40, 20)
            .fill("lightgrey")
            .stroke("black")
            .radius(10)
            .addClass("scrollbar");

        var circle = group.circle(16).move(2, 2).fill("white");

        var toggled = false;

        group.mousedown(function (e) {
            console.log("State: pressed");
        });
        group.mouseup(function (e) {
            if (toggled) {
                toggle.fill("lightgray");
                toggled = false;
                circle.move(circle.x() - 20);
                console.log("State: untoggled");
            } else {
                toggle.fill("#7892c2");
                circle.move(circle.x() + 20);
                toggled = true;
                console.log("State: toggled");
            }
        });

        return {
            move: function (x, y) {
                group.move(x, y);
            },
            toggle: function () {
                toggled = !toggled;
            },
        };
    };

    return { Button, Checkbox, Radio, Textbox, Scrollbar, ProgressBar, Toggle };
})();

export { MyToolkit };
