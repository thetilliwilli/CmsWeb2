"use strict";

const util = {
    DeepCopy: donor => JSON.parse(JSON.stringify(donor)),
    CurrentDomain: () => window.location.pathname.split("/")[1].trim().toLowerCase(),
    get isLandscape(){ return screen.orientation.type.indexOf("landscape") !== -1; },
    IsLandscape: (trueValue, falseValue) => screen.orientation.type.indexOf("landscape") !== -1 ? trueValue : falseValue,
};

export default util;