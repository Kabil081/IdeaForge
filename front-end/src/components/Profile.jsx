import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();
  
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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
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
    return () => unsubscribe();
  }, [auth, db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setProfileImage(image);
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profile: reader.result });
      };
      reader.readAsDataURL(image);
    }
  };

  const validateFormData = () => {
    const requiredFields = ['name', 'age', 'income', 'savings', 'retirement_age', 'retirement_savings', 'risk_tolerance'];
    return requiredFields.every(field => formData[field]);
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

    if (!validateFormData()) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      let profileImageUrl = '';
      if (profileImage) {
        const storageRef = ref(storage, `profile_images/${user.uid}`);
        await uploadBytes(storageRef, profileImage);
        profileImageUrl = await getDownloadURL(storageRef);
      }
      const updatedData = {
        ...formData,
        profile: profileImageUrl || formData.profile,
      };
      await setDoc(doc(db, 'profiles', user.uid), updatedData);

      // Get investment recommendation and future savings
      const response = await axios.post('http://127.0.0.1:5000/api/recommend', {
        age: parseInt(formData.age),
        current_savings: parseFloat(formData.savings),
        monthly_contribution: parseFloat(formData.income),
        years_to_retirement: parseInt(formData.retirement_age) - parseInt(formData.age),
        risk_tolerance: parseInt(formData.risk_tolerance),
      });
      setRecommendation(response.data.recommendation);
      setFutureSavings(Number(response.data.future_savings.toFixed(2)));
      setSavingsOverTime(response.data.savings_over_time);

      setFormData(updatedData);
      setSuccess('Profile saved successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(`Error saving profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetResults = () => {
    if (recommendation && futureSavings !== undefined && savingsOverTime) {
      navigate('/recommendation', { state: { recommendation, futureSavings, savingsOverTime } });
    } else {
      setError('Please generate recommendations first.');
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 p-6">
  <div className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg max-w-xl w-full md:w-3/4 lg:w-1/2">
    <h1 className="text-4xl font-extrabold text-center text-gray-800">Profile</h1>

    {error && <p className="text-red-500 text-center">{error}</p>}
    {success && <p className="text-green-500 text-center">{success}</p>}

    {isEditing ? (
      <form onSubmit={handleSubmit} className="flex flex-col">
        {formData.profile && (
          <img src={formData.profile} alt="Profile" className="mx-auto mb-4 w-32 h-32 rounded-full object-cover shadow-md" />
        )}
        <label className="flex flex-col items-center mb-4">
          <span className="text-gray-700 font-semibold mb-2">Upload Profile Picture</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 flex items-center
                       file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold 
                       file:bg-blue-500 file:text-white
                       hover:file:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {['name', 'age', 'income', 'savings', 'retirement_age', 'retirement_savings', 'risk_tolerance'].map((field, index) => (
          <input
            key={index}
            type={field === 'age' || field === 'income' || field === 'savings' || field === 'retirement_age' || field === 'retirement_savings' || field === 'risk_tolerance' ? 'number' : 'text'}
            name={field}
            placeholder={field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            value={formData[field]}
            onChange={handleChange}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg transition duration-300 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <span className="loader"></span> : 'Save Profile'}
        </button>
      </form>
    ) : (
      <div className="flex flex-col space-y-4">
        {formData.profile && (
          <img src={formData.profile} alt="Profile" className="mx-auto w-32 h-32 rounded-full object-cover shadow-md" />
        )}
        <p className="text-lg"><strong>Name:</strong> {formData.name}</p>
        <p className="text-lg"><strong>Age:</strong> {formData.age}</p>
        <p className="text-lg"><strong>Monthly Contribution:</strong> {formData.income}</p>
        <p className="text-lg"><strong>Savings:</strong> {formData.savings}</p>
        <p className="text-lg"><strong>Retirement Age:</strong> {formData.retirement_age}</p>
        <p className="text-lg"><strong>Retirement Savings:</strong> {formData.retirement_savings}</p>
        <p className="text-lg"><strong>Risk Tolerance:</strong> {formData.risk_tolerance}</p>
        
        <button
          className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>

        <button
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleGetResults}
        >
          Get Results
        </button>
      </div>
    )}
  </div>
</div>


  );
};

export default Profile;
