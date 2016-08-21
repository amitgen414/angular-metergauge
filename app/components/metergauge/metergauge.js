import meterGaugeComponent from './metergauge.component';
let meterGaugeModule = angular.module('meterGauge', [ 
])

.directive('meterGauge', meterGaugeComponent);

export default meterGaugeModule;
