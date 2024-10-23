
function make_ore(x, y){
    e = new Entity(x,y, [
        CT.CircleRenderer,
        CT.IsOre
    ])
    entities[e.id] = e;
}

function make_ship(x,y){
    e = new Entity(x,y, [
        CT.HasVelocity,
        CT.CircleRenderer,
        CT.HasTarget,
        CT.HoldsOre,
    ])
    entities[e.id] = e;
}
