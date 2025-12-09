import '@testing-library/jest-dom'
import * as React from 'react'
import { ReactDOM } from 'react'
import { render, fireEvent, screen, getByTestId, getByLabelText } from '@testing-library/react'
import Timer from './Timer'
import { CircularProgressbar } from 'react-circular-progressbar';



describe("Timer tests", () => {
    beforeAll(() => {
      global.matchMedia = global.matchMedia || function () {
        return {
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      };
    });
    
    test('renders suggestions component on the page', () => {
        render(<Timer />)
        const element = ReactDOM.findDOMNode(CircularProgressbar)
        expect(element).toBeInTheDocument()
      });

    
  });


