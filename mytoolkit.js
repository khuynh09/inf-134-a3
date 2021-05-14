// File name: mytoolkit.js

import { SVG } from "./svg.min.js";

SVG.on(document, "DOMContentLoaded", function () {
    var btn = new MyToolkit.Button;

    btn.setText("My Button")
    btn.onclick(function (e) {
        console.log(e);
        console.log("Press: Execute")
        console.log("Press: Idle")
    });
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
    return { Button };
})();

// export { MyToolkit };
