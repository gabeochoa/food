const CT = {
  CircleRenderer: {
    name: "CircleRenderer",
  },
  SquareRenderer: {
    name: "SquareRenderer",
  },
  HasVelocity: {
    name: "HasVelocity",
    fields: {
      vel: "Vector",
    },
  },
  HasTarget: {
    name: "HasTarget",
    fields: {
      target_id: "ID",
    },
  },
  IsTarget: {
    name: "IsTarget",
    fields: {
      parent_id: "ID",
    },
  },
  IsOre: {
    name: "IsOre",
    fields: {
      type: "OreType",
    },
  },
  HoldsOre: {
    name: "HoldsOre",
    fields: {
      type: "OreType",
      amount: "Amount",
    },
  },
};

const EC = {
  CircleRenderer: [],
  SquareRenderer: [],
  HasVelocity: [],
  HasTarget: [],
  IsTarget: [],
  IsOre: [],
  HoldsOre: [],
};

function randomOre() {
  const ores = ["iron"];
  const index = Math.floor(Math.random() * ores.length);
  return ores[index];
}

let NEXT_ENTITY_ID = 0;

class Entity {
  constructor(x, y, components) {
    this.id = NEXT_ENTITY_ID++;
    this.pos = createVector(x, y);
    for (let component of components) {
      this.add_component(component);
    }
  }

  add_component(component) {
    // console.log(component)
    if (!(component.name in EC)) {
      console.error("component ", component, " missing from EC", EC);
    }
    EC[component.name].push(this.id);

    if (component.fields) {
      this.add_component_fields(component);
    }
  }

  add_component_fields(component) {
    for (const [key, value] of Object.entries(component.fields)) {
      let fields = {};
      switch (value) {
        case "Vector":
          fields[key] = createVector(0, 0);
          break;
        case "ID":
          fields[key] = null;
          break;
        case "OreType":
          fields[key] = randomOre();
          break;
        case "Amount":
          fields[key] = 0;
          break;
        default:
          console.warn("Missing handler for ", value);
          break;
      }
      this[component.name] = fields;
    }
  }
}

function remove_entity(id) {
  delete entities[id];
  for (let component of Object.values(EC)) {
    component = component.filter((e) => {
      return e.id == id;
    });
  }
}
