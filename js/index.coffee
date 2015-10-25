class @Animator
  @animate: (a, b) ->
    

class @TileSwap
  @tilesToSwap = []

  @process: (tile) ->
    if @tilesToSwap.length < 2
      @tilesToSwap.push tile
    else
      firstTile = @tilesToSwap.pop()
      secondTIle = @tilesToSwap.pop()


$('.number-tile').on('click', ->
  target;
  if $(event.target).hasClass('number')
    target = $(event.target).parent();
  else if $(event.target).hasClass('number-tile')
    target = event.target;
  $(target).toggleClass('selected')
)

