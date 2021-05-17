// File name: mytoolkit.js

import { SVG } from "./svg.min.js";

SVG.on(document, "DOMContentLoaded", function () {
    var btn = new MyToolkit.Button;

    btn.setText("My Button")
    btn.onclick(function (e) {
        console.log(e);
        console.log("State: Execute")
        console.log("State: Idle")
    });
    btn.move(100,100)

    var checkBox = new MyToolkit.Checkbox
    checkBox.move(100,50)
});

var MyToolkit = (function () {

    
    var Button = function () {

        
        var draw = SVG().addTo("body").size("100%", "100%");
        var rect = draw.rect(100, 50).fill("#7892c2");
        var text = draw.text("Button");
        text.font({fill:"#ffffff", size: 16, family: 'Helvetica'});
        var len = text.length(); 
        text.attr({x:(100-len)/2, y:(50-28)/2})
        var clickEvent = null;



        rect.mouseover(function () {
            this.fill({ color: "#476e9e" });
            console.log("State: Idle")
        });
        rect.mouseout(function () {
            this.fill({ color: "#7892c2" });
            console.log("State: Idle")

        });

        rect.click(function (event) {
            this.fill({ color: "#7892c2" });
            console.log("State: Pressed")
            if (clickEvent != null) clickEvent(event);
        });
        return {
            move: function (x, y) {
                rect.move(x, y);
                var len = text.length(); 
                text.attr({x: (x+(100-len)/2), y:(y+(50-28)/2)})
            },
            onclick: function (eventHandler) {
                clickEvent = eventHandler;
            },
            setText: function(t){
                text.text(t)
                var len = text.length(); 
                text.attr({x:(100-len)/2, y:(50-28)/2})

            }
        };
    };

    var Checkbox = function () {
        let clicked = false;
        var draw = SVG().addTo("body").size("100%", "100%");
        var rect = draw.rect(25, 25).attr({
            "fill": "#fff",
            "stroke": "#000",
            "stroke-width": "2px"
        })

        var text = draw.text("Option");
        text.font({fill:"#000", size: 16, family: 'Helvetica'});
        var x = rect.x();
        text.attr({x:35,y:-2})
        var clickEvent = null

        rect.click(function (event) {
            clicked = !clicked
            if (clicked){
                this.fill({ color: "#7892c2" });
                // draw.rect.attr({
                //     "fill": "#fff",
                //     "stroke": "#000",
                //     "stroke-width": "2px"
                // })
                rect.stroke("#fff")

                
            }
            else{
                this.fill({ color: "#fff" });
                rect.stroke("#000")
                
            }
            if (clickEvent != null) clickEvent(event);
        });

        return {
            move: function (x, y) {
                rect.move(x, y);
                text.attr({x:x+35, y:y-2})
            },
            onclick: function (eventHandler) {
                clickEvent = eventHandler;
            },
            setText: function(t){
                text.text(t)
                var len = text.length(); 
                text.attr({x:(100-len)/2, y:(50-28)/2})

            }
        };

    }
    return { Button, Checkbox };
})();

// export { MyToolkit };
