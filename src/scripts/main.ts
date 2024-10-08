import "../styles/styles.css";
import { createDrill } from "./drill.ts";
import { createFurnace } from "./furnace.ts";
import { initializeResourceProducerSet } from "./initializeResourceProducerSet.ts";
import { initializeResourceCount } from "./initializeResourceCount.ts";
import { ls_totalIron } from "./localStorageData.ts";

function openNav() {
  const sideNav = document.getElementById("mySidenav");
  const main = document.getElementById("main");

  if (sideNav && main) {
    sideNav.style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
}

function closeNav() {
  const sideNav = document.getElementById("mySidenav");
  const main = document.getElementById("main");

  if (sideNav && main) {
    sideNav.style.width = "0";
    document.body.style.backgroundColor = "#000";
  }
}

window.addEventListener("load", function () {
  initializeResourceProducerSet("ironDrills");
  initializeResourceProducerSet("coalDrills");
  initializeResourceProducerSet("steelFurnaces");

  initializeResourceCount("iron");
  initializeResourceCount("coal");
  initializeResourceCount("steel");

  const storeOpenButton = document.getElementById("storeOpenButton");
  if (storeOpenButton) {
    storeOpenButton.addEventListener("click", () => openNav());
  }
  const storeCloseButton = document.getElementById("storeCloseButton");
  if (storeCloseButton) {
    storeCloseButton.addEventListener("click", () => closeNav());
  }

  const resetButton = document.getElementById("reset");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      const confirmReset = window.confirm(
        "Are you sure you want to reset all your progress?\nThis action cannot be undone!",
      );
      if (confirmReset) {
        localStorage.clear();
        window.location.reload();
      }
    });
  }

  const ironDrillButton = document.getElementById("buyIronDrill");
  if (ironDrillButton) {
    ironDrillButton.onclick = () => {
      const { amount: ironTotal, setAmount: setTotalIron } = ls_totalIron();
      if (ironTotal >= 10) {
        createDrill("iron");
        setTotalIron(ironTotal - 10);
      }
    };
  }

  const coalDrillButton = document.getElementById("buyCoalDrill");
  if (coalDrillButton) {
    coalDrillButton.onclick = () => {
      const { amount: ironTotal, setAmount: setTotalIron } = ls_totalIron();
      if (ironTotal >= 10) {
        createDrill("coal");
        setTotalIron(ironTotal - 10);
        const coalMine = document.getElementById("coalMine");
        if (coalMine) {
          coalMine.removeAttribute("hidden");
        }
      }
    };
  }

  const steelFurnaceButton = document.getElementById("buySteelFurnace");
  if (steelFurnaceButton) {
    steelFurnaceButton.onclick = () => {
      const { amount: ironTotal, setAmount: setTotalIron } = ls_totalIron();
      if (ironTotal >= 50) {
        createFurnace();
        setTotalIron(ironTotal - 50);
        const foundry = document.getElementById("foundry");
        if (foundry) {
          foundry.removeAttribute("hidden");
        }
      }
    };
  }
});
