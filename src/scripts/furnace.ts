import { generateFurnaceName } from "./utils.ts";
import {
  getTotalCoal,
  getTotalIron,
  getTotalSteel,
  setTotalCoal,
  setTotalIron,
  setTotalSteel,
} from "./resources.ts";
import { ProcessingUnit } from "./interfaces.ts";
import { localStorageKeys } from "./localStorageKeys.ts";

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
    const newFurnace: ProcessingUnit = { name: furnaceNameToUse };
    const savedFurnaces: ProcessingUnit[] = JSON.parse(
      localStorage.getItem(localStorageKeys.steelFurnaces) ?? "[]",
    );
    localStorage.setItem(
      localStorageKeys.steelFurnaces,
      JSON.stringify([...savedFurnaces, newFurnace]),
    );
  }

  let isFurnaceBusy = false;
  setInterval(() => {
    const totalIron = getTotalIron();
    const totalCoal = getTotalCoal();

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
          const totalSteel = getTotalSteel();
          setTotalSteel(totalSteel + 1);
          isFurnaceBusy = false;
          value = 0;
          clearInterval(smelt);
        }
      }, furnaceSpeed);
    }
  }, 10);
};
