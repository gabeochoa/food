// PROTOTYPES

const v_mult = p5.Vector.mult;
const v_sub = p5.Vector.sub;
const v_add = p5.Vector.add;

Array.prototype.onPred = function (callback, predicate) {
  var i = this.length;
  while (i--) {
    if (predicate(this[i], i)) {
      callback(this, this[i], i);
    }
  }
};

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
};

function distance(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}

function inverseColor(r, g, b) {
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;
  return [r, g, b];
}

function random_in_circle(x, y, radius, minRadius = 0) {
  if (minRadius > radius) {
    throw new Error("minRadius cannot be greater than radius.");
  }
  let rad = minRadius + Math.random() * (radius - minRadius);
  let angle = 2 * Math.PI * Math.random();
  return [
    x + Math.floor(Math.cos(angle) * rad),
    y + Math.floor(Math.sin(angle) * rad),
  ];
}
