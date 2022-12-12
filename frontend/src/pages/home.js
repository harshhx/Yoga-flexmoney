import React from 'react'
import Details from '../components/details'
import Enroll from '../components/enroll'

function Home() {

  const [active, setActive] = React.useState(sessionStorage.getItem("session_active")==='true')

  return (
    <div>
      {active ? (<Details />) : (<Enroll active={active} setActive={setActive}/>)}
      
      

    </div>
  )
}

export default Home