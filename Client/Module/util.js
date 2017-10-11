"use strict";
const util = {};

util.DeepCopy = donor=>JSON.parse(JSON.stringify(donor));

util.CurrentDomain = () => window.location.pathname.split("/")[1].trim().toLowerCase();

export default util;