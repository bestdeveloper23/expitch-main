/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-var-requires */

const APP_YAML_PATH = path.join(__dirname, `app.${process.env.NODE_ENV}.yaml`);
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function main() {
  const contents = await fs.promises.readFile(APP_YAML_PATH, 'utf-8');
  const missingVariables = [];
  const updated = contents.replace(/\$[A-Z0-9_]+\b/g, (match) => {
    // Remove the leading dollar sign
    const name = match.substring(1);
    const value = process.env[name];

    console.log(name, value);

    if (typeof value !== 'string') {
      missingVariables.push(name);
      return match;
    }
    return value;
  });

  if (missingVariables.length) {
    throw new Error(
      `The variables: ${missingVariables.join(
        ', ',
      )} are not defined in the environment`,
    );
  }
  await fs.promises.writeFile(APP_YAML_PATH, updated);
}
