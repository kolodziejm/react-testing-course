// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: props => (props.in ? props.children : null),
  }
})

test('shows hidden message when toggle is clicked', () => {
  const message = 'This is a message'
  const {getByText, queryByText} = render(
    <HiddenMessage>{message}</HiddenMessage>,
  )
  const toggleBtn = getByText(/toggle/i)
  expect(queryByText(message)).toBeNull()
  fireEvent.click(toggleBtn)
  expect(queryByText(message)).toBeInTheDocument()
  fireEvent.click(toggleBtn)
  expect(queryByText(message)).toBeNull()
})
