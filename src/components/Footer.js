const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }

  return (
    <>
      <div style={footerStyle} className="text-center">
        <br />
        <em className="font-bold">
          Note app, Department of Computer Science, University of Helsinki 2023
        </em>
      </div>
    </>
  )
}

export default Footer
