import 'jest-dom/extend-expect'
// I added this for you. If I didn't explain this during the lecture, ask me now!
import 'react-testing-library/cleanup-after-each'
import React from 'react'
// 🐨 you'll need to import the fireEvent utility from react-testing-library
import {render, fireEvent} from 'react-testing-library'
import {FavoriteNumber} from '../favorite-number'

//state - number and numberEntered:boolean
// min and max number passed as props

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText, getByTestId} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: 10}}) // drugi argument to properties dla tego eventu
  const errMsg = getByTestId('error-message')
  expect(errMsg).toHaveTextContent(/the number is invalid/i)
})
