import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
    savings: '',
    retirement_age: '',
    retirement_savings: '',
    risk_tolerance: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, 'profiles', currentUser.uid));
        if (userDoc.exists()) {
          setFormData(userDoc.data());
          setIsEditing(false);
        }
      } else {
        setError('Please log in to view your profile.');
      }
    });
  }, [auth, db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!user) {
      setError('User not logged in');
      return;
    }
    try {
      await setDoc(doc(db, 'profiles', user.uid), formData);
      setSuccess('Profile saved successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gradient-to-r from-blue-500 to-green-500">
<<<<<<< HEAD
  <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg">
    <h1 className="text-center text-3xl font-bold text-indigo-700">
      {isEditing ? 'Edit Profile' : 'Profile Details'}
    </h1>
    {error && <div className="text-red-500 text-center">{error}</div>}
    {success && <div className="text-green-500 text-center">{success}</div>}
    {isEditing ? (
      <form onSubmit={handleSubmit} className="space-y-4 flex w-[700px] flex-col items-center">
        <input name="name" className="px-4 py-2 w-[600px] rounded-sm border border-gray-300" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
        <input name="age" className="px-4 py-2 w-[600px] rounded-sm border border-gray-300" type="number" value={formData.age} onChange={handleChange} placeholder="Enter your age" required />
        <input name="income" className="px-4 py-2 w-[600px] rounded-sm border border-gray-300" type="number" value={formData.income} onChange={handleChange} placeholder="Enter your income" required />
        <input name="savings" className="px-4 py-2 w-[600px] rounded-sm border border-gray-300" type="number" value={formData.savings} onChange={handleChange} placeholder="Enter your savings" required />
        <input name="retirement_age" className="px-4 py-2 w-[600px] rounded-sm border border-gray-300" type="number" value={formData.retirement_age} onChange={handleChange} placeholder="Enter retirement age" required />
        <input name="retirement_savings" className="px-4 py-2 w-[600px] rounded-sm border border-gray-300" type="number" value={formData.retirement_savings} onChange={handleChange} placeholder="Enter retirement savings" required />
        <input name="risk_tolerance" className="px-4 py-2 w-[600px] rounded-sm border border-gray-300" type="number" value={formData.risk_tolerance} onChange={handleChange} placeholder="Enter risk tolerance (1-10)" required />
        <button className="w-[200px] py-2 bg-blue-500 text-white font-semibold rounded-sm hover:bg-blue-600 transition duration-300" type="submit">Save</button>
      </form>
    ) : (
      <div className="flex flex-col space-y-4">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Age:</strong> {formData.age}</p>
        <p><strong>Income:</strong> {formData.income}</p>
        <p><strong>Savings:</strong> {formData.savings}</p>
        <p><strong>Retirement Age:</strong> {formData.retirement_age}</p>
        <p><strong>Retirement Savings:</strong> {formData.retirement_savings}</p>
        <p><strong>Risk Tolerance:</strong> {formData.risk_tolerance}</p>
        <button className="w-full py-2 bg-green-500 text-white font-semibold rounded-sm hover:bg-green-600 transition duration-300" onClick={() => setIsEditing(true)}>Edit</button>
=======
      <div className="flex flex-col gap-6 bg-white p-[40px] rounded-[15px]">
        <h1 className="text-center text-3xl pb-3 font-bold text-indigo-700"  >Details to enter</h1>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="text" placeholder="Enter your name"></input>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter your age"></input>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter your income"/>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter your savings"/>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter retirement age"/>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter retirement savings"/>
        <input className="px-4 py-2 w-96 rounded-sm outline-none border-gray-600 border-[1px]" type="number" placeholder="Enter risk tolerance (0-5)"/>
        <div className="flex justify-center w-full">
          <button className="bg-blue-500 font-semibold text-lg text-white px-[15px] py-[7px] rounded-[8px] w-[40%] hover:scale-[1.15] transition duration-300 active:scale-[1]">Submit</button>
        </div>
>>>>>>> b7312dc5f4989516ca7de16616f41be1662300a4
      </div>
    )}
  </div>
</div>

  );
};

export default Profile;
