import React, { useState, useEffect } from 'react'
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios';

function App() {

  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10&category=31')
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: decodeString(questionItem.correct_answer)
          }
        }))
      })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
    <div className="container">
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default App;
