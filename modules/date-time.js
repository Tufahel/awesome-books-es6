const dateTime = document.querySelector("#time")

import { DateTime } from "../node_modules/luxon/src/luxon.js";

export const timeAndDate = setInterval(() => {
    dateTime.innerHTML = DateTime.local()
      .setZone("UTC+6")
      .toLocaleString(DateTime.DATETIME_FULL);
  }, 1000);
  
