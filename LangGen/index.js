/**
 * A tool to generate language translations for blocks and items for my Minecraft mods
 * with similar names from a Json file blueprint. A high degree of customization of the Json
 * is possible to generate a large amount of different translations with language keys in specified order
 * ready for file transfer or manually copy-paste into desired language file, written in JavaScript in Node.js.
 *
 * By Simon
 */

const fs = require('fs');


const lang          = 'sv_se.json'; // Change this to the desired language file name in input/.
const spacing       = 2;            // The desired spacing in the output file (recom. 2 or 4).
const separated     = true;         // If the flagged types should be separated or mixed in the output file.
const logging       = false;        // Whenever it should write out the language key to the console.
const blockKeywords = [             // If a flag matches a word here it will change the language key to be a block.
    'block', 'ore'
]

//////////////////////// Don't edit below this unless you know what you're doing ////////////////////////

fs.readFile('input/' + lang, (err,data) => {
    if (err) throw err;
    const json = JSON.parse(data);

    let JSONObjects = [{}];

    json.elements.forEach(element => {

        for (let i in json.types) {

            let shouldSkip = false;
            if (element.filter)
                for (var j=0;j<element.filter.length;j++) {
                    if (element.filter[j] == Object.keys(json.types[i])[0] || element.filter[j] == 'none') {
                        shouldSkip = true;
                        break;
                    }
                }
            

            if (shouldSkip) continue;

            let ext = json.types[i].extension ? json.types[i].extension.length : 1;

            let t = blockKeywords.includes(json.types[i].flag) ? 'block.' : 'item.';

            let translationSimp = json.types[i][Object.keys(json.types[i])[0]];
            let keywordSimp = json.domain + "." + Object.keys(element)[0] + "_" + Object.keys(json.types[i])[0];

            translationSimp = translationSimp.replace("%s", element[Object.keys(element)[0]]);

            if (logging) {                    
                console.log(line(t + keywordSimp, translationSimp));
            }

            if (ext > 1) {
                if (separated) {
                    let index = 0;
                    if (json.types[i].flag) {
                        index = json.types[i].flag;
                        if (JSONObjects[index] == undefined) {
                            JSONObjects[index] = {};
                        }
                    }                
                    JSONObjects[index][t + keywordSimp] = translationSimp;
                }
                else
                    JSONObjects[0][t + keywordSimp] = translationSimp;
            }

            for (let k=0;k<ext;k++) {
            
                let translation = ext > 1 ? json.types[i].extension[k][Object.keys(json.types[i].extension[k])] : translationSimp;
                let keyword = keywordSimp + (ext > 1 ? "."+ Object.keys(json.types[i].extension[k]) : "");

                translation = translation.replace("%s", element[Object.keys(element)[0]]);

                if (logging) {                    
                    console.log(line(t + keyword, translation));
                }


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
        }
    });

    fs.readFile('output/' + lang, (err, data) => {

        const text = JSON.stringify(separated ? merge(JSONObjects) : JSONObjects[0], null, spacing);

        if (!err)
            if (text == data.toString()) {
                console.log('No changes to output/' + lang);
                return;
            }
        
        fs.writeFileSync('output/' + lang, text);
        console.log('Wrote to output/' + lang);
    });
});
function line(a,b) { return "\"" + a + "\" : \"" + b + "\"" }
function merge(a) { const r = {};Object.keys(a).forEach(j => Object.keys(a[j]).forEach(key => r[key] = a[j][key]));return r; }