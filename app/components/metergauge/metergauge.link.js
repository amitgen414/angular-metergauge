
let meterGaugeComponentLink = function (scope, element, attrs) {
    var element = element[0];
    var config = scope.gaugeconfig;
    if(!config){
        console.error('No config found');
        return;
    }

    var meterGauge = (function (d3) {

        function drawGauge(opt) {
            // Set defaults if not supplied
            if (typeof opt === 'undefined') { var opt = {} }
            if (typeof opt.gaugeRadius === 'undefined') { opt.gaugeRadius = 150 }
            if (typeof opt.minVal === 'undefined') { opt.minVal = 0 }
            if (typeof opt.maxVal === 'undefined') { opt.maxVal = 100 }
            if (typeof opt.tickSpaceMinVal === 'undefined') { opt.tickSpaceMinVal = 1 }
            if (typeof opt.tickSpaceMajVal === 'undefined') { opt.tickSpaceMajVal = 10 }
            if (typeof opt.divID === 'undefined') { opt.divID = "vizBox" }
            if (typeof opt.needleVal === 'undefined') { opt.needleVal = 60 }
            if (typeof opt.gaugeUnits === 'undefined') { opt.gaugeUnits = "%" }

            if (typeof opt.padding === 'undefined') { opt.padding = 0.05 }
            if (typeof opt.edgeWidth === 'undefined') { opt.edgeWidth = 0.05 }
            if (typeof opt.tickEdgeGap === 'undefined') { opt.tickEdgeGap = 0.05 }
            if (typeof opt.tickLengthMaj === 'undefined') { opt.tickLengthMaj = 0.15 }
            if (typeof opt.tickLengthMin === 'undefined') { opt.tickLengthMin = 0.05 }
            if (typeof opt.needleTickGap === 'undefined') { opt.needleTickGap = 0.05 }
            if (typeof opt.needleLengthNeg === 'undefined') { opt.needleLengthNeg = 0.2 }
            if (typeof opt.pivotRadius === 'undefined') { opt.pivotRadius = 0.1 }

            if (typeof opt.ticknessGaugeBasis === 'undefined') { opt.ticknessGaugeBasis = 200 }
            if (typeof opt.needleWidth === 'undefined') { opt.needleWidth = 5 }
            if (typeof opt.tickWidthMaj === 'undefined') { opt.tickWidthMaj = 3 }
            if (typeof opt.tickWidthMin === 'undefined') { opt.tickWidthMin = 1 }
            if (typeof opt.labelFontSize === 'undefined') { opt.labelFontSize = 18 }
            if (typeof opt.zeroTickAngle === 'undefined') { opt.zeroTickAngle = 60 }
            if (typeof opt.maxTickAngle === 'undefined') { opt.maxTickAngle = 300 }
            if (typeof opt.zeroNeedleAngle === 'undefined') { opt.zeroNeedleAngle = 40 }
            if (typeof opt.maxNeedleAngle === 'undefined') { opt.maxNeedleAngle = 320 }

            if (typeof opt.tickColMaj === 'undefined') { opt.tickColMaj = '#0099CC' }
            if (typeof opt.tickColMin === 'undefined') { opt.tickColMin = '#000' }
            if (typeof opt.outerEdgeCol === 'undefined') { opt.outerEdgeCol = '#0099CC' }
            if (typeof opt.pivotCol === 'undefined') { opt.pivotCol = '#999' }
            if (typeof opt.innerCol === 'undefined') { opt.innerCol = '#fff' }
            if (typeof opt.unitsLabelCol === 'undefined') { opt.unitsLabelCol = '#000' }
            if (typeof opt.tickLabelCol === 'undefined') { opt.tickLabelCol = '#000' }
            if (typeof opt.needleCol === 'undefined') { opt.needleCol = '#0099CC' }

            var defaultFonts = '"Helvetica Neue", Helvetica, Arial, sans-serif'
            if (typeof opt.tickFont === 'undefined') { opt.tickFont = defaultFonts }
            if (typeof opt.unitsFont === 'undefined') { opt.unitsFont = defaultFonts }

            // Calculate absolute values
            opt.padding = opt.padding * opt.gaugeRadius,
                opt.edgeWidth = opt.edgeWidth * opt.gaugeRadius,
                opt.tickEdgeGap = opt.tickEdgeGap * opt.gaugeRadius,
                opt.tickLengthMaj = opt.tickLengthMaj * opt.gaugeRadius,
                opt.tickLengthMin = opt.tickLengthMin * opt.gaugeRadius,
                opt.needleTickGap = opt.needleTickGap * opt.gaugeRadius,
                opt.needleLengthNeg = opt.needleLengthNeg * opt.gaugeRadius,
                opt.pivotRadius = opt.pivotRadius * opt.gaugeRadius;

            opt.needleWidth = opt.needleWidth * (opt.gaugeRadius / opt.ticknessGaugeBasis),
                opt.tickWidthMaj = opt.tickWidthMaj * (opt.gaugeRadius / opt.ticknessGaugeBasis),
                opt.tickWidthMin = opt.tickWidthMin * (opt.gaugeRadius / opt.ticknessGaugeBasis),
                opt.labelFontSize = opt.labelFontSize * (opt.gaugeRadius / opt.ticknessGaugeBasis);


            //Calculate required values
            var needleLengthPos = opt.gaugeRadius - opt.padding - opt.edgeWidth - opt.tickEdgeGap - opt.tickLengthMaj - opt.needleTickGap,
                needlePathLength = opt.needleLengthNeg + needleLengthPos,
                needlePathStart = opt.needleLengthNeg * (-1),
                tickStartMaj = opt.gaugeRadius - opt.padding - opt.edgeWidth - opt.tickEdgeGap - opt.tickLengthMaj,
                tickStartMin = opt.gaugeRadius - opt.padding - opt.edgeWidth - opt.tickEdgeGap - opt.tickLengthMin,
                labelStart = tickStartMaj - opt.labelFontSize,
                innerEdgeRadius = opt.gaugeRadius - opt.padding - opt.edgeWidth,
                outerEdgeRadius = opt.gaugeRadius - opt.padding,
                originX = opt.gaugeRadius,
                originY = opt.gaugeRadius;

            if (opt.labelFontSize < 6) { opt.labelFontSize = 0 }

            //Define a linear scale to convert values to needle displacement angle (degrees)
            var valueScale = d3.scaleLinear()
                .domain([opt.minVal, opt.maxVal])
                .range([opt.zeroTickAngle, opt.maxTickAngle]);

            //Calculate tick mark angles (degrees)
            var counter = 0,
                tickAnglesMaj = [],
                tickAnglesMin = [],
                tickSpacingMajDeg = valueScale(opt.tickSpaceMajVal) - valueScale(0),
                tickSpacingMinDeg = valueScale(opt.tickSpaceMinVal) - valueScale(0);

            for (var i = opt.zeroTickAngle; i <= opt.maxTickAngle; i = i + tickSpacingMajDeg) {
                tickAnglesMaj.push(opt.zeroTickAngle + (tickSpacingMajDeg * counter))
                counter++
            }

            counter = 0
            for (var i = opt.zeroTickAngle; i <= opt.maxTickAngle; i = i + tickSpacingMinDeg) {
                //Check for an existing major tick angle
                var exists = 0
                tickAnglesMaj.forEach(function (d) {
                    if ((opt.zeroTickAngle + (tickSpacingMinDeg * counter)) == d) { exists = 1 }
                })

                if (exists == 0) { tickAnglesMin.push(opt.zeroTickAngle + (tickSpacingMinDeg * counter)) }
                counter++
            }


            //Calculate major tick mark label text
            counter = 0
            var tickLabelText = [];

            for (var i = opt.zeroTickAngle; i <= opt.maxTickAngle; i = i + tickSpacingMajDeg) {
                tickLabelText.push(opt.minVal + (opt.tickSpaceMajVal * counter))
                counter++
            }

            //Add the svg content holder to the visualisation box element in the document (vizbox)
            var svgWidth = opt.gaugeRadius * 2,
                svgHeight = opt.gaugeRadius * 2;

            var svg = d3.select(element)
                .append("svg")
                .attr("id", "SVGbox-" + opt.divID)
                .attr("width", svgWidth)
                .attr("height", svgHeight)
              //  .attr({ 'xmlns': 'http://www.w3.org/2000/svg', 'xmlns:xlink': 'http://www.w3.org/1999/xlink' });


            //Draw the circles that make up the edge of the gauge
            var circleGroup = svg.append("svg:g")
                .attr("id", "circles")
            var outerC = circleGroup.append("svg:circle")
                .attr("cx", originX)
                .attr("cy", originY)
                .attr("r", outerEdgeRadius)
                .style("fill", opt.outerEdgeCol)
                .style("stroke", "none");
            var innerC = circleGroup.append("svg:circle")
                .attr("cx", originX)
                .attr("cy", originY)
                .attr("r", innerEdgeRadius)
                .style("fill", opt.innerCol)
                .style("stroke", "none");

            //Draw the circle for the needle 'pivot'
            var pivotC = circleGroup.append("svg:circle")
                .attr("cx", originX)
                .attr("cy", originY)
                .attr("r", opt.pivotRadius)
                .style("fill", opt.pivotCol)
                .style("stroke", "none");


            //Define two functions for calculating the coordinates of the major & minor tick mark paths
            var tickCalcMaj = function () {
                function pathCalc(d, i) {
                    //Offset the tick mark angle so zero is vertically down, then convert to radians
                    var tickAngle = d + 90,
                        tickAngleRad = dToR(tickAngle);

                    var y1 = originY + (tickStartMaj * Math.sin(tickAngleRad)),
                        y2 = originY + ((tickStartMaj + opt.tickLengthMaj) * Math.sin(tickAngleRad)),
                        x1 = originX + (tickStartMaj * Math.cos(tickAngleRad)),
                        x2 = originX + ((tickStartMaj + opt.tickLengthMaj) * Math.cos(tickAngleRad)),

                        lineData = [{ "x": x1, "y": y1 }, { "x": x2, "y": y2 }];

                    //Use a D3.JS path generator
                    var lineFunc = d3.line()
                        .x(function (d) { return d.x; })
                        .y(function (d) { return d.y; });

                    var lineSVG = lineFunc(lineData)

                    return lineSVG
                }
                return pathCalc;
            };

            var tickCalcMin = function () {
                function pathCalc(d, i) {
                    //Offset the tick mark angle so zero is vertically down, then convert to radians
                    var tickAngle = d + 90,
                        tickAngleRad = dToR(tickAngle);

                    var y1 = originY + (tickStartMin * Math.sin(tickAngleRad));
                    var y2 = originY + ((tickStartMin + opt.tickLengthMin) * Math.sin(tickAngleRad));
                    var x1 = originX + (tickStartMin * Math.cos(tickAngleRad));
                    var x2 = originX + ((tickStartMin + opt.tickLengthMin) * Math.cos(tickAngleRad));

                    var lineData = [{ "x": x1, "y": y1 }, { "x": x2, "y": y2 }];

                    //Use a D3.JS path generator
                    var lineFunc = d3.line()
                        .x(function (d) { return d.x; })
                        .y(function (d) { return d.y; });

                    var lineSVG = lineFunc(lineData)

                    return lineSVG
                }
                return pathCalc;
            };

            var pathTickMaj = tickCalcMaj(),
                pathTickMin = tickCalcMin();


            //Add a group to hold the ticks
            var ticks = svg.append("svg:g")
                .attr("id", "tickMarks")

            //Add a groups for major and minor ticks (minor first, so majors overlay)
            var ticksMin = ticks.append("svg:g")
                .attr("id", "minorTickMarks")
            var ticksMaj = ticks.append("svg:g")
                .attr("id", "majorTickMarks")


            //Draw the tick marks 
            var tickMin = ticksMin.selectAll("path")
                .data(tickAnglesMin)
                .enter().append("path")
                .attr("d", pathTickMin)
                .style("stroke", opt.tickColMin)
                .style("stroke-width", opt.tickWidthMin + "px");
            var tickMaj = ticksMaj.selectAll("path")
                .data(tickAnglesMaj)
                .enter().append("path")
                .attr("d", pathTickMaj)
                .style("stroke", opt.tickColMaj)
                .style("stroke-width", opt.tickWidthMaj + "px");


            //Define functions to calcuate the positions of the labels for the tick marks
            function labelXcalc(d, i) {
                var tickAngle = d + 90,
                    tickAngleRad = dToR(tickAngle),
                    labelW = opt.labelFontSize / (tickLabelText[i].toString().length / 2)
                var x1 = originX + ((labelStart - labelW) * Math.cos(tickAngleRad));
                return x1
            }
            function labelYcalc(d, i) {
                var tickAngle = d + 90,
                    tickAngleRad = dToR(tickAngle),
                    y1 = originY + ((labelStart) * Math.sin(tickAngleRad)) + (opt.labelFontSize / 2);
                return y1
            }

            //Add labels for major tick marks
            var tickLabels = svg.append("svg:g")
                .attr("id", "tickLabels")
            var tickLabel = tickLabels.selectAll("text")
                .data(tickAnglesMaj)
                .enter().append("text")
                .attr("x", function (d, i) { return labelXcalc(d, i) })
                .attr("y", function (d, i) { return labelYcalc(d, i) })
                .attr("font-size", opt.labelFontSize)
                .attr("text-anchor", "middle")
                .style("fill", opt.tickLabelCol)
                .style("font-weight", "bold")
                .attr("font-family", opt.tickFont)
                .text(function (d, i) { return tickLabelText[i] })

            //Add label for units
            var unitLabels = svg.append("svg:g")
                .attr("id", "unitLabels")
            var unitsLabel = unitLabels.selectAll("text")
                .data([0])
                .enter().append("text")
                .attr("x", function (d, i) { return labelXcalc(d, i) })
                .attr("y", function (d, i) { return labelYcalc(d, i) })
                .attr("font-size", opt.labelFontSize * 1.5)
                .attr("text-anchor", "middle")
                .style("fill", opt.unitsLabelCol)
                .style("font-weight", "bold")
                .attr("font-family", opt.unitsFont)
                .text(opt.gaugeUnits)


            //Draw needle
            var needleAngle = [opt.zeroNeedleAngle]

            //Define a function for calculating the coordinates of the needle paths (see tick mark equivalent)
            var needleCalc = function () {
                function pathCalc(d, i) {
                    var nAngleRad = dToR(d + 90)

                    var y1 = originY + (needlePathStart * Math.sin(nAngleRad)),
                        y2 = originY + ((needlePathStart + needlePathLength) * Math.sin(nAngleRad)),
                        x1 = originX + (needlePathStart * Math.cos(nAngleRad)),
                        x2 = originX + ((needlePathStart + needlePathLength) * Math.cos(nAngleRad)),

                        lineData = [{ "x": x1, "y": y1 }, { "x": x2, "y": y2 }];

                    var lineFunc = d3.line()
                        .x(function (d) { return d.x; })
                        .y(function (d) { return d.y; });

                    var lineSVG = lineFunc(lineData)
                    return lineSVG
                }
                return pathCalc;
            };

            var pathNeedle = needleCalc();

            //Add a group to hold the needle path
            var needleGroup = svg.append("svg:g")
                .attr("id", "needle")

            //Draw the needle path
            var needlePath = needleGroup.selectAll("path")
                .data(needleAngle)
                .enter().append("path")
                .attr("d", pathNeedle)
                .style("stroke", opt.needleCol)
                .style("stroke-width", opt.needleWidth + "px");
            //Animate the transistion of the needle to its starting value

            needlePath.transition()
                .duration(1000)
                //.delay(0)
               // .ease(d3.easeElastic.bind(null,[0,1]))
                //.attr("transform", function(d)
                .attrTween("transform", function (d, i, a) {
                    needleAngle = valueScale(opt.needleVal)

                    //Check for min/max ends of the needle
                    if (needleAngle > opt.maxTickAngle) { needleAngle = opt.maxNeedleAngle }
                    if (needleAngle < opt.zeroTickAngle) { needleAngle = opt.zeroNeedleAngle }
                    var needleCentre = originX + "," + originY,
                        needleRot = needleAngle - opt.zeroNeedleAngle
                    return d3.interpolateString("rotate(0," + needleCentre + ")", "rotate(" + needleRot + "," + needleCentre + ")")

                });

            unitsLabel.transition()
                .duration(1000)
                //.ease("elastic", 1, 0.9)
                .tween("text", function (d) {

                    var i = d3.interpolateString(opt.minVal, opt.needleVal)
                    var self = this;
                    return function (t) {
                        self.textContent = Math.round(i(t)) + " " + opt.gaugeUnits;
                    };
                });

            // Function to update the gauge value
            this.updateGauge = function (newVal) {
                //Set default values if necessary
                if (newVal == undefined) (opt.minVal)

                //Animate the transition of the needle to its new value
                var needlePath = needleGroup.selectAll("path")
                var oldVal = opt.needleVal
                needlePath.transition()
                    .duration(3000)
                    .ease(d3.easeCubicIn)
                    .attrTween("transform", function (d, i, a) {
                        var needleAngleOld = valueScale(oldVal) - opt.zeroNeedleAngle
                        var needleAngleNew = valueScale(newVal) - opt.zeroNeedleAngle

                        //Check for min/max ends of the needle
                        if (needleAngleOld + opt.zeroNeedleAngle > opt.maxTickAngle) { needleAngleOld = opt.maxNeedleAngle - opt.zeroNeedleAngle }
                        if (needleAngleOld + opt.zeroNeedleAngle < opt.zeroTickAngle) { needleAngleOld = 0 }
                        if (needleAngleNew + opt.zeroNeedleAngle > opt.maxTickAngle) { needleAngleNew = opt.maxNeedleAngle - opt.zeroNeedleAngle }
                        if (needleAngleNew + opt.zeroNeedleAngle < opt.zeroTickAngle) { needleAngleNew = 0 }
                        var needleCentre = originX + "," + originY
                        return d3.interpolateString("rotate(" + needleAngleOld + "," + needleCentre + ")", "rotate(" + needleAngleNew + "," + needleCentre + ")")

                    });

                unitsLabel.transition()
                    .duration(3000)
                    .ease(d3.easeCubicIn)
                    .tween("text", function (d) {
                        var i = d3.interpolateString(oldVal, newVal)
                        var self = this;
                        return function (t) {
                            self.textContent = Math.round(i(t)) + " " + opt.gaugeUnits;
                        };
                    });

                //Update the current value
                opt.needleVal = newVal
            }
        }

        function dToR(angleDeg) {
            //Turns an angle in degrees to radians
            var angleRad = angleDeg * (Math.PI / 180);
            return angleRad;
        }

        return drawGauge;

    })(d3);

    var gauge = new meterGauge(config);
    scope.$watch('gaugeconfig.needleVal',function(newVal){
       gauge.updateGauge(newVal);
    })

}
export default meterGaugeComponentLink;
