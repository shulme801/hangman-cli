// Thanks to Charlie Kenney for sharing this code!

import { stringify } from 'querystring';
import axios from 'axios';

const BASE_URL = 'http://api.wordnik.com/v4/words.json/randomWord';

const query = stringify({
  hasDictionaryDef: true,
  includePartOfSpeech: 'verb',
  minCorpusCount: 1000,
  maxCorpusCount: -1,
  minDictionaryCount: 1,
  maxDictionaryCount: 1,
  minLength: 3,
  maxLength: 7,
  api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
})

const apiUrl = `${BASE_URL}?${query}`

export default async () => {
  try {
    const { data } = await axios.get(apiUrl)
    return data.word
  } catch ({ message }) {
    console.error(`Error fetching random word: ${message}`)
  }
}