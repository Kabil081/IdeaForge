import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const Sendmail = ({ isOpen, closeSendmail }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission state

    const handleSubmit = (e) => {
        e.preventDefault();
        const serviceid = "service_51v2afn";
        const templateid = "template_y0pip0n";
        const publickey = "8zHn4xiVGvKjafX6D";

        const templateParam = {
            form_name: name,
            form_email: email,
            to_name: "admin",
            message: message,
        };

        emailjs.send(serviceid, templateid, templateParam, publickey)
            .then((response) => {
                console.log("success", response);
                setName('');
                setEmail('');
                setMessage('');
                setIsSubmitted(true); // Set submission state to true
                setTimeout(closeSendmail, 2000); // Close after 2 seconds
            })
            .catch((error) => {
                console.error("error", error);
            });
    };

    return (
        <>
            {/* Popup Form */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 border border-gray-300 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Contact Us</h2>
                        <input 
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            cols='30'
                            rows="10"
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            name="message"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-between mt-4">
                            <button 
                                type="submit" 
                                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                            >
                                Send Email
                            </button>
                            <button 
                                type="button" 
                                onClick={closeSendmail} 
                                className="text-red-600 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                        {isSubmitted && (
                            <p className="text-green-600 mt-4 text-center">Email sent successfully!</p>
                        )}
                    </form>
                </div>
            )}
        </>
    );
};

export default Sendmail;







