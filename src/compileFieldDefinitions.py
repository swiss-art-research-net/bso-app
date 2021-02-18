#import sys
#sys.path.append('/Users/fkraeutli/Sites/sari-field-definitions-generator/src')

from sariFieldDefinitionsGenerator import generator

inputFile = './fieldDefinitions.yml'
outputFile = '../ldp/assets/fieldDefinitions.trig'

model = generator.loadSourceFromFile(inputFile)

output = generator.generate(model, generator.METAPHACTS)

with open(outputFile, 'w') as f:
    f.write(output)