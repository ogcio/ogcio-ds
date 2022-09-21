import { mkdirSync, existsSync, createWriteStream } from 'fs';
import { join as joinPath } from 'path';
import * as themes from '@ogcio-ds/themes';

Object.entries(themes).forEach(async ([themeName, theme]) => {
  const buildDirectory = joinPath(__dirname, 'tmp');

  if (!existsSync(buildDirectory)) {
    mkdirSync(buildDirectory);
  }

  const output = createWriteStream(
    joinPath(buildDirectory, `${themeName}.scss`)
  );

  output.write(':root {\n');
  Object.entries(theme).forEach(([key, value]) => {
    output.write(`  ${key}: ${value};\n`);
  });
  output.write('}\n');

  output.write('@import "../src/theme";\n');

  output.close();
});
