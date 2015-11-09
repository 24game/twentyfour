function Animator() { }

Animator.animate = function(a, b) {
  var deferred = Q.defer();
  Animator.completeState = {
    a: false,
    b: false
  }
  $(a).addClass('animating-a');
  $(b).addClass('animating-b');
  var length = $(b).offset().left - $(a).offset().left;
  var height = 50;
  $.keyframe.define([{
    name: "animation-a-to-b",
    '0%': {
      'transform': "translateX(0px)",
    },
    '99%': {
      'transform': "translateX(" + length + "px)",
    },
    'to': {}, // equals `100% {}` Leave it empty to fix the flicker
  }, {
    name: "animation-b-to-a",
    '0%': {
      'transform': "translateX(0px)",
    },
    '99%': {
      'transform': "translateX(" + length * -1 + "px)",
    },
    'to': {}, // equals `100% {}` Leave it empty to fix the flicker
  }
  ]);
  $(a).playKeyframe({
    name: 'animation-a-to-b', // name of the keyframe you want to bind to the selected element
    duration: '0.3s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: 'ease-out', // [optional, default: ease] specifies the speed curve of the animation
    delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
    iterationCount: '1', //[optional, default:1]  how many times you want the animation to repeat
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
    complete: function onComplete(event) { //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
      Animator.completeState[a] = true;
      if (Animator.completeState[a] && Animator.completeState[b]) {
        deferred.resolve([a, b]);
      }
    }
  });
  $(b).playKeyframe({
    name: 'animation-b-to-a', // name of the keyframe you want to bind to the selected element
    duration: '0.3s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: 'ease-out', // [optional, default: ease] specifies the speed curve of the animation
    delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
    iterationCount: '1', //[optional, default:1]  how many times you want the animation to repeat
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
    complete: function onComplete(event) { //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
      Animator.completeState[b] = true;
      if (Animator.completeState[a] && Animator.completeState[b]) {
        deferred.resolve([a, b]);
      }
    }
  });
  //['animation-a-to-b', 'animation-b-to-a'].forEach( function(animationName, index) {
  //  var objectToAnimate = (index == 1) ? a : b;
  //  debugger;
  //  $(objectToAnimate).playKeyframe({
  //    name: animationName, // name of the keyframe you want to bind to the selected element
  //    duration: '0.3s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
  //    timingFunction: 'ease-out', // [optional, default: ease] specifies the speed curve of the animation
  //    delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
  //    iterationCount: '1', //[optional, default:1]  how many times you want the animation to repeat
  //    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
  //    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
  //    complete: function onComplete(event) { //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
  //      if (Animator.completeState[a] && Animator.completeState[b]) {
  //        debugger;
  //        deferred.resolve([a, b])
  //      }
  //    }
  //  });
  //});
  return deferred.promise;
};

function TileSwap() { }

TileSwap.tilesToSwap = []

TileSwap.process = function (tile) {
  var self = TileSwap;
  if (TileSwap.animationStarted || $(tile).hasClass('enclosable')) {
    return;
  }
  $(tile).toggleClass('swappable');
  TileSwap.tilesToSwap.push(tile);
  if (TileSwap.tilesToSwap.length == 2) {
    TileSwap.animationStarted = true;
    TileSwap.firstTile = TileSwap.tilesToSwap.pop()
    TileSwap.secondTile = TileSwap.tilesToSwap.pop()
    onAnimationComplete = Animator.animate(TileSwap.firstTile, TileSwap.secondTile);
    onAnimationComplete.then(function onSuccess(ab) {
      var operator = $('.animating-a').next();
      var animatingAValue = $(".animating-a .number").html();
      var animatingBValue = $(".animating-b .number").html();
      $(".animating-a .number").html(animatingBValue);
      $(".animating-b .number").html(animatingAValue);
      $('.animating-a').removeClass('animating-a')
      $('.animating-b').removeClass('animating-b')
      $('.swappable').removeClass('swappable')
      var a = ab[0]
      var b = ab[1]
      $(a).resetKeyframe(null)
      $(b).resetKeyframe(null)
    }, function onFailure(failReason) {
    }).done(function onDone() {
      TileSwap.animationStarted = false
      $(HTMLActuator).trigger('onGameUpdated');
    });
  }
};

function Parenthetor() { }

Parenthetor.tilesToEnclose = [];

Parenthetor.process = function(tile) {
  if (Parenthetor.enclosingStarted || $('.swappable').length > 0)
    return;
  $(tile).toggleClass('enclosable');
  Parenthetor.tilesToEnclose.push(tile);
  if (Parenthetor.tilesToEnclose.length == 2) {
    $('.parenthesis-tile').remove();
    Parenthetor.enclosingStarted = true
    secondTile = Parenthetor.tilesToEnclose.pop()
    firstTile = Parenthetor.tilesToEnclose.pop()
    firstTileIndex = $('.number-tile').toArray().indexOf(firstTile)
    secondTileIndex = $('.number-tile').toArray().indexOf(secondTile)
    if (firstTileIndex > secondTileIndex)
      tmp = secondTile
    secondTile = firstTile
    firstTile = tmp
    $(firstTile).before('<div class="parenthesis-tile"><span class="unselectable parenthesis">(</span></div>')
    $(secondTile).after('<div class="parenthesis-tile"><span class="unselectable parenthesis">)</span></div>')
    $(firstTile).removeClass('enclosable')
    $(secondTile).removeClass('enclosable')
    Parenthetor.enclosingStarted = false
    $(HTMLActuator).trigger('onGameUpdated');
  }
};

function OperatorSwitcher() { }

OperatorSwitcher.operators = ['+', '-', '×', '÷']

OperatorSwitcher.process = function(tile) {
  var self = OperatorSwitcher;
  operatorValue = $(tile).find('.operator').html()
  operatorValueIndex = self.operators.indexOf(operatorValue)
  nextOperatorValueIndex = (operatorValueIndex + 1) % self.operators.length
  $(tile).find('.operator').html(self.operators[nextOperatorValueIndex])
  $(HTMLActuator).trigger('onGameUpdated');
};

$('.number-tile').on('click', function(event) {
  if (Game.isDyan)
  if ($(event.target).hasClass('number'))
    target = event.target.parentElement;
  else if ($(event.target).hasClass('number-tile'))
    target = event.target;
  TileSwap.process(target);
  event.stopPropagation();
});

$('.number-tile').on('dblclick', function (event) {
  if ($(event.target).hasClass('number'))
    target = event.target.parentElement;
  else if ($(event.target).hasClass('number-tile'))
    target = event.target;
  Parenthetor.process(target);
  event.stopPropagation();
});

$('.operator-tile').on('click', function (event) {
  if ($(event.target).hasClass('operator'))
    target = event.target.parentElement;
  else if ($(event.target).hasClass('operator-tile'))
    target = event.target;
  OperatorSwitcher.process(target);
  event.stopPropagation();
});

$('.page').on('dblclick', function (event) {
  $('.parenthesis-tile').remove();
  $(HTMLActuator).trigger('onGameUpdated');
});

$(HTMLActuator).on('onGameUpdated', function() {
  window.GameManager.actuator.actuate();
});

window.hack = function(a, b, c, d) {
  $($(".number-tile .number")[0]).html(a);
  $($(".number-tile .number")[1]).html(b);
  $($(".number-tile .number")[2]).html(c);
  $($(".number-tile .number")[3]).html(d);
};