import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth();
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await sendPasswordResetEmail(auth, email); 
            setMessage('Password reset email sent! Check your inbox.');
            navigate('/login')
        } catch (error) {
            setError('Error sending email: ' + error.message);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 rounded-lg w-full p-2 mb-4 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                    Send Reset Link
                    </button>
                </form>
                {message && <p className="text-center text-green-600 mt-4">{message}</p>}
                {error && <p className="text-center text-red-600 mt-4">{error}</p>}
            </div>
        </div>
    );
};
export default ForgotPassword;
