//////////// UI Elements /////////////

const BUTTON_WIDTH = 50;
const BUTTON_HEIGHT = 20;
const BUTTON_PADDING = 10;

function make_berry_bush_button(y_off = 0) {
  makeButtonJS({
    name: "plant_bush",
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
        spend_amount(ItemType.Berry, SPAWN_ORE_COST);
      };
    },
    onHoverStart: (_entity) => {},
    onHoverEnd: (_entity) => {},
    validationFunction: (_entity) => {
      return amount_in_storage(ItemType.Berry) >= SPAWN_ORE_COST;
    },
  });
}

function make_house_button(y_off = 0) {
  makeButtonJS({
    name: "build_house",
    x: width - BUTTON_WIDTH - BUTTON_PADDING,
    y: BUTTON_HEIGHT * y_off + BUTTON_PADDING,
    w: BUTTON_WIDTH,
    h: BUTTON_HEIGHT,
    label: () => {
      return "Build House\n" + "( 3 grunts for 50 berry)";
    },
    onClick: () => {
      map_info.mouseMode = MouseMode.Build;
      map_info.onBuildingModePreview = (mx, my) => {
        make_preview_entity(mx, my, 15, 15);
      };
      map_info.onBuildingModeClick = (mx, my) => {
        spawn_house(mx, my);
        spend_amount(ItemType.Berry, 50);
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

function make_unlock_farmer_button(y_off = 0) {
  makeButtonJS({
    name: "unlock_farmer",
    x: width - BUTTON_WIDTH - BUTTON_PADDING,
    y: BUTTON_HEIGHT * y_off + BUTTON_PADDING,
    w: BUTTON_WIDTH,
    h: BUTTON_HEIGHT,
    label: () => {
      return "Unlock Farmer\n" + "(1 grunt, 20 berry)";
    },
    onClick: () => {
      const grunts = find_all_with([CT.HasRole], (entity) => {
        return entity.HasRole.type == RoleType.Grunt;
      });

      const grunt = grunts[0];
      make_farmer(grunt.pos.x, grunt.pos.y);
      remove_entity(grunt.id);

      global_random_data.max_allocation[RoleType.Farmer] = 1;
      global_random_data.role_allocation[RoleType.Farmer] = 1;

      spend_amount(ItemType.Berry, 20);
      document.getElementById("plant_bush").remove();

      return {
        shouldCleanup: true,
      };
    },
    onHoverStart: (_entity) => {},
    onHoverEnd: (_entity) => {},
    validationFunction: (_entity) => {
      const people = audit_roles();
      return (
        amount_in_storage(ItemType.Berry) >= 20 && people[RoleType.Grunt] > 1
      );
    },
  });
}

function make_unlock_home_builder_button(y_off = 0) {
  makeButtonJS({
    name: "unlock_builder",
    x: width - BUTTON_WIDTH - BUTTON_PADDING,
    y: BUTTON_HEIGHT * y_off + BUTTON_PADDING,
    w: BUTTON_WIDTH,
    h: BUTTON_HEIGHT,
    label: () => {
      return "Unlock Home\n" + "(1 grunt, 100 berry)";
    },
    onClick: () => {
      const grunts = find_all_with([CT.HasRole], (entity) => {
        return entity.HasRole.type == RoleType.Grunt;
      });

      const grunt = grunts[0];
      make_home_builder(grunt.pos.x, grunt.pos.y);
      remove_entity(grunt.id);

      global_random_data.max_allocation[RoleType.Builder] = 1;
      global_random_data.role_allocation[RoleType.Builder] = 1;

      spend_amount(ItemType.Berry, 100);

      document.getElementById("build_house").remove();

      return {
        shouldCleanup: true,
      };
    },
    onHoverStart: (_entity) => {},
    onHoverEnd: (_entity) => {},
    validationFunction: (_entity) => {
      const people = audit_roles();
      return (
        amount_in_storage(ItemType.Berry) >= 100 && people[RoleType.Grunt] > 1
      );
    },
  });
}
