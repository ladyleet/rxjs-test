const data = require('./data');

module.exports = function suggestKeywords(partial) {
  if (!partial) {
    return [];
  }

  return Object.keys(data.keywords)
    .filter(keyword => keyword.indexOf(partial) === 0)
};