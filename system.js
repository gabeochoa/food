/**
 

*/

function find_matching_ids(cmps) {
  let ids = Object.keys(entities).map((id) => parseInt(id));
  for (let cmp of cmps) {
    ids = ids.filter((id) => EC[cmp.name].includes(id));
  }
  return ids;
}

function has_(id, cmp) {
  return EC[cmp.name].includes(id);
}

function for_components(cmps, cb) {
  let ids = find_matching_ids(cmps);
  for (let id of ids) {
    e = entities[id];
    if (e == null || e == undefined) {
      // console.warn("Entity ", id, " not found")
      continue;
    }
    let components = cmps.map((cmp) => {
      return e[cmp.name];
    });
    cb(e, ...components);
  }
}

function maybe_ent(entity_id) {
  if (entity_id == null || entity_id == undefined) return null;
  return entities[entity_id];
}

function is_valid_entity(entity_id) {
  e = maybe_ent(entity_id);
  if (e == null || e == undefined) {
    return false;
  }
  return true;
}

function to_ents(ids) {
  let ents = [];
  for (let id of ids) {
    e = entities[id];
    if (e == null || e == undefined) {
      // console.warn("Entity ", id, " not found")
      continue;
    }
    ents.push(e);
  }
  return ents;
}

function find_closest_with_all(cmps, position, filter_fn) {
  let ids = find_matching_ids(cmps);
  let closest = null;
  for (let id of ids) {
    e = entities[id];
    if (e == null || e == undefined) {
      // console.warn("Entity ", id, " not found")
      continue;
    }
    if (filter_fn && !filter_fn(e)) {
      continue;
    }
    if (closest == null) {
      closest = e;
      continue;
    }
    if (distance(position, e.pos) < distance(position, closest.pos)) {
      closest = e;
      continue;
    }
  }
  return closest;
}
function find_closest_with(cmp, position, filter_fn) {
  return find_closest_with_all([cmp], position, filter_fn);
}

function find_all_with(cmps, filter_fn) {
  let ids = find_matching_ids(cmps);
  let closest = null;
  let ents = [];
  for (let id of ids) {
    e = entities[id];
    if (e == null || e == undefined) {
      // console.warn("Entity ", id, " not found")
      continue;
    }
    if (filter_fn && !filter_fn(e)) {
      continue;
    }
    ents.push(e);
  }
  return ents;
}

function audit_storage() {
  let holders = {};
  for_components([CT.HoldsItem, CT.IsTarget], (entity, ho) => {
    if (ho.type == null) return;
    if (!(ho.type in holders)) holders[ho.type] = 0;
    holders[ho.type] += ho.amount;
  });
  return holders;
}

function audit_roles() {
  let people = {};
  for_components([CT.HasRole], (entity, role) => {
    if (role.type == null) return;
    if (!(role.type in people)) people[role.type] = 0;
    people[role.type] += 1;
  });
  return people;
}

function count_entities_with(cmp) {
  let ids = to_ents(find_matching_ids([cmp]));
  return ids.length;
}

function mouseInsideRect(pos, rectRenderer) {
  if (mouseX > pos.x && mouseX < pos.x + rectRenderer.w) {
    if (mouseY > pos.y && mouseY < pos.y + rectRenderer.h) {
      return true;
    }
  }
  return false;
}

function amount_in_storage(item_type) {
  const in_storage = audit_storage();
  if (item_type in in_storage) return in_storage[item_type];
  return 0;
}

function spend_amount(item_type, amount) {
  const item_holders = find_all_with([CT.HoldsItem, CT.IsTarget], (entity) => {
    return entity.HoldsItem.type == item_type;
  });
  let i = amount;
  for (let item_holder of item_holders) {
    i = i - item_holder.HoldsItem.amount;
    item_holder.HoldsItem.amount = 0;
    if (i <= 0) {
      item_holder.HoldsItem.amount += -i;
      break;
    }
  }
}
