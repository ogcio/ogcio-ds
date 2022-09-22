import { mkdirSync, existsSync, createWriteStream } from 'fs';
import { join as joinPath } from 'path';
import * as themes from '@ogcio-ds/themes';

try {
  Object.entries(themes).forEach(async ([themeName, theme]) => {
    try {
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

      console.log(`✨ Theme "${themeName}" built successfully`);
    } catch (error) {
      console.error(`❌ Failed building theme "${themeName}"`, error);
    }
  });
} catch (error) {
  console.error('❌ Failed building themes', error);
}
