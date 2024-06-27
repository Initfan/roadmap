import { Link, Outlet, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal })
  })

  const { mutate, isPending: isPendingDeleting, isError: isErrorDeleting, error: deleteError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      });
      navigate('/events');
    }
  })

  const handleStartDelete = () => setIsDeleting(true)

  const handleStopDelete = () => setIsDeleting(true)

  const deleteHandler = () => mutate({ id: params.id })

  return (
    <>
      {isDeleting &&
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event? This action cannot be undone.</p>
          <div className="form-actions">
            {isPendingDeleting
              ? <p>Deleting, please wait...</p>
              : <>
                <button className='button-text' onClick={handleStopDelete}>Cancel</button>
                <button className='button' onClick={deleteHandler}>Delete</button>
              </>
            }
          </div>
          {isErrorDeleting &&
            <ErrorBlock
              title='Failed to delete event'
              message={deleteError.info?.message || 'Failed to delete event, please try again later.'}
            />}
        </Modal>
      }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {isPending
          ? <LoadingIndicator />
          : isError
            ? <ErrorBlock title='Could not fetch event' message={error.info?.message || 'Failed to fetch event'} />
            : !data
              ? <p>No data</p>
              :
              <>
                <header>
                  <h1>{data.title}</h1>
                  <nav>
                    <button onClick={handleStartDelete}>Delete</button>
                    <Link to="edit">Edit</Link>
                  </nav>
                </header>
                <div id="event-details-content">
                  <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
                  <div id="event-details-info">
                    <div>
                      <p id="event-details-location">{data.location}</p>
                      <time dateTime={`Todo-DateT$Todo-Time`}>
                        {new Date(data.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })
                        },
                        {data.time}</time>
                    </div>
                    <p id="event-details-description">{data.description}</p>
                  </div>
                </div>
              </>
        }
      </article >
    </>
  );
}
