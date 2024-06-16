import { Form, useLoaderData } from 'react-router-dom'
import { getContact } from '../utils/contacts'

export const loader = async ({ contactId }) => {
    const contact = await getContact(contactId)
    return { contact }
}

const Contact = () => {
    const { contact } = useLoaderData()

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || `https://robohash.org/${contact.id}.png?size=200x200`}
                    alt={contact.first} />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <div>
                            {contact.first} {contact.last}
                        </div>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target='_blank'
                            href={`https://twitter.com/${contact.twitter}`}>
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action='edit'>
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method='post'
                        action='destroy'
                        onSubmit={(e) => {
                            if (!confirm("Please confirm you want to delete this record.")) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

const Favorite = (contact) => {
    const favorite = contact.favorite;
    return (
        <Form method='post'>
            <button
                name='favorite'
                value={favorite ? 'false' : 'true'}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {favorite ? '⭐' : '🌟'}
            </button>
        </Form>
    )
}

export default Contact