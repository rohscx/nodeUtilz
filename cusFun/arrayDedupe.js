// it fast because it generate a hash table. Kinda like the MAC Oui look up thing you made.
module.exports = function arrayDedupe(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
