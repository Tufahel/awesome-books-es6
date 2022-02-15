/* eslint-disable */
import { DateTime } from './luxon/src/luxon.js';

const dateTime = document.querySelector('#time');

export const timeAndDate = setInterval(() => {
  dateTime.innerHTML = DateTime.local()
    .setZone('UTC+6')
    .toLocaleString(DateTime.DATETIME_FULL);
}, 1000);
