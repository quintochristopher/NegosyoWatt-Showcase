(function () {
  var steps = Array.prototype.slice.call(document.querySelectorAll('.story-step'));
  var frame = document.getElementById('screen-frame');
  var viewport = document.querySelector('.screen-viewport');

  function activate(step) {
    steps.forEach(function (item) {
      item.classList.toggle('is-active', item === step);
    });

    if (frame.getAttribute('src') !== step.dataset.screen) {
      viewport.scrollTop = 0;
      frame.setAttribute('src', step.dataset.screen);
      frame.setAttribute('title', 'NegosyoWatt screen: ' + step.dataset.label);
    }
  }

  var updateActive = function () {
    var center = window.innerHeight / 2;
    var nearest = steps.reduce(function (best, step) {
      var rect = step.getBoundingClientRect();
      var distance = center < rect.top ? rect.top - center :
        center > rect.bottom ? center - rect.bottom : 0;
      return distance < best.distance ? { step: step, distance: distance } : best;
    }, { step: steps[0], distance: Infinity });
    activate(nearest.step);
  };
  var scheduled = false;
  window.addEventListener('scroll', function () {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(function () {
      updateActive();
      scheduled = false;
    });
  }, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();
}());
