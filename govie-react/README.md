# govie-react

## Usage

```sh
npm install govie-react styled-components @types/styled-components --save
```

```jsx
import { Button } from 'govie-react'

const MyComponent = ({title}) => (<div>
  <h1>{title}</h1>
  <Button />
</div>)
```

<!-- See the [Storybook](https://govie-react.github.io/govie-react) for examples of all available components. -->

Also see the [Example Application](packages/example-application/src) for basic usage.

## Using Link with a Router Link

We provide a Link component which creates an element styled as a GDS link. As we are using styled-components it is possible to apply that style to an existing component using the `as` prop. Other props will be passed through.

For example;

```jsx
import { BrowserRouter, Link as RouterLink } from 'react-router';
import { Link } from '@govie-react/link';

const MyComponent = () => (
  <nav>
    <BrowserRouter>
      <Link as={RouterLink} to="https://example.com">example</Link>
    </BrowserRouter>
  </nav>
);
```
