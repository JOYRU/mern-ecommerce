import React from 'react'
import PageTitle from '../components/PageTitle'
import Counter from '../components/Counter'

 const Home = () => {
  return (
    <div>
        <PageTitle title="Home" />
        <h1>Home Page</h1>
        <h2>List Of all Products</h2>
         <Counter />
    </div>
  )
} ; 

export default Home ;