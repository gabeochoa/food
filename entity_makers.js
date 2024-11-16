function make_item(x, y, type) {
  e = new Entity(x, y, [CT.CircleRenderer, CT.IsItem, CT.IsTarget]);
  e.IsItem.type = type;
  entities[e.id] = e;
}

function make_ship(x, y) {
  e = new Entity(x, y, [
    CT.HasVelocity,
    CT.SquareRenderer,
    CT.HasTarget,
    CT.HoldsItem,
    CT.HasRole,
  ]);
  entities[e.id] = e;
}

function make_preview_entity(x, y, w, h) {
  e = new Entity(x, y, [CT.IsTemporary, CT.RectRenderer]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;
  entities[e.id] = e;
}

function make_spawner(x, y, w, h, itemType, amount, radius) {
  e = new Entity(x, y, [
    CT.RectRenderer,
    CT.HasHoverInteraction,
    CT.HasLabel,
    CT.IsSpawner,
  ]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;

  e.IsSpawner.type = itemType;
  e.IsSpawner.amount = amount;
  e.IsSpawner.radius = radius;
  e.IsSpawner.timer = 250;
  e.IsSpawner.timer_reset = 250;

  e.HasHoverInteraction.whileInside = (entity) => {
    const next_spawn_pct =
      100 * (entity.IsSpawner.timer / entity.IsSpawner.timer_reset);

    let next_spawn = "";
    for (let n = 0; n < 100; n += 10) {
      if (next_spawn_pct < n) {
        next_spawn += "░"; // alt-176
      } else {
        next_spawn += "▓"; // alt-178
      }
    }

    const amount_remaining =
      "" +
      entity.IsSpawner.type +
      ": " +
      entity.IsSpawner.amount +
      " remaining";
    entity.HasLabel.text = amount_remaining + "\n\n\n" + next_spawn;
  };

  e.HasHoverInteraction.onStart = (entity) => {
    e.HasHoverInteraction.whileInside(entity);
    entity.HasLabel.active = true;
  };
  e.HasHoverInteraction.onEnd = (entity) => {
    entity.HasLabel.active = false;
  };
  entities[e.id] = e;
}

function make_drop(x, y, w, h, itemType) {
  e = new Entity(x, y, [
    CT.RectRenderer,
    CT.HoldsItem,
    CT.IsDropoff,
    CT.IsTarget,
    CT.HasHoverInteraction,
    CT.HasLabel,
  ]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;
  e.HoldsItem.type = itemType;
  e.HasHoverInteraction.whileInside = (entity) => {
    entity.HasLabel.text =
      "" + entity.HoldsItem.type + ": " + entity.HoldsItem.amount;
  };
  e.HasHoverInteraction.onStart = (entity) => {
    entity.HasLabel.active = true;
  };
  e.HasHoverInteraction.onEnd = (entity) => {
    entity.HasLabel.active = false;
  };
  entities[e.id] = e;
}

function make_button({
  x,
  y,
  w,
  h,
  label,
  onClick,
  onHoverStart,
  onHoverEnd,
  validationFunction,
} = {}) {
  e = new Entity(x, y, [
    CT.RectRenderer,
    CT.HasClickInteraction,
    CT.HasHoverInteraction,
    CT.HasLabel,
    CT.HasAbsolutePosition,
  ]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;
  e.HasLabel.text = label;
  e.HasLabel.active = true;
  e.HasLabel.location = RectLocation.Center;
  e.HasClickInteraction.validator = validationFunction;
  e.HasClickInteraction.callback = (entity) => {
    if (entity.HasClickInteraction.validator) {
      const result = entity.HasClickInteraction.validator(entity);
      if (!result) {
        return;
      }
    }
    onClick();
  };
  e.HasHoverInteraction.onStart = (entity) => {
    entity.RectRenderer.color = color(255, 0, 255, 255);
    onHoverStart(entity);
  };
  e.HasHoverInteraction.onEnd = (entity) => {
    entity.RectRenderer.color = color(255);
    onHoverEnd(entity);
  };
  entities[e.id] = e;
  return e;
}

function make_dynamic_button(buttonOptions) {
  let e = make_button({
    ...buttonOptions,
    label: "",
  });
  e.HasLabel.is_dynamic = true;
  e.HasLabel.get_text = buttonOptions.label;
}

function make_label(x, y, callback) {
  e = new Entity(x, y, [CT.HasLabel, CT.HasAbsolutePosition]);
  e.HasLabel.is_dynamic = true;
  e.HasLabel.active = true;
  e.HasLabel.location = RectLocation.Center;
  e.HasLabel.get_text = callback;
  e.HasLabel.text = "PLACEHOLDER TEXT";

  entities[e.id] = e;
}

function make_label_list(x, y, callback) {
  e = new Entity(x, y, [CT.HasLabel, CT.HasAbsolutePosition]);
  e.HasLabel.is_dynamic = true;
  e.HasLabel.active = true;
  e.HasLabel.location = RectLocation.Center;
  e.HasLabel.get_text = callback;
  e.HasLabel.text = "PLACEHOLDER TEXT";

  entities[e.id] = e;
}
