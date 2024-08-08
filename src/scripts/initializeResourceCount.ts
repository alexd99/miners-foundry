import { resources } from "./interfaces.ts";
import {
  ls_totalCoal,
  ls_totalIron,
  ls_totalSteel,
} from "./localStorageData.ts";

export const initializeResourceCount = (type: resources) => {
  switch (type) {
    case "iron": {
      const { amount, setAmount } = ls_totalIron();
      setAmount(amount);
      break;
    }
    case "coal": {
      const { amount, setAmount } = ls_totalCoal();
      setAmount(amount);
      break;
    }
    case "steel": {
      const { amount, setAmount } = ls_totalSteel();
      setAmount(amount);
      break;
    }
  }
};
