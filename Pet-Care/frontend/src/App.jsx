import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const api = axios.create({
  baseURL: 'https://pet-care-backend-sooty.vercel.app/'
});

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAnimal, setNewAnimal] = useState('');
  const [newPetsName, setNewPetsName] = useState('');
  const [newPetSymptoms, setNewPetSymptoms] = useState('');
  const [newDisease, setNewDisease] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    api.get('/users').then((res) => {
      console.log(res);
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    setIsFormValid(
      newName !== '' &&
      newAnimal !== '' &&
      newPetsName !== '' &&
      newPetSymptoms !== '' &&
      newDisease !== ''
    );
  }, [newName, newAnimal, newPetsName, newPetSymptoms, newDisease]);

  function addInformation() {
    if (isFormValid) {
      const newUser = {
        name: newName,
        animal: newAnimal,
        petsName: newPetsName,
        petSymptoms: newPetSymptoms,
        disease: newDisease,
        id: uuidv4(),
      };

      api.post('/users', newUser).then((res) => {
        setUsers([...users, newUser]);
        console.log(res);
      });
    }
  }

  return (
    <div className="container">
      <h1>Pet Care</h1>
      <h2>Share information to help others treat their pets.</h2>
      <h2> *Don't forget to fill in all fields. </h2>
      <div>
        <input placeholder='Name' onChange={event => setNewName(event.target.value)} />
        <input placeholder='Animal' onChange={event => setNewAnimal(event.target.value)} />
        <input placeholder='Pet&apos;s name' onChange={event => setNewPetsName(event.target.value)} />
        <input placeholder='Pet&apos;s symptoms' onChange={event => setNewPetSymptoms(event.target.value)} />
        <input placeholder='Disease' onChange={event => setNewDisease(event.target.value)} />
        <button onClick={addInformation} disabled={!isFormValid}>Add information</button>
      </div>
      <div>
        <h2>See the information below. Maybe you&apos;ll discover something about your pet&apos;s illness 😊.</h2>
         <ul>
          {users.map(user => (
            <li key={user.id} > Name: {user.name} - Animal: {user.animal} - Pet&apos;s name: {user.petsName} -
              Pet&apos;s symptoms: {user.petSymptoms} -
              Disease: {user.disease} </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App;
