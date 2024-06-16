import { Form, Link, Outlet, useLoaderData } from "react-router-dom"
import { createContact, getContacts } from "../utils/contacts"

export async function loader() {
    const contacts = await getContacts();
    return { contacts }
}

export const action = async () => {
    const contact = await createContact()
    return { contact };
}

const Root = () => {
    const { contacts } = useLoaderData()
    return (
        <div id="root">
            <div id='sidebar'>
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role='search'>
                        <input
                            id='q'
                            aria-label='Search contacts'
                            type='search'
                            name='q'
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}>
                        </div>
                        <div
                            className="sr-only"
                            aria-live='polite'>
                        </div>
                    </Form>
                    <form method='post'>
                        <button type='submit'>New</button>
                    </form>
                </div>
                <nav>
                    {contacts.length ?
                        <ul>
                            {contacts.map(contact => {
                                <li key={contact.id}>
                                    <Link to={`contacts/${contact.id}`}>
                                        {contact.first || contact.last ? (
                                            <div>
                                                {contact.first} {contact.last}
                                            </div>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>🌟</span>}
                                    </Link>
                                </li>
                            })}
                        </ul>
                        : <p>No contacts</p>
                    }
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </div>
    )
}

export default Root