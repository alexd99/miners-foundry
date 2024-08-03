import { localStorageKeys } from "./localStorageKeys.ts";
import { setTotalCoal, setTotalIron, setTotalSteel } from "./resources.ts";
import { resources } from "./interfaces.ts";

export const initializeResourceCount = (type: resources) => {
  switch (type) {
    case "iron": {
      const totalIron = localStorage.getItem(localStorageKeys.totalIron);
      if (totalIron) {
        setTotalIron(parseInt(totalIron, 10));
      } else {
        setTotalIron(0);
      }
      break;
    }
    case "coal": {
      const toalCoal = localStorage.getItem(localStorageKeys.totalCoal);
      if (toalCoal) {
        setTotalCoal(parseInt(toalCoal, 10));
      } else {
        setTotalCoal(0);
      }
      break;
    }
    case "steel": {
      const totalSteel = localStorage.getItem(localStorageKeys.totalSteel);
      if (totalSteel) {
        setTotalSteel(parseInt(totalSteel, 10));
      } else {
        setTotalSteel(0);
      }
      break;
    }
  }
};
