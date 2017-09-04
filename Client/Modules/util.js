const util = {};

util.deepCopy = donor=>JSON.parse(JSON.stringify(donor));

export default util;