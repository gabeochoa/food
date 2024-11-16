//////////// UI Elements /////////////

const BUTTON_WIDTH = 50;
const BUTTON_HEIGHT = 20;
const BUTTON_PADDING = 10;

function make_ore_drop_button(y_off = 0) {
  make_dynamic_button({
    x: width - BUTTON_WIDTH - BUTTON_PADDING,
    y: BUTTON_HEIGHT * y_off + BUTTON_PADDING,
    w: BUTTON_WIDTH,
    h: BUTTON_HEIGHT,
    label: () => {
      return (
        "Request Food Drop \n(" +
        NUM_SPAWNED +
        " food for " +
        SPAWN_ORE_COST +
        " iron ore )"
      );
    },
    onClick: () => {
      const iron_holders = find_all_with(
        [CT.HoldsOre, CT.IsTarget],
        (entity) => {
          return entity.HoldsOre.type == OreType.Iron;
        }
      );
      let i = SPAWN_ORE_COST;
      for (let iron_holder of iron_holders) {
        i = i - iron_holder.HoldsOre.amount;
        iron_holder.HoldsOre.amount = 0;
        if (i <= 0) {
          iron_holder.HoldsOre.amount += -i;
          break;
        }
      }
      spawn_N_food();
    },
    onHoverStart: (_entity) => {},
    onHoverEnd: (_entity) => {},
    validationFunction: (_entity) => {
      return amount_in_storage(OreType.Iron) >= SPAWN_ORE_COST;
    },
  });
}

function make_ship_speed_button(y_off = 0) {
  make_button({
    x: width - BUTTON_WIDTH - BUTTON_PADDING,
    y: BUTTON_HEIGHT * y_off + BUTTON_PADDING,
    w: BUTTON_WIDTH,
    h: BUTTON_HEIGHT,
    label: "speed up ship\n(15 iron)",
    onClick: () => {
      if (SPEED > 3.9) return;
      SPEED += 0.1;
      console.log("new speed is ", SPEED);
    },
    onHoverStart: (_entity) => {},
    onHoverEnd: (_entity) => {},
    validationFunction: () => {
      return amount_in_storage(OreType.Iron) >= 15;
    },
  });
}
