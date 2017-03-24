const data = require('./data');

module.exports = function getPuns(kwds) {
  if (!kwds || kwds.length === 0) {
    return [];
  }

  const found = kwds.reduce((found, keyword) => {
    const ids = data.keywords[keyword];
    if (ids) {
      return ids.reduce((found, id) => {
        found[id] = data.puns[id];
        return found;
      }, found);
    }
    return found;
  }, {});

  return Object.keys(found).map(key => found[key]);
};