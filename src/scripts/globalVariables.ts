let STEEL_FURNANCES_RUNNING = 0;

export const incrementSteelFurnacesRunning = () =>
  (STEEL_FURNANCES_RUNNING = STEEL_FURNANCES_RUNNING + 1);
export const decrementSteelFurnacesRunning = () =>
  (STEEL_FURNANCES_RUNNING = STEEL_FURNANCES_RUNNING - 1);
export const getSteelFurnaceRunning = () => STEEL_FURNANCES_RUNNING;
