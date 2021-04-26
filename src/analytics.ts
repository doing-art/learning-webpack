import * as $ from "jquery";

function createAnalytics() {
  let counter: number = 0;
  let isDestroyed: boolean = false;

  const listener = () => counter++;

  $(document).on("click", listener);

  return {
    getClicks() {
      return isDestroyed ? `Analytics is destroyed. Total clicks ${counter}` : counter;
    },
    destroy() {
      isDestroyed = true
      $(document).off("click", listener);
    }
  }
}

window['analytics'] = createAnalytics();
