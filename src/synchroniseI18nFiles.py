import re
from os import listdir
from os.path import join

inputDir = "../data/i18n/"

# Get all the files in the input directory
files = [d for d in listdir(inputDir) if d.endswith('properties')]
defaultFile = files[0]

# Extract all fields from the files
allTerms = []
fields = {}
rFields = r'(\w+)\s*=\s*(.+)'
for file in files:
    fields[file] = {}
    with open(join(inputDir, file), 'r') as f:
        content = f.read()
    terms = sorted(re.findall(rFields, content))
    for term in terms:
        fields[file][term[0]] = term[1]
        allTerms.append(term[0])
allTerms = sorted(list(set(allTerms)))

# Set missing language keys to False
for file in fields.keys():
    for term in allTerms:
        if term not in fields[file]:
            fields[file][term] = False

# Write language files, commenting out missing fields
for file in fields:
    with open(join(inputDir, file), 'w') as f:
        for term in allTerms:
            if fields[file][term]:
                f.write("%s = %s\n" % (term, fields[file][term]))
            else:
                f.write("#%s = %s\n" % (term, fields[defaultFile][term]))