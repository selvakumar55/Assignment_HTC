import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import Entertainment from './component/Entertainment';

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Entertainment />
    </Provider>
  );
};

export default App;
