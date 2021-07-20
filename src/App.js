import './App.css';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Axios from 'axios';

function App() {
  const [autor, setAutor] = useState('')
  const [tytul, setTytul] = useState('')
  const [data,setData] = useState([])

  useEffect(() =>{
    resetData()
  },[])
  const resetData = () => {
      Axios.get("http://localhost:5000/podaj-dane").then(dane =>{
      setData(dane.data)
    })
  }
  
  const formHandler = (e) =>{
    e.preventDefault()
    Axios.post("http://localhost:5000/dodaj",{autor,tytul})
    .then(()=>
    {
      resetData()
    })
  }
  const deleteHandler = id => {
    Axios({
      method: "DELETE",
      url: "http://localhost:5000/usun",
      data: {
        id : id
      }
    })
    .then(() => {
      resetData()
    })
  }
  

  const htmlData = data.map(item=>{
    return (
      <tr>
        <td><h4>{item.autor}</h4></td>
        <td><h4>{item.tytul}</h4></td>
        <td><Button variant="danger" onClick={() => deleteHandler(item.id) }>Usuń</Button></td>
      </tr>
    )
  })

  return (
    <div className="App" resetData={resetData}>
        <h1>Księgarnia</h1>
        <Form>
          <h2>Dodaj książke:</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Autor</Form.Label>
          <Form.Control type="email" placeholder="Autor" onChange={e => setAutor(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Tytuł</Form.Label>
          <Form.Control type="email" placeholder="Tytuł" onChange={e => setTytul(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="primary" onClick={formHandler}>dodaj</Button>
        </Form>
        <div class="tabela">
          <Table striped bordered hover>
            <thead>
              <td>Autor</td>
              <td>Tytuł</td>
              <td></td>
            </thead>
            <tbody>
              {htmlData}
            </tbody>
          </Table>
        </div>
    </div>
  );
}

export default App;
