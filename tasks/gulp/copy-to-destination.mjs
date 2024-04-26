import { join } from 'path'

import gulp from 'gulp'
import merge from 'merge-stream'
import slash from 'slash'

import { paths } from '../../config/paths.js'
import { destination } from '../task-arguments.mjs'

/**
 * Copy assets task
 * Copies assets to destination
 *
 * @returns {import('stream').Stream} Output file stream
 */
export function copyAssets() {
  return gulp
    .src(`${slash(paths.assets)}/**/*`)
    .pipe(gulp.dest(slash(join(destination, '@ogcio/assets'))))
}

copyAssets.displayName = 'copy:assets'

/**
 * Copy files task
 * Copies files to destination
 *
 * @returns {import('stream').Stream} Output file stream
 */
export function copyFiles() {
  return merge(
    /**
     * Copy files to destination with './govie-esm' suffix
     * Includes only source JavaScript ECMAScript (ES) modules
     */
    gulp
      .src([
        `${slash(paths.src)}/govie/**/*.mjs`,
        `!${slash(paths.src)}/govie/**/*.test.*`,
      ])
      .pipe(gulp.dest(slash(join(destination, 'govie-esm')))),

    /**
     * Copy files to destination with './govie' suffix
     * Includes fonts, images, polyfills, component files
     */
    merge(
      gulp.src([
        `${slash(paths.src)}/**/*`,

        // Exclude files we don't want to publish
        '!**/.DS_Store',
        '!**/*.mjs',
        '!**/*.test.*',
        '!**/__snapshots__/',
        '!**/__snapshots__/**',
        // Exclude Storybook stories files
        '!**/*.stories.*',

        // Preserve destination README when copying to ./package
        `!${slash(paths.src)}/govie/README.md`,

        // Exclude Sass files handled by Gulp 'compile:scss'
        `!${slash(paths.src)}/**/*.scss`,

        // Exclude storybook templates, patterns and other files
        `!${paths.src}/govie/{templates,templates/**}`,
        `!${paths.src}/govie/{patterns,patterns/**}`,
        `!${paths.src}/govie/{storybook,storybook/**}`,
      ])
    ).pipe(gulp.dest(slash(destination)))
  )
}

copyFiles.displayName = 'copy:files'
