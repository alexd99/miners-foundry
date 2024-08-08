import { ProcessingUnit } from "./interfaces.ts";
import { createFurnace } from "./furnace.ts";
import { createDrill } from "./drill.ts";
import {
  ls_coalDrills,
  ls_ironDrills,
  ls_steelFurnaces,
} from "./localStorageData.ts";

export type resourceProducers = "ironDrills" | "coalDrills" | "steelFurnaces";

export const initializeResourceProducerSet = (type: resourceProducers) => {
  let producers: ProcessingUnit[] = [];
  switch (type) {
    case "ironDrills": {
      const { units } = ls_ironDrills();
      producers = units;
      break;
    }
    case "coalDrills": {
      const { units } = ls_coalDrills();
      producers = units;
      break;
    }
    case "steelFurnaces": {
      const { units } = ls_steelFurnaces();
      producers = units;
      break;
    }
  }

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

    // both the coal drills and steel furnaces are hidden until one unit is created
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
  } else if (type == "ironDrills") {
    // if there are no iron drills, create one for the start of the game
    createDrill("iron");
  }
};
