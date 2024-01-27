"use client"

import { FC, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Button from './ui/Button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { nanoid } from 'nanoid'

interface ChatInputProps {
    chatPartner: User
    chatId: string
    // updateMessages: (newMessage: Message) => void
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')

    const sendMessage = async () => {
        if (!input) return
        setIsLoading(true)

        try {
            // await new Promise((resolve) => setTimeout(resolve, 1000))
            await axios.post('/api/message/send', { text: input, chatId })

            // Create a new message object based on your data structure
            // const [userId1, userId2] = chatId.split('--')

            // const partnerId = chatPartner.id === userId1 ? userId1 : userId2
            // const senderId = chatPartner.id === userId1 ? userId2 : userId1

            // const newMessage: Message = {
            //     id: nanoid(), // replace with the actual id
            //     senderId: senderId, // replace with the actual senderId
            //     receiverId: partnerId,
            //     text: input,
            //     timestamp: Date.now(), // replace with the actual timestamp
            // };

            // Update the messages in the parent component
            // updateMessages(newMessage);

            setInput('')
            textareaRef.current?.focus()
        } catch (error) {
            toast.error('Something went wrong. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-8'>
            <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
                <TextareaAutosize
                    ref={textareaRef} onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                        }
                    }}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message ${chatPartner.name}`}
                    className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6'
                />

                <div onClick={() => textareaRef.current?.focus()} className='py-2' aria-hidden='true'>
                    <div className='py-px'>
                        <div className='h-9' />
                    </div>
                </div>

                <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
                    <div className='flex-shrink-0'>
                        <Button isLoading={isLoading} onClick={sendMessage} type='submit'>Send</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInput