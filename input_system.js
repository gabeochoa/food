function mouseScrolled(event) {
  if (event.deltaY > 0) {
    map_info.zoomLevel -= 0.01;
  } else if (event.deltaY < 0) {
    map_info.zoomLevel += 0.01;
  }
}

function mouseMoved() {
  for_components([CT.HasHoverInteraction], (entity, interaction) => {
    if (mouseInsideRect(entity.pos, entity.RectRenderer)) {
      interaction.active = true;
      interaction.onStart(entity);
    } else {
      if (interaction.active == true) {
        interaction.onEnd(entity);
        interaction.active = false;
      }
    }
  });
}

function mouseDragged(event) {
  // Code to run that uses the event.
  if (mouseButton == "center" || mouseButton == "right") {
    map_info.center = [
      map_info.center[0] + movedX / 2,
      map_info.center[1] + movedY / 2,
    ];
  }
}

function mouseClicked(event) {
  if (map_info.mouseMode == MouseMode.Normal) {
    return;
  }
  if (map_info.mouseMode == MouseMode.Build) {
    map_info.onBuildingModeClick(mouseX, mouseY);
    map_info.mouseMode = MouseMode.Normal;
  }
}

function arrowKeymapMovement() {
  const map_speed = keyIsDown(SHIFT) ? 5 : 1;
  if (keyIsDown(LEFT_ARROW)) {
    map_info["center"][0] += map_speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    map_info["center"][0] -= map_speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    map_info["center"][1] -= map_speed;
  }
  if (keyIsDown(UP_ARROW)) {
    map_info["center"][1] += map_speed;
  }
}
