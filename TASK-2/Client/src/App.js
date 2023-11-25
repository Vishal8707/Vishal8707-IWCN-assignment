import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const getData = (url) => {
  return fetch(url).then((res) => res.json())
}

function App() {
  const [data, setData] = useState([])

  // Get All Data function
  const getAllData = async () => {
    try {
      const GetAllData = await getData('http://localhost:5000/getall')
      // console.log(GetAllData, "Get All Data")
      setData(GetAllData)
    } catch (error) {
      console.log("Error", error.message)
    }
  }

  useEffect(() => {
    getAllData()
  }, [])


  // Submit Note
  const submitNote = async (event, name) => {
    event.preventDefault()

    if (event.target[0].value.trim() == "") return alert("Title is required")
    else if(event.target[1].value.trim() == "") return alert("Description is required")
    

    // request Data
    const note = {
      title: event.target[0].value,
      description: event.target[1].value
    }


    //reset form
    event.target.reset();

    // Create Table if not created
    const table_request = await axios.get('http://localhost:5000/createtable')
    console.log(table_request.data, "table create response")

    //insert data in table
    const response = await axios.post('http://localhost:5000/insert', note)
    console.log(response, "insert data response")
    alert("Submitted Success")
    getAllData()
  }


  // Delete Note
  const deleteNote = (id) => async () => {
    // console.log(id, "id")
    const response = await axios.delete(`http://localhost:5000/delete/${id}`)
    console.log(response, "delete response")
    alert("Deleted Success")
    getAllData()
  }


  console.log(data, "data")

  return (
    <div>
      <header>
        <h1>IWCN Notes</h1>
      </header>
      <div className='main'>
        <form onSubmit={submitNote}>
          <input type="text" name="title" placeholder="Title..." />
          <input type="text" name="description" placeholder="Take a note..." />
          <button type="submit">+</button>
        </form>
        <div className='notelist'>
          {data.length !== 0 ? data.map((item, index) => {
            return (
              <div className='note' key={index}>
                <h3>{item.Title}</h3>
                <p>{item.Description}</p>
                <p >{item.Date}</p>
                <div className='notedelete'>
                  <div onClick={deleteNote(item.id)}>
                  <ion-icon name="trash-outline"></ion-icon>
                    </div>
                </div>
              </div>
            )
          }) : <h3 className='nodata'>No Data...</h3>}
        </div>
      </div>
      <footer>Copyright @ 2023</footer>
    </div>
  )
}

export default App