import { resolve } from 'path'

import slash from 'slash'
import parser from 'yargs-parser'

import configPaths from '../config/paths.js'

export const argv = parser(process.argv, {
  string: ['destination']
})

// Defaults for known tasks
const destinations = [
  {
    task: 'compile',
    destination: 'public'
  },
  {
    task: 'build:package',
    destination: 'package'
  },
  {
    task: 'build:dist',
    destination: 'dist'
  }
]

// Non-flag arguments
const { _: tasks } = argv

// Prefer `--destination`, default for known task, or 'public'
const target = argv.destination || (destinations
  .filter(({ task }) => tasks.includes(task))[0]?.destination ?? 'public')

const destPath = resolve(configPaths.root, slash(target))

// Absolute path to destination
export const destination = destPath

// Check destination flags
export const isPackage = target === 'package'
export const isPublic = target === 'public'
export const isDist = target === 'dist'
export const isDev = isPublic && tasks.includes('dev')
export const isStorybook = target === 'storybook/dist'
