document.addEventListener("DOMContentLoaded", () => {
  const foodGroups = [
    "Fats",
    "Protein",
    "Dairy",
    "Cereal",
    "Vegetables and Fruits",
  ];
  const foodGroupImages = {
    Fats: "./images/fats.png",
    Protein: "./images/protein.png",
    Dairy: "./images/dairy.png",
    Cereal: "./images/cereal.png",
    "Vegetables and Fruits": "/images/vegetables.png",
  };
  const recommendedServings = {
    Fats: { min: 2, max: 4 },
    Protein: { min: 2, max: 6 },
    Dairy: { min: 2, max: 3 },
    Cereal: { min: 4, max: 6 },
    "Vegetables and Fruits": { min: 5, max: 9 },
  };
  const servings = {
    Fats: 0,
    Protein: 0,
    Dairy: 0,
    Cereal: 0,
    "Vegetables and Fruits": 0,
  };

  const mealForm = document.getElementById("meal-form");
  foodGroups.forEach((group) => {
    const groupContainer = document.createElement("div");
    groupContainer.classList.add("food-group-container");
    groupContainer.innerHTML = `
        <img src="${foodGroupImages[group]}" alt="${group}" class="food-group-image">
        <div>
          <button type="button" class="servings-btn decrement" data-group="${group}">-</button>
          <span id="servings-${group}" class="servings-count">0</span>
          <button type="button" class="servings-btn increment" data-group="${group}">+</button>
        </div>
      `;
    mealForm.appendChild(groupContainer);
  });

  const doneButton = document.createElement("button");
  doneButton.textContent = "DONE";
  doneButton.id = "done-button";
  doneButton.classList.add("done-button");
  mealForm.appendChild(doneButton);

  mealForm.addEventListener("click", (event) => {
    if (event.target.classList.contains("servings-btn")) {
      const group = event.target.dataset.group;
      const isIncrement = event.target.classList.contains("increment");
      updateServings(group, isIncrement);
    }
  });

  doneButton.addEventListener("click", (event) => {
    event.preventDefault();
    updateDialogue();
  });

  function updateServings(group, increment) {
    if (increment) {
      servings[group] += 1;
    } else {
      servings[group] = Math.max(servings[group] - 1, 0);
    }
    document.getElementById(`servings-${group}`).textContent = servings[group];
  }

  //from https://www.w3schools.com/js/js_function_closures.asp
  function updateDialogue() {
    let message = "";
    let isBalanced = true;

    Object.entries(servings).forEach(([group, count]) => {
      if (count < recommendedServings[group].min) {
        isBalanced = false;
        message += `Need more ${group}. `;
      } else if (count > recommendedServings[group].max) {
        isBalanced = false;
        message += `Too much ${group}. `;
      } else {
        message += `${group} is just right! `;
      }
    });

    const dialogue = document.getElementById("dialogue");
    dialogue.textContent = isBalanced
      ? "Perfectly balanced, as all things should be!"
      : message;
  }
});
