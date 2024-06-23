import React, { useRef } from 'react'
import Input from './Input'
import Modal from './Modal'

const NewProject = ({ onAdd, onCancel }) => {
    const modal = useRef()

    const title = useRef()
    const desc = useRef()
    const dueDate = useRef()

    const handleSave = () => {
        const enteredTitle = title.current.value;
        const enteredDesc = desc.current.value;
        const enteredDueDate = dueDate.current.value;

        if (enteredTitle.trim() === '' || enteredDesc.trim() === '' || enteredDueDate.trim() === '')
            return modal.current.open()


        onAdd({
            title: enteredTitle,
            description: enteredDesc,
            dueDate: enteredDueDate,
        })
    }

    return (
        <>
            <Modal ref={modal} buttonCaption='Okay'>
                <h2 className='text-xl font-bold text-stone-700 mt-4 my-4'>Invalid Input</h2>
                <p className='text-stone-600 mb-4'>Oops ... looks like you forgot to enter a value.</p>
                <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field.</p>
            </Modal>
            <div className='w-[35rem] mt-16'>
                <menu className='flex items-center justify-end gap-4 my-4'>
                    <li><button onClick={onCancel} className='text-stone-800 hover:text-stone-950'>Cancel</button></li>
                    <li><button onClick={handleSave} className='bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md'>Save</button></li>
                </menu>
                <div>
                    <Input ref={title} type='text' label='Title' />
                    <Input ref={desc} label='Description' textarea />
                    <Input ref={dueDate} type='date' label='Due Date' />
                </div>
            </div>
        </>
    )
}

export default NewProject