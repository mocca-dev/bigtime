import { registerSW } from "virtual:pwa-register";

let notifyUpdate = () => {};

const updateSW = registerSW({
  onNeedRefresh() {
    notifyUpdate();
  },
});

export default {
  onUpdateFound(callback) {
    notifyUpdate = callback;
  },
  // Activates the waiting worker and reloads once it takes control.
  update() {
    updateSW(true);
  },
};
