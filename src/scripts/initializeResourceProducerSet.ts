import { localStorageKeys } from "./localStorageKeys.ts";
import { ProcessingUnit } from "./interfaces.ts";
import { createFurnace } from "./furnace.ts";
import { createDrill } from "./drill.ts";

export type resourceProducers = "ironDrills" | "coalDrills" | "steelFurnaces";

export const initializeResourceProducerSet = (type: resourceProducers) => {
  let rawProducers = null;
  switch (type) {
    case "ironDrills": {
      rawProducers = localStorage.getItem(localStorageKeys.ironDrills);
      break;
    }
    case "coalDrills": {
      rawProducers = localStorage.getItem(localStorageKeys.coalDrills);
      break;
    }
    case "steelFurnaces": {
      rawProducers = localStorage.getItem(localStorageKeys.steelFurnaces);
      break;
    }
  }

  if (rawProducers) {
    const producers: ProcessingUnit[] = JSON.parse(rawProducers);

    if (producers.length > 0) {
      producers.forEach((unit) => {
        switch (type) {
          case "ironDrills":
            createDrill("iron", unit.name);
            break;
          case "coalDrills":
            createDrill("coal", unit.name);
            break;
          case "steelFurnaces":
            createFurnace(unit.name);
            break;
        }
      });

      switch (type) {
        case "coalDrills": {
          const coalMine = document.getElementById("coalMine");
          if (coalMine) {
            coalMine.removeAttribute("hidden");
          }
          break;
        }
        case "steelFurnaces": {
          const foundry = document.getElementById("foundry");
          if (foundry) {
            foundry.removeAttribute("hidden");
          }
        }
      }
    }
  }
  // if there are no iron drills, create one for the start of the game
  else if (type == "ironDrills") {
    createDrill("iron");
  }
};
