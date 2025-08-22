import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>TextilManager</h2>
        <nav>
          <ul>
            <li><Link to="/">Productos</Link></li>
            <li><Link to="/agregar-producto">Agregar producto</Link></li>
            <li><Link to="/entradas">Entradas</Link></li>
            <li><Link to="/salidas">Salidas</Link></li>
            <li><Link to="/reportes">Reportes</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Centro de Impreción Huauchinango</h1>
        </header>
        <section className="content">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
