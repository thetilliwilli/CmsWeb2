const util = {};

util.DeepCopy = donor=>JSON.parse(JSON.stringify(donor));

export default util;