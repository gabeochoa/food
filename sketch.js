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

const CT = {
    CircleRenderer: {
        name: "CircleRenderer"
    },
    HasVelocity: {
        name: "HasVelocity",
        fields: {
            vel:  "Vector",
            acc:  "Vector"
        }
    },
};

const EC = {
    "CircleRenderer": [],
    "HasVelocity": [],
};


let NEXT_ENTITY_ID = 0;

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
            switch(value){
                case "Vector":
                    this[key] = createVector(0,0)
                    break;
                default:
                    console.log("Missing handler for ", value)
                    break;
            }
        }
    }
}

function make_ore(x, y){
    e = new Entity(x,y, [
        CT.CircleRenderer
    ])
    entities[e.id] = e;
}

function make_ship(x,y){
    e = new Entity(x,y, [
        CT.HasVelocity,
        CT.CircleRenderer
    ])
    entities[e.id] = e;
}

let entities = {};

function setup() {
  createCanvas(400, 450);
  // 


  make_ore( width/4, height/4)
  make_ship( width/2, height/2)

  // 
  print(EC)
  print(entities)
}

function for_components(cmps, cb){
    let ids = [];
    for(let cmp of cmps){
        ids = ids.concat(EC[cmp.name]).unique()
    }

    for(let id of ids){
        e = entities[id];
        if(e == null || e == undefined){
            // console.warn("Entity ", id, " not found")
            continue;
        }
        cb(e)
    }
}

function draw() {
    background(0);

    // process accel
    for_components([CT.HasVelocity], entity => {
        entity.vel.add(entity.acc.copy().div(10))
        entity.pos.add(entity.vel)
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
