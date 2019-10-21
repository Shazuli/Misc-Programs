/**
 * A tool to generate language translations for blocks and items for my Minecraft mods
 * with similar names from a Json file blueprint. A high degree of customization of the Json
 * is possible to generate a large amount of different translations with language keys in specified order
 * ready for file transfer or manually copy-paste into desired language file, written in JavaScript in Node.js.
 *
 * By Simon
 */

const fs = require('fs');


const lang      = 'de_de.json'; // Change this to the desired language file name in input/.
const spacing   = 2;            // The desired spacing in the output file.
const separated = true;         // If the flagged types should be separated or mixed in the output file.

//////////////////////// Don't edit below this ////////////////////////

fs.readFile('input/' + lang, (err,data) => {
    if (err) throw err;
    const json = JSON.parse(data);

    let JSONObjects = [{}];

    json.elements.forEach(element => {

        for (let i in json.types) {

            let shouldSkip = false;
            if (element.filter)
                for (var j=0;j<element.filter.length;j++) {
                    if (element.filter[j] == Object.keys(json.types[i])[0] || element.filter[j] == "none") {
                        shouldSkip = true;
                        break;
                    }
                }
            

            if (shouldSkip) continue;

            let translation = json.types[i][Object.keys(json.types[i])[0]];
            let keyword = json.domain + "." + Object.keys(element)[0] + "_" + Object.keys(json.types[i])[0];

            translation = translation.replace("%s", element[Object.keys(element)[0]]);

            let t = json.types[i].flag == "block" ? 'block.' : 'item.';

            console.log("\"" + t + keyword + "\" : \"" + translation + "\"");
            if (separated) {
                let index = 0;
                if (json.types[i].flag) {
                    index = json.types[i].flag;
                    if (JSONObjects[index] == undefined) {
                        JSONObjects[index] = {};
                    }
                }                
                JSONObjects[index][t + keyword] = translation;
            }
            else
                JSONObjects[0][t + keyword] = translation;
        }
    });

    const newJson = merge(JSONObjects);

    fs.readFile('output/' + lang, (err, data) => {

        const text = JSON.stringify(newJson, null, spacing);

        if (!err)
            if (text == data.toString()) {
                console.error("No changes to output/" + lang);
                return;
            }
        
        fs.writeFileSync("output/" + lang, text);
        console.log("Wrote to output/" + lang);
    });
});

function merge(a)
{
    const r = {};Object.keys(a).forEach(j => Object.keys(a[j]).forEach(key => r[key] = a[j][key]));return r;
}