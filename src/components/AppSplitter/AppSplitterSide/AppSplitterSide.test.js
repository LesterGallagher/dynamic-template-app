
                import React from 'react';
import ReactDOM from 'react-dom';
import AppSplitterSide from './AppSplitterSide';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppSplitterSide />, div);
  ReactDOM.unmountComponentAtNode(div);
});
