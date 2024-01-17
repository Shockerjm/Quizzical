function Start( { hide, toggleHide } ) {
  return (
    <div className={hide ? '' : 'hide'}>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button className="btn" onClick={(()=>toggleHide())}>Start quiz</button>
    </div>
  )
}
export default Start