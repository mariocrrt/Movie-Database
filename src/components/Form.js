import React, { useState } from 'react'
import MovieCard from './MovieCard'

const Form = () => {
    const apiKey = process.env.REACT_APP_API_KEY
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [inputIsEmpty, setInputIsEmpty] = useState(true)

    const searchMovies =  async (e) => {
        if(inputIsEmpty) {
            window.location.reload()
        } else {
            e.preventDefault()
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
            try {
                const res = await fetch (url)
                const data = await res.json()
                setMovies(data.results)
            } catch (err) {
                console.error(err)
            }
        }
    }

    const handleChange = (e) => {
        setQuery(e.target.value)
        if(!e.target.value) {
            setInputIsEmpty(true)
        } else {
            setInputIsEmpty(false)
        }
    }

    return(
        <div>
            <form onSubmit={searchMovies}>
                <label htmlFor='query'></label>
                <input 
                    autoComplete='off'
                    type='text' 
                    name='query'
                    value={query}
                    placeholder='Search...'
                    onChange={handleChange}
                />
                <button type='submit'>Search</button>
                </form>
                {movies.length
                    ?   <div className='card_list'>
                            {movies.filter(movie => movie.poster_path).map(movie => (
                                <MovieCard movie={movie} />
                            ))}       
                        </div>
     
                    :   <h1 className='conditional_message'>Nothing here...</h1>
                }
        </div>
    )
}

export default Form