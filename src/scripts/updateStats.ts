import {
  ls_coalDrills,
  ls_drillSpeed,
  ls_furnaceSpeed,
  ls_ironDrills,
} from "./localStorageData.ts";
import { getSteelFurnaceRunning } from "./globalVariables.ts";

export const updateStats = (
  stat: "ironPerMinute" | "coalPerMinute" | "steelPerMinute",
) => {
  let statSection: HTMLElement | null = null;
  let producerCount = 0;
  let producerSpeed = 0;

  const [drillSpeed] = ls_drillSpeed();
  const [furnaceSpeed] = ls_furnaceSpeed();

  switch (stat) {
    case "ironPerMinute": {
      statSection = document.getElementById("ironPerMinuteTotal");
      const { units } = ls_ironDrills();
      producerCount = units.length;
      producerSpeed = drillSpeed;
      break;
    }
    case "coalPerMinute": {
      statSection = document.getElementById("coalPerMinuteTotal");
      const { units } = ls_coalDrills();
      producerCount = units.length;
      producerSpeed = drillSpeed;
      break;
    }
    case "steelPerMinute": {
      statSection = document.getElementById("steelPerMinuteTotal");
      producerCount = getSteelFurnaceRunning();
      producerSpeed = furnaceSpeed;
    }
  }

  // update drill counts
  if (statSection) {
    // drills count from 0 to 100. By taking drillSpeed * 100 we get how many milliseconds it will take to make one item
    const millisecondsToOneItem = producerSpeed * 100;
    // taking the milliseconds to make one item divided by 1000 tells us how long it takes to make one item in seconds
    const secondsToOneItem = millisecondsToOneItem / 1000;
    // dividing the time to make one item in second by 60  gets the number of items per minute for one drill
    const perMinute = 60 / secondsToOneItem;
    // taking the number of drill multiplied by what each drill makes in a minute gives the total number of items per minute
    const totalPerMinute = perMinute * producerCount;
    // rounds the number to two decimal points in the number has any decimals
    const totalPerMinuteToTwoPoints =
      Math.round((totalPerMinute + Number.EPSILON) * 100) / 100;

    statSection.innerText = totalPerMinuteToTwoPoints.toString();
  }
};
