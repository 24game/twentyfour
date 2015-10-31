// Generated by CoffeeScript 1.9.3
(function() {
  this.Animator = (function() {
    function Animator() {}

    Animator.animate = function(a, b) {
      var deferred, height, length;
      deferred = Q.defer();
      this.completeState = {
        a: false,
        b: false
      };
      $(a).addClass('animating-a');
      $(b).addClass('animating-b');
      length = $(b).offset().left - ($(a).offset().left);
      height = 50;
      $.keyframe.define([
        {
          name: "animation-a-to-b",
          '0%': {
            'transform': "translateX(0px)"
          },
          '99%': {
            'transform': "translateX(" + length + "px)"
          },
          'to': {}
        }, {
          name: "animation-b-to-a",
          '0%': {
            'transform': "translateX(0px)"
          },
          '99%': {
            'transform': "translateX(" + (length * -1) + "px)"
          },
          'to': {}
        }
      ]);
      $(a).playKeyframe({
        name: 'animation-a-to-b',
        duration: '0.3s',
        timingFunction: 'ease-out',
        delay: '0s',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'forwards',
        complete: (function(_this) {
          return function() {
            if (_this.completeState[a] && _this.completeState[b]) {
              return deferred.resolve([a, b]);
            }
          };
        })(this)
      });
      $(b).playKeyframe({
        name: 'animation-b-to-a',
        duration: '0.3s',
        timingFunction: 'ease-out',
        delay: '0s',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'forwards',
        complete: (function(_this) {
          return function() {
            _this.completeState[b] = true;
            if (_this.completeState[a] && _this.completeState[b]) {
              return deferred.resolve([a, b]);
            }
          };
        })(this)
      });
      return deferred.promise;
    };

    return Animator;

  })();

  this.TileSwap = (function() {
    function TileSwap() {}

    TileSwap.tilesToSwap = [];

    TileSwap.process = function(tile) {
      var firstTile, onAnimationComplete, secondTile;
      if (this.animationStarted || $(tile).hasClass('enclosable')) {
        return;
      }
      $(tile).toggleClass('swappable');
      this.tilesToSwap.push(tile);
      if (this.tilesToSwap.length === 2) {
        this.animationStarted = true;
        firstTile = this.tilesToSwap.pop();
        secondTile = this.tilesToSwap.pop();
        onAnimationComplete = Animator.animate(firstTile, secondTile);
        return onAnimationComplete.then(function(ab) {
          var a, animatingAValue, animatingBValue, b, operator;
          operator = $('.animating-a').next();
          animatingAValue = $(".animating-a .number").html();
          animatingBValue = $(".animating-b .number").html();
          $(".animating-a .number").html(animatingBValue);
          $(".animating-b .number").html(animatingAValue);
          $('.animating-a').removeClass('animating-a');
          $('.animating-b').removeClass('animating-b');
          $('.swappable').removeClass('swappable');
          a = ab[0];
          b = ab[1];
          $(a).resetKeyframe(null);
          return $(b).resetKeyframe(null);
        }, function(failReason) {}).done((function(_this) {
          return function() {
            _this.animationStarted = false;
            return $(HTMLActuator).trigger('onGameUpdated');
          };
        })(this));
      }
    };

    return TileSwap;

  })();

  this.Parenthetor = (function() {
    function Parenthetor() {}

    Parenthetor.tilesToEnclose = [];

    Parenthetor.process = function(tile) {
      var firstTile, firstTileIndex, secondTile, secondTileIndex, tmp;
      if (this.enclosingStarted || $('.swappable').length > 0) {
        return;
      }
      $(tile).toggleClass('enclosable');
      this.tilesToEnclose.push(tile);
      if (this.tilesToEnclose.length === 2) {
        $('.parenthesis-tile').remove();
        this.enclosingStarted = true;
        secondTile = this.tilesToEnclose.pop();
        firstTile = this.tilesToEnclose.pop();
        firstTileIndex = $('.number-tile').toArray().indexOf(firstTile);
        secondTileIndex = $('.number-tile').toArray().indexOf(secondTile);
        if (firstTileIndex > secondTileIndex) {
          tmp = secondTile;
          secondTile = firstTile;
          firstTile = tmp;
        }
        $(firstTile).before("<div class=\"parenthesis-tile\"><span class=\"unselectable parenthesis\">(</span></div>");
        $(secondTile).after("<div class=\"parenthesis-tile\"><span class=\"unselectable parenthesis\">)</span></div>");
        $(firstTile).removeClass('enclosable');
        $(secondTile).removeClass('enclosable');
        this.enclosingStarted = false;
        return $(HTMLActuator).trigger('onGameUpdated');
      }
    };

    return Parenthetor;

  })();

  this.OperatorSwitcher = (function() {
    function OperatorSwitcher() {}

    OperatorSwitcher.operators = ['+', '-', '×', '÷'];

    OperatorSwitcher.process = function(tile) {
      var nextOperatorValueIndex, operatorValue, operatorValueIndex;
      operatorValue = $(tile).find('.operator').html();
      operatorValueIndex = this.operators.indexOf(operatorValue);
      nextOperatorValueIndex = (operatorValueIndex + 1) % this.operators.length;
      $(tile).find('.operator').html(this.operators[nextOperatorValueIndex]);
      return $(HTMLActuator).trigger('onGameUpdated');
    };

    return OperatorSwitcher;

  })();

  $('.number-tile').on('click', function(event) {
    var target;
    if ($(event.target).hasClass('number')) {
      target = event.target.parentElement;
    } else if ($(event.target).hasClass('number-tile')) {
      target = event.target;
    }
    TileSwap.process(target);
    return event.stopPropagation();
  });

  $('.number-tile').on('dblclick', function(event) {
    var target;
    if ($(event.target).hasClass('number')) {
      target = event.target.parentElement;
    } else if ($(event.target).hasClass('number-tile')) {
      target = event.target;
    }
    Parenthetor.process(target);
    return event.stopPropagation();
  });

  $('.operator-tile').on('click', function(event) {
    var target;
    if ($(event.target).hasClass('operator')) {
      target = event.target.parentElement;
    } else if ($(event.target).hasClass('operator-tile')) {
      target = event.target;
    }
    OperatorSwitcher.process(target);
    return event.stopPropagation();
  });

  $('.page').on('dblclick', function(event) {
    $('.parenthesis-tile').remove();
    return $(HTMLActuator).trigger('onGameUpdated');
  });

  $(HTMLActuator).on('onGameUpdated', function() {
    return window.GameManager.actuator.actuate();
  });

  this.hack = function(a, b, c, d) {
    $($(".number-tile .number")[0]).html(a);
    $($(".number-tile .number")[1]).html(b);
    $($(".number-tile .number")[2]).html(c);
    return $($(".number-tile .number")[3]).html(d);
  };

}).call(this);

//# sourceMappingURL=index.js.map
