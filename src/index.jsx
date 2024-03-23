/* @refresh reload */
import { render } from 'solid-js/web';
import FocusScope from './components/focus-scope';
import Stepper from './components/step-by-step';

import './index.css';
import App from './App';
import CheckoutPage from './Checkout';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

FocusScope.define();
Stepper.define();

render(() => <CheckoutPage />, root);
