// Renderer system

function render_all() {
  push();
  {
    translate(map_info.center[0], map_info.center[1]);
    scale(map_info.zoomLevel);
    background(0);
    render_circles();
    render_squares();
    render_rect();
    render_labels();

    //
    push();
    {
      stroke(255);
      strokeWeight(2 / map_info.zoomLevel);
      noFill();
      circle(width / 2, height / 2, spawn_radius);
    }
    pop();
  }
  pop();
}

function render_circles() {
  for_components([CT.CircleRenderer], (entity) => {
    push();
    if (has_(entity.id, CT.HasAbsolutePosition)) {
      scale(1 / map_info.zoomLevel);
    }
    fill(255, 255, 255, 255);
    translate(entity.pos.x, entity.pos.y);
    circle(0, 0, PSIZE);
    pop();
  });
}

function render_squares() {
  for_components([CT.SquareRenderer], (entity) => {
    push();
    if (has_(entity.id, CT.HasAbsolutePosition)) {
      scale(1 / map_info.zoomLevel);
    }
    if (has_(entity.id, CT.HasCustomColor)) {
      fill(entity.HasCustomColor.get_color(entity));
    } else {
      fill(255, 255, 255, 255);
    }
    translate(entity.pos.x, entity.pos.y);
    rect(0, 0, PSIZE, PSIZE);
    pop();
  });
}

function get_rect_color(entity) {
  if (has_(entity.id, CT.HasCustomColor)) {
    return entity.HasCustomColor.get_color(entity);
  }

  // this is here because labels
  // use this to figure out if they need to
  // render a background
  if (has_(entity.id, CT.RectRenderer)) {
    return color(255, 255, 255, 255);
  }

  return color(0, 0, 0, 255);
}

function render_rect() {
  for_components([CT.RectRenderer], (entity, rr) => {
    push();
    if (has_(entity.id, CT.HasAbsolutePosition)) {
      scale(1 / map_info.zoomLevel);
      translate(-map_info.center[0], -map_info.center[1]);
    }
    fill(get_rect_color(entity));
    translate(entity.pos.x, entity.pos.y);
    rect(0, 0, rr.w, rr.h);
    pop();
  });
}

function render_labels() {
  for_components([CT.HasLabel], (entity) => {
    if (!entity.HasLabel.active) return;
    push();

    fill(255);
    textSize(5);

    if (has_(entity.id, CT.HasAbsolutePosition)) {
      scale(1 / map_info.zoomLevel);
      translate(-map_info.center[0], -map_info.center[1]);
    }

    const has_rect_background = has_(entity.id, CT.RectRenderer);
    background_color = get_rect_color(entity);

    if (entity.HasLabel.is_dynamic) {
      entity.HasLabel.text = entity.HasLabel.get_text();
    }

    translate(entity.pos.x, entity.pos.y);

    switch (entity.HasLabel.location) {
      case RectLocation.TopLeft:
        break;
      case RectLocation.Center:
        fill(...inverseColor(...background_color.levels));
        if (has_rect_background) {
          const rr = entity.RectRenderer;
          const tx = textWidth(entity.HasLabel.text);
          const ty = textHeight(entity.HasLabel.text ?? "");
          const xs = (rr.w - tx) / 2;
          const ys = (rr.h - ty) / 2;
          translate(xs, ys);
        }
        break;
    }
    text("" + entity.HasLabel.text, 0, 0);
    pop();
  });
}

// end renderer system
