# angular-metergauge
An angular JS directive for meter gauge visualization with real time update.

## Requirements

* D3.js v4.2.2
* AngularJS v1.0.1+


## Getting started
You will need to include `angular JS` and 'D3 JS' in your project to make the directive work

```html
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
```

Include `angular-metergauge` module script with above incuded scripts script on your page.
You can copy the `angular-metergauge.min.js` from build folder of repo and add it in your script folder
```html
<script src="./script/angular-metergauge.min.js"></script>
```

Add `angular-metergauge` to your app module's dependency.
```js
angular.module('myApp', ['meterGauge']);
```

## Install with npm

```sh
There is no npm package currently available for this application. It will be available soon.
```

## Configuration
We can configure the angular-metergauge for Size, colour,value fonts and other available options.
we have to add a variable in scope of the controller and pass it to the config option of directive.
Here is an example of classic theme configuration.
```js
angular.module('myApp').controller('myAppController',['$scope', function($scope){
    $scope.classic = {
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

}]);
 
```

## Directive usage
`angular-metergauge` is an element directive.
you will just have to add the directive in you html view and attach the config variable through scope.

```html
<!--meter gauge with classic as config variable -->
 <meter-gauge gaugeconfig="classic"></meter-gauge>
</div>
```

##Dynamically Change value
For real time update of the metergauge value, configuration's `needleVal` parameter can be changed in the contoller. 
Updated value will be immediately reflected if the gauge.
In the example give below, after every two seconds, metergauge's value will change.
```js
 $interval(function(){
            $scope.classic.needleVal =Math.round( Math.random()*1000)
  },2000);
```
