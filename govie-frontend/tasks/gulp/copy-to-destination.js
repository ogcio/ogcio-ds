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
        // Exclude Storybook stories files
        '!**/*.stories.*',

        // Preserve destination README when copying to ./package
        // https://github.com/alphagov/govie-frontend/tree/main/package#readme
        `!${configPaths.src}README.md`,

        // Exclude Sass and CSS files handled by PostCSS stream below
        `!${configPaths.src}**/*.scss`,
        '!**/*.css',

        // Exclude Sass files related to Storybook app
        `!${configPaths.src}/{storybook,storybook/**}`,
      ]),

      // Add CSS prefixes to Sass
      gulp
        .src([
          `${configPaths.src}**/*.scss`,

          // Exclude Sass files related to Storybook app
          `!${configPaths.src}storybook/**/*`,
          `!${configPaths.src}**/all-storybook.scss`,
        ])
        .pipe(postcss([autoprefixer], { syntax: postcssScss }))
    ).pipe(gulp.dest(`${destination}/govie/`))
  )
})
