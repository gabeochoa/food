//////////// UI Elements /////////////

const BUTTON_WIDTH = 50;
const BUTTON_HEIGHT = 20;
const BUTTON_PADDING = 10;

function make_berry_bush_button(y_off = 0) {
  make_dynamic_button({
    x: width - BUTTON_WIDTH - BUTTON_PADDING,
    y: BUTTON_HEIGHT * y_off + BUTTON_PADDING,
    w: BUTTON_WIDTH,
    h: BUTTON_HEIGHT,
    label: () => {
      return (
        "Plant Berry Bush\n" +
        "(" +
        NUM_SPAWNED +
        " berry for " +
        SPAWN_ORE_COST +
        " berry)"
      );
    },
    onClick: () => {
      map_info.mouseMode = MouseMode.Build;
      map_info.onBuildingModePreview = (mx, my) => {
        make_preview_entity(mx, my, 15, 15);
      };
      map_info.onBuildingModeClick = (mx, my) => {
        //BuildingType.Bush;
        make_spawner(
          mx,
          my,
          15,
          15,
          ItemType.Berry,
          10, // amount
          50 // radi
        );

        const berry_holders = find_all_with(
          [CT.HoldsItem, CT.IsTarget],
          (entity) => {
            return entity.HoldsItem.type == ItemType.Berry;
          }
        );
        let i = SPAWN_ORE_COST;
        for (let berry_holder of berry_holders) {
          i = i - berry_holder.HoldsItem.amount;
          berry_holder.HoldsItem.amount = 0;
          if (i <= 0) {
            berry_holder.HoldsItem.amount += -i;
            break;
          }
        }
      };
    },
    onHoverStart: (_entity) => {},
    onHoverEnd: (_entity) => {},
    validationFunction: (_entity) => {
      return amount_in_storage(ItemType.Berry) >= SPAWN_ORE_COST;
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
