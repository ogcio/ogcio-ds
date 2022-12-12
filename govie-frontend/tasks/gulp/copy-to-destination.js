const gulp = require('gulp')
const postcss = require('gulp-postcss')
const postcssScss = require('postcss-scss')
const autoprefixer = require('autoprefixer')
const merge = require('merge-stream')

const configPaths = require('../../config/paths.js')
const { destination } = require('../task-arguments.js')

gulp.task('copy:files', () => {
  return merge(
    /**
     * Copy files to destination with './govie' suffix
     * Includes fonts, images, polyfills, component files
     */
    merge(
      gulp.src([
        `${configPaths.src}**/*`,

        // Exclude files we don't want to publish
        '!**/.DS_Store',
        '!**/*.mjs',
        '!**/*.test.*',
        '!**/__snapshots__/',
        '!**/__snapshots__/**',

        // Preserve destination README when copying to ./package
        // https://github.com/alphagov/govie-frontend/tree/main/package#readme
        `!${configPaths.src}README.md`,

        // Exclude Sass files handled by PostCSS stream below
        `!${configPaths.src}**/*.scss`,

        // Exclude source YAML handled by JSON streams below
        `!${configPaths.components}**/*.yaml`
      ]),

      // Add CSS prefixes to Sass
      gulp.src(`${configPaths.src}**/*.scss`)
        .pipe(postcss([autoprefixer], { syntax: postcssScss }))
    ).pipe(gulp.dest(`${destination}/govie/`))
  )
})
