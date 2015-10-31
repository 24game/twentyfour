class @Animator
  @animate: (a, b) ->
    deferred = Q.defer()
    @completeState = {
      a: false,
      b: false
    }
    $(a).addClass('animating-a');
    $(b).addClass('animating-b');
    length = $(b).offset().left - ($(a).offset().left);
    height = 50;
    $.keyframe.define([{
      name: "animation-a-to-b",
      '0%': {
        'transform': "translateX(0px)",
      },
      '99%': {
        'transform': "translateX(#{length}px)",
      },
      'to': {}, # equals `100% {}` Leave it empty to fix the flicker
    },{
      name: "animation-b-to-a",
      '0%': {
        'transform': "translateX(0px)",
      },
      '99%': {
        'transform': "translateX(#{length * -1}px)",
      },
      'to': {}, # equals `100% {}` Leave it empty to fix the flicker
    }
    ]);
    $(a).playKeyframe({
      name: 'animation-a-to-b', # name of the keyframe you want to bind to the selected element
      duration: '0.3s', # [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: 'ease-out', # [optional, default: ease] specifies the speed curve of the animation
      delay: '0s', #[optional, default: 0s]  how long you want to wait before the animation starts
      iterationCount: '1', #[optional, default:1]  how many times you want the animation to repeat
      direction: 'normal', #[optional, default: 'normal']  which direction you want the frames to flow
      fillMode: 'forwards', #[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
      complete: => #[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
        if @completeState[a] && @completeState[b]
          deferred.resolve([a, b])
    });
    $(b).playKeyframe({
      name: 'animation-b-to-a', # name of the keyframe you want to bind to the selected element
      duration: '0.3s', # [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: 'ease-out', # [optional, default: ease] specifies the speed curve of the animation
      delay: '0s', #[optional, default: 0s]  how long you want to wait before the animation starts
      iterationCount: '1', #[optional, default:1]  how many times you want the animation to repeat
      direction: 'normal', #[optional, default: 'normal']  which direction you want the frames to flow
      fillMode: 'forwards', #[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
      complete: => #[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
        @completeState[b] = true
        if @completeState[a] && @completeState[b]
          deferred.resolve([a, b])
    });
    deferred.promise

class @TileSwap
  @tilesToSwap = []

  @process: (tile) ->
    return if @animationStarted || $(tile).hasClass('enclosable')
    $(tile).toggleClass('swappable')
    @tilesToSwap.push tile
    if @tilesToSwap.length == 2
      @animationStarted = true
      firstTile = @tilesToSwap.pop()
      secondTile = @tilesToSwap.pop()
      onAnimationComplete = Animator.animate(firstTile, secondTile);
      onAnimationComplete.then((ab) ->
         operator = $('.animating-a').next()
         animatingAValue = $(".animating-a .number").html();
         animatingBValue = $(".animating-b .number").html();
         $(".animating-a .number").html(animatingBValue);
         $(".animating-b .number").html(animatingAValue);
         $('.animating-a').removeClass('animating-a')
         $('.animating-b').removeClass('animating-b')
         $('.swappable').removeClass('swappable')
         a = ab[0]
         b = ab[1]
         $(a).resetKeyframe(null)
         $(b).resetKeyframe(null)
      , (failReason) ->
      ).done( =>
        @animationStarted = false
        $(HTMLActuator).trigger('onGameUpdated');
      )

class @Parenthetor
  @tilesToEnclose = []

  @process: (tile) ->
    return if @enclosingStarted || $('.swappable').length > 0
    $(tile).toggleClass('enclosable')
    @tilesToEnclose.push tile
    if @tilesToEnclose.length == 2
      $('.parenthesis-tile').remove();
      @enclosingStarted = true
      secondTile = @tilesToEnclose.pop()
      firstTile = @tilesToEnclose.pop()
      firstTileIndex = $('.number-tile').toArray().indexOf(firstTile)
      secondTileIndex = $('.number-tile').toArray().indexOf(secondTile)
      if (firstTileIndex > secondTileIndex)
        tmp = secondTile
        secondTile = firstTile
        firstTile = tmp
      $(firstTile).before("""
        <div class="parenthesis-tile"><span class="unselectable parenthesis">(</span></div>
                       """)
      $(secondTile).after("""
        <div class="parenthesis-tile"><span class="unselectable parenthesis">)</span></div>
                       """)
      $(firstTile).removeClass('enclosable')
      $(secondTile).removeClass('enclosable')
      @enclosingStarted = false
      $(HTMLActuator).trigger('onGameUpdated');

class @OperatorSwitcher
  @operators = ['+', '−', '×', '÷']

  @process: (tile) ->
    operatorValue = $(tile).find('.operator').html()
    operatorValueIndex = @operators.indexOf(operatorValue)
    nextOperatorValueIndex = (operatorValueIndex + 1) % @operators.length
    $(tile).find('.operator').html(@operators[nextOperatorValueIndex])
    $(HTMLActuator).trigger('onGameUpdated');

$('.number-tile').on('click', (event) ->
  if $(event.target).hasClass('number')
    target = event.target.parentElement;
  else if $(event.target).hasClass('number-tile')
    target = event.target;
  TileSwap.process(target);
  event.stopPropagation();
)

$('.number-tile').on('dblclick', (event) ->
  if $(event.target).hasClass('number')
    target = event.target.parentElement;
  else if $(event.target).hasClass('number-tile')
    target = event.target;
  Parenthetor.process(target);
  event.stopPropagation();
)

$('.operator-tile').on('click', (event) ->
  if $(event.target).hasClass('operator')
    target = event.target.parentElement;
  else if $(event.target).hasClass('operator-tile')
    target = event.target;
  OperatorSwitcher.process(target);
  event.stopPropagation();
)

$('.page').on('dblclick', (event) ->
  $('.parenthesis-tile').remove();
  $(HTMLActuator).trigger('onGameUpdated');
)

$(HTMLActuator).on('onGameUpdated', ->
  window.GameManager.actuator.actuate();
);