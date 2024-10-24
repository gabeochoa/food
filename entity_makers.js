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
  ]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;
  e.HoldsOre.type = oreType;
  entities[e.id] = e;
}
