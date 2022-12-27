import React from 'react';
import {
  Button,
  SafeAreaView,
  SectionList,
  StatusBar,
  Text,
  View,
} from 'react-native';

const agenda = [{
    title: "Barbeiro 1",
    schedules: [
      { id:1, time:"8:00" },
      { id:2, time:"8:30" }]
  },
  {
    title: "Barbeiro 2",
    schedules: [
      { id:1, time:"8:00" },
      { id:2, time:"8:30" }]
  }];

export default function agenda (){  
  return(
    <View>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  <Text>Nome do Barbeiro</Text>
  <Text>12:00</Text>
  <Text>12:30</Text>
  <Text>13:00</Text>
  </View>
  )

}




  /**
   * Função responsável por retornar todos os barbeiros
   * @returns barbeiros
   */
  useEffect(()=>{
    fetch(`${server.host}:${server.port}/barbers`)
      .then((response)=>response.json())
      .then((json)=>(setBarbers(json)))
      .catch(()=>(alert('Impossível carregar a agenda!')))
  },[])

  console.log(barbers)

  // Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });