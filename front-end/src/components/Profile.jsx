import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();  // Initialize navigate
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    profile: '',
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
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [futureSavings, setFutureSavings] = useState(null);
  const [savingsOverTime, setSavingsOverTime] = useState(null);

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
    setLoading(true);

    if (!user) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    try {
      let profileImageUrl = '';
      if (profileImage) {
        const storageRef = ref(storage, `profile_images/${user.uid}`);
        await uploadBytes(storageRef, profileImage);
        profileImageUrl = await getDownloadURL(storageRef);
        console.log('Profile image uploaded:', profileImageUrl);
      }

      const updatedData = {
        ...formData,
        profile: profileImageUrl || formData.profile,
      };

      await setDoc(doc(db, 'profiles', user.uid), updatedData);
      console.log('Profile data saved:', updatedData);

      // Get investment recommendation and future savings
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/recommend', {
          age: parseInt(formData.age),
          current_savings: parseFloat(formData.savings),
          monthly_contribution: parseFloat(formData.income),
          years_to_retirement: parseInt(formData.retirement_age) - parseInt(formData.age),
          risk_tolerance: parseInt(formData.risk_tolerance)
        });
        console.log('Recommendation response:', response.data);
        setRecommendation(response.data.recommendation);
        setFutureSavings(Number(response.data.future_savings.toFixed(2)));
        setSavingsOverTime(response.data.savings_over_time);
      } catch (apiError) {
        console.error('API Error:', apiError);
        setError(`Error getting recommendation: ${apiError.message}`);
      }

      setFormData(updatedData);
      setSuccess('Profile saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile save error:', error);
      setError(`Error saving profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetResults = () => {
    // Ensure that recommendation and futureSavings are available
    if (recommendation && futureSavings !== undefined && savingsOverTime) {
      navigate('/recommendation', { state: { recommendation, futureSavings, savingsOverTime } });
    } else {
      setError('Please generate recommendations first.');
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="income"
              placeholder="Monthly Income"
              value={formData.income}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="savings"
              placeholder="Current Savings"
              value={formData.savings}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="retirement_age"
              placeholder="Retirement Age"
              value={formData.retirement_age}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="retirement_savings"
              placeholder="Retirement Savings"
              value={formData.retirement_savings}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="risk_tolerance"
              placeholder="Risk Tolerance (1-5)"
              value={formData.risk_tolerance}
              onChange={handleChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        ) : (
          <div className="flex flex-col space-y-4">
            {formData.profile && <img src={formData.profile} alt="Profile" className="ml-8 w-40 h-40 rounded-full object-cover" />}
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Monthly contribution:</strong> {formData.income}</p>
            <p><strong>Savings:</strong> {formData.savings}</p>
            <p><strong>Retirement Age:</strong> {formData.retirement_age}</p>
            <p><strong>Retirement Savings:</strong> {formData.retirement_savings}</p>
            <p><strong>Risk Tolerance:</strong> {formData.risk_tolerance}</p>
            <button
              className="w-full py-2 bg-green-500 text-white font-semibold rounded-sm hover:bg-green-600 transition duration-300"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            {/* Get Results Button */}
            <button
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-sm hover:bg-blue-700 transition duration-300"
              onClick={handleGetResults}
            >
              Get Results
            </button>
          </div>
        ) 
        }
      </div>
    </div>
  );
};

export default Profile;