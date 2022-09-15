import { readdirSync, mkdirSync, existsSync, createWriteStream } from 'fs';
import { join as joinPath } from 'path';

const isDirectoryExcluded = (name) =>
  ['', 'node_modules', 'dist'].includes(name);

const OUTPUT_FILENAME = '_theme.scss';

const themes = readdirSync('./', { withFileTypes: true });

themes
  .filter((theme) => theme.isDirectory())
  .map((theme) => theme.name)
  .filter((name) => !isDirectoryExcluded(name))
  .forEach(async (themeName) => {
    const themeFile = joinPath(__dirname, themeName, 'index.js');
    const theme = (await import(themeFile)).default;

    const buildDirectory = joinPath(__dirname, themeName, 'build');

    if (!existsSync(buildDirectory)) {
      mkdirSync(buildDirectory);
    }

    const output = createWriteStream(joinPath(buildDirectory, OUTPUT_FILENAME));

    output.write(':root {\n');
    Object.entries(theme).forEach(([key, value]) => {
      output.write(`  ${key}: ${value};\n`);
    });
    output.write('}\n');

    output.close();
  });
