const fs = require('fs');



const lang      = 'en_us.json'; // Change this to the desired language file name.
const spacing   = 2;            // The desired spacing in the output file.
const separated = true;         // If the blocks and items should be separated or mixed in the output file.

fs.readFile('input/' + lang, (err,data) => {
    if (err) throw err;
    const json = JSON.parse(data);

    const JSONObject = [{},{}];

    json.elements.forEach(element => {

        for (var i in json.types) {

            var shouldSkip = false;
            if (element.filter)
                for (var j=0;j<element.filter.length;j++) {
                    if (element.filter[j] == Object.keys(json.types[i])[0] || element.filter[j] == "none") {
                        shouldSkip = true;
                        break;
                    }
                }
            

            if (shouldSkip) continue;

            var translation = json.types[i][Object.keys(json.types[i])[0]];
            var keyword = json.domain + "." + Object.keys(element)[0] + "_" + Object.keys(json.types[i])[0];

            translation = translation.replace("%s", element[Object.keys(element)[0]]);


            var y = json.types[i].isBlock == true;

            var t = y ? 'block.' : 'item.';

            console.log("\"" + t + keyword + "\" : \"" + translation + "\"");
            if (separated)
                JSONObject[y ? 1 : 0][t + keyword] = translation;
            else
                JSONObject[0][t + keyword] = translation;
        }
    });
    fs.writeFileSync("output/" + lang, JSON.stringify(merge(JSONObject[0],JSONObject[1]), null, spacing));
    console.log("Wrote to output/" + lang + ".");
});


function merge(a,b)
{
    const r = {};
    Object.keys(a).forEach(key => r[key] = a[key]);
    Object.keys(b).forEach(key => r[key] = b[key]);
    return r;
}
