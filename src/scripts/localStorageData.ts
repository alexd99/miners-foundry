import { ProcessingUnit } from "./interfaces";

export const localStorageKeys = {
  totalIron: "totalIron",
  totalCoal: "totalCoal",
  totalSteel: "totalSteel",
  ironDrills: "ironDrills",
  coalDrills: "coalDrills",
  steelFurnaces: "steelFurnaces",
};

interface LS_ProcessingUnit {
  units: ProcessingUnit[];
  totalUnits: number;
  addUnit: (unit: ProcessingUnit) => void;
}

interface LS_TotalAmounts {
  amount: number;
  setAmount: (newAmount: number) => void;
}

export const ls_ironDrills = (): LS_ProcessingUnit => {
  const data = localStorage.getItem(localStorageKeys.ironDrills);
  const parsedData = data ? JSON.parse(data) : [];

  const addUnit = (unit: ProcessingUnit) => {
    const { units: savedDrills } = ls_ironDrills();
    localStorage.setItem(
      localStorageKeys.ironDrills,
      JSON.stringify([...savedDrills, unit]),
    );
  };

  return {
    units: parsedData,
    totalUnits: parsedData.length,
    addUnit,
  };
};

export const ls_coalDrills = (): LS_ProcessingUnit => {
  const data = localStorage.getItem(localStorageKeys.coalDrills);
  const parsedData = data ? JSON.parse(data) : [];

  const addUnit = (unit: ProcessingUnit) => {
    const { units: savedDrills } = ls_coalDrills();
    localStorage.setItem(
      localStorageKeys.coalDrills,
      JSON.stringify([...savedDrills, unit]),
    );
  };

  return {
    units: parsedData,
    totalUnits: parsedData.length,
    addUnit,
  };
};

export const ls_steelFurnaces = (): LS_ProcessingUnit => {
  const data = localStorage.getItem(localStorageKeys.steelFurnaces);
  const parsedData = data ? JSON.parse(data) : [];

  const addUnit = (unit: ProcessingUnit) => {
    const { units: savedDrills } = ls_steelFurnaces();
    localStorage.setItem(
      localStorageKeys.steelFurnaces,
      JSON.stringify([...savedDrills, unit]),
    );
  };

  return {
    units: parsedData,
    totalUnits: parsedData.length,
    addUnit,
  };
};

export const ls_totalIron = (): LS_TotalAmounts => {
  const data = localStorage.getItem(localStorageKeys.totalIron);
  const amount = data ? parseInt(data, 10) : 0;

  const setAmount = (newAmount: number) => {
    const stringNumber = newAmount.toString();
    localStorage.setItem(localStorageKeys.totalIron, stringNumber);

    const totalElement = document.getElementById("totalIron");
    if (totalElement) {
      totalElement.innerHTML = stringNumber;
    }
  };

  return {
    amount,
    setAmount,
  };
};

export const ls_totalCoal = (): LS_TotalAmounts => {
  const data = localStorage.getItem(localStorageKeys.totalCoal);
  const amount = data ? parseInt(data, 10) : 0;

  const setAmount = (newAmount: number) => {
    const stringNumber = newAmount.toString();
    localStorage.setItem(localStorageKeys.totalCoal, stringNumber);

    const totalElement = document.getElementById("totalCoal");
    if (totalElement) {
      totalElement.innerHTML = stringNumber;
    }
  };

  return {
    amount,
    setAmount,
  };
};

export const ls_totalSteel = (): LS_TotalAmounts => {
  const data = localStorage.getItem(localStorageKeys.totalSteel);
  const amount = data ? parseInt(data, 10) : 0;

  const setAmount = (newAmount: number) => {
    const stringNumber = newAmount.toString();
    localStorage.setItem(localStorageKeys.totalSteel, stringNumber);

    const totalElement = document.getElementById("totalSteel");
    if (totalElement) {
      totalElement.innerHTML = stringNumber;
    }
  };

  return {
    amount,
    setAmount,
  };
};
