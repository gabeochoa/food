const PSIZE = 10;
let entities = {};

let SHIP_STORAGE = 1;
// TODO
let SPEED = 2; // 0.75;

let ticks = 0;

let spawn_radius = 0;
let NUM_SPAWNED = 10;
let SPAWN_ORE_COST = 5;

function to_60fps(ms) {
  return ms / 16.6;
}

const MouseMode = {
  Normal: "normal",
  Build: "build",
};

const BuildingType = {
  None: "none",
  Bush: "bush",
  Home: "home",
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

function initial_berry_spawn() {
  i = 0;
  spawn_radius = 300;
  // TODO 20
  while (i < 205) {
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

  // TODO make initial drop have 100 berries
  {
    for_components([CT.HoldsItem, CT.IsTarget], (entity, ho) => {
      if (ho.type == null) return;
      ho.amount += 100;
    });
  }

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

  let btn_idx = 0;
  make_berry_bush_button(btn_idx++);
  make_house_button(btn_idx++);
  make_unlock_farmer_button(btn_idx++);
  make_unlock_home_builder_button(btn_idx++);
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

  for_components([CT.HasRole, CT.CanBuild], (entity, role, canBuild) => {
    switch (role.type) {
      case RoleType.Builder:
        {
          if (canBuild.building_type != BuildingType.None) return;
          if (amount_in_storage(ItemType.Berry) < 50) return;
          canBuild.building_type = BuildingType.Home;
          spend_amount(ItemType.Berry, 50);
          console.log("builder", entity.id, "gonna build soon :) ");
        }
        return;
      case RoleType.Farmer:
        {
          if (canBuild.building_type != BuildingType.None) return;
          if (amount_in_storage(ItemType.Berry) < 10) return;
          canBuild.building_type = BuildingType.Bush;
          spend_amount(ItemType.Berry, 10);
          console.log("farmer ", entity.id, "gonna build soon :) ");
        }
        return;
      case RoleType.Grunt:
      default:
        return;
    }
  });

  for_components(
    [CT.HasRole, CT.CanBuild, CT.HasTarget],
    (entity, role, cb, ht) => {
      if (cb.building_type == BuildingType.None) return;
      if (ht.target_id != null) return;
      //

      switch (role.type) {
        case RoleType.Builder:
          {
            let match = find_closest_with_all(
              [CT.IsSpawner],
              entity.pos,
              (e) => {
                return (e.IsSpawner.type = ItemType._Grunt);
              }
            );
            let t_x = 0;
            let t_y = 0;

            if (match == null) {
              [t_x, t_y] = random_in_circle(
                entity.pos.x,
                entity.pos.y,
                200,
                100
              );
            } else {
              [t_x, t_y] = random_in_circle(match.pos.x, match.pos.y, 200, 10);
            }

            ht.target_id = make_target_location(t_x, t_y).id;
            ht.onReached = () => {
              cb.cooldown--;
              if (cb.cooldown > 0) return false;
              cb.cooldown = cb.cooldown_reset;

              spawn_house(t_x, t_y);
            };
          }
          return;
        case RoleType.Farmer:
          {
            let match = find_closest_with_all(
              [CT.HoldsItem, CT.IsDropoff],
              entity.pos,
              (e) => {
                // does this need to be dynamic?
                return e.HoldsItem.type == ItemType.Berry;
              }
            );
            if (match == null) {
              // console.log("farmer ", entity.id, " could not find dropoff");
              return;
            }
            const [t_x, t_y] = random_in_circle(
              match.pos.x,
              match.pos.y,
              200,
              100
            );
            ht.target_id = make_target_location(t_x, t_y).id;
            match.IsTarget.parent_id = entity.id;
            // console.log("found farmer target: ", t_x, t_y);
            ht.onReached = () => {
              cb.cooldown--;
              // console.log("reached farmer target: ", t_x, t_y, cb.cooldown);
              if (cb.cooldown > 0) return false;
              cb.cooldown = cb.cooldown_reset;
              remove_entity(ht.target_id);

              // console.log("completed planting ");
              spawn_bush(t_x, t_y);
              return true;
            };
          }
          break;
        case RoleType.Grunt:
        default:
          return;
      }
      // find a place to build,
      // move there
      // place the item
      // mark building type noine
    }
  );

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
    ht.onReached = (entity, target) => {
      const ho = entity.HoldsItem;
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
      return true;
    };
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
  for_components([CT.HasTarget], (entity, ht) => {
    if (ht.target_id == null) return;
    target = entities[ht.target_id];
    if (target == null) {
      ht.target_id = null;
      return;
    }
    if (distance(entity.pos, target.pos) > 2) return;

    const finished = ht.onReached(entity, target);
    if (finished) {
      ht.target_id = null;
    }

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
    iss.onSpawn(x, y);
    iss.amount -= 1;

    if (iss.amount == 0) {
      remove_entity(entity.id);
    }
  });
}

function draw() {
  tick();

  arrowKeymapMovement();
  //

  render_all();
}
