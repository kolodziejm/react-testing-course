// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent, wait} from 'react-testing-library'
import {loadGreeting as mockLoadGreeting} from '../api'
import {GreetingLoader} from '../greeting-loader-01-mocking'

// MOCKOWANIE ZAIMPORTOWANEGO MODULU
jest.mock('../api.js', () => {
  return {
    loadGreeting: jest.fn(subject =>
      Promise.resolve({data: {greeting: `Hi ${subject}`}}),
    ),
  }
})

// ZAUWAZ ZE TO ASYNCHRONICZNY TEST
test('loads greetings on click', async () => {
  const exampleValue = 'testing value'
  const {getByLabelText, getByText, getByTestId, debug} = render(
    <GreetingLoader />,
  )
  const input = getByLabelText(/name/i)
  const button = getByText(/load greeting/i)
  input.value = exampleValue
  fireEvent.click(button)
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  expect(mockLoadGreeting).toHaveBeenLastCalledWith(exampleValue)
  await wait(() =>
    expect(getByTestId('greeting')).toHaveTextContent(`Hi ${exampleValue}`),
  )
  // wait wykonuje callbacka co 15 ms przez max 450ms dopoki nie bedzie zwracac errora
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react-testing-library-course&e=http-jest-mock&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
