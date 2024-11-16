function make_item(x, y, type) {
  e = new Entity(x, y, [CT.CircleRenderer, CT.IsItem, CT.IsTarget]);
  e.IsItem.type = type;
  entities[e.id] = e;
}

function get_base_ship_components() {
  return [CT.HasVelocity, CT.SquareRenderer, CT.HasRole];
}

function make_ship(x, y) {
  e = new Entity(x, y, [
    ...get_base_ship_components(),
    CT.HasTarget,
    CT.HoldsItem,
  ]);
  entities[e.id] = e;
}

function make_farmer(x, y) {
  e = new Entity(x, y, [...get_base_ship_components()]);
  entities[e.id] = e;
}

function make_preview_entity(x, y, w, h) {
  e = new Entity(x, y, [CT.IsTemporary, CT.RectRenderer]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;
  entities[e.id] = e;
}

function make_spawner(x, y, w, h, itemType, amount, radius) {
  e = new Entity(x, y, [
    CT.RectRenderer,
    CT.HasHoverInteraction,
    CT.HasLabel,
    CT.IsSpawner,
  ]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;

  e.IsSpawner.type = itemType;
  e.IsSpawner.amount = amount;
  e.IsSpawner.radius = radius;
  e.IsSpawner.timer = 250;
  e.IsSpawner.timer_reset = 250;

  e.HasHoverInteraction.whileInside = (entity) => {
    const next_spawn_pct =
      100 * (entity.IsSpawner.timer / entity.IsSpawner.timer_reset);

    let next_spawn = "";
    for (let n = 0; n < 100; n += 10) {
      if (next_spawn_pct < n) {
        next_spawn += "░"; // alt-176
      } else {
        next_spawn += "▓"; // alt-178
      }
    }

    const amount_remaining =
      "" +
      entity.IsSpawner.type +
      ": " +
      entity.IsSpawner.amount +
      " remaining";
    entity.HasLabel.text = amount_remaining + "\n\n\n" + next_spawn;
  };

  e.HasHoverInteraction.onStart = (entity) => {
    e.HasHoverInteraction.whileInside(entity);
    entity.HasLabel.active = true;
  };
  e.HasHoverInteraction.onEnd = (entity) => {
    entity.HasLabel.active = false;
  };
  entities[e.id] = e;
}

function make_drop(x, y, w, h, itemType) {
  e = new Entity(x, y, [
    CT.RectRenderer,
    CT.HoldsItem,
    CT.IsDropoff,
    CT.IsTarget,
    CT.HasHoverInteraction,
    CT.HasLabel,
  ]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;
  e.HoldsItem.type = itemType;
  e.HasHoverInteraction.whileInside = (entity) => {
    entity.HasLabel.text =
      "" + entity.HoldsItem.type + ": " + entity.HoldsItem.amount;
  };
  e.HasHoverInteraction.onStart = (entity) => {
    entity.HasLabel.active = true;
  };
  e.HasHoverInteraction.onEnd = (entity) => {
    entity.HasLabel.active = false;
  };
  entities[e.id] = e;
}

function make_button({
  x,
  y,
  w,
  h,
  label,
  onClick,
  onHoverStart,
  onHoverEnd,
  validationFunction,
} = {}) {
  e = new Entity(x, y, [
    CT.RectRenderer,
    CT.HasClickInteraction,
    CT.HasHoverInteraction,
    CT.HasLabel,
    CT.HasAbsolutePosition,
  ]);
  e.RectRenderer.w = w;
  e.RectRenderer.h = h;
  e.HasLabel.text = label;
  e.HasLabel.active = true;
  e.HasLabel.location = RectLocation.Center;
  e.HasClickInteraction.validator = validationFunction;
  e.HasClickInteraction.callback = (entity) => {
    if (entity.HasClickInteraction.validator) {
      const result = entity.HasClickInteraction.validator(entity);
      if (!result) {
        return;
      }
    }
    onClick();
  };
  e.HasHoverInteraction.onStart = (entity) => {
    entity.RectRenderer.color = color(255, 0, 255, 255);
    onHoverStart(entity);
  };
  e.HasHoverInteraction.onEnd = (entity) => {
    entity.RectRenderer.color = color(255);
    onHoverEnd(entity);
  };
  entities[e.id] = e;
  return e;
}

function make_dynamic_button(buttonOptions) {
  let e = make_button({
    ...buttonOptions,
    label: "",
  });
  e.HasLabel.is_dynamic = true;
  e.HasLabel.get_text = buttonOptions.label;
}

function make_label(x, y, callback) {
  e = new Entity(x, y, [CT.HasLabel, CT.HasAbsolutePosition]);
  e.HasLabel.is_dynamic = true;
  e.HasLabel.active = true;
  e.HasLabel.location = RectLocation.Center;
  e.HasLabel.get_text = callback;
  e.HasLabel.text = "PLACEHOLDER TEXT";

  entities[e.id] = e;
}

function make_label_list(x, y, callback) {
  e = new Entity(x, y, [CT.HasLabel, CT.HasAbsolutePosition]);
  e.HasLabel.is_dynamic = true;
  e.HasLabel.active = true;
  e.HasLabel.location = RectLocation.Center;
  e.HasLabel.get_text = callback;
  e.HasLabel.text = "PLACEHOLDER TEXT";

  entities[e.id] = e;
}

function makeLabelJS(x, y, label_content) {
  // Create a label (div element)
  const label = document.createElement("div");

  // Set the position and styles
  label.style.position = "absolute";
  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
  label.style.fontSize = "8px";
  label.style.color = "#FFF";
  label.style.textAlign = "center";

  // Set the text from the callback function
  if (typeof label_content === "function") {
    setInterval(() => {
      label.innerText = label_content();
    }, 1000); // update label every second
  } else {
    // If label is not a function, set it once
    label.innerText = label_content;
  }

  // Append the label to the body or any container you like
  document.body.appendChild(label);

  return label;
}

function addAllocationButtons(x, y, index, onPlus, onMinus) {
  // Create "+" and "-" buttons
  const plusButton = document.createElement("button");
  plusButton.innerText = "+";
  plusButton.style.position = "absolute";
  plusButton.style.left = `${x + 100}px`; // Position right next to the label
  plusButton.style.top = `${y}px`;
  plusButton.style.fontSize = "8px";

  const minusButton = document.createElement("button");
  minusButton.innerText = "-";
  minusButton.style.position = "absolute";
  minusButton.style.left = `${x + 120}px`; // Position to the right of the "+" button
  minusButton.style.top = `${y}px`;
  minusButton.style.fontSize = "8px";

  // Append buttons to the body
  document.body.appendChild(plusButton);
  document.body.appendChild(minusButton);

  // Update the role counts when buttons are clicked
  plusButton.addEventListener("click", () => {
    onPlus(index);
  });

  minusButton.addEventListener("click", () => {
    onMinus(index);
  });
}

function makeLabelListJS(x, y, callback, perItemOptions = null) {
  const labels = [];

  // Helper function to clear all existing labels
  function clearExistingLabels() {
    labels.forEach((label) => label.remove()); // Remove all labels from the DOM
    labels.length = 0; // Clear the labels array
  }

  // Helper function to create and display new labels
  function createLabels() {
    const texts = callback(); // Get updated texts from the callback
    let currentY = y;

    texts.forEach((text, index) => {
      const label = makeLabelJS(x, currentY, text); // Create each label with dynamic text
      labels.push(label); // Store the label for later
      document.body.appendChild(label); // Append the label to the DOM

      // Add allocation buttons if provided in perItemOptions
      if (perItemOptions && perItemOptions.hasAllocationButtons(index)) {
        addAllocationButtons(
          x,
          currentY,
          index,
          perItemOptions.onPlusClicked,
          perItemOptions.onMinusClicked
        );
      }
      currentY += 30; // Adjust the vertical position for the next label
    });
  }

  // Clear the old labels and create new ones
  function updateLabels() {
    clearExistingLabels(); // Remove all old labels
    createLabels(); // Create new labels based on the callback
  }

  // Initial label creation
  updateLabels();

  // Periodically clear old labels and create new ones based on the callback
  setInterval(updateLabels, 1000);
}
function makeButtonJS({
  x,
  y,
  width,
  height,
  label,
  onClick,
  onHoverStart,
  onHoverEnd,
  validationFunction,
} = {}) {
  // Create the button element
  const button = document.createElement("button");

  // Set button styles
  button.style.position = "absolute";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
  button.style.width = `${width}px`;
  button.style.height = `${height}px`;
  button.style.border = "1px solid #ccc";
  button.style.fontSize = "6px";
  // TODO disable pointer when validation false
  button.style.cursor = "pointer";

  // Update the label text every second if label is a function
  if (typeof label === "function") {
    setInterval(() => {
      button.innerText = label();
    }, 1000); // update label every second
  } else {
    // If label is not a function, set it once
    button.innerText = label;
  }

  // Handle click event with validation
  button.addEventListener("click", function (event) {
    if (map_info.mouseMode != MouseMode.Normal) return;

    event.stopPropagation();
    if (validationFunction) {
      const isValid = validationFunction(event);
      if (!isValid) {
        return;
      }
    }
    const options = onClick(event);
    if (options && options.shouldCleanup) {
      button.remove();
    }
  });

  // Handle hover start and end events
  button.addEventListener("mouseover", function () {
    if (map_info.mouseMode != MouseMode.Normal) return;
    button.style.backgroundColor = "#ff00ff"; // change color on hover
    if (onHoverStart) onHoverStart(button);
  });

  button.addEventListener("mouseout", function () {
    if (map_info.mouseMode != MouseMode.Normal) return;
    button.style.backgroundColor = "#f0f0f0"; // revert color on hover end
    if (onHoverEnd) onHoverEnd(button);
  });

  // Append the button to the body or a parent container
  UI_OVERLAY.appendChild(button);

  return button;
}
