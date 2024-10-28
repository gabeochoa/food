const PSIZE = 10;
let entities = {};

let SHIP_STORAGE = 1;
let SPEED = 2.75;

function setup() {
  createCanvas(400, 300);
  //

  make_ore(width / 4, height / 4);
  remove_entity(0);

  make_ore(width / 4, height / 4);
  make_ship(width / 2, height / 2);

  make_ship(width / 4, height / 2);
  make_drop(width / 6, height / 6, PSIZE * 2, PSIZE * 2, OreType.Iron);

  //
  print(EC);
  print(entities);

  if (count_entities_with(CT.IsOre) != 1) {
    console.error("remove isnt working", count_entities_with(CT.IsOre));
  }

  spawn_10_ore();

  const BUTTON_WIDTH = 50;
  const BUTTON_HEIGHT = 20;
  const BUTTON_PADDING = 10;
  make_button(
    width - BUTTON_WIDTH - BUTTON_PADDING,
    BUTTON_PADDING,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    "spawn 10 ore\n(5 iron)",
    () => {
      const in_storage = audit_storage();
      if (in_storage[OreType.Iron] && in_storage[OreType.Iron] < 5) {
        return;
      }
      const iron_holders = find_all_with(
        [CT.HoldsOre, CT.IsTarget],
        (entity) => {
          return entity.HoldsOre.type == OreType.Iron;
        }
      );
      let i = 5;
      for (let iron_holder of iron_holders) {
        i = i - iron_holder.HoldsOre.amount;
        iron_holder.HoldsOre.amount = 0;
        if (i <= 0) {
          iron_holder.HoldsOre.amount += -i;
          break;
        }
      }
      spawn_10_ore();
    },
    (_entity) => {},
    (_entity) => {}
  );
  make_button(
    width - BUTTON_WIDTH - BUTTON_PADDING,
    BUTTON_HEIGHT + BUTTON_PADDING + BUTTON_PADDING,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    "speed up ship\n(15 iron)",
    () => {
      if (SPEED > 3.9) return;
      SPEED += 0.1;
      console.log("new speed is ", SPEED);
    },
    (_entity) => {},
    (_entity) => {}
  );
}

function spawn_10_ore() {
  i = 0;
  while (i < 10) {
    // console.log("spawning a new ore")
    make_ore(
      Math.floor(width * Math.random()),
      Math.floor(height * Math.random())
    );
    i++;
  }
}

function tick() {
  // find cloest ore
  for_components([CT.HasTarget, CT.HoldsOre], (entity, ht, ho) => {
    if (ho.amount >= SHIP_STORAGE) return;
    if (ht.target_id != null) return;
    let match = find_closest_with_all(
      [CT.IsOre, CT.IsTarget],
      entity.pos,
      (e) => {
        if (ho.amount == 0) return true;
        if (is_valid_entity(e.IsTarget.parent_id)) {
          return;
        }
        return ho.type == e.IsOre.type;
      }
    );
    if (match == null) return;
    ht.target_id = match.id;
    match.IsTarget.parent_id = entity.id;
  });

  // find drop off for ore
  for_components([CT.HasTarget, CT.HoldsOre], (entity, ht, ho) => {
    if (ho.amount == 0) return;
    if (ht.target_id != null) return;
    let match = find_closest_with_all(
      [CT.HoldsOre, CT.IsDropoff],
      entity.pos,
      (e) => {
        return ho.type == e.HoldsOre.type;
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
  for_components([CT.HasTarget, CT.HoldsOre], (entity, ht, ho) => {
    if (ht.target_id == null) return;
    target = entities[ht.target_id];
    if (target == null) {
      ht.target_id = null;
      return;
    }
    if (distance(entity.pos, target.pos) > 2) return;

    if (has_(target.id, CT.IsOre)) {
      if (ho.type != null && ho.type != target.IsOre.type) return;

      ho.type = target.IsOre.type;
      ho.amount += 1;
      remove_entity(target.id);
      //   console.log(entity.id, "Picked up", ho.type);
    }

    if (has_(target.id, CT.IsDropoff)) {
      if (ho.type != null && ho.type != target.HoldsOre.type) return;
      target.HoldsOre.amount += ho.amount;
      //   console.log("Dropped off ", ho.type, "now has", target.HoldsOre.amount);
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

function mouseClicked() {
  for_components([CT.HasClickInteraction], (entity, interaction) => {
    if (mouseInsideRect(entity.pos, entity.RectRenderer)) {
      interaction.callback(entity);
    }
  });
}

function draw() {
  tick();

  background(0);

  {
    fill(255);
    textSize(5);
    text("num ents: " + Object.keys(entities).length, 10, 10);
  }

  // render_circles();
  for_components([CT.CircleRenderer], (entity) => {
    push();
    fill(255, 255, 255, 255);
    translate(entity.pos.x, entity.pos.y);
    circle(0, 0, PSIZE);
    pop();
  });

  // render_squares()
  for_components([CT.SquareRenderer], (entity) => {
    push();
    fill(255, 255, 255, 255);
    translate(entity.pos.x, entity.pos.y);
    rect(0, 0, PSIZE, PSIZE);
    pop();
  });

  // render_rect()
  for_components([CT.RectRenderer], (entity, rr) => {
    push();
    fill(rr.color);
    translate(entity.pos.x, entity.pos.y);
    rect(0, 0, rr.w, rr.h);
    pop();
  });

  // calculate + render_holders
  let holders = audit_storage();
  let ho_offset = 0;
  for (let k of Object.keys(holders)) {
    push();
    fill(255);
    text("" + k + ": " + holders[k], 10, 20 + ho_offset);
    pop();
    ho_offset += 25;
  }

  for_components([CT.RectRenderer, CT.HasLabel], (entity, rr) => {
    if (!entity.HasLabel.active) return;
    push();
    fill(rr.color);
    translate(entity.pos.x, entity.pos.y);
    rect(0, 0, rr.w, rr.h);
    {
      push();
      switch (entity.HasLabel.location) {
        case RectLocation.TopLeft:
          break;
        case RectLocation.Center:
          fill(...inverseColor(...rr.color.levels));
          const tx = textWidth(entity.HasLabel.text);
          const ty = textHeight(entity.HasLabel.text);
          const xs = (rr.w - tx) / 2;
          const ys = (rr.h - ty) / 2;
          translate(xs, ys);
          break;
      }
      text("" + entity.HasLabel.text, 0, 0);
      pop();
    }
    pop();
  });
}
