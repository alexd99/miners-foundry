import { generateFurnaceName } from "./utils.ts";
import { ProcessingUnit } from "./interfaces.ts";
import {
  ls_furnaceSpeed,
  ls_steelFurnaces,
  ls_totalCoal,
  ls_totalIron,
  ls_totalSteel,
} from "./localStorageData.ts";
import { updateTitleAmounts } from "./updateTitleAmounts.ts";
import {
  incrementSteelFurnacesRunning,
  decrementSteelFurnacesRunning,
} from "./globalVariables.ts";
import { updateStats } from "./updateStats.ts";

export const createFurnace = (furnaceName?: string) => {
  let [furnaceSpeed, setFurnaceSpeed] = ls_furnaceSpeed();
  if (!furnaceSpeed) {
    setFurnaceSpeed(800);
    furnaceSpeed = 800;
  }

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
    const [totalIron, setTotalIron] = ls_totalIron();
    const [totalCoal, setTotalCoal] = ls_totalCoal();

    // the ratio of steel is 2 iron:1 coal
    if (totalIron >= 2 && totalCoal >= 1 && !isFurnaceBusy) {
      setTotalIron(totalIron - 2);
      setTotalCoal(totalCoal - 1);

      incrementSteelFurnacesRunning();
      updateStats("steelPerMinute");
      isFurnaceBusy = true;
      let value = 0;
      const smelt = setInterval(() => {
        furnace.value = value;
        value++;

        if (furnace.value >= furnace.max) {
          const [totalSteel, setTotalSteel] = ls_totalSteel();
          setTotalSteel(totalSteel + 1);
          decrementSteelFurnacesRunning();
          updateStats("steelPerMinute");
          isFurnaceBusy = false;
          value = 0;
          furnace.value = value;
          clearInterval(smelt);
        }
      }, furnaceSpeed);
    }
  }, 10);
};
