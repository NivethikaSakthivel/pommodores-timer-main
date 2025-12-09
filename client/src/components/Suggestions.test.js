import '@testing-library/jest-dom'
import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Suggestions } from './Suggestions'



describe("Test", () => {
    beforeAll(() => {
      global.matchMedia = global.matchMedia || function () {
        return {
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      };
    });
    
    test('renders suggestions component on the page', () => {
        render(<Suggestions />)
        expect(screen.getByText("BREAK SUGGESTIONS")).toBeInTheDocument()
      });

      test('clicking on the BBC sport link', () => {
        render(<Suggestions />)
        expect(screen.getByText('BBC sport').closest('a')).toHaveAttribute('href', 'https://www.bbc.co.uk/sport')

        });
  });


