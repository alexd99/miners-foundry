import { generateDrillName } from "./utils.ts";
import { ProcessingUnit } from "./interfaces.ts";
import {
  getTotalCoal,
  getTotalIron,
  setTotalCoal,
  setTotalIron,
} from "./resources.ts";
import { localStorageKeys } from "./localStorageKeys.ts";

export type drillType = "iron" | "coal";

// drill speed is 20ms
const drillSpeed = 200;

export const createDrill = (type: drillType, drillName?: string) => {
  let drillSection: HTMLElement | null = null;
  switch (type) {
    case "iron":
      drillSection = document.getElementById("ironDrills");
      break;
    case "coal":
      drillSection = document.getElementById("coalDrills");
      break;
  }

  const drillContainer = document.createElement("div");

  const drillTitle = document.createElement("span");
  const drillNameToUse = drillName ? drillName : generateDrillName();
  drillTitle.classList.add("drillTitle");
  drillTitle.innerText = drillNameToUse;

  const drill = document.createElement("progress");
  drill.classList.add(`${type}Drill`);
  drill.max = 100;
  drill.value = 0;
  //animate the bar at the same speed as the drill speed to make the progress bar animation smooth
  drill.style.transition = `width ${drillSpeed}ms`;

  drillContainer.appendChild(drillTitle);
  drillContainer.appendChild(drill);

  if (drillSection) {
    drillSection.appendChild(drillContainer);
  }

  if (!drillName) {
    switch (type) {
      case "iron": {
        const newDrill: ProcessingUnit = { name: drillNameToUse };
        const savedDrills: ProcessingUnit[] = JSON.parse(
          localStorage.getItem(localStorageKeys.ironDrills) ?? "[]",
        );
        localStorage.setItem(
          localStorageKeys.ironDrills,
          JSON.stringify([...savedDrills, newDrill]),
        );
        break;
      }
      case "coal": {
        const newDrill: ProcessingUnit = { name: drillNameToUse };
        const savedDrills: ProcessingUnit[] = JSON.parse(
          localStorage.getItem(localStorageKeys.coalDrills) ?? "[]",
        );
        localStorage.setItem(
          localStorageKeys.coalDrills,
          JSON.stringify([...savedDrills, newDrill]),
        );
        break;
      }
    }
  }

  let value = 0;
  setInterval(function () {
    drill.value = value;
    value++;

    if (drill.value >= drill.max) {
      switch (type) {
        case "iron":
          const totalIron = getTotalIron();
          setTotalIron(totalIron + 1);
          break;
        case "coal":
          const totalCoal = getTotalCoal();
          setTotalCoal(totalCoal + 1);
      }

      value = 0;
    }
  }, drillSpeed);
};
