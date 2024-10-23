// PROTOTYPES

const v_mult = p5.Vector.mult;
const v_sub = p5.Vector.sub;
const v_add = p5.Vector.add;

Array.prototype.onPred = function(callback, predicate){
    var i = this.length;
    while (i--){
        if(predicate(this[i], i)){
            callback(this, this[i], i);
        }
    }
}

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};

const PSIZE = 10
let NEXT_ENTITY_ID = 0;
let entities = {};

const CT = {
    CircleRenderer: {
        name: "CircleRenderer"
    },
    HasVelocity: {
        name: "HasVelocity",
        fields: {
            vel:  "Vector",
        }
    },
    HasTarget: {
        name: "HasTarget",
        fields: {
            target_id: "ID",
        }
    },
    IsOre: {
        name: "IsOre",
        fields: {
            type: "OreType",
        }
    },
    HoldsOre: {
        name: "HoldsOre",
        fields: {
            type: "OreType",
            amount: "Amount",
        }
    }
};

const EC = {
    "CircleRenderer": [],
    "HasVelocity": [],
    "HasTarget": [],
    "IsOre": [],
    "HoldsOre": [],
};


function randomOre(){
    const ores = [
        "iron",
    ];
    const index = Math.floor(Math.random() * ores.length);
    return ores[index]
}

class Entity {
    constructor(x, y, components){
        this.id = NEXT_ENTITY_ID++;
        this.pos = createVector(x, y)
        for(let component of components){
            this.add_component(component)
        }
    }

    add_component(component){
        // console.log(component)
        if(!(component.name in EC)){
            console.error("component ", component, " missing from EC", EC)
        }
        EC[component.name].push(this.id)

        if(component.fields){
            this.add_component_fields(component)
        }
    }

    add_component_fields(component){
        for (const [key, value] of Object.entries(component.fields)) {
            let fields = {};
            switch(value){
                case "Vector":
                    fields[key] = createVector(0,0)
                    break;
                case "ID":
                    fields[key] = null
                    break;
                case "OreType":
                    fields[key] = randomOre();
                    break
                case "Amount":
                    fields[key] = 0;
                    break
                default:
                    console.warn("Missing handler for ", value)
                    break;
            }
            this[component.name] = fields;
        }
    }
}

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

function remove_entity(id){
    delete entities[id];
    for(component of Object.values(EC)){
        delete component[id]
    }
}

function setup() {
  createCanvas(400, 450);
  // 

  make_ore( width/4, height/4)
  remove_entity(0)

  make_ore( width/4, height/4)
  make_ship( width/2, height/2)

  // 
  print(EC)
  print(entities)

  if(count_entities_with(CT.IsOre) != 1){
    console.error("remove isnt working")
  }

}

function distance(a, b){
    return dist(a.x, a.y, b.x, b.y)
}

function find_matching_ids(cmps){
    let ids = [];
    for(let cmp of cmps){
        ids = ids.concat(EC[cmp.name]).unique()
    }
    return ids;
}

function for_components(cmps, cb){
    let ids = find_matching_ids(cmps)
    for(let id of ids){
        e = entities[id];
        if(e == null || e == undefined){
            // console.warn("Entity ", id, " not found")
            continue;
        }
        let components = cmps.map(cmp => {
            return e[cmp.name]
        })
        cb(e, ...components)
    }
}

function to_ents(ids){
    let ents = [];
    for(let id of ids){
        e = entities[id];
        if(e == null || e == undefined){
            // console.warn("Entity ", id, " not found")
            continue;
        }
        ents.push(e)
    }
    return ents;
}

function find_closest_with(cmp, position, filter_fn){
    let ids = find_matching_ids([cmp])
    let closest = null;
    for(let id of ids){
        e = entities[id];
        if(e == null || e == undefined){
            // console.warn("Entity ", id, " not found")
            continue;
        }
        if(filter_fn && !filter_fn(e)){
            continue;
        }
        if(closest == null){
            closest = e.id
            continue;
        }
        if(distance(position, e.pos) < distance(position, closest.pos)){
            closest = e.id
            continue;
        }
    }
    return closest;
}

function count_entities_with(cmp){
    let ids = to_ents(find_matching_ids([cmp]))
    return ids.length;
}

let tick_num = 0;
function draw() {
    background(0);

    {
        fill(255);
        text("" + Object.keys(entities).length, 50, 50);
    }

    // TODO replace with something else? 
    // spawn ore if under amount 
    {
        if(count_entities_with(CT.IsOre) < 1){
            console.log("spawning a new ore")
            make_ore(
                Math.floor(width * Math.random()),
                Math.floor(height * Math.random()),
            )
        }
    }

    // find cloest ore
    for_components([CT.HasTarget, CT.HoldsOre], (entity, ht, ho) => {
        if(ht.target_id != null) return
        let match = find_closest_with(CT.IsOre, entity.pos, (e) => {
            if(ho.amount == 0) return true;
            return ho.type == e.IsOre.type;
        })
        if(match == null) return;
        ht.target_id = match
    });

    // move to target if one exists
    for_components([CT.HasTarget], (entity, ht) => {
        if(ht.target_id == null) return
        target = entities[ht.target_id]
        if(target == null) {
            ht.target_id = null;
            return;
        }

        SPEED = 0.5;
        let direction = v_sub(target.pos, entity.pos).normalize().mult(SPEED)
        entity.pos.add(direction)
    });

    for_components([CT.HasTarget, CT.HoldsOre], (entity, ht, ho) => {
        if(ht.target_id == null) return
        target = entities[ht.target_id]
        if(target == null) {
            ht.target_id = null;
            return;
        }
        if(distance(entity.pos, target.pos) > 2) return;
        // TODO reset
        if(ho.type != null && ho.type != target.IsOre.type) return;

        ho.type = target.IsOre.type;
        ho.amount += 1;
        remove_entity(target.id)
        console.log("Picked up", ho.type)
    });

    // process accel
    for_components([CT.HasVelocity], (entity, hv) => {
        entity.pos.add(hv.vel)
    });

    // render_circles();
    for_components([CT.CircleRenderer], entity => {
        push()
        fill(255, 255, 255, 255);
        translate(entity.pos.x, entity.pos.y)
        rect(0, 0, PSIZE, PSIZE)
        pop()
    });
}
