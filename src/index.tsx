import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import {store} from "@redux/store/index";
import {Provider} from 'react-redux';

import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading</div>}>
            <App/>
        </Suspense>
    </Provider>
);


