import { resourcesProducers } from "./interfaces";
import { ls_coalDrills, ls_ironDrills } from "./localStorageData";

export const updateTitleAmounts = (type: resourcesProducers) => {
  switch (type) {
    case "ironDrills": {
      const ironDrillTitleAmount = document.getElementById(
        "ironDrillTitleAmount",
      );
      const { totalUnits } = ls_ironDrills();
      if (ironDrillTitleAmount) {
        ironDrillTitleAmount.innerText = `( ${totalUnits} )`;
      }
      break;
    }
    case "coalDrills": {
      const coalDrillTitleAmount = document.getElementById(
        "coalDrillTitleAmount",
      );
      const { totalUnits } = ls_coalDrills();
      if (coalDrillTitleAmount) {
        coalDrillTitleAmount.innerText = `( ${totalUnits} )`;
      }
      break;
    }
    case "steelFurnaces": {
      const steelFurnacesTitleAmount = document.getElementById(
        "steelFurnacesTitleAmount",
      );
      const { totalUnits } = ls_coalDrills();
      if (steelFurnacesTitleAmount) {
        steelFurnacesTitleAmount.innerText = `( ${totalUnits} )`;
      }
      break;
    }
  }
};
