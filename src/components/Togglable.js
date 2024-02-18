import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button
          onClick={toggleVisibility}
          className="px-3 py-2 bg-lime-600 text-white border rounded mx-3 my-4 capitalize font-bold"
        >
          {props.buttonLabel}
        </button>
      </div>
      <div
        className="togglableContent grid grid-flow-row justify-items-stretch  gap-5"
        style={showWhenVisible}
      >
        {props.children}
        <button
          className="px-3 py-1 mb-3 capitalize bg-gray-200 font-bold rounded border justify-self-center"
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
