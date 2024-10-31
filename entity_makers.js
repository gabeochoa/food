function make_ore(x, y) {
  e = new Entity(x, y, [CT.CircleRenderer, CT.IsOre, CT.IsTarget]);
  entities[e.id] = e;
}

function make_ship(x, y) {
  e = new Entity(x, y, [
    CT.HasVelocity,
    CT.SquareRenderer,
    CT.HasTarget,
    CT.HoldsOre,
  ]);
  entities[e.id] = e;
}

function make_drop(x, y, w, h, oreType) {
  e = new Entity(x, y, [
    CT.RectRenderer,
    CT.HoldsOre,
    CT.IsDropoff,
    CT.IsTarget,
    CT.HasHoverInteraction,
    CT.HasLabel,
  ]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;
  e.HoldsOre.type = oreType;
  e.HasHoverInteraction.onStart = (entity) => {
    entity.HasLabel.text =
      "" + entity.HoldsOre.type + ": " + entity.HoldsOre.amount;
    entity.HasLabel.active = true;
  };
  e.HasHoverInteraction.onEnd = (entity) => {
    entity.HasLabel.active = false;
  };
  entities[e.id] = e;
}

function make_button(x, y, w, h, label, onClick, onHoverStart, onHoverEnd) {
  e = new Entity(x, y, [
    CT.RectRenderer,
    CT.HasClickInteraction,
    CT.HasHoverInteraction,
    CT.HasLabel,
  ]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;
  e.HasLabel.text = label;
  e.HasLabel.active = true;
  e.HasLabel.location = RectLocation.Center;
  e.HasClickInteraction.callback = onClick;
  e.HasHoverInteraction.onStart = (entity) => {
    entity.RectRenderer.color = color(255, 0, 255, 255);
    onHoverStart(entity);
  };
  e.HasHoverInteraction.onEnd = (entity) => {
    entity.RectRenderer.color = color(255);
    onHoverEnd(entity);
  };
  entities[e.id] = e;
}

function make_label(x, y, callback) {
  e = new Entity(x, y, [CT.HasLabel]);
  e.HasLabel.is_dynamic = true;
  e.HasLabel.active = true;
  e.HasLabel.location = RectLocation.Center;
  e.HasLabel.get_text = callback;
  e.HasLabel.text = "PLACEHOLDER TEXT";

  entities[e.id] = e;
}

function make_label_list(x, y, callback) {
  e = new Entity(x, y, [CT.HasLabel]);
  e.HasLabel.is_dynamic = true;
  e.HasLabel.active = true;
  e.HasLabel.location = RectLocation.Center;
  e.HasLabel.get_text = callback;
  e.HasLabel.text = "PLACEHOLDER TEXT";

  entities[e.id] = e;
}
