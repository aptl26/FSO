import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Search from './components/Search'
import personServices from './services/person.js'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('notification')

  useEffect(() => {
    personServices
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })}, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let newPerson
    let duplicate = false
    persons.forEach(person => {
      if(person.name === newName) {
        newPerson = {
          ...persons.find(person => person.name === newName),
          number: number
        }
        duplicate = true
        
      }
    })
    !duplicate ?
      personServices
        .create({ name: newName, number: number })
        .then(returnedPerson => {
          setPersons([ ...persons, returnedPerson ])
          setMessage(`Added ${returnedPerson.name}`)
          setMessageType('notification')
          setTimeout(() => {
            setMessage(null)
        }, 2000)
        }) : <>
        {
      window.confirm(
        `${newName} is already in contacts.
        Do you want to update their number?`
      ) ? 
        personServices
          .update(newPerson.id, newPerson)
          .then(returnedPerson => {
              setPersons(persons.map(person => 
                person.id === newPerson.id ? newPerson : person
                )
              )
            setMessage(`Modified ${returnedPerson.name}'s number`)
            setMessageType('notification')
            setTimeout(() => {
              setMessage(null)
            }, 2000)
            })
          .catch(error => {
            setMessage(`The following error occurred: \n ${error}`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
            }, 7000)
          })
        : <></>}</>

  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNumber = (e) => {
    setNumber(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const delPerson = id => {
    const chosenPerson = persons.find(person => person.id === id)
    window.confirm(`Are you sure you want to delete ${chosenPerson.name}'s contact?`) ?
    personServices
      .del(id)
      .then(returnePerson => {
        setPersons(persons.filter(person => person.id !== id))
          })
      .catch(error => alert(`${chosenPerson}'s contact is already deleted`))
    : <></>
  }

  const filteredPersons = 
  search ? persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase())
    ) : []

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={messageType}/>
      <h2>Search</h2>
      <div>
        <Search search={search} handleSearch={handleSearch}
          filteredPersons={filteredPersons} />
      </div>
      <h2>Add</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input value={newName} onChange={handleNewName} />
          </div>
          <div>
            number: <input value={number} onChange={handleNumber} />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      <h2>Numbers</h2>
      <ul>
        <Persons arr={persons} delPerson={delPerson}/>
      </ul>
    </div>
  )
}

export default App