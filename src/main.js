import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';

import App from './components/app/Аpp.js';

globalThis.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.run();
});
