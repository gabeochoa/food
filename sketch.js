const PSIZE = 10;
let entities = {};

let SHIP_STORAGE = 1;
let SPEED = 0.75;

let ticks = 0;

let spawn_radius = 0;
let NUM_SPAWNED = 10;
let SPAWN_ORE_COST = 5;

const MouseMode = {
  Normal: "normal",
  Build: "build",
};

const BuildingType = {
  None: "none",
  Bush: "bush",
};

let map_info = {
  zoomLevel: 1,
  center: [0, 0],
  mouseMode: MouseMode.Normal,
  onBuildingModePreview: () => {},
  onBuildingModeClick: () => {},
};

function random_in_circle(x, y, radius) {
  let rad = (radius / 2) * Math.random();
  let angle = 2 * PI * Math.random();
  return [x + Math.floor(cos(angle) * rad), y + Math.floor(sin(angle) * rad)];
}

function initial_berry_spawn() {
  i = 0;
  spawn_radius = 300;
  while (i < 25) {
    let rad = (spawn_radius / 2) * Math.random();
    let angle = 2 * PI * Math.random();
    make_item(
      width / 2 + Math.floor(cos(angle) * rad),
      height / 2 + Math.floor(sin(angle) * rad),
      ItemType.Berry
    );
    i++;
  }
}

function setup() {
  frameRate(60);
  let cnv = createCanvas(400, 300);
  cnv.mouseWheel(mouseScrolled);

  initial_berry_spawn();
  make_ship(0, 0);
  make_drop(50, 50, 20, 20, ItemType.Berry);

  make_label(10, 10, () => {
    return "num ents " + Object.keys(entities).length;
  });

  make_label_list(10, 20, () => {
    // calculate + render_holders
    let holders = audit_storage();
    let texts = [];
    for (let k of Object.keys(holders)) {
      texts.push("" + k + ": " + holders[k]);
    }
    return texts.join("\n");
  });

  make_berry_bush_button();
}

function on_second_tick() {}

function tick() {
  ticks += 1;
  if (ticks >= 60) {
    ticks -= 60;
    on_second_tick();
  }

  for_components([CT.HasHoverInteraction], (entity, interaction) => {
    if (interaction.active) {
      if (interaction.whileInside) interaction.whileInside(entity);
    }
  });

  //
  for_components([CT.IsTemporary], (entity) => {
    remove_entity(entity.id);
  });
  if (map_info.mouseMode == MouseMode.Build) {
    map_info.onBuildingModePreview(mouseX, mouseY);
  }
  // // // // // // // //

  // find cloest pickup item
  for_components([CT.HasTarget, CT.HoldsItem], (entity, ht, ho) => {
    if (ho.amount >= SHIP_STORAGE) return;
    if (ht.target_id != null) return;
    let match = find_closest_with_all(
      [CT.IsItem, CT.IsTarget],
      entity.pos,
      (e) => {
        if (ho.amount == 0) return true;
        if (is_valid_entity(e.IsTarget.parent_id)) {
          return;
        }
        return ho.type == e.IsItem.type;
      }
    );
    if (match == null) return;
    ht.target_id = match.id;
    match.IsTarget.parent_id = entity.id;
  });

  // find drop off for item
  for_components([CT.HasTarget, CT.HoldsItem], (entity, ht, ho) => {
    if (ho.amount == 0) return;
    if (ht.target_id != null) return;
    let match = find_closest_with_all(
      [CT.HoldsItem, CT.IsDropoff],
      entity.pos,
      (e) => {
        return ho.type == e.HoldsItem.type;
      }
    );
    if (match == null) {
      return;
    }
    ht.target_id = match.id;
    match.IsTarget.parent_id = entity.id;
  });

  // move to target if one exists
  for_components([CT.HasTarget], (entity, ht) => {
    if (ht.target_id == null) return;
    target = entities[ht.target_id];
    if (target == null) {
      ht.target_id = null;
      return;
    }

    let direction = v_sub(target.pos, entity.pos).normalize().mult(SPEED);
    entity.pos.add(direction);
  });

  // pick up object
  // drop off object
  for_components([CT.HasTarget, CT.HoldsItem], (entity, ht, ho) => {
    if (ht.target_id == null) return;
    target = entities[ht.target_id];
    if (target == null) {
      ht.target_id = null;
      return;
    }
    if (distance(entity.pos, target.pos) > 2) return;

    if (has_(target.id, CT.IsItem)) {
      if (ho.type != null && ho.type != target.IsItem.type) return;

      ho.type = target.IsItem.type;
      ho.amount += 1;
      remove_entity(target.id);
      //   console.log(entity.id, "Picked up", ho.type);
    }

    if (has_(target.id, CT.IsDropoff)) {
      if (ho.type != null && ho.type != target.HoldsItem.type) return;
      target.HoldsItem.amount += ho.amount;
      //   console.log("Dropped off ", ho.type, "now has", target.HoldsItem.amount);
      ho.amount = 0;
      ho.type = null;
    }

    ht.target_id = null;

    return;
  });

  // process accel
  for_components([CT.HasVelocity], (entity, hv) => {
    entity.pos.add(hv.vel);
  });

  for_components([CT.IsSpawner], (entity, iss) => {
    console.log(iss);
    iss.timer -= 1;
    if (iss.timer > 0) return;
    iss.timer = iss.timer_reset;
    //
    const [x, y] = random_in_circle(entity.pos.x, entity.pos.y, iss.radius);
    make_item(x, y, iss.type);
    iss.amount -= 1;

    if (iss.amount == 0) {
      remove_entity(entity.id);
    }
  });
}

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
    for_components([CT.HasClickInteraction], (entity, interaction) => {
      if (mouseInsideRect(entity.pos, entity.RectRenderer)) {
        interaction.callback(entity);
      }
    });
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

function draw() {
  tick();

  arrowKeymapMovement();
  //

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
