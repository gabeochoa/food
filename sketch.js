const PSIZE = 10;
let entities = {};

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
}

function draw() {
  background(0);

  {
    fill(255);
    text("" + Object.keys(entities).length, 50, 50);
  }

  // TODO replace with something else?
  // spawn ore if under amount
  {
    if (count_entities_with(CT.IsOre) < 5) {
      // console.log("spawning a new ore")
      make_ore(
        Math.floor(width * Math.random()),
        Math.floor(height * Math.random())
      );
    }
  }

  const SHIP_STORAGE = 1;
  const SPEED = 2.75;

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
    fill(255, 255, 255, 255);
    translate(entity.pos.x, entity.pos.y);
    rect(0, 0, rr.w, rr.h);
    pop();
  });
}
