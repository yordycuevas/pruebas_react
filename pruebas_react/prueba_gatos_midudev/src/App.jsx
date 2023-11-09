import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_FACT_URL = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says/'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Paso 1: Obtener el hecho sobre los gatos desde la API
        const response = await fetch(CAT_ENDPOINT_FACT_URL)
        const data = await response.json()
        const { fact } = data
        setFact(fact)
        console.log('Fact:', fact)

        // Obtener las primeras tres palabras del hecho
        const firstThreeWords = fact.split(' ', 3).join(' ')
        console.log('3Words:', firstThreeWords)

        // Codificar las palabras para formar una URL segura
        const encodedWords = encodeURIComponent(firstThreeWords)
        console.log('Encoded:', encodedWords)

        // Construir la URL de la imagen
        const imageUrl = `${CAT_PREFIX_IMAGE_URL}${encodedWords}?fontSize=50&fontColor=red`
        console.log('URL:', imageUrl)

        // Establecer la URL de la imagen
        setImageUrl(imageUrl)
        console.log('Image URL:', imageUrl)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <main>
      <h1>App gatos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
      </section>
    </main>
  )
}
