import { generateFurnaceName } from "./utils.ts";
import { ProcessingUnit } from "./interfaces.ts";
import {
  ls_steelFurnaces,
  ls_totalCoal,
  ls_totalIron,
  ls_totalSteel,
} from "./localStorageData.ts";
import { updateTitleAmounts } from "./updateTitleAmounts.ts";

// furnace speed is 50ms
const furnaceSpeed = 800;

export const createFurnace = (furnaceName?: string) => {
  const furnaceSection = document.getElementById("steelFurnaces");
  const furnaceContainer = document.createElement("div");

  const furnaceTitle = document.createElement("span");
  const furnaceNameToUse = furnaceName ? furnaceName : generateFurnaceName();
  furnaceTitle.classList.add("furnaceTitle");
  furnaceTitle.innerText = furnaceNameToUse;

  const furnace = document.createElement("progress");
  furnace.classList.add(`steelFurnace`);
  furnace.max = 100;
  furnace.value = 0;
  furnace.style.transition = `width ${furnaceSpeed}ms`;

  furnaceContainer.appendChild(furnaceTitle);
  furnaceContainer.appendChild(furnace);

  if (furnaceSection) {
    furnaceSection.appendChild(furnaceContainer);
  }

  if (!furnaceName) {
    const { addUnit } = ls_steelFurnaces();
    const newFurnace: ProcessingUnit = { name: furnaceNameToUse };
    addUnit(newFurnace);
  }

  updateTitleAmounts("steelFurnaces");

  let isFurnaceBusy = false;
  setInterval(() => {
    const { amount: totalIron, setAmount: setTotalIron } = ls_totalIron();
    const { amount: totalCoal, setAmount: setTotalCoal } = ls_totalCoal();

    // the ratio of steel is 2 iron:1 coal
    if (totalIron >= 2 && totalCoal >= 1 && !isFurnaceBusy) {
      setTotalIron(totalIron - 2);
      setTotalCoal(totalCoal - 1);

      isFurnaceBusy = true;
      let value = 0;
      const smelt = setInterval(() => {
        furnace.value = value;
        value++;

        if (furnace.value >= furnace.max) {
          const { amount: totalSteel, setAmount: setTotalSteel } =
            ls_totalSteel();
          setTotalSteel(totalSteel + 1);
          isFurnaceBusy = false;
          value = 0;
          clearInterval(smelt);
        }
      }, furnaceSpeed);
    }
  }, 10);
};
