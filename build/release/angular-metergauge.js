(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _metergauge = require('./metergauge.link');

var _metergauge2 = _interopRequireDefault(_metergauge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meterGaugeComponent = function meterGaugeComponent() {
  return {
    restrict: 'E',
    scope: {
      gaugeconfig: '='
    },
    link: _metergauge2.default
  };
};

exports.default = meterGaugeComponent;

},{"./metergauge.link":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _metergauge = require('./metergauge.component');

var _metergauge2 = _interopRequireDefault(_metergauge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meterGaugeModule = angular.module('meterGauge', []).directive('meterGauge', _metergauge2.default);

exports.default = meterGaugeModule;

},{"./metergauge.component":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var meterGaugeComponentLink = function meterGaugeComponentLink(scope, element, attrs) {
    var element = element[0];
    var config = scope.gaugeconfig;
    if (!config) {
        console.error('No config found');
        return;
    }

    var meterGauge = function (d3) {

        function drawGauge(opt) {
            // Set defaults if not supplied
            if (typeof opt === 'undefined') {
                var opt = {};
            }
            if (typeof opt.gaugeRadius === 'undefined') {
                opt.gaugeRadius = 150;
            }
            if (typeof opt.minVal === 'undefined') {
                opt.minVal = 0;
            }
            if (typeof opt.maxVal === 'undefined') {
                opt.maxVal = 100;
            }
            if (typeof opt.tickSpaceMinVal === 'undefined') {
                opt.tickSpaceMinVal = 1;
            }
            if (typeof opt.tickSpaceMajVal === 'undefined') {
                opt.tickSpaceMajVal = 10;
            }
            if (typeof opt.divID === 'undefined') {
                opt.divID = "vizBox";
            }
            if (typeof opt.needleVal === 'undefined') {
                opt.needleVal = 60;
            }
            if (typeof opt.gaugeUnits === 'undefined') {
                opt.gaugeUnits = "%";
            }

            if (typeof opt.padding === 'undefined') {
                opt.padding = 0.05;
            }
            if (typeof opt.edgeWidth === 'undefined') {
                opt.edgeWidth = 0.05;
            }
            if (typeof opt.tickEdgeGap === 'undefined') {
                opt.tickEdgeGap = 0.05;
            }
            if (typeof opt.tickLengthMaj === 'undefined') {
                opt.tickLengthMaj = 0.15;
            }
            if (typeof opt.tickLengthMin === 'undefined') {
                opt.tickLengthMin = 0.05;
            }
            if (typeof opt.needleTickGap === 'undefined') {
                opt.needleTickGap = 0.05;
            }
            if (typeof opt.needleLengthNeg === 'undefined') {
                opt.needleLengthNeg = 0.2;
            }
            if (typeof opt.pivotRadius === 'undefined') {
                opt.pivotRadius = 0.1;
            }

            if (typeof opt.ticknessGaugeBasis === 'undefined') {
                opt.ticknessGaugeBasis = 200;
            }
            if (typeof opt.needleWidth === 'undefined') {
                opt.needleWidth = 5;
            }
            if (typeof opt.tickWidthMaj === 'undefined') {
                opt.tickWidthMaj = 3;
            }
            if (typeof opt.tickWidthMin === 'undefined') {
                opt.tickWidthMin = 1;
            }
            if (typeof opt.labelFontSize === 'undefined') {
                opt.labelFontSize = 18;
            }
            if (typeof opt.zeroTickAngle === 'undefined') {
                opt.zeroTickAngle = 60;
            }
            if (typeof opt.maxTickAngle === 'undefined') {
                opt.maxTickAngle = 300;
            }
            if (typeof opt.zeroNeedleAngle === 'undefined') {
                opt.zeroNeedleAngle = 40;
            }
            if (typeof opt.maxNeedleAngle === 'undefined') {
                opt.maxNeedleAngle = 320;
            }

            if (typeof opt.tickColMaj === 'undefined') {
                opt.tickColMaj = '#0099CC';
            }
            if (typeof opt.tickColMin === 'undefined') {
                opt.tickColMin = '#000';
            }
            if (typeof opt.outerEdgeCol === 'undefined') {
                opt.outerEdgeCol = '#0099CC';
            }
            if (typeof opt.pivotCol === 'undefined') {
                opt.pivotCol = '#999';
            }
            if (typeof opt.innerCol === 'undefined') {
                opt.innerCol = '#fff';
            }
            if (typeof opt.unitsLabelCol === 'undefined') {
                opt.unitsLabelCol = '#000';
            }
            if (typeof opt.tickLabelCol === 'undefined') {
                opt.tickLabelCol = '#000';
            }
            if (typeof opt.needleCol === 'undefined') {
                opt.needleCol = '#0099CC';
            }

            var defaultFonts = '"Helvetica Neue", Helvetica, Arial, sans-serif';
            if (typeof opt.tickFont === 'undefined') {
                opt.tickFont = defaultFonts;
            }
            if (typeof opt.unitsFont === 'undefined') {
                opt.unitsFont = defaultFonts;
            }

            // Calculate absolute values
            opt.padding = opt.padding * opt.gaugeRadius, opt.edgeWidth = opt.edgeWidth * opt.gaugeRadius, opt.tickEdgeGap = opt.tickEdgeGap * opt.gaugeRadius, opt.tickLengthMaj = opt.tickLengthMaj * opt.gaugeRadius, opt.tickLengthMin = opt.tickLengthMin * opt.gaugeRadius, opt.needleTickGap = opt.needleTickGap * opt.gaugeRadius, opt.needleLengthNeg = opt.needleLengthNeg * opt.gaugeRadius, opt.pivotRadius = opt.pivotRadius * opt.gaugeRadius;

            opt.needleWidth = opt.needleWidth * (opt.gaugeRadius / opt.ticknessGaugeBasis), opt.tickWidthMaj = opt.tickWidthMaj * (opt.gaugeRadius / opt.ticknessGaugeBasis), opt.tickWidthMin = opt.tickWidthMin * (opt.gaugeRadius / opt.ticknessGaugeBasis), opt.labelFontSize = opt.labelFontSize * (opt.gaugeRadius / opt.ticknessGaugeBasis);

            //Calculate required values
            var needleLengthPos = opt.gaugeRadius - opt.padding - opt.edgeWidth - opt.tickEdgeGap - opt.tickLengthMaj - opt.needleTickGap,
                needlePathLength = opt.needleLengthNeg + needleLengthPos,
                needlePathStart = opt.needleLengthNeg * -1,
                tickStartMaj = opt.gaugeRadius - opt.padding - opt.edgeWidth - opt.tickEdgeGap - opt.tickLengthMaj,
                tickStartMin = opt.gaugeRadius - opt.padding - opt.edgeWidth - opt.tickEdgeGap - opt.tickLengthMin,
                labelStart = tickStartMaj - opt.labelFontSize,
                innerEdgeRadius = opt.gaugeRadius - opt.padding - opt.edgeWidth,
                outerEdgeRadius = opt.gaugeRadius - opt.padding,
                originX = opt.gaugeRadius,
                originY = opt.gaugeRadius;

            if (opt.labelFontSize < 6) {
                opt.labelFontSize = 0;
            }

            //Define a linear scale to convert values to needle displacement angle (degrees)
            var valueScale = d3.scaleLinear().domain([opt.minVal, opt.maxVal]).range([opt.zeroTickAngle, opt.maxTickAngle]);

            //Calculate tick mark angles (degrees)
            var counter = 0,
                tickAnglesMaj = [],
                tickAnglesMin = [],
                tickSpacingMajDeg = valueScale(opt.tickSpaceMajVal) - valueScale(0),
                tickSpacingMinDeg = valueScale(opt.tickSpaceMinVal) - valueScale(0);

            for (var i = opt.zeroTickAngle; i <= opt.maxTickAngle; i = i + tickSpacingMajDeg) {
                tickAnglesMaj.push(opt.zeroTickAngle + tickSpacingMajDeg * counter);
                counter++;
            }

            counter = 0;
            for (var i = opt.zeroTickAngle; i <= opt.maxTickAngle; i = i + tickSpacingMinDeg) {
                //Check for an existing major tick angle
                var exists = 0;
                tickAnglesMaj.forEach(function (d) {
                    if (opt.zeroTickAngle + tickSpacingMinDeg * counter == d) {
                        exists = 1;
                    }
                });

                if (exists == 0) {
                    tickAnglesMin.push(opt.zeroTickAngle + tickSpacingMinDeg * counter);
                }
                counter++;
            }

            //Calculate major tick mark label text
            counter = 0;
            var tickLabelText = [];

            for (var i = opt.zeroTickAngle; i <= opt.maxTickAngle; i = i + tickSpacingMajDeg) {
                tickLabelText.push(opt.minVal + opt.tickSpaceMajVal * counter);
                counter++;
            }

            //Add the svg content holder to the visualisation box element in the document (vizbox)
            var svgWidth = opt.gaugeRadius * 2,
                svgHeight = opt.gaugeRadius * 2;

            var svg = d3.select(element).append("svg").attr("id", "SVGbox-" + opt.divID).attr("width", svgWidth).attr("height", svgHeight);
            //  .attr({ 'xmlns': 'http://www.w3.org/2000/svg', 'xmlns:xlink': 'http://www.w3.org/1999/xlink' });


            //Draw the circles that make up the edge of the gauge
            var circleGroup = svg.append("svg:g").attr("id", "circles");
            var outerC = circleGroup.append("svg:circle").attr("cx", originX).attr("cy", originY).attr("r", outerEdgeRadius).style("fill", opt.outerEdgeCol).style("stroke", "none");
            var innerC = circleGroup.append("svg:circle").attr("cx", originX).attr("cy", originY).attr("r", innerEdgeRadius).style("fill", opt.innerCol).style("stroke", "none");

            //Draw the circle for the needle 'pivot'
            var pivotC = circleGroup.append("svg:circle").attr("cx", originX).attr("cy", originY).attr("r", opt.pivotRadius).style("fill", opt.pivotCol).style("stroke", "none");

            //Define two functions for calculating the coordinates of the major & minor tick mark paths
            var tickCalcMaj = function tickCalcMaj() {
                function pathCalc(d, i) {
                    //Offset the tick mark angle so zero is vertically down, then convert to radians
                    var tickAngle = d + 90,
                        tickAngleRad = dToR(tickAngle);

                    var y1 = originY + tickStartMaj * Math.sin(tickAngleRad),
                        y2 = originY + (tickStartMaj + opt.tickLengthMaj) * Math.sin(tickAngleRad),
                        x1 = originX + tickStartMaj * Math.cos(tickAngleRad),
                        x2 = originX + (tickStartMaj + opt.tickLengthMaj) * Math.cos(tickAngleRad),
                        lineData = [{ "x": x1, "y": y1 }, { "x": x2, "y": y2 }];

                    //Use a D3.JS path generator
                    var lineFunc = d3.line().x(function (d) {
                        return d.x;
                    }).y(function (d) {
                        return d.y;
                    });

                    var lineSVG = lineFunc(lineData);

                    return lineSVG;
                }
                return pathCalc;
            };

            var tickCalcMin = function tickCalcMin() {
                function pathCalc(d, i) {
                    //Offset the tick mark angle so zero is vertically down, then convert to radians
                    var tickAngle = d + 90,
                        tickAngleRad = dToR(tickAngle);

                    var y1 = originY + tickStartMin * Math.sin(tickAngleRad);
                    var y2 = originY + (tickStartMin + opt.tickLengthMin) * Math.sin(tickAngleRad);
                    var x1 = originX + tickStartMin * Math.cos(tickAngleRad);
                    var x2 = originX + (tickStartMin + opt.tickLengthMin) * Math.cos(tickAngleRad);

                    var lineData = [{ "x": x1, "y": y1 }, { "x": x2, "y": y2 }];

                    //Use a D3.JS path generator
                    var lineFunc = d3.line().x(function (d) {
                        return d.x;
                    }).y(function (d) {
                        return d.y;
                    });

                    var lineSVG = lineFunc(lineData);

                    return lineSVG;
                }
                return pathCalc;
            };

            var pathTickMaj = tickCalcMaj(),
                pathTickMin = tickCalcMin();

            //Add a group to hold the ticks
            var ticks = svg.append("svg:g").attr("id", "tickMarks");

            //Add a groups for major and minor ticks (minor first, so majors overlay)
            var ticksMin = ticks.append("svg:g").attr("id", "minorTickMarks");
            var ticksMaj = ticks.append("svg:g").attr("id", "majorTickMarks");

            //Draw the tick marks 
            var tickMin = ticksMin.selectAll("path").data(tickAnglesMin).enter().append("path").attr("d", pathTickMin).style("stroke", opt.tickColMin).style("stroke-width", opt.tickWidthMin + "px");
            var tickMaj = ticksMaj.selectAll("path").data(tickAnglesMaj).enter().append("path").attr("d", pathTickMaj).style("stroke", opt.tickColMaj).style("stroke-width", opt.tickWidthMaj + "px");

            //Define functions to calcuate the positions of the labels for the tick marks
            function labelXcalc(d, i) {
                var tickAngle = d + 90,
                    tickAngleRad = dToR(tickAngle),
                    labelW = opt.labelFontSize / (tickLabelText[i].toString().length / 2);
                var x1 = originX + (labelStart - labelW) * Math.cos(tickAngleRad);
                return x1;
            }
            function labelYcalc(d, i) {
                var tickAngle = d + 90,
                    tickAngleRad = dToR(tickAngle),
                    y1 = originY + labelStart * Math.sin(tickAngleRad) + opt.labelFontSize / 2;
                return y1;
            }

            //Add labels for major tick marks
            var tickLabels = svg.append("svg:g").attr("id", "tickLabels");
            var tickLabel = tickLabels.selectAll("text").data(tickAnglesMaj).enter().append("text").attr("x", function (d, i) {
                return labelXcalc(d, i);
            }).attr("y", function (d, i) {
                return labelYcalc(d, i);
            }).attr("font-size", opt.labelFontSize).attr("text-anchor", "middle").style("fill", opt.tickLabelCol).style("font-weight", "bold").attr("font-family", opt.tickFont).text(function (d, i) {
                return tickLabelText[i];
            });

            //Add label for units
            var unitLabels = svg.append("svg:g").attr("id", "unitLabels");
            var unitsLabel = unitLabels.selectAll("text").data([0]).enter().append("text").attr("x", function (d, i) {
                return labelXcalc(d, i);
            }).attr("y", function (d, i) {
                return labelYcalc(d, i);
            }).attr("font-size", opt.labelFontSize * 1.5).attr("text-anchor", "middle").style("fill", opt.unitsLabelCol).style("font-weight", "bold").attr("font-family", opt.unitsFont).text(opt.gaugeUnits);

            //Draw needle
            var needleAngle = [opt.zeroNeedleAngle];

            //Define a function for calculating the coordinates of the needle paths (see tick mark equivalent)
            var needleCalc = function needleCalc() {
                function pathCalc(d, i) {
                    var nAngleRad = dToR(d + 90);

                    var y1 = originY + needlePathStart * Math.sin(nAngleRad),
                        y2 = originY + (needlePathStart + needlePathLength) * Math.sin(nAngleRad),
                        x1 = originX + needlePathStart * Math.cos(nAngleRad),
                        x2 = originX + (needlePathStart + needlePathLength) * Math.cos(nAngleRad),
                        lineData = [{ "x": x1, "y": y1 }, { "x": x2, "y": y2 }];

                    var lineFunc = d3.line().x(function (d) {
                        return d.x;
                    }).y(function (d) {
                        return d.y;
                    });

                    var lineSVG = lineFunc(lineData);
                    return lineSVG;
                }
                return pathCalc;
            };

            var pathNeedle = needleCalc();

            //Add a group to hold the needle path
            var needleGroup = svg.append("svg:g").attr("id", "needle");

            //Draw the needle path
            var needlePath = needleGroup.selectAll("path").data(needleAngle).enter().append("path").attr("d", pathNeedle).style("stroke", opt.needleCol).style("stroke-width", opt.needleWidth + "px");
            //Animate the transistion of the needle to its starting value

            needlePath.transition().duration(1000)
            //.delay(0)
            // .ease(d3.easeElastic.bind(null,[0,1]))
            //.attr("transform", function(d)
            .attrTween("transform", function (d, i, a) {
                needleAngle = valueScale(opt.needleVal);

                //Check for min/max ends of the needle
                if (needleAngle > opt.maxTickAngle) {
                    needleAngle = opt.maxNeedleAngle;
                }
                if (needleAngle < opt.zeroTickAngle) {
                    needleAngle = opt.zeroNeedleAngle;
                }
                var needleCentre = originX + "," + originY,
                    needleRot = needleAngle - opt.zeroNeedleAngle;
                return d3.interpolateString("rotate(0," + needleCentre + ")", "rotate(" + needleRot + "," + needleCentre + ")");
            });

            unitsLabel.transition().duration(1000)
            //.ease("elastic", 1, 0.9)
            .tween("text", function (d) {

                var i = d3.interpolateString(opt.minVal, opt.needleVal);
                var self = this;
                return function (t) {
                    self.textContent = Math.round(i(t)) + " " + opt.gaugeUnits;
                };
            });

            // Function to update the gauge value
            this.updateGauge = function (newVal) {
                //Set default values if necessary
                if (newVal == undefined) opt.minVal;

                //Animate the transition of the needle to its new value
                var needlePath = needleGroup.selectAll("path");
                var oldVal = opt.needleVal;
                needlePath.transition().duration(3000).ease(d3.easeCubicIn).attrTween("transform", function (d, i, a) {
                    var needleAngleOld = valueScale(oldVal) - opt.zeroNeedleAngle;
                    var needleAngleNew = valueScale(newVal) - opt.zeroNeedleAngle;

                    //Check for min/max ends of the needle
                    if (needleAngleOld + opt.zeroNeedleAngle > opt.maxTickAngle) {
                        needleAngleOld = opt.maxNeedleAngle - opt.zeroNeedleAngle;
                    }
                    if (needleAngleOld + opt.zeroNeedleAngle < opt.zeroTickAngle) {
                        needleAngleOld = 0;
                    }
                    if (needleAngleNew + opt.zeroNeedleAngle > opt.maxTickAngle) {
                        needleAngleNew = opt.maxNeedleAngle - opt.zeroNeedleAngle;
                    }
                    if (needleAngleNew + opt.zeroNeedleAngle < opt.zeroTickAngle) {
                        needleAngleNew = 0;
                    }
                    var needleCentre = originX + "," + originY;
                    return d3.interpolateString("rotate(" + needleAngleOld + "," + needleCentre + ")", "rotate(" + needleAngleNew + "," + needleCentre + ")");
                });

                unitsLabel.transition().duration(3000).ease(d3.easeCubicIn).tween("text", function (d) {
                    var i = d3.interpolateString(oldVal, newVal);
                    var self = this;
                    return function (t) {
                        self.textContent = Math.round(i(t)) + " " + opt.gaugeUnits;
                    };
                });

                //Update the current value
                opt.needleVal = newVal;
            };
        }

        function dToR(angleDeg) {
            //Turns an angle in degrees to radians
            var angleRad = angleDeg * (Math.PI / 180);
            return angleRad;
        }

        return drawGauge;
    }(d3);

    var gauge = new meterGauge(config);
    scope.$watch('gaugeconfig.needleVal', function (newVal) {
        gauge.updateGauge(newVal);
    });
};
exports.default = meterGaugeComponentLink;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGNvbXBvbmVudHNcXG1ldGVyZ2F1Z2VcXG1ldGVyZ2F1Z2UuY29tcG9uZW50LmpzIiwiYXBwXFxjb21wb25lbnRzXFxtZXRlcmdhdWdlXFxtZXRlcmdhdWdlLmpzIiwiYXBwXFxjb21wb25lbnRzXFxtZXRlcmdhdWdlXFxtZXRlcmdhdWdlLmxpbmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7O0FBQ0EsSUFBSSxzQkFBc0IsU0FBdEIsbUJBQXNCLEdBQVk7QUFDcEMsU0FBTztBQUNMLGNBQVUsR0FETDtBQUVMLFdBQU87QUFDTCxtQkFBWTtBQURQLEtBRkY7QUFLTDtBQUxLLEdBQVA7QUFPRCxDQVJEOztrQkFVZSxtQjs7Ozs7Ozs7O0FDWGY7Ozs7OztBQUNBLElBQUksbUJBQW1CLFFBQVEsTUFBUixDQUFlLFlBQWYsRUFBNkIsRUFBN0IsRUFHdEIsU0FIc0IsQ0FHWixZQUhZLHVCQUF2Qjs7a0JBS2UsZ0I7Ozs7Ozs7OztBQ0xmLElBQUksMEJBQTBCLFNBQTFCLHVCQUEwQixDQUFVLEtBQVYsRUFBaUIsT0FBakIsRUFBMEIsS0FBMUIsRUFBaUM7QUFDM0QsUUFBSSxVQUFVLFFBQVEsQ0FBUixDQUFkO0FBQ0EsUUFBSSxTQUFTLE1BQU0sV0FBbkI7QUFDQSxRQUFHLENBQUMsTUFBSixFQUFXO0FBQ1AsZ0JBQVEsS0FBUixDQUFjLGlCQUFkO0FBQ0E7QUFDSDs7QUFFRCxRQUFJLGFBQWMsVUFBVSxFQUFWLEVBQWM7O0FBRTVCLGlCQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDcEI7QUFDQSxnQkFBSSxPQUFPLEdBQVAsS0FBZSxXQUFuQixFQUFnQztBQUFFLG9CQUFJLE1BQU0sRUFBVjtBQUFjO0FBQ2hELGdCQUFJLE9BQU8sSUFBSSxXQUFYLEtBQTJCLFdBQS9CLEVBQTRDO0FBQUUsb0JBQUksV0FBSixHQUFrQixHQUFsQjtB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WixHQUE2QixHQUE3QixHQUFtQyxZQUFuQyxHQUFrRCxHQUE5SCxDQUFQO0FBRUgsaUJBZkw7O0FBaUJBLDJCQUFXLFVBQVgsR0FDSyxRQURMLENBQ2MsSUFEZCxFQUVLLElBRkwsQ0FFVSxHQUFHLFdBRmIsRUFHSyxLQUhMLENBR1csTUFIWCxFQUdtQixVQUFVLENBQVYsRUFBYTtBQUN4Qix3QkFBSSxJQUFJLEdBQUcsaUJBQUgsQ0FBcUIsTUFBckIsRUFBNkIsTUFBN0IsQ0FBUjtBQUNBLHdCQUFJLE9BQU8sSUFBWDtBQUNBLDJCQUFPLFVBQVUsQ0FBVixFQUFhO0FBQ2hCLDZCQUFLLFdBQUwsR0FBbUIsS0FBSyxLQUFMLENBQVcsRUFBRSxDQUFGLENBQVgsSUFBbUIsR0FBbkIsR0FBeUIsSUFBSSxVQUFoRDtBQUNILHFCQUZEO0FBR0gsaUJBVEw7O0FBV0E7QUFDQSxvQkFBSSxTQUFKLEdBQWdCLE1BQWhCO0FBQ0gsYUFyQ0Q7QUFzQ0g7O0FBRUQsaUJBQVMsSUFBVCxDQUFjLFFBQWQsRUFBd0I7QUFDcEI7QUFDQSxnQkFBSSxXQUFXLFlBQVksS0FBSyxFQUFMLEdBQVUsR0FBdEIsQ0FBZjtBQUNBLG1CQUFPLFFBQVA7QUFDSDs7QUFFRCxlQUFPLFNBQVA7QUFFSCxLQTdZZ0IsQ0E2WWQsRUE3WWMsQ0FBakI7O0FBK1lBLFFBQUksUUFBUSxJQUFJLFVBQUosQ0FBZSxNQUFmLENBQVo7QUFDQSxVQUFNLE1BQU4sQ0FBYSx1QkFBYixFQUFxQyxVQUFTLE1BQVQsRUFBZ0I7QUFDbEQsY0FBTSxXQUFOLENBQWtCLE1BQWxCO0FBQ0YsS0FGRDtBQUlILENBNVpEO2tCQTZaZSx1QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgbGluayBmcm9tICcuL21ldGVyZ2F1Z2UubGluayc7XHJcbmxldCBtZXRlckdhdWdlQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgc2NvcGU6IHtcclxuICAgICAgZ2F1Z2Vjb25maWc6Jz0nXHJcbiAgICB9LFxyXG4gICAgbGluazogbGluayxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtZXRlckdhdWdlQ29tcG9uZW50O1xyXG4iLCJpbXBvcnQgbWV0ZXJHYXVnZUNvbXBvbmVudCBmcm9tICcuL21ldGVyZ2F1Z2UuY29tcG9uZW50JztcclxubGV0IG1ldGVyR2F1Z2VNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWV0ZXJHYXVnZScsIFsgXHJcbl0pXHJcblxyXG4uZGlyZWN0aXZlKCdtZXRlckdhdWdlJywgbWV0ZXJHYXVnZUNvbXBvbmVudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtZXRlckdhdWdlTW9kdWxlO1xyXG4iLCJcclxubGV0IG1ldGVyR2F1Z2VDb21wb25lbnRMaW5rID0gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50WzBdO1xyXG4gICAgdmFyIGNvbmZpZyA9IHNjb3BlLmdhdWdlY29uZmlnO1xyXG4gICAgaWYoIWNvbmZpZyl7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTm8gY29uZmlnIGZvdW5kJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtZXRlckdhdWdlID0gKGZ1bmN0aW9uIChkMykge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkcmF3R2F1Z2Uob3B0KSB7XHJcbiAgICAgICAgICAgIC8vIFNldCBkZWZhdWx0cyBpZiBub3Qgc3VwcGxpZWRcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT09ICd1bmRlZmluZWQnKSB7IHZhciBvcHQgPSB7fSB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LmdhdWdlUmFkaXVzID09PSAndW5kZWZpbmVkJykgeyBvcHQuZ2F1Z2VSYWRpdXMgPSAxNTAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC5taW5WYWwgPT09ICd1bmRlZmluZWQnKSB7IG9wdC5taW5WYWwgPSAwIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQubWF4VmFsID09PSAndW5kZWZpbmVkJykgeyBvcHQubWF4VmFsID0gMTAwIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQudGlja1NwYWNlTWluVmFsID09PSAndW5kZWZpbmVkJykgeyBvcHQudGlja1NwYWNlTWluVmFsID0gMSB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LnRpY2tTcGFjZU1halZhbCA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0LnRpY2tTcGFjZU1halZhbCA9IDEwIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQuZGl2SUQgPT09ICd1bmRlZmluZWQnKSB7IG9wdC5kaXZJRCA9IFwidml6Qm94XCIgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC5uZWVkbGVWYWwgPT09ICd1bmRlZmluZWQnKSB7IG9wdC5uZWVkbGVWYWwgPSA2MCB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LmdhdWdlVW5pdHMgPT09ICd1bmRlZmluZWQnKSB7IG9wdC5nYXVnZVVuaXRzID0gXCIlXCIgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQucGFkZGluZyA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0LnBhZGRpbmcgPSAwLjA1IH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQuZWRnZVdpZHRoID09PSAndW5kZWZpbmVkJykgeyBvcHQuZWRnZVdpZHRoID0gMC4wNSB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LnRpY2tFZGdlR2FwID09PSAndW5kZWZpbmVkJykgeyBvcHQudGlja0VkZ2VHYXAgPSAwLjA1IH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQudGlja0xlbmd0aE1haiA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0LnRpY2tMZW5ndGhNYWogPSAwLjE1IH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQudGlja0xlbmd0aE1pbiA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0LnRpY2tMZW5ndGhNaW4gPSAwLjA1IH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQubmVlZGxlVGlja0dhcCA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0Lm5lZWRsZVRpY2tHYXAgPSAwLjA1IH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQubmVlZGxlTGVuZ3RoTmVnID09PSAndW5kZWZpbmVkJykgeyBvcHQubmVlZGxlTGVuZ3RoTmVnID0gMC4yIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQucGl2b3RSYWRpdXMgPT09ICd1bmRlZmluZWQnKSB7IG9wdC5waXZvdFJhZGl1cyA9IDAuMSB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC50aWNrbmVzc0dhdWdlQmFzaXMgPT09ICd1bmRlZmluZWQnKSB7IG9wdC50aWNrbmVzc0dhdWdlQmFzaXMgPSAyMDAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC5uZWVkbGVXaWR0aCA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0Lm5lZWRsZVdpZHRoID0gNSB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LnRpY2tXaWR0aE1haiA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0LnRpY2tXaWR0aE1haiA9IDMgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC50aWNrV2lkdGhNaW4gPT09ICd1bmRlZmluZWQnKSB7IG9wdC50aWNrV2lkdGhNaW4gPSAxIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQubGFiZWxGb250U2l6ZSA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0LmxhYmVsRm9udFNpemUgPSAxOCB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0Lnplcm9UaWNrQW5nbGUgPT09ICd1bmRlZmluZWQnKSB7IG9wdC56ZXJvVGlja0FuZ2xlID0gNjAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC5tYXhUaWNrQW5nbGUgPT09ICd1bmRlZmluZWQnKSB7IG9wdC5tYXhUaWNrQW5nbGUgPSAzMDAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC56ZXJvTmVlZGxlQW5nbGUgPT09ICd1bmRlZmluZWQnKSB7IG9wdC56ZXJvTmVlZGxlQW5nbGUgPSA0MCB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0Lm1heE5lZWRsZUFuZ2xlID09PSAndW5kZWZpbmVkJykgeyBvcHQubWF4TmVlZGxlQW5nbGUgPSAzMjAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQudGlja0NvbE1haiA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0LnRpY2tDb2xNYWogPSAnIzAwOTlDQycgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC50aWNrQ29sTWluID09PSAndW5kZWZpbmVkJykgeyBvcHQudGlja0NvbE1pbiA9ICcjMDAwJyB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0Lm91dGVyRWRnZUNvbCA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0Lm91dGVyRWRnZUNvbCA9ICcjMDA5OUNDJyB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LnBpdm90Q29sID09PSAndW5kZWZpbmVkJykgeyBvcHQucGl2b3RDb2wgPSAnIzk5OScgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC5pbm5lckNvbCA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0LmlubmVyQ29sID0gJyNmZmYnIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQudW5pdHNMYWJlbENvbCA9PT0gJ3VuZGVmaW5lZCcpIHsgb3B0LnVuaXRzTGFiZWxDb2wgPSAnIzAwMCcgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC50aWNrTGFiZWxDb2wgPT09ICd1bmRlZmluZWQnKSB7IG9wdC50aWNrTGFiZWxDb2wgPSAnIzAwMCcgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC5uZWVkbGVDb2wgPT09ICd1bmRlZmluZWQnKSB7IG9wdC5uZWVkbGVDb2wgPSAnIzAwOTlDQycgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmF1bHRGb250cyA9ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LnRpY2tGb250ID09PSAndW5kZWZpbmVkJykgeyBvcHQudGlja0ZvbnQgPSBkZWZhdWx0Rm9udHMgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdC51bml0c0ZvbnQgPT09ICd1bmRlZmluZWQnKSB7IG9wdC51bml0c0ZvbnQgPSBkZWZhdWx0Rm9udHMgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGFic29sdXRlIHZhbHVlc1xyXG4gICAgICAgICAgICBvcHQucGFkZGluZyA9IG9wdC5wYWRkaW5nICogb3B0LmdhdWdlUmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgb3B0LmVkZ2VXaWR0aCA9IG9wdC5lZGdlV2lkdGggKiBvcHQuZ2F1Z2VSYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBvcHQudGlja0VkZ2VHYXAgPSBvcHQudGlja0VkZ2VHYXAgKiBvcHQuZ2F1Z2VSYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBvcHQudGlja0xlbmd0aE1haiA9IG9wdC50aWNrTGVuZ3RoTWFqICogb3B0LmdhdWdlUmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgb3B0LnRpY2tMZW5ndGhNaW4gPSBvcHQudGlja0xlbmd0aE1pbiAqIG9wdC5nYXVnZVJhZGl1cyxcclxuICAgICAgICAgICAgICAgIG9wdC5uZWVkbGVUaWNrR2FwID0gb3B0Lm5lZWRsZVRpY2tHYXAgKiBvcHQuZ2F1Z2VSYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBvcHQubmVlZGxlTGVuZ3RoTmVnID0gb3B0Lm5lZWRsZUxlbmd0aE5lZyAqIG9wdC5nYXVnZVJhZGl1cyxcclxuICAgICAgICAgICAgICAgIG9wdC5waXZvdFJhZGl1cyA9IG9wdC5waXZvdFJhZGl1cyAqIG9wdC5nYXVnZVJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIG9wdC5uZWVkbGVXaWR0aCA9IG9wdC5uZWVkbGVXaWR0aCAqIChvcHQuZ2F1Z2VSYWRpdXMgLyBvcHQudGlja25lc3NHYXVnZUJhc2lzKSxcclxuICAgICAgICAgICAgICAgIG9wdC50aWNrV2lkdGhNYWogPSBvcHQudGlja1dpZHRoTWFqICogKG9wdC5nYXVnZVJhZGl1cyAvIG9wdC50aWNrbmVzc0dhdWdlQmFzaXMpLFxyXG4gICAgICAgICAgICAgICAgb3B0LnRpY2tXaWR0aE1pbiA9IG9wdC50aWNrV2lkdGhNaW4gKiAob3B0LmdhdWdlUmFkaXVzIC8gb3B0LnRpY2tuZXNzR2F1Z2VCYXNpcyksXHJcbiAgICAgICAgICAgICAgICBvcHQubGFiZWxGb250U2l6ZSA9IG9wdC5sYWJlbEZvbnRTaXplICogKG9wdC5nYXVnZVJhZGl1cyAvIG9wdC50aWNrbmVzc0dhdWdlQmFzaXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIHJlcXVpcmVkIHZhbHVlc1xyXG4gICAgICAgICAgICB2YXIgbmVlZGxlTGVuZ3RoUG9zID0gb3B0LmdhdWdlUmFkaXVzIC0gb3B0LnBhZGRpbmcgLSBvcHQuZWRnZVdpZHRoIC0gb3B0LnRpY2tFZGdlR2FwIC0gb3B0LnRpY2tMZW5ndGhNYWogLSBvcHQubmVlZGxlVGlja0dhcCxcclxuICAgICAgICAgICAgICAgIG5lZWRsZVBhdGhMZW5ndGggPSBvcHQubmVlZGxlTGVuZ3RoTmVnICsgbmVlZGxlTGVuZ3RoUG9zLFxyXG4gICAgICAgICAgICAgICAgbmVlZGxlUGF0aFN0YXJ0ID0gb3B0Lm5lZWRsZUxlbmd0aE5lZyAqICgtMSksXHJcbiAgICAgICAgICAgICAgICB0aWNrU3RhcnRNYWogPSBvcHQuZ2F1Z2VSYWRpdXMgLSBvcHQucGFkZGluZyAtIG9wdC5lZGdlV2lkdGggLSBvcHQudGlja0VkZ2VHYXAgLSBvcHQudGlja0xlbmd0aE1haixcclxuICAgICAgICAgICAgICAgIHRpY2tTdGFydE1pbiA9IG9wdC5nYXVnZVJhZGl1cyAtIG9wdC5wYWRkaW5nIC0gb3B0LmVkZ2VXaWR0aCAtIG9wdC50aWNrRWRnZUdhcCAtIG9wdC50aWNrTGVuZ3RoTWluLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxTdGFydCA9IHRpY2tTdGFydE1haiAtIG9wdC5sYWJlbEZvbnRTaXplLFxyXG4gICAgICAgICAgICAgICAgaW5uZXJFZGdlUmFkaXVzID0gb3B0LmdhdWdlUmFkaXVzIC0gb3B0LnBhZGRpbmcgLSBvcHQuZWRnZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgb3V0ZXJFZGdlUmFkaXVzID0gb3B0LmdhdWdlUmFkaXVzIC0gb3B0LnBhZGRpbmcsXHJcbiAgICAgICAgICAgICAgICBvcmlnaW5YID0gb3B0LmdhdWdlUmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luWSA9IG9wdC5nYXVnZVJhZGl1cztcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHQubGFiZWxGb250U2l6ZSA8IDYpIHsgb3B0LmxhYmVsRm9udFNpemUgPSAwIH1cclxuXHJcbiAgICAgICAgICAgIC8vRGVmaW5lIGEgbGluZWFyIHNjYWxlIHRvIGNvbnZlcnQgdmFsdWVzIHRvIG5lZWRsZSBkaXNwbGFjZW1lbnQgYW5nbGUgKGRlZ3JlZXMpXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgICAgICAgICAgLmRvbWFpbihbb3B0Lm1pblZhbCwgb3B0Lm1heFZhbF0pXHJcbiAgICAgICAgICAgICAgICAucmFuZ2UoW29wdC56ZXJvVGlja0FuZ2xlLCBvcHQubWF4VGlja0FuZ2xlXSk7XHJcblxyXG4gICAgICAgICAgICAvL0NhbGN1bGF0ZSB0aWNrIG1hcmsgYW5nbGVzIChkZWdyZWVzKVxyXG4gICAgICAgICAgICB2YXIgY291bnRlciA9IDAsXHJcbiAgICAgICAgICAgICAgICB0aWNrQW5nbGVzTWFqID0gW10sXHJcbiAgICAgICAgICAgICAgICB0aWNrQW5nbGVzTWluID0gW10sXHJcbiAgICAgICAgICAgICAgICB0aWNrU3BhY2luZ01hakRlZyA9IHZhbHVlU2NhbGUob3B0LnRpY2tTcGFjZU1halZhbCkgLSB2YWx1ZVNjYWxlKDApLFxyXG4gICAgICAgICAgICAgICAgdGlja1NwYWNpbmdNaW5EZWcgPSB2YWx1ZVNjYWxlKG9wdC50aWNrU3BhY2VNaW5WYWwpIC0gdmFsdWVTY2FsZSgwKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBvcHQuemVyb1RpY2tBbmdsZTsgaSA8PSBvcHQubWF4VGlja0FuZ2xlOyBpID0gaSArIHRpY2tTcGFjaW5nTWFqRGVnKSB7XHJcbiAgICAgICAgICAgICAgICB0aWNrQW5nbGVzTWFqLnB1c2gob3B0Lnplcm9UaWNrQW5nbGUgKyAodGlja1NwYWNpbmdNYWpEZWcgKiBjb3VudGVyKSlcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIrK1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb3VudGVyID0gMFxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gb3B0Lnplcm9UaWNrQW5nbGU7IGkgPD0gb3B0Lm1heFRpY2tBbmdsZTsgaSA9IGkgKyB0aWNrU3BhY2luZ01pbkRlZykge1xyXG4gICAgICAgICAgICAgICAgLy9DaGVjayBmb3IgYW4gZXhpc3RpbmcgbWFqb3IgdGljayBhbmdsZVxyXG4gICAgICAgICAgICAgICAgdmFyIGV4aXN0cyA9IDBcclxuICAgICAgICAgICAgICAgIHRpY2tBbmdsZXNNYWouZm9yRWFjaChmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgob3B0Lnplcm9UaWNrQW5nbGUgKyAodGlja1NwYWNpbmdNaW5EZWcgKiBjb3VudGVyKSkgPT0gZCkgeyBleGlzdHMgPSAxIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0cyA9PSAwKSB7IHRpY2tBbmdsZXNNaW4ucHVzaChvcHQuemVyb1RpY2tBbmdsZSArICh0aWNrU3BhY2luZ01pbkRlZyAqIGNvdW50ZXIpKSB9XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyKytcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIG1ham9yIHRpY2sgbWFyayBsYWJlbCB0ZXh0XHJcbiAgICAgICAgICAgIGNvdW50ZXIgPSAwXHJcbiAgICAgICAgICAgIHZhciB0aWNrTGFiZWxUZXh0ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gb3B0Lnplcm9UaWNrQW5nbGU7IGkgPD0gb3B0Lm1heFRpY2tBbmdsZTsgaSA9IGkgKyB0aWNrU3BhY2luZ01hakRlZykge1xyXG4gICAgICAgICAgICAgICAgdGlja0xhYmVsVGV4dC5wdXNoKG9wdC5taW5WYWwgKyAob3B0LnRpY2tTcGFjZU1halZhbCAqIGNvdW50ZXIpKVxyXG4gICAgICAgICAgICAgICAgY291bnRlcisrXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIHRoZSBzdmcgY29udGVudCBob2xkZXIgdG8gdGhlIHZpc3VhbGlzYXRpb24gYm94IGVsZW1lbnQgaW4gdGhlIGRvY3VtZW50ICh2aXpib3gpXHJcbiAgICAgICAgICAgIHZhciBzdmdXaWR0aCA9IG9wdC5nYXVnZVJhZGl1cyAqIDIsXHJcbiAgICAgICAgICAgICAgICBzdmdIZWlnaHQgPSBvcHQuZ2F1Z2VSYWRpdXMgKiAyO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN2ZyA9IGQzLnNlbGVjdChlbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZChcInN2Z1wiKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJpZFwiLCBcIlNWR2JveC1cIiArIG9wdC5kaXZJRClcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgc3ZnV2lkdGgpXHJcbiAgICAgICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBzdmdIZWlnaHQpXHJcbiAgICAgICAgICAgICAgLy8gIC5hdHRyKHsgJ3htbG5zJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3htbG5zOnhsaW5rJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vRHJhdyB0aGUgY2lyY2xlcyB0aGF0IG1ha2UgdXAgdGhlIGVkZ2Ugb2YgdGhlIGdhdWdlXHJcbiAgICAgICAgICAgIHZhciBjaXJjbGVHcm91cCA9IHN2Zy5hcHBlbmQoXCJzdmc6Z1wiKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJpZFwiLCBcImNpcmNsZXNcIilcclxuICAgICAgICAgICAgdmFyIG91dGVyQyA9IGNpcmNsZUdyb3VwLmFwcGVuZChcInN2ZzpjaXJjbGVcIilcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3hcIiwgb3JpZ2luWClcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3lcIiwgb3JpZ2luWSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiclwiLCBvdXRlckVkZ2VSYWRpdXMpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIG9wdC5vdXRlckVkZ2VDb2wpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCJub25lXCIpO1xyXG4gICAgICAgICAgICB2YXIgaW5uZXJDID0gY2lyY2xlR3JvdXAuYXBwZW5kKFwic3ZnOmNpcmNsZVwiKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjeFwiLCBvcmlnaW5YKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjeVwiLCBvcmlnaW5ZKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJyXCIsIGlubmVyRWRnZVJhZGl1cylcclxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgb3B0LmlubmVyQ29sKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vRHJhdyB0aGUgY2lyY2xlIGZvciB0aGUgbmVlZGxlICdwaXZvdCdcclxuICAgICAgICAgICAgdmFyIHBpdm90QyA9IGNpcmNsZUdyb3VwLmFwcGVuZChcInN2ZzpjaXJjbGVcIilcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3hcIiwgb3JpZ2luWClcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3lcIiwgb3JpZ2luWSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiclwiLCBvcHQucGl2b3RSYWRpdXMpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIG9wdC5waXZvdENvbClcclxuICAgICAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIm5vbmVcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9EZWZpbmUgdHdvIGZ1bmN0aW9ucyBmb3IgY2FsY3VsYXRpbmcgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBtYWpvciAmIG1pbm9yIHRpY2sgbWFyayBwYXRoc1xyXG4gICAgICAgICAgICB2YXIgdGlja0NhbGNNYWogPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwYXRoQ2FsYyhkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9PZmZzZXQgdGhlIHRpY2sgbWFyayBhbmdsZSBzbyB6ZXJvIGlzIHZlcnRpY2FsbHkgZG93biwgdGhlbiBjb252ZXJ0IHRvIHJhZGlhbnNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGlja0FuZ2xlID0gZCArIDkwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrQW5nbGVSYWQgPSBkVG9SKHRpY2tBbmdsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB5MSA9IG9yaWdpblkgKyAodGlja1N0YXJ0TWFqICogTWF0aC5zaW4odGlja0FuZ2xlUmFkKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkyID0gb3JpZ2luWSArICgodGlja1N0YXJ0TWFqICsgb3B0LnRpY2tMZW5ndGhNYWopICogTWF0aC5zaW4odGlja0FuZ2xlUmFkKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHgxID0gb3JpZ2luWCArICh0aWNrU3RhcnRNYWogKiBNYXRoLmNvcyh0aWNrQW5nbGVSYWQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDIgPSBvcmlnaW5YICsgKCh0aWNrU3RhcnRNYWogKyBvcHQudGlja0xlbmd0aE1haikgKiBNYXRoLmNvcyh0aWNrQW5nbGVSYWQpKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVEYXRhID0gW3sgXCJ4XCI6IHgxLCBcInlcIjogeTEgfSwgeyBcInhcIjogeDIsIFwieVwiOiB5MiB9XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Vc2UgYSBEMy5KUyBwYXRoIGdlbmVyYXRvclxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lRnVuYyA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54OyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueShmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55OyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmVTVkcgPSBsaW5lRnVuYyhsaW5lRGF0YSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVTVkdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoQ2FsYztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aWNrQ2FsY01pbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhdGhDYWxjKGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL09mZnNldCB0aGUgdGljayBtYXJrIGFuZ2xlIHNvIHplcm8gaXMgdmVydGljYWxseSBkb3duLCB0aGVuIGNvbnZlcnQgdG8gcmFkaWFuc1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aWNrQW5nbGUgPSBkICsgOTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tBbmdsZVJhZCA9IGRUb1IodGlja0FuZ2xlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkxID0gb3JpZ2luWSArICh0aWNrU3RhcnRNaW4gKiBNYXRoLnNpbih0aWNrQW5nbGVSYWQpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgeTIgPSBvcmlnaW5ZICsgKCh0aWNrU3RhcnRNaW4gKyBvcHQudGlja0xlbmd0aE1pbikgKiBNYXRoLnNpbih0aWNrQW5nbGVSYWQpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgeDEgPSBvcmlnaW5YICsgKHRpY2tTdGFydE1pbiAqIE1hdGguY29zKHRpY2tBbmdsZVJhZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB4MiA9IG9yaWdpblggKyAoKHRpY2tTdGFydE1pbiArIG9wdC50aWNrTGVuZ3RoTWluKSAqIE1hdGguY29zKHRpY2tBbmdsZVJhZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGluZURhdGEgPSBbeyBcInhcIjogeDEsIFwieVwiOiB5MSB9LCB7IFwieFwiOiB4MiwgXCJ5XCI6IHkyIH1dO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1VzZSBhIEQzLkpTIHBhdGggZ2VuZXJhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmVGdW5jID0gZDMubGluZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC54KGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLng7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC55KGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnk7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGluZVNWRyA9IGxpbmVGdW5jKGxpbmVEYXRhKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGluZVNWR1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGhDYWxjO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhdGhUaWNrTWFqID0gdGlja0NhbGNNYWooKSxcclxuICAgICAgICAgICAgICAgIHBhdGhUaWNrTWluID0gdGlja0NhbGNNaW4oKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL0FkZCBhIGdyb3VwIHRvIGhvbGQgdGhlIHRpY2tzXHJcbiAgICAgICAgICAgIHZhciB0aWNrcyA9IHN2Zy5hcHBlbmQoXCJzdmc6Z1wiKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJpZFwiLCBcInRpY2tNYXJrc1wiKVxyXG5cclxuICAgICAgICAgICAgLy9BZGQgYSBncm91cHMgZm9yIG1ham9yIGFuZCBtaW5vciB0aWNrcyAobWlub3IgZmlyc3QsIHNvIG1ham9ycyBvdmVybGF5KVxyXG4gICAgICAgICAgICB2YXIgdGlja3NNaW4gPSB0aWNrcy5hcHBlbmQoXCJzdmc6Z1wiKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJpZFwiLCBcIm1pbm9yVGlja01hcmtzXCIpXHJcbiAgICAgICAgICAgIHZhciB0aWNrc01haiA9IHRpY2tzLmFwcGVuZChcInN2ZzpnXCIpXHJcbiAgICAgICAgICAgICAgICAuYXR0cihcImlkXCIsIFwibWFqb3JUaWNrTWFya3NcIilcclxuXHJcblxyXG4gICAgICAgICAgICAvL0RyYXcgdGhlIHRpY2sgbWFya3MgXHJcbiAgICAgICAgICAgIHZhciB0aWNrTWluID0gdGlja3NNaW4uc2VsZWN0QWxsKFwicGF0aFwiKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEodGlja0FuZ2xlc01pbilcclxuICAgICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInBhdGhcIilcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoVGlja01pbilcclxuICAgICAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBvcHQudGlja0NvbE1pbilcclxuICAgICAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCBvcHQudGlja1dpZHRoTWluICsgXCJweFwiKTtcclxuICAgICAgICAgICAgdmFyIHRpY2tNYWogPSB0aWNrc01hai5zZWxlY3RBbGwoXCJwYXRoXCIpXHJcbiAgICAgICAgICAgICAgICAuZGF0YSh0aWNrQW5nbGVzTWFqKVxyXG4gICAgICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicGF0aFwiKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJkXCIsIHBhdGhUaWNrTWFqKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIG9wdC50aWNrQ29sTWFqKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIG9wdC50aWNrV2lkdGhNYWogKyBcInB4XCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vRGVmaW5lIGZ1bmN0aW9ucyB0byBjYWxjdWF0ZSB0aGUgcG9zaXRpb25zIG9mIHRoZSBsYWJlbHMgZm9yIHRoZSB0aWNrIG1hcmtzXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxhYmVsWGNhbGMoZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpY2tBbmdsZSA9IGQgKyA5MCxcclxuICAgICAgICAgICAgICAgICAgICB0aWNrQW5nbGVSYWQgPSBkVG9SKHRpY2tBbmdsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxXID0gb3B0LmxhYmVsRm9udFNpemUgLyAodGlja0xhYmVsVGV4dFtpXS50b1N0cmluZygpLmxlbmd0aCAvIDIpXHJcbiAgICAgICAgICAgICAgICB2YXIgeDEgPSBvcmlnaW5YICsgKChsYWJlbFN0YXJ0IC0gbGFiZWxXKSAqIE1hdGguY29zKHRpY2tBbmdsZVJhZCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHgxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gbGFiZWxZY2FsYyhkLCBpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGlja0FuZ2xlID0gZCArIDkwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tBbmdsZVJhZCA9IGRUb1IodGlja0FuZ2xlKSxcclxuICAgICAgICAgICAgICAgICAgICB5MSA9IG9yaWdpblkgKyAoKGxhYmVsU3RhcnQpICogTWF0aC5zaW4odGlja0FuZ2xlUmFkKSkgKyAob3B0LmxhYmVsRm9udFNpemUgLyAyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB5MVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0FkZCBsYWJlbHMgZm9yIG1ham9yIHRpY2sgbWFya3NcclxuICAgICAgICAgICAgdmFyIHRpY2tMYWJlbHMgPSBzdmcuYXBwZW5kKFwic3ZnOmdcIilcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiaWRcIiwgXCJ0aWNrTGFiZWxzXCIpXHJcbiAgICAgICAgICAgIHZhciB0aWNrTGFiZWwgPSB0aWNrTGFiZWxzLnNlbGVjdEFsbChcInRleHRcIilcclxuICAgICAgICAgICAgICAgIC5kYXRhKHRpY2tBbmdsZXNNYWopXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgICAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24gKGQsIGkpIHsgcmV0dXJuIGxhYmVsWGNhbGMoZCwgaSkgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbiAoZCwgaSkgeyByZXR1cm4gbGFiZWxZY2FsYyhkLCBpKSB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgb3B0LmxhYmVsRm9udFNpemUpXHJcbiAgICAgICAgICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIG9wdC50aWNrTGFiZWxDb2wpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiZm9udC1mYW1pbHlcIiwgb3B0LnRpY2tGb250KVxyXG4gICAgICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQsIGkpIHsgcmV0dXJuIHRpY2tMYWJlbFRleHRbaV0gfSlcclxuXHJcbiAgICAgICAgICAgIC8vQWRkIGxhYmVsIGZvciB1bml0c1xyXG4gICAgICAgICAgICB2YXIgdW5pdExhYmVscyA9IHN2Zy5hcHBlbmQoXCJzdmc6Z1wiKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJpZFwiLCBcInVuaXRMYWJlbHNcIilcclxuICAgICAgICAgICAgdmFyIHVuaXRzTGFiZWwgPSB1bml0TGFiZWxzLnNlbGVjdEFsbChcInRleHRcIilcclxuICAgICAgICAgICAgICAgIC5kYXRhKFswXSlcclxuICAgICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcInRleHRcIilcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbiAoZCwgaSkgeyByZXR1cm4gbGFiZWxYY2FsYyhkLCBpKSB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uIChkLCBpKSB7IHJldHVybiBsYWJlbFljYWxjKGQsIGkpIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBvcHQubGFiZWxGb250U2l6ZSAqIDEuNSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcclxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgb3B0LnVuaXRzTGFiZWxDb2wpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiZm9udC1mYW1pbHlcIiwgb3B0LnVuaXRzRm9udClcclxuICAgICAgICAgICAgICAgIC50ZXh0KG9wdC5nYXVnZVVuaXRzKVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vRHJhdyBuZWVkbGVcclxuICAgICAgICAgICAgdmFyIG5lZWRsZUFuZ2xlID0gW29wdC56ZXJvTmVlZGxlQW5nbGVdXHJcblxyXG4gICAgICAgICAgICAvL0RlZmluZSBhIGZ1bmN0aW9uIGZvciBjYWxjdWxhdGluZyB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIG5lZWRsZSBwYXRocyAoc2VlIHRpY2sgbWFyayBlcXVpdmFsZW50KVxyXG4gICAgICAgICAgICB2YXIgbmVlZGxlQ2FsYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhdGhDYWxjKGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbkFuZ2xlUmFkID0gZFRvUihkICsgOTApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB5MSA9IG9yaWdpblkgKyAobmVlZGxlUGF0aFN0YXJ0ICogTWF0aC5zaW4obkFuZ2xlUmFkKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkyID0gb3JpZ2luWSArICgobmVlZGxlUGF0aFN0YXJ0ICsgbmVlZGxlUGF0aExlbmd0aCkgKiBNYXRoLnNpbihuQW5nbGVSYWQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDEgPSBvcmlnaW5YICsgKG5lZWRsZVBhdGhTdGFydCAqIE1hdGguY29zKG5BbmdsZVJhZCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4MiA9IG9yaWdpblggKyAoKG5lZWRsZVBhdGhTdGFydCArIG5lZWRsZVBhdGhMZW5ndGgpICogTWF0aC5jb3MobkFuZ2xlUmFkKSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lRGF0YSA9IFt7IFwieFwiOiB4MSwgXCJ5XCI6IHkxIH0sIHsgXCJ4XCI6IHgyLCBcInlcIjogeTIgfV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lRnVuYyA9IGQzLmxpbmUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54OyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAueShmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55OyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmVTVkcgPSBsaW5lRnVuYyhsaW5lRGF0YSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGluZVNWR1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGhDYWxjO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhdGhOZWVkbGUgPSBuZWVkbGVDYWxjKCk7XHJcblxyXG4gICAgICAgICAgICAvL0FkZCBhIGdyb3VwIHRvIGhvbGQgdGhlIG5lZWRsZSBwYXRoXHJcbiAgICAgICAgICAgIHZhciBuZWVkbGVHcm91cCA9IHN2Zy5hcHBlbmQoXCJzdmc6Z1wiKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJpZFwiLCBcIm5lZWRsZVwiKVxyXG5cclxuICAgICAgICAgICAgLy9EcmF3IHRoZSBuZWVkbGUgcGF0aFxyXG4gICAgICAgICAgICB2YXIgbmVlZGxlUGF0aCA9IG5lZWRsZUdyb3VwLnNlbGVjdEFsbChcInBhdGhcIilcclxuICAgICAgICAgICAgICAgIC5kYXRhKG5lZWRsZUFuZ2xlKVxyXG4gICAgICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicGF0aFwiKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJkXCIsIHBhdGhOZWVkbGUpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgb3B0Lm5lZWRsZUNvbClcclxuICAgICAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCBvcHQubmVlZGxlV2lkdGggKyBcInB4XCIpO1xyXG4gICAgICAgICAgICAvL0FuaW1hdGUgdGhlIHRyYW5zaXN0aW9uIG9mIHRoZSBuZWVkbGUgdG8gaXRzIHN0YXJ0aW5nIHZhbHVlXHJcblxyXG4gICAgICAgICAgICBuZWVkbGVQYXRoLnRyYW5zaXRpb24oKVxyXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXHJcbiAgICAgICAgICAgICAgICAvLy5kZWxheSgwKVxyXG4gICAgICAgICAgICAgICAvLyAuZWFzZShkMy5lYXNlRWxhc3RpYy5iaW5kKG51bGwsWzAsMV0pKVxyXG4gICAgICAgICAgICAgICAgLy8uYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKVxyXG4gICAgICAgICAgICAgICAgLmF0dHJUd2VlbihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbiAoZCwgaSwgYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lZWRsZUFuZ2xlID0gdmFsdWVTY2FsZShvcHQubmVlZGxlVmFsKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGZvciBtaW4vbWF4IGVuZHMgb2YgdGhlIG5lZWRsZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWVkbGVBbmdsZSA+IG9wdC5tYXhUaWNrQW5nbGUpIHsgbmVlZGxlQW5nbGUgPSBvcHQubWF4TmVlZGxlQW5nbGUgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWVkbGVBbmdsZSA8IG9wdC56ZXJvVGlja0FuZ2xlKSB7IG5lZWRsZUFuZ2xlID0gb3B0Lnplcm9OZWVkbGVBbmdsZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5lZWRsZUNlbnRyZSA9IG9yaWdpblggKyBcIixcIiArIG9yaWdpblksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRsZVJvdCA9IG5lZWRsZUFuZ2xlIC0gb3B0Lnplcm9OZWVkbGVBbmdsZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcInJvdGF0ZSgwLFwiICsgbmVlZGxlQ2VudHJlICsgXCIpXCIsIFwicm90YXRlKFwiICsgbmVlZGxlUm90ICsgXCIsXCIgKyBuZWVkbGVDZW50cmUgKyBcIilcIilcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHVuaXRzTGFiZWwudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcclxuICAgICAgICAgICAgICAgIC8vLmVhc2UoXCJlbGFzdGljXCIsIDEsIDAuOSlcclxuICAgICAgICAgICAgICAgIC50d2VlbihcInRleHRcIiwgZnVuY3Rpb24gKGQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhvcHQubWluVmFsLCBvcHQubmVlZGxlVmFsKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoaSh0KSkgKyBcIiBcIiArIG9wdC5nYXVnZVVuaXRzO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZ2F1Z2UgdmFsdWVcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVHYXVnZSA9IGZ1bmN0aW9uIChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vU2V0IGRlZmF1bHQgdmFsdWVzIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA9PSB1bmRlZmluZWQpIChvcHQubWluVmFsKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vQW5pbWF0ZSB0aGUgdHJhbnNpdGlvbiBvZiB0aGUgbmVlZGxlIHRvIGl0cyBuZXcgdmFsdWVcclxuICAgICAgICAgICAgICAgIHZhciBuZWVkbGVQYXRoID0gbmVlZGxlR3JvdXAuc2VsZWN0QWxsKFwicGF0aFwiKVxyXG4gICAgICAgICAgICAgICAgdmFyIG9sZFZhbCA9IG9wdC5uZWVkbGVWYWxcclxuICAgICAgICAgICAgICAgIG5lZWRsZVBhdGgudHJhbnNpdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgLmVhc2UoZDMuZWFzZUN1YmljSW4pXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHJUd2VlbihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbiAoZCwgaSwgYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmVlZGxlQW5nbGVPbGQgPSB2YWx1ZVNjYWxlKG9sZFZhbCkgLSBvcHQuemVyb05lZWRsZUFuZ2xlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZWVkbGVBbmdsZU5ldyA9IHZhbHVlU2NhbGUobmV3VmFsKSAtIG9wdC56ZXJvTmVlZGxlQW5nbGVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgZm9yIG1pbi9tYXggZW5kcyBvZiB0aGUgbmVlZGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWVkbGVBbmdsZU9sZCArIG9wdC56ZXJvTmVlZGxlQW5nbGUgPiBvcHQubWF4VGlja0FuZ2xlKSB7IG5lZWRsZUFuZ2xlT2xkID0gb3B0Lm1heE5lZWRsZUFuZ2xlIC0gb3B0Lnplcm9OZWVkbGVBbmdsZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWVkbGVBbmdsZU9sZCArIG9wdC56ZXJvTmVlZGxlQW5nbGUgPCBvcHQuemVyb1RpY2tBbmdsZSkgeyBuZWVkbGVBbmdsZU9sZCA9IDAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVlZGxlQW5nbGVOZXcgKyBvcHQuemVyb05lZWRsZUFuZ2xlID4gb3B0Lm1heFRpY2tBbmdsZSkgeyBuZWVkbGVBbmdsZU5ldyA9IG9wdC5tYXhOZWVkbGVBbmdsZSAtIG9wdC56ZXJvTmVlZGxlQW5nbGUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVlZGxlQW5nbGVOZXcgKyBvcHQuemVyb05lZWRsZUFuZ2xlIDwgb3B0Lnplcm9UaWNrQW5nbGUpIHsgbmVlZGxlQW5nbGVOZXcgPSAwIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5lZWRsZUNlbnRyZSA9IG9yaWdpblggKyBcIixcIiArIG9yaWdpbllcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLmludGVycG9sYXRlU3RyaW5nKFwicm90YXRlKFwiICsgbmVlZGxlQW5nbGVPbGQgKyBcIixcIiArIG5lZWRsZUNlbnRyZSArIFwiKVwiLCBcInJvdGF0ZShcIiArIG5lZWRsZUFuZ2xlTmV3ICsgXCIsXCIgKyBuZWVkbGVDZW50cmUgKyBcIilcIilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdW5pdHNMYWJlbC50cmFuc2l0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oMzAwMClcclxuICAgICAgICAgICAgICAgICAgICAuZWFzZShkMy5lYXNlQ3ViaWNJbilcclxuICAgICAgICAgICAgICAgICAgICAudHdlZW4oXCJ0ZXh0XCIsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcob2xkVmFsLCBuZXdWYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRleHRDb250ZW50ID0gTWF0aC5yb3VuZChpKHQpKSArIFwiIFwiICsgb3B0LmdhdWdlVW5pdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9VcGRhdGUgdGhlIGN1cnJlbnQgdmFsdWVcclxuICAgICAgICAgICAgICAgIG9wdC5uZWVkbGVWYWwgPSBuZXdWYWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZFRvUihhbmdsZURlZykge1xyXG4gICAgICAgICAgICAvL1R1cm5zIGFuIGFuZ2xlIGluIGRlZ3JlZXMgdG8gcmFkaWFuc1xyXG4gICAgICAgICAgICB2YXIgYW5nbGVSYWQgPSBhbmdsZURlZyAqIChNYXRoLlBJIC8gMTgwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFuZ2xlUmFkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRyYXdHYXVnZTtcclxuXHJcbiAgICB9KShkMyk7XHJcblxyXG4gICAgdmFyIGdhdWdlID0gbmV3IG1ldGVyR2F1Z2UoY29uZmlnKTtcclxuICAgIHNjb3BlLiR3YXRjaCgnZ2F1Z2Vjb25maWcubmVlZGxlVmFsJyxmdW5jdGlvbihuZXdWYWwpe1xyXG4gICAgICAgZ2F1Z2UudXBkYXRlR2F1Z2UobmV3VmFsKTtcclxuICAgIH0pXHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG1ldGVyR2F1Z2VDb21wb25lbnRMaW5rO1xyXG4iXX0=
