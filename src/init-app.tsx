import {h, render} from 'preact';
import {App} from './app/App';
import {bgWhite} from '~bootstrap';

document.body.classList.add(bgWhite);
render(<App/>, document.getElementById('root')!);
