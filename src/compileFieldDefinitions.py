import sys
sys.path.append('/Users/fkraeutli/Sites/sari-field-definitions-generator/src')

from sariFieldDefinitionsGenerator import generator

inputFile = './fieldDefinitions.yml'
outputFile = '../data/templates/https%3A%2F%2Fstatic.swissartresearch.net%2Fpartial%2FfieldDefinitions.html'

model = generator.loadSourceFromFile(inputFile)

output = generator.generate(model, generator.JSON)

with open(outputFile, 'w') as f:
    f.write(output)