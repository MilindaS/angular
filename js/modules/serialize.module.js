angular.module('n.URI', []).
value('SerializeObj', function(obj) {
    var str = [];
    for (var key in obj) {
        if (obj[key] instanceof Array) {
            for (var idx in obj[key]) {
                var subObj = obj[key][idx];
                for (var subKey in subObj) {
                    if (typeof subObj[subKey] == 'object') {
                        var subsubObj = subObj[subKey];
                        for (var subsubKey in subsubObj) {
                            str.push(encodeURIComponent(key) + "[" + idx + "][" + encodeURIComponent(subKey) + "][" + encodeURIComponent(subsubKey) + "]=" + encodeURIComponent(subsubObj[subsubKey]));
                        }
                    } else {
                        str.push(encodeURIComponent(key) + "[" + idx + "][" + encodeURIComponent(subKey) + "]=" + encodeURIComponent(subObj[subKey]));
                    }
                }
            }
        } else {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        }
    }
    return str.join("&");
});