/* eslint no-console: "off", no-process-exit: "off", no-sync: "off" */
const fs = require('fs');
const path = require('path');

const inquirer = require('inquirer');
const json2yaml = require('json2yaml');

// Make sure we are in the root of a npm package
try {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.readFileSync(path.join(process.cwd(), './package.json'));
} catch (err) {
  console.log('package.json not found, are you in the root of your project?');
  process.exit(1);
}

// Detect if a file already exists. If it does exit and print it's contents
function fileAlreadExists(filename) {
  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const file = fs.readFileSync(filename);

    const message = `An '${filename}' already exists. Here is it's contents.`;
    console.log(message);

    // Print out a line the width of the message
    console.log('-'.repeat(message.length));

    // Print out the content of the file
    process.stdout.write(file.toString());

    process.exit(1);
  } catch (err) {} // eslint-disable-line no-empty
}

// Check for existing eslint configs
fileAlreadExists('.eslintrc.js');
fileAlreadExists('.eslintrc.json');
fileAlreadExists('.eslintrc.yaml');
fileAlreadExists('.eslintrc.yml');
fileAlreadExists('.eslintrc');

// Base questions
const questions = [
  {
    type: 'list',
    name: 'configStyle',
    message: 'What file format would you like your eslintrc to be?',
    choices: [
      'Javascript',
      'YAML',
      'JSON',
    ],
  },
  {
    type: 'checkbox',
    name: 'configsToExtend',
    message: 'Which configs would you like to extend?',
    choices: [
      {
        name: 'Default (Includes Core, ES2015 and Functional',
        value: 'default',
        short: 'Default',
        checked: true,
      },
      {
        name: 'Core (Basic best practices)',
        value: 'core',
        short: 'Core',
      },
      {
        name: 'ES2015 (Prefer ES2015 constructs)',
        value: 'es2015',
        short: 'ES2015',
      },
      {
        name: 'Functional (Eliminate all loops and mutation)',
        value: 'functional',
        short: 'Functional',
      },
      {
        name: 'Test (Loosens some rules for easier testing)',
        value: 'test',
        short: 'Test',
      },
      {
        name: 'Script (Loosens some rules for easier scripting)',
        value: 'script',
        short: 'Script',
      },
      new inquirer.Separator(),
      {
        name: 'Node (Node.js specific rules)',
        value: 'node',
        short: 'Node',
      },
      {
        name: 'React (React and JSX specific rules)',
        value: 'react',
        short: 'React',
      },
    ],
  },
];

// Check if there is a test directory
// eslint-disable-next-line security/detect-non-literal-fs-filename
if (fs.existsSync(path.join(process.cwd(), './test/'))) {
  // Check for existing eslint configs
  fileAlreadExists('test/.eslintrc.js');
  fileAlreadExists('test/.eslintrc.json');
  fileAlreadExists('test/.eslintrc.yaml');
  fileAlreadExists('test/.eslintrc.yml');
  fileAlreadExists('test/.eslintrc');

  // eslint-disable-next-line thehelp/no-array-mutation
  questions.push({
    type: 'confirm',
    name: 'addToTestDir',
    // eslint-disable-next-line max-len
    message: 'Would you like a config with the "test" config to be created in your test/ directory?',
    default: true,
  });
}

// Write a config
function writeConfig(filename, contents) {
  try {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.writeFileSync(filename, contents);

    const message = `Created "${filename}". Here are it's contents.`;
    console.log(message);
    console.log('-'.repeat(message.length));
    process.stdout.write(contents);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Ask our questions
// eslint-disable-next-line max-statements
inquirer.prompt(questions).then((answers) => {
  // Generate config as a js object
  const config = {
    extends: [],
  };

  // eslint-disable-next-line thehelp/no-mutation
  config.extends = answers.configsToExtend.map((configName) => {
    if (configName === 'default') {
      return '@giodamelio/eslint-config-thehelpining';
    }

    return `@giodamelio/eslint-config-thehelpining/${configName}`;
  });

  if (answers.configStyle === 'Javascript') {
    // I know I should be using a template engine...
    const beginning = 'module.exports = {\n  extends: [\n';
    const end = '  ],\n};\n';
    const middle = config.extends.map((configName) => `    '${configName}',\n`).join('');
    writeConfig('.eslintrc.js', `${beginning}${middle}${end}`);

    if (answers.addToTestDir) {
      // eslint-disable-next-line max-len
      writeConfig('test/.eslintrc.js', `${beginning}    '@giodamelio/eslint-config-thehelpining/test',\n${end}`);
    }
  }

  if (answers.configStyle === 'YAML') {
    const YAMLConfig = json2yaml.stringify(config);
    writeConfig('.eslintrc.yaml', YAMLConfig);

    if (answers.addToTestDir) {
      // eslint-disable-next-line thehelp/no-mutation
      config.extends = ['@giodamelio/eslint-config-thehelpining/test'];
      const YAMLTestConfig = json2yaml.stringify(config);
      writeConfig('test/.eslintrc.yaml', YAMLTestConfig);
    }
  }

  if (answers.configStyle === 'JSON') {
    const JSONConfig = JSON.stringify(config, null, 2);
    writeConfig('.eslintrc.json', `${JSONConfig}\n`);

    if (answers.addToTestDir) {
      // eslint-disable-next-line thehelp/no-mutation
      config.extends = ['@giodamelio/eslint-config-thehelpining/test'];
      const JSONTestConfig = JSON.stringify(config, null, 2);
      writeConfig('test/.eslintrc.json', `${JSONTestConfig}\n`);
    }
  }
});
