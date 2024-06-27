import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query'
import { fetchEvents } from '../../util/http';
import { useState } from 'react';
import LoadingIndicator from '../../components/UI/LoadingIndicator'
import ErrorBlock from '../../components/UI/ErrorBlock'
import EventItem from '../../components/Events/EventItem'

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined,
  })

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {isLoading
        ? <LoadingIndicator />
        : isError
          ? <ErrorBlock title='An error occured' message={error.info?.message || 'Failed to fetch events.'} />
          : !data
            ? <p>Please enter a search term and to find events.</p>
            : <ul className="events-list">
              {data.map((event) =>
                <li key={event.id}>
                  <EventItem event={event} />
                </li>
              )}
            </ul>
      }

      {/* <p>Please enter a search term and to find events.</p> */}
    </section>
  );
}
