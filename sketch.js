const PSIZE = 10;
let entities = {};

let SHIP_STORAGE = 1;
// TODO
let SPEED = 2; // 0.75;

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

let global_random_data = {
  role_allocation: {},
  max_allocation: {},
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

const WIDTH = 400;
const HEIGHT = 300;
let UI_OVERLAY = null;

function init_ui_overlay() {
  UI_OVERLAY = document.getElementById("ui");
  UI_OVERLAY.style.width = WIDTH + "px";
  UI_OVERLAY.style.height = HEIGHT + "px";
}

function init_role_allocation() {
  const roles = Object.values(RoleType);
  for (let r of roles) {
    global_random_data.role_allocation[r] = 0;
    global_random_data.max_allocation[r] = 0;
  }
}

function setup() {
  frameRate(60);
  let cnv = createCanvas(WIDTH, HEIGHT);
  cnv.mouseWheel(mouseScrolled);
  init_ui_overlay();
  init_role_allocation();

  initial_berry_spawn();
  make_ship(0, 0);
  make_ship(0, 0);
  make_drop(50, 50, 20, 20, ItemType.Berry);

  makeLabelJS(10, 10, () => {
    return "num ents " + Object.keys(entities).length;
  });

  makeLabelListJS(10, 20, () => {
    // calculate + render_holders
    let holders = audit_storage();
    let texts = [];
    for (let k of Object.keys(holders)) {
      texts.push("" + k + ": " + holders[k]);
    }
    return texts;
  });

  makeLabelListJS(
    10,
    height - 100,
    () => {
      // calculate + render_roles
      const people = audit_roles();

      let texts = [];
      for (let k of Object.keys(people)) {
        if (k == RoleType.Grunt) {
          texts.push("" + k + ": " + people[k]);
          continue;
        }
        //
        let cur_alloc = global_random_data.role_allocation[k] ?? people[k];
        let max_role = global_random_data.max_allocation[k] ?? people[k];
        if (max_role <= 0) max_role = people[k];

        texts.push(
          "" + k + ": " + cur_alloc + "/" + max_role + "(" + people[k] + ")"
        );
      }
      return texts;
    },
    {
      hasAllocationButtons: (index) => {
        const people = audit_roles();
        const role = Object.keys(people)[index];
        return role != RoleType.Grunt;
      },
      onPlusClicked: (index) => {
        const people = audit_roles();
        const role = Object.keys(people)[index];
        const val = global_random_data.role_allocation[role];
        global_random_data.role_allocation[role] = val + 1;
        console.log(role, global_random_data.role_allocation);
      },
      onMinusClicked: (index) => {
        const people = audit_roles();
        const role = Object.keys(people)[index];
        global_random_data.role_allocation[role]--;
      },
    }
  );

  make_berry_bush_button();
  make_unlock_farmer_button(1);
}

function on_second_tick() {}

function tick() {
  ticks += 1;
  if (ticks >= 60) {
    ticks -= 60;
    on_second_tick();
  }

  // runs whenevr the mouse is still in an active hover state
  for_components([CT.HasHoverInteraction], (entity, interaction) => {
    if (interaction.active) {
      if (interaction.whileInside) interaction.whileInside(entity);
    }
  });

  // remove any temporaries
  for_components([CT.IsTemporary], (entity) => {
    remove_entity(entity.id);
  });
  // add the new temporaries for rendering later
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
