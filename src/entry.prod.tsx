import {h, render} from 'preact';
import {bgWhite} from '~bootstrap';
import {App} from './app/App';
import './register-service-worker';

document.body.classList.add(bgWhite);
render(<App/>, document.getElementById('root')!);
