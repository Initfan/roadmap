import React from 'react'
import MealItems from './MealItems';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {}

const Meals = () => {
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp('http://localhost:3000/meals', requestConfig, [])

    return <ul id="meals">
        {error &&
            <Error
                title='Failed to fetch meals'
                message={error}
            />
        }
        {!error && isLoading
            ? <p className='center'>Fetching meals ....</p>
            : loadedMeals.map(meal =>
                <MealItems key={meal.id} meal={meal} />
            )
        }
    </ul>
}

export default Meals