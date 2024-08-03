import { localStorageKeys } from "./localStorageKeys.ts";

export const setTotalIron = (amount: number) => {
  const total = document.getElementById("totalIron");
  if (total) {
    total.innerHTML = amount.toString();
  }
  localStorage.setItem(localStorageKeys.totalIron, amount.toString());
};

export const getTotalIron = () => {
  const totalIron = localStorage.getItem(localStorageKeys.totalIron);
  return totalIron ? parseInt(totalIron, 10) : 0;
};

export const setTotalCoal = (amount: number) => {
  const total = document.getElementById(localStorageKeys.totalCoal);
  if (total) {
    total.innerHTML = amount.toString();
  }
  localStorage.setItem(localStorageKeys.totalCoal, amount.toString());
};

export const getTotalCoal = () => {
  const totalCoal = localStorage.getItem(localStorageKeys.totalCoal);
  return totalCoal ? parseInt(totalCoal, 10) : 0;
};

export const setTotalSteel = (amount: number) => {
  const total = document.getElementById(localStorageKeys.totalSteel);
  if (total) {
    total.innerHTML = amount.toString();
  }
  localStorage.setItem(localStorageKeys.totalSteel, amount.toString());
};

export const getTotalSteel = () => {
  const totalSteel = localStorage.getItem(localStorageKeys.totalSteel);
  return totalSteel ? parseInt(totalSteel, 10) : 0;
};
