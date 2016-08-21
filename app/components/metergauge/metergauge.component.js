import link from './metergauge.link';
let meterGaugeComponent = function () {
  return {
    restrict: 'E',
    scope: {
      gaugeconfig:'='
    },
    link: link,
  };
}

export default meterGaugeComponent;
