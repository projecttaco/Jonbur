import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import options from "./drizzleOptions";
import { DrizzleProvider } from 'drizzle-react';
import LoadingContainer from "./Components/LoadingContainer";
import store from "./store";


ReactDOM.render(
    <DrizzleProvider options={options} store={store}>
        <LoadingContainer>
            <App />
        </LoadingContainer>
    </DrizzleProvider>, document.getElementById('root'));
