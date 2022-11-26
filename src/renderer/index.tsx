import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import ReactDOM from 'react-dom';

import App from './App';
// import { store } from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
