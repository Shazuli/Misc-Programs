const fs = require('fs');



const lang = 'de_de.json'; // Change this to the desired language file name.

const keywords = [ // Add more keywords if this is not up to date.
    "ingot",
    "nugget",
    "dust",
    "dustsmall",
    "plate"
];

fs.readFile("input/" + lang, (err,data) => {
    if (err) throw err;
    let json = JSON.parse(data);

    let JSONObjects = [];

    json.elements.forEach(element => {

        for (var i in keywords) {

            var shouldSkip = false;
            if (element.filter) {
                for (var j=0; j<element.filter.length;j++) {
                    if (element.filter[j] == keywords[i] || element.filter[j] == "none") {
                        shouldSkip = true;
                        break;
                    }
                }    
            }

            if (shouldSkip) continue;

            var translation = json.types[i][keywords[i]];
            var keyword = json.domain + "." + Object.keys(element)[0] + "_" + keywords[i];

            translation = translation.replace("%s", element[Object.keys(element)[0]]);

            //var obj = "\"" + keyword + "\" : \"" + translation + "\"";
            var obj = { ["item." + keyword]: translation };
            console.log(JSON.stringify(obj));
            JSONObjects.push(obj);
        }
    });

    var jsonVar = {};
    for (var i=0;i<JSONObjects.length;i++) {
        jsonVar[Object.keys(JSONObjects[i])] = JSONObjects[i][Object.keys(JSONObjects[i])];
    }
    fs.writeFileSync("output/" + lang, JSON.stringify(jsonVar, null, 2));
    console.log("Wrote to output/" + lang + ".");
});
