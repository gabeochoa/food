const CT = {
  CircleRenderer: {
    name: "CircleRenderer",
  },
  SquareRenderer: {
    name: "SquareRenderer",
  },
  RectRenderer: {
    name: "RectRenderer",
    fields: {
      w: "Number",
      h: "Number",
    },
  },
  HasCustomColor: {
    name: "HasCustomColor",
    fields: {
      get_color: "Function",
    },
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
      onReached: "Function",
    },
  },
  IsTarget: {
    name: "IsTarget",
    fields: {
      parent_id: "ID",
    },
  },
  IsItem: {
    name: "IsItem",
    fields: {
      type: "ItemType",
    },
  },
  HoldsItem: {
    name: "HoldsItem",
    fields: {
      type: "ItemType",
      amount: "Amount",
    },
  },
  IsDropoff: {
    name: "IsDropoff",
  },
  HasClickInteraction: {
    name: "HasClickInteraction",
    fields: {
      callback: "Function",
      validator: "NullableFunction",
    },
  },
  HasHoverInteraction: {
    name: "HasHoverInteraction",
    fields: {
      active: "Boolean",
      //
      onStart: "Function",
      whileInside: "Function",
      onEnd: "Function",
    },
  },
  HasLabel: {
    name: "HasLabel",
    fields: {
      active: "Boolean",
      // when true, get_text() is called and text is last rendered
      is_dynamic: "Boolean",
      text: "String",
      location: "RectLocation",
      // called when is_dynamic=true
      get_text: "Function",
    },
  },
  HasAbsolutePosition: {
    name: "HasAbsolutePosition",
    fields: {},
  },
  HasRole: {
    name: "HasRole",
    fields: {
      type: "RoleType",
    },
  },
  IsTemporary: {
    name: "IsTemporary",
  },
  IsSpawner: {
    name: "IsSpawner",
    fields: {
      timer: "Timer",
      onSpawn: "Function",
      radius: "Number",
      amount: "Amount",
    },
  },
  CanBuild: {
    name: "CanBuild",
    fields: {
      building_type: "BuildingType",
      cooldown: "Timer",
    },
  },
};

const EC = {
  CircleRenderer: [],
  SquareRenderer: [],
  RectRenderer: [],
  HasVelocity: [],
  HasTarget: [],
  IsTarget: [],
  IsItem: [],
  HoldsItem: [],
  IsDropoff: [],
  HasRole: [],
  IsTemporary: [],
  IsSpawner: [],
  CanBuild: [],
  //
  // UI
  //
  HasClickInteraction: [],
  HasHoverInteraction: [],
  HasLabel: [],
  HasAbsolutePosition: [],
  HasCustomColor: [],
};

const RoleType = {
  Grunt: "grunt",
  Farmer: "farmer",
  Builder: "builder",
};

const ItemType = {
  _Grunt: "grunt",
  //
  Berry: "berry",
  Iron: "iron",
};

function randomItem() {
  const items = Object.values(ItemType);
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

const UI_Interaction_Type = {
  None: "none",
  Click: "click",
  Hover: "hover",
};

class UIInteraction {
  constructor(type, callback) {
    this.type = type;
    this.callback = callback;
  }
}

const RectLocation = {
  TopLeft: "topleft",
  Center: "center",
};

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
    // console.log("adding component: ", component);
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
        case "ItemType":
          fields[key] = randomItem();
          break;
        case "Amount":
          fields[key] = 0;
          break;
        case "Number":
          fields[key] = 0;
          break;
        case "Interaction[]":
          fields[key] = [];
          break;
        case "Function":
          fields[key] = () => {};
          break;
        case "NullableFunction":
          fields[key] = null;
          break;
        case "Boolean":
          fields[key] = false;
          break;
        case "Color":
          fields[key] = color(255);
          break;
        case "String":
          fields[key] = "";
          break;
        case "RectLocation":
          fields[key] = RectLocation.TopLeft;
          break;
        case "RoleType":
          fields[key] = RoleType.Grunt;
          break;
        case "BuildingType":
          fields[key] = BuildingType.None;
          break;
        // this one doesnt seem to work...
        case "Timer":
          // in ms
          fields[key] = 0;
          fields[key + "_reset"] = 1000;
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
