/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const AssetsVariables = () => (
  <>
    <h3 className="govie-heading-m">Assets</h3>
    <CodeExample
      variable="$govie-assets-path"
      description={
        <>
          <p>Path to the assets directory, with trailing slash.</p>
          <p>
            This is the directory where the images and fonts subdirectories
            live. You will need to make this directory available via your
            application.
          </p>
        </>
      }
      code={'$govie-assets-path: "/assets/";'}
    />
    <CodeExample
      variable="$govie-images-path"
      description="Path to the images folder, with trailing slash."
      code={'$govie-images-path: "#{$govie-assets-path}images/";'}
    />
    <CodeExample
      variable="$govie-fonts-path"
      description="Path to the fonts folder, with trailing slash."
      code={'$govie-fonts-path: "#{$govie-assets-path}fonts/";'}
    />

    <br />
  </>
)
