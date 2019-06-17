
                import React from 'react';
import ReactDOM from 'react-dom';
import GenericPage from './GenericPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GenericPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
