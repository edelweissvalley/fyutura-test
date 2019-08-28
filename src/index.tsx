/**
 * Точка входа
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from 'src/components/App';

const root: HTMLElement = document.createElement('section');
root.setAttribute('id', 'root');
document.body.appendChild(root);

ReactDOM.render(<App/>, root);
