import { join } from 'path'

import gulp from 'gulp'
import merge from 'merge-stream'
import slash from 'slash'

import configPaths from '../../config/paths.js'
import { destination } from '../task-arguments.mjs'

/**
 * Copy assets task
 * Copies assets to destination
 *
 * @returns {import('stream').Stream} Output file stream
 */
export function copyAssets() {
  return gulp
    .src(`${slash(configPaths.assets)}/**/*`)
    .pipe(gulp.dest(slash(join(destination, '/assets'))))
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
        `${slash(configPaths.src)}/govie/**/*.mjs`,
        `!${slash(configPaths.src)}/govie/**/*.test.*`,
      ])
      .pipe(gulp.dest(slash(join(destination, 'govie-esm')))),

    /**
     * Copy files to destination with './govie' suffix
     * Includes fonts, images, polyfills, component files
     */
    merge(
      gulp.src([
        `${slash(configPaths.src)}/**/*`,

        // Exclude files we don't want to publish
        '!**/.DS_Store',
        '!**/*.mjs',
        '!**/*.test.*',
        '!**/__snapshots__/',
        '!**/__snapshots__/**',
        // Exclude Storybook stories files
        '!**/*.stories.*',

        // Preserve destination README when copying to ./package
        `!${slash(configPaths.src)}/govie/README.md`,

        // Exclude Sass files handled by Gulp 'compile:scss'
        `!${slash(configPaths.src)}/**/*.scss`,

        // Exclude storybook templates, patterns and other files
        `!${configPaths.src}/govie/{templates,templates/**}`,
        `!${configPaths.src}/govie/{patterns,patterns/**}`,
        `!${configPaths.src}/govie/{storybook,storybook/**}`,
      ])
    ).pipe(gulp.dest(slash(destination)))
  )
}

copyFiles.displayName = 'copy:files'
