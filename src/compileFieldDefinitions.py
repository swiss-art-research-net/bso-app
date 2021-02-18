import sys
sys.path.append("/Users/fkraeutli/Sites/sari-field-definitions-generator/src")

from sariFieldDefinitionsGenerator import generator

inputFile = './fieldDefinitions.yml'
model = generator.loadSourceFromFile(inputFile)

output = generator.generate(model, generator.METAPHACTS)

print(output)