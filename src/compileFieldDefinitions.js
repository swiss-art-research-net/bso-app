const fs = require('fs');
const handlebars = require('handlebars');
const yaml = require('js-yaml');

const configDefinitionsYaml = 'fieldDefinitions.yml';
const configTemplateFile = 'fieldTemplate.handlebars';

let data = {};
let template = "";

try {
    data = yaml.load(fs.readFileSync(configDefinitionsYaml, 'utf-8'));
    template = fs.readFileSync(configTemplateFile, 'utf-8');
} catch (err) {
    console.error(err);
}
const output = handlebars.compile(template, { noEscape: true })(data);

try {
    fs.writeFileSync(data.output, output);
} catch (err) {
    console.error(err);
}