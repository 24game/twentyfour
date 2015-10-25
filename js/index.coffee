class @Animator
  @animate: (a, b) ->
    length = $(b).offset().left - $(a).offset().left;
    height = 50;
    console.info(length);
    $.keyframe.define([{
      name: "animation-a-to-b",
      '0%': {
        'transform' : "translateX(0px)",
      },
      '100%': {
        'transform' : "translateX(#{length/2}px)",
      }
      }
#    },{
#      name: "animation-b-to-a",
#      '0%': {
#        'transform' : 'translateX(0) rotate(360deg)',
#      },
#      '50%': {
#        'transform': "translateX(-#{b_to_a_offset / 2}px) translateY(-50px) rotate(90deg)",
#      },
#      '100%': {
#        'transform' : "translateX(-#{b_to_a_offset}px) rotate(180deg)",
#      }
#    }
    ]);
    $(a).playKeyframe({
      name: 'animation-a-to-b', # name of the keyframe you want to bind to the selected element
      duration: '1s', # [optional, default: 0, in ms] how long you want it to last in milliseconds
      timingFunction: 'linear', # [optional, default: ease] specifies the speed curve of the animation
      delay: '0s', #[optional, default: 0s]  how long you want to wait before the animation starts
    iterationCount: '1', #[optional, default:1]  how many times you want the animation to repeat
    direction: 'normal', #[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', #[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
    complete: -> #[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
    });
#    $(b).playKeyframe({
#      name: 'animation-b-to-a', # name of the keyframe you want to bind to the selected element
#      duration: '3s', # [optional, default: 0, in ms] how long you want it to last in milliseconds
#      timingFunction: 'ease-in-out', # [optional, default: ease] specifies the speed curve of the animation
#      delay: '0s', #[optional, default: 0s]  how long you want to wait before the animation starts
#      iterationCount: '1', #[optional, default:1]  how many times you want the animation to repeat
#      direction: 'normal', #[optional, default: 'normal']  which direction you want the frames to flow
#      fillMode: 'forwards', #[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
#      complete: -> #[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
#    });

class @TileSwap
  @tilesToSwap = []

  @process: (tile) ->
    @tilesToSwap.push tile
    if @tilesToSwap.length == 2
      firstTile = @tilesToSwap.pop()
      secondTile = @tilesToSwap.pop()
      Animator.animate(firstTile, secondTile);


$('.number-tile').on('click', ->
  target;
  if $(event.target).hasClass('number')
    target = $(event.target).parent();
  else if $(event.target).hasClass('number-tile')
    target = event.target;
  $(target).toggleClass('selected')
  TileSwap.process(target);
)

