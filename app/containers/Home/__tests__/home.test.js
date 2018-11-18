import React from 'react';
import TestRenderer from 'react-test-renderer';
import Home from '../index';
describe('Home', () => {
    it('should render TableRow tag with className "rowStyle"', () => {
      const testRenderer = TestRenderer.create(<Home />);
      const testInstance = testRenderer.root;
      expect(testInstance.findByType(TableRow).props.className).toBe(rowStyle);
    });
});
