from sariFieldDefinitionsGenerator import generator

inputFile = './fieldDefinitions.yml'
outputFile = '../ldp/assets/fieldDefinitions.trig'

model = generator.loadSourceFromFile(inputFile)

output = generator.generate(model, generator.METAPHACTS)

with open(outputFile, 'w') as f:
    f.write(output)