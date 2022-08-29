"""
Reads i18n properties files used for internationalisation, synchronises the identifiers used in them and proposes translations. 

The file without a language label is treated as the default language. First all identifiers are read from all the files.
Identifiers that are missing in certain languages are then added and automatically translated using DeepL.

The automatically obtained translations are commented out in the language files so they can be checked manually.
The label in the default language is included and also commented out.

Usage:
python synchroniseI18nFiles.py --inputDir <inputDir> --authKey <authKey>

inputDir: The directory containing the i18n properties files
authKey: The DeepL API authentication key
"""


import deepl
import re
import sys
from os import listdir
from os.path import join
from tqdm import tqdm

def synchroniseAndTranslate(*, inputDir, authKey):
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

    # Write language files, automatically translating out missing fields
    translator = deepl.Translator(authKey)
    for file in fields:
        print('Translating {}'.format(file))
        try:
            lang = re.findall(r'_(.*)\.properties', file)[0].upper()
        except:
            lang = False
        with open(join(inputDir, file), 'w') as f:
            for term in tqdm(allTerms):
                if fields[file][term]:
                    f.write("%s = %s\n" % (term, fields[file][term]))
                else:
                    if lang:
                        try:
                            translation = translator.translate_text(fields[defaultFile][term], target_lang=lang, source_lang='EN')
                        except Exception as e:
                            print(e)
                            translation = ""
                        f.write("#%s = %s # Automatically translated from %s\n" % (term, translation, fields[defaultFile][term]))
                    else:
                        f.write("#%s = \n # Translate from" % (term, fields[defaultFile][term]))

if __name__ == "__main__":
    options = {}

    for i, arg in enumerate(sys.argv[1:]):
        if arg.startswith("--"):
            if not sys.argv[i + 2].startswith("--"):
                options[arg[2:]] = sys.argv[i + 2]
            else:
                print("Malformed arguments")
                sys.exit(1)

    if not 'deeplKey' in options:
        print("A Deepl API Auth Key needs to be provided via the --deeplKey option")
        sys.exit(1)

    if not 'inputDir' in options:
        print("An input directory needs to be provided via the --inputDir option")
        sys.exit(1)

    synchroniseAndTranslate(inputDir=options['inputDir'], authKey=options['deeplKey'])