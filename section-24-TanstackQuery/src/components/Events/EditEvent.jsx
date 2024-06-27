import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  })

  const { mutate, isPending: pendingUpdate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async ({ event }) => {
      await queryClient.cancelQueries(['events', params.id]);
      const prevEvent = queryClient.getQueryData(['events', params.id]);

      queryClient.setQueryData(['events', params.id], event);

      return { prevEvent }
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', params.id], context.prevEvent)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id]);
    }
  })

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData })
    navigate('..')
  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      {isPending
        ? <LoadingIndicator />
        : isError
          ? <>
            <ErrorBlock title='Failed to load event' message={error.info?.message || 'Failed to load event. Please check your inputs and try again later.'} />
          </>
          : data &&
          <EventForm inputData={data} onSubmit={handleSubmit}>
            {pendingUpdate
              ? <p>Updating event...</p>
              : <>
                <Link to="../" className="button-text">
                  Cancel
                </Link>
                <button type="submit" className="button">
                  Update
                </button>
              </>
            }
          </EventForm>
      }
    </Modal>

  );
}
