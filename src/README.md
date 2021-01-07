## About

Script for generating field definitions from YAML definitions

## Usage

Run `node compileFieldDefinitions.js`

## Configuration

Field definitions are defined in `fieldDefinitions.yml`.

```
output: {output path of trig file}

prefix: http://rs.swissartresearch.net/instances/fields/
container: http://www.metaphacts.com/ontologies/platform#fieldDefinitionContainer

fields:

    - id: {unique identifier}
      label: {label}
      description: {description}
      dataType: {datatype}
      domain: {domain}
      range: {range}
      minOccurs: #
      maxOccurs: #
      queries:
        - ask: '{ask query}'
        - delete: '{delete query}'
        - insert: '{insert query}'
        - select: '{select query}'
          
    - ...
```