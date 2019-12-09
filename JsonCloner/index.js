/**
 * A tool to clone json files with a small change to them.
 * Created for creating all the crafting jsons in Minecraft crafting for use
 * in mods or datapacks, written in JavaScript in Node.js.
 * 
 * By Simon
 */

const fs = require('fs');


const outputDir       = 'output/'    // The Directory the files are going to end up at.
const input           = 'input.json' // The input blueprint file to follow.
const inputSearchKey  = 'INPUT'      // The search-replace keyword for input material.
const outputSearchKey = 'OUTPUT'     // The search-replace keyword for output material.
const groupSearchKey  = 'GROUP'      // The search-replace keyword for the group.
const domainSearchKey = 'DOMAIN'     // The search-replace keyword for the domain.

//////////////////////// Don't edit below this unless you know what you're doing ////////////////////////

fs.readFile(input, (err,data) => {
    if (err) throw err;

    const json = JSON.parse(data);

    Object.keys(json.elements).forEach(name => {


        json.elements[name].forEach(key => {

            if (!json.keys[key]) throw new Error('Could not find key '+key+'!');
            let node = json.keys[key];

            fs.readFile(node.json, (errIn, dataIn) => {
                if (errIn) throw errIn;
                let text = JSON.stringify(JSON.parse(dataIn));
                text = text.replaceAll(inputSearchKey,node.in);
                text = text.replaceAll(outputSearchKey,node.out);

                text = text.replaceAll(groupSearchKey,node.out);

                text = text.replaceAll(inputSearchKey,name);
                text = text.replaceAll(outputSearchKey,name);
                text = text.replaceAll(domainSearchKey,json.domain);
                writeJson(name+'_'+key+'.json',text);
            });
        });
    });
});

String.prototype.replaceAll = function(search, replacement) {let target = this;return target.split(search).join(replacement);}
function writeJson(filename, jsonText) {let f = outputDir+filename;fs.writeFileSync(f,jsonText);console.log('Wrote to: '+f);}