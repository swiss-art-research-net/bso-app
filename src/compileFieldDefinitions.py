import sys
sys.path.append('/Users/fkraeutli/Sites/sari-field-definitions-generator/src')

from sariFieldDefinitionsGenerator import generator

inputFile = './fieldDefinitions.yml'
outputFile = '../data/templates/https%3A%2F%2Fstatic.swissartresearch.net%2Fpartial%2FfieldDefinitions.html'

def addLocalisation(jsonString, bundle="bso"):
    import re

    def replaceWithLocalised(match):
        key = "field_" + re.sub(r'[\W\s]', '_', match.group(1)).lower()
        return '"label": "[[i18n "' + key + '" bundle="' + bundle + '"]]"'

    pattern = r'"label": "(.*)"'
    return re.sub(pattern, replaceWithLocalised, jsonString)


model = generator.loadSourceFromFile(inputFile)

output = generator.generate(model, generator.JSON)

output = addLocalisation(output)

with open(outputFile, 'w') as f:
    f.write(output)