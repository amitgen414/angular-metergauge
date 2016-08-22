angular-metergauge(speedometer gauge)
=================

An angular JS directive for meter/speedometer gauge visualization with real time update.

##Demo
https://amitgen414.github.io/angular-metergauge

## Requirements

* D3.js v4.2.2
* AngularJS v1.0.1+


## Getting started
You will need to include `angular JS` and 'D3 JS' in your project to make the directive work

```html
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
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
$ npm install angular-metergauge 
```

##Options

Option              | Description
--------------------| -----------
gaugeRadius         | Sets the size of gauge circle.
minVal              | Minimum value to be shown in gauge scale.
maxVal              | Maximum value to be shown in gauge scale.
needleVal           | Sets the value of needle to be pointed.
tickSpaceMinVal     | space between the major ticks of the gauge.
tickSpaceMajVal     | space between the sub ticks of the gauge.
divID               | sets an id for svg where gauge will be rendered (Optional).
gaugeUnits          | Unit of the values to be shown(ex. Kmph,%).
tickColMaj          | sets colour of the major tick. 
tickColMin          | sets colour of the sub tick.
outerEdgeCol        | sets the colour of outer circle of the gauge.
pivotCol            | sets colour of the pivot
innerCol            | sets colour of inner body of the gauge
unitsLabelCol       | sets colour of units label
tickLabelCol        | sets colour of labels of the ticks
needleCol           | sets colour of the needle
defaultFonts        | sets the default fonts in gauge.

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
##Customization
If you want to customize the app according to your needs, here is what should be done.
  1. Clone the respository in your local workspace.
  2. Install `Ruby` and `Compass` in your system as it required for compiling your sass files.
  3. Install the npm dependencies.
  ```sh
  $ npm install
  ```
  4. Install bower dependencies.
  ```sh
  $ bower install
  ```
  5. Start the with the dev environment. 
  it will build the project and launch it in the browser with real time code change update.
  
  ```sh
  $ npm run serve 
  ```
  6. After you are done with your changes , you can run build command
  
  ```sh
    $ npm run build 
  ```
  
  you will have the script as well as a demo website ready.
