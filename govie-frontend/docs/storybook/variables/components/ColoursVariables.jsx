/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeBlock } from './CodeBlock'

export const ColoursVariables = () => (
  <>
    <h3 className="govie-heading-m">Colours</h3>
    <CodeBlock
      variable="$govie-brand-colour"
      description={<p>Brand colour.</p>}
      code={'$govie-brand-colour: govie-colour("blue");'}
    />
    <CodeBlock
      variable="$govie-text-colour"
      description={<p>Text colour.</p>}
      code={'$govie-text-colour: govie-colour("black");'}
    />
    <CodeBlock
      variable="$govie-body-background-colour"
      description={<p>Body background colour.</p>}
      code={'$govie-body-background-colour: govie-colour("white");'}
    />
    <CodeBlock
      variable="$govie-print-text-colour"
      description={
        <>
          <p>Text colour for print media.</p>
          <p>
            Use ‘true black’ to avoid printers using colour ink to print body
            text
          </p>
        </>
      }
      code="$govie-print-text-colour: #000000;"
    />
    <CodeBlock
      variable="$govie-secondary-text-colour"
      description={
        <>
          <p>Secondary text colour.</p>
          <p>Used in for example ‘muted’ text and help text.</p>
        </>
      }
      code={'$govie-secondary-text-colour: govie-colour("dark-grey");'}
    />
    <CodeBlock
      variable="$govie-focus-colour"
      description={
        <>
          <p>Focus colour.</p>
          <p>
            Used for outline (and background, where appropriate) when
            interactive elements (links, form controls) have keyboard focus.
          </p>
        </>
      }
      code={'$govie-focus-colour: govie-colour("yellow");'}
    />
    <CodeBlock
      variable="$govie-focus-text-colour"
      description={
        <>
          <p>Focused text colour.</p>
          <p>
            Ensure that the contrast between the text and background colour
            passes WCAG Level AA contrast requirements.
          </p>
        </>
      }
      code={'$govie-focus-text-colour: govie-colour("black");'}
    />
    <CodeBlock
      variable="$govie-focus-text-colour"
      description={
        <>
          <p>Focused text colour.</p>
          <p>
            Ensure that the contrast between the text and background colour
            passes WCAG Level AA contrast requirements.
          </p>
        </>
      }
      code={'$govie-focus-text-colour: govie-colour("black");'}
    />
    <CodeBlock
      variable="$govie-error-colour"
      description={
        <>
          <p>Error colour.</p>
          <p>
            Used to highlight error messages and form controls in an error
            state.
          </p>
        </>
      }
      code={'$govie-error-colour: govie-colour("red");'}
    />
    <CodeBlock
      variable="$govie-success-colour"
      description={
        <>
          <p>Success colour.</p>
          <p>Used to highlight success messages and banners.</p>
        </>
      }
      code={'$govie-success-colour: govie-colour("green");'}
    />
    <CodeBlock
      variable="$govie-border-colour"
      description={
        <>
          <p>Border colour.</p>
          <p>Used in for example borders, separators, rules and keylines.</p>
        </>
      }
      code={'$govie-border-colour: govie-colour("mid-grey");'}
    />
    <CodeBlock
      variable="$govie-input-border-colour"
      description={
        <>
          <p>Input border colour.</p>
          <p>Used for form inputs and controls.</p>
        </>
      }
      code={'$govie-input-border-colour: govie-colour("black");'}
    />
    <CodeBlock
      variable="$govie-hover-colour"
      description={
        <>
          <p>Input hover colour.</p>
          <p>Used for hover states on form controls.</p>
        </>
      }
      code={'$govie-hover-colour: govie-colour("mid-grey");'}
    />
    <CodeBlock
      variable="$govie-link-colour"
      description={
        <>
          <p>Link colour.</p>
        </>
      }
      code={'$govie-link-colour: govie-colour("blue");'}
    />
    <CodeBlock
      variable="$govie-link-visited-colour"
      description="Visited link colour."
      code={'$govie-link-visited-colour: govie-colour("purple");'}
    />
    <CodeBlock
      variable="$govie-link-hover-colour"
      description="Link hover colour."
      code={'$govie-link-hover-colour: govie-colour("dark-blue");'}
    />
    <CodeBlock
      variable="$govie-link-active-colour"
      description="Active link colour."
      code={'$govie-link-active-colour: govie-colour("black");'}
    />
    <CodeBlock
      variable="$govie-header-surface-colour"
      description="Head surface colour."
      code="$govie-header-surface-colour: #004d44;"
    />
    <CodeBlock
      variable="$govie-header-footer-border-colour"
      description="Header and footer border colour."
      code="$govie-header-footer-border-colour: #a39161;"
    />
    <CodeBlock
      variable="$govie-footer-surface-colour"
      description="Used by the footer component and template to give the illusion of a long footer."
      code="$govie-footer-surface-colour: govie-tint(#a39161, 90);"
    />
  </>
)
