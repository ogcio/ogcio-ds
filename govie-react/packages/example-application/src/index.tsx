import * as React from 'react';
import * as GovIE from 'govie-react';
import { MemoryRouter as Router, Routes, Route } from 'react-router';
import { Link } from 'react-router-dom';

import Home from './home';
import Forms from './forms/forms';

const ExampleApplication: React.FC<ExampleApplicationProps> = ({ routerEntries }: ExampleApplicationProps) => (
  <React.StrictMode>
    <Router initialEntries={routerEntries}>
      <GovIE.GlobalStyle />
      <GovIE.TopNav
        serviceTitle={
          <GovIE.TopNav.Anchor as={Link} to="/">
            React
          </GovIE.TopNav.Anchor>
        }
        search={
          <GovIE.SearchBox>
            <GovIE.SearchBox.Input placeholder="Search GOV.UK" />
            <GovIE.SearchBox.Button />
          </GovIE.SearchBox>
        }
      >
        <GovIE.TopNav.NavLink as={Link} to="/">
          Home
        </GovIE.TopNav.NavLink>
        <GovIE.TopNav.NavLink as={Link} to="/forms">
          Forms
        </GovIE.TopNav.NavLink>
      </GovIE.TopNav>
      <GovIE.Page.WidthContainer>
        <GovIE.Page.Main>
          <Routes>
            <Route path="/forms/*" element={<Forms />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </GovIE.Page.Main>
      </GovIE.Page.WidthContainer>
      <GovIE.Footer />
    </Router>
  </React.StrictMode>
);

export interface ExampleApplicationProps {
  routerEntries?: string[];
}

ExampleApplication.defaultProps = {
  routerEntries: undefined,
};

export default ExampleApplication;
