import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

const version = {
  revision: 'dev',
};

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <span className="version float-right">Version {version.revision}</span>
        <span>
          Eine Veranstaltung der{' '}
          <a href="http://www.kirche-aufdemberg.de/kinder-und-jugend/ferienspiele/index.html">Ev. Kirchengemeinde "Auf dem Berg"</a>, der{' '}
          <a href="http://www.emk-rothenbergen.de/Ferienspiele/">Ev.-methodistischen Kirche Rothenbergen</a> und der{' '}
          <a href="http://kath-kirche-mhg.de/">Kath. Kirchengemeinde Christkönig</a> – <Link to="/impressum">Impressum</Link>
        </span>
      </Container>
    </footer>
  );
}
