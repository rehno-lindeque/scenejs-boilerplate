# Eventful code comes here
# Program state should not be manipulated outside events files

mouseDown = (event) ->
  switch event.which
    when 1 then state.viewport.mouse.leftDragging = true

mouseUp = (event) ->
  state.viewport.mouse.leftDragging = false
  #if event.which == 1 # Left mouse button
  #  coords = mouseCoordsWithinElement event
  #  pickRecord = state.scene.pick coords[0], coords[1]

mouseMove = (event) ->
  state.viewport.mouse.last = [event.clientX, event.clientY]

mouseWheel = (event) ->


