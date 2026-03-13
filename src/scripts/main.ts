import "../styles/styles.css";
import { createDrill } from "./drill.ts";
import { createFurnace } from "./furnace.ts";
import { initializeResourceProducerSet } from "./initializeResourceProducerSet.ts";
import { initializeResourceCount } from "./initializeResourceCount.ts";
import {
  ls_drillSpeed,
  ls_furnaceSpeed,
  ls_storePrices,
  ls_totalIron,
  ls_totalSteel,
} from "./localStorageData.ts";
import { updateStats } from "./updateStats.ts";

function openNav() {
  const sideNav = document.getElementById("mySidenav");
  const main = document.getElementById("main");

  if (sideNav && main) {
    sideNav.style.width = "325px";
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

  updateStats("ironPerMinute");
  updateStats("coalPerMinute");
  updateStats("steelPerMinute");

  const ironDrillButton = document.getElementById("buyIronDrill");
  const coalDrillButton = document.getElementById("buyCoalDrill");
  const steelFurnaceButton = document.getElementById("buySteelFurnace");
  const drillSpeedUpButton = document.getElementById("buyDrillSpeedUp");
  const furnaceSpeedUpButton = document.getElementById("buyFurnaceSpeedUp");
  const resetButton = document.getElementById("reset");

  if (
    ironDrillButton &&
    coalDrillButton &&
    steelFurnaceButton &&
    drillSpeedUpButton &&
    furnaceSpeedUpButton &&
    resetButton
  ) {
    const {
      ironDrillPrice,
      coalDrillPrice,
      steelFurnacePrice,
      drillSpeedUpPrice,
      furnaceSpeedUpPrice,
      setPrice,
    } = ls_storePrices();

    if (!ironDrillPrice) {
      setPrice("ironDrillPrice", 10);
      ironDrillButton.innerText = `Iron Drill - 10 Iron`;
    } else {
      ironDrillButton.innerText = `Iron Drill - ${ironDrillPrice} Iron`;
    }

    if (!coalDrillPrice) {
      setPrice("coalDrillPrice", 10);
      coalDrillButton.innerText = `Coal Drill - 10 Iron`;
    } else {
      coalDrillButton.innerText = `Coal Drill - ${coalDrillPrice} Iron`;
    }

    if (!steelFurnacePrice) {
      setPrice("steelFurnacePrice", 50);
      steelFurnaceButton.innerText = `Furnace - 50 Iron`;
    } else {
      steelFurnaceButton.innerText = `Furnace - ${steelFurnacePrice} Iron`;
    }

    if (!drillSpeedUpPrice) {
      setPrice("drillSpeedUpPrice", 10);
      drillSpeedUpButton.innerText = `Drill Speed Up - 10 Steel`;
    } else {
      drillSpeedUpButton.innerText = `Drill Speed Up - ${drillSpeedUpPrice} Steel`;
    }

    if (!furnaceSpeedUpPrice) {
      setPrice("furnaceSpeedUpPrice", 10);
      drillSpeedUpButton.innerText = `Drill Speed Up - 10 Steel`;
    } else {
      drillSpeedUpButton.innerText = `Drill Speed Up - ${furnaceSpeedUpPrice} Steel`;
    }

    const storeOpenButton = document.getElementById("storeOpenButton");
    if (storeOpenButton) {
      storeOpenButton.addEventListener("click", () => openNav());
    }
    const storeCloseButton = document.getElementById("storeCloseButton");
    if (storeCloseButton) {
      storeCloseButton.addEventListener("click", () => closeNav());
    }

    resetButton.addEventListener("click", () => {
      const confirmReset = window.confirm(
        "Are you sure you want to reset all your progress?\nThis action cannot be undone!",
      );
      if (confirmReset) {
        localStorage.clear();
        window.location.reload();
      }
    });

    ironDrillButton.onclick = () => {
      const [ironTotal, setTotalIron] = ls_totalIron();
      const { ironDrillPrice, setPrice } = ls_storePrices();

      if (ironTotal >= ironDrillPrice) {
        const newPrice = Math.ceil(ironDrillPrice / 0.7);
        createDrill("iron");
        setTotalIron(ironTotal - ironDrillPrice);
        setPrice("ironDrillPrice", newPrice);
        ironDrillButton.innerText = `Iron Drill - ${newPrice} Iron`;
        updateStats("ironPerMinute");
      }
    };

    coalDrillButton.onclick = () => {
      const [ironTotal, setTotalIron] = ls_totalIron();
      const { coalDrillPrice, setPrice } = ls_storePrices();

      if (ironTotal >= coalDrillPrice) {
        const newPrice = Math.ceil(coalDrillPrice / 0.7);
        createDrill("coal");
        setTotalIron(ironTotal - coalDrillPrice);
        setPrice("coalDrillPrice", newPrice);
        coalDrillButton.innerText = `Coal Drill - ${newPrice} Iron`;
        updateStats("coalPerMinute");

        const coalMine = document.getElementById("coalMine");
        if (coalMine) {
          coalMine.removeAttribute("hidden");
        }
      }
    };

    steelFurnaceButton.onclick = () => {
      const [ironTotal, setTotalIron] = ls_totalIron();
      const { steelFurnacePrice, setPrice } = ls_storePrices();

      if (ironTotal >= steelFurnacePrice) {
        const newPrice = Math.ceil(steelFurnacePrice / 0.8);
        createFurnace();
        setTotalIron(ironTotal - steelFurnacePrice);
        setPrice("steelFurnacePrice", newPrice);
        steelFurnaceButton.innerText = `Furnace - ${newPrice} Iron`;
        updateStats("steelPerMinute");

        const foundry = document.getElementById("foundry");
        if (foundry) {
          foundry.removeAttribute("hidden");
        }
      }
    };

    drillSpeedUpButton.onclick = () => {
      const [totalSteel, setTotalSteel] = ls_totalSteel();
      const [drillSpeed, setDrillSpeed] = ls_drillSpeed();
      const { drillSpeedUpPrice, setPrice } = ls_storePrices();

      if (totalSteel >= drillSpeedUpPrice) {
        const newPrice = Math.ceil(drillSpeedUpPrice / 0.6);
        setTotalSteel(totalSteel - drillSpeedUpPrice);
        setDrillSpeed(drillSpeed * 0.95);
        setPrice("drillSpeedUpPrice", newPrice);
        drillSpeedUpButton.innerText = `Drill Speed Up - ${newPrice} Steel`;
        updateStats("ironPerMinute");
        updateStats("coalPerMinute");

        const ironDrillSection = document.getElementById("ironDrills");
        if (ironDrillSection) ironDrillSection.innerHTML = "";

        const coalDrillSection = document.getElementById("coalDrills");
        if (coalDrillSection) coalDrillSection.innerHTML = "";

        initializeResourceProducerSet("ironDrills");
        initializeResourceProducerSet("coalDrills");
      }
    };

    furnaceSpeedUpButton.onclick = () => {
      const [totalSteel, setTotalSteel] = ls_totalSteel();
      const [furnaceSpeed, setFurnaceSpeed] = ls_furnaceSpeed();
      const { furnaceSpeedUpPrice, setPrice } = ls_storePrices();

      if (totalSteel >= furnaceSpeedUpPrice) {
        const newPrice = Math.ceil(furnaceSpeedUpPrice / 0.6);
        setTotalSteel(totalSteel - furnaceSpeedUpPrice);
        setFurnaceSpeed(furnaceSpeed * 0.95);
        setPrice("furnaceSpeedUpPrice", newPrice);
        furnaceSpeedUpButton.innerText = `Furnance Speed Up - ${newPrice} Steel`;
        updateStats("steelPerMinute");

        const furnaceSection = document.getElementById("steelFurnaces");
        if (furnaceSection) furnaceSection.innerHTML = "";

        initializeResourceProducerSet("steelFurnaces");
      }
    };
  }
});
