/**
 * Created by AmitKumarJha on 8/19/2016.
 */

class appController{
    constructor($interval){
        var self = this;
        this.black = {
            gaugeRadius: 140,
            minVal: 0,
            maxVal: 1000,
            needleVal: Math.round(200),
            tickSpaceMinVal: 10,
            tickSpaceMajVal: 100,
            divID: "gaugeBox",
            gaugeUnits: "Kmh",
            tickColMaj:'#F5F7FA',
            tickColMin:'#F5F7FA',
            outerEdgeCol:'#434A54',
            pivotCol:'#DA4453',
            innerCol:'#000',
            unitsLabelCol:'#E9573F',
            tickLabelCol:'#F5F7FA',
            needleCol:'#DA4453',
            defaultFonts:''
        }
        this.cool = {
            gaugeRadius: 140,
            minVal: 0,
            maxVal: 1000,
            needleVal: Math.round(700),
            tickSpaceMinVal: 10,
            tickSpaceMajVal: 100,
            divID: "gaugeBox",
            gaugeUnits: "Kmh"
        }
        this.classic = {
            gaugeRadius: 140,
            minVal: 0,
            maxVal: 1000,
            needleVal: Math.round(700),
            tickSpaceMinVal: 10,
            tickSpaceMajVal: 100,
            divID: "gaugeBox",
            gaugeUnits: "Kmh",
            tickColMaj:'#656D78',
            tickColMin:'#656D78',
            outerEdgeCol:'#CCD1D9',
            pivotCol:'#434A54',
            innerCol:'#E6E9ED',
            unitsLabelCol:'#656D78',
            tickLabelCol:'#656D78',
            needleCol:'#434A54',
            defaultFonts:''
        }

        $interval(function(){
            self.classic.needleVal =Math.round( Math.random()*1000)
        },2000)
    }
}
appController.$inject =['$interval']

export default appController;
