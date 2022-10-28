import * as React from 'react';
import * as GovIE from 'govie-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <>
    <GovIE.H2>Welcome to the govie-react example application.</GovIE.H2>
    <GovIE.Paragraph>Click Start to continue.</GovIE.Paragraph>
    <GovIE.Button start as={Link} to="/forms">
      Start now
    </GovIE.Button>
  </>
);

export default Home;
