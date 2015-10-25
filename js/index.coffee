class @Animator
  @animate: (a, b) ->
    return if a == b
    window.a = a;
    window.b = b;
    $(a).addClass('animating-a');
    $(b).addClass('animating-b');
    length = $(b).offset().left - ($(a).offset().left);
    height = 50;
    $.keyframe.define([{
      name: "animation-a-to-b",
      '0%': {
        'transform': "translateX(0px)",
      },
      '100%': {
        'transform': "translateX(#{length}px)",
      }
    },{
      name: "animation-b-to-a",
      '0%': {
        'transform': "translateX(0px)",
      },
      '100%': {
        'transform': "translateX(#{length * -1}px)",
      }
    }
    ]);
    $(a).playKeyframe({
      name: 'animation-a-to-b', # name of the keyframe you want to bind to the selected element
      duration: '0.30s', # [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: 'ease-out', # [optional, default: ease] specifies the speed curve of the animation
      delay: '0s', #[optional, default: 0s]  how long you want to wait before the animation starts
    iterationCount: '1', #[optional, default:1]  how many times you want the animation to repeat
    direction: 'normal', #[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', #[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
    complete: -> #[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
      operator = $('.animating-a').next();
      $(".animating-b").before($(".animating-a"));
      $(operator).before($(".animating-b"));
      $(".animating-b").removeClass('animating-b');
      $('.animating-a').removeClass('animating-a');
      $('.selected').removeClass('selected');
      $(a).resetKeyframe(null);
    });
    $(b).playKeyframe({
      name: 'animation-b-to-a', # name of the keyframe you want to bind to the selected element
      duration: '0.30s', # [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: 'ease-out', # [optional, default: ease] specifies the speed curve of the animation
      delay: '0s', #[optional, default: 0s]  how long you want to wait before the animation starts
      iterationCount: '1', #[optional, default:1]  how many times you want the animation to repeat
      direction: 'normal', #[optional, default: 'normal']  which direction you want the frames to flow
      fillMode: 'forwards', #[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
      complete: -> #[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
        $(b).resetKeyframe(null);
    });

class @TileSwap
  @tilesToSwap = []

  @process: (tile) ->
    @tilesToSwap.push tile
    if @tilesToSwap.length == 2
      firstTile = @tilesToSwap.pop()
      secondTile = @tilesToSwap.pop()
      Animator.animate(firstTile, secondTile);

$('.number-tile').on('click', (event) ->
  target;
  if $(event.target).hasClass('number')
    target = event.target.parentElement;
  else if $(event.target).hasClass('number-tile')
    target = event.target;
  $(target).toggleClass('selected')
  TileSwap.process(target);
)

$('.number-tile').on('dblclick', (event) ->
  target;
  if $(event.target).hasClass('number')
    target = event.target.parentElement;
  else if $(event.target).hasClass('number-tile')
    target = event.target;
  $(target).toggleClass('swapped')
  TileSwap.process(target);
)

