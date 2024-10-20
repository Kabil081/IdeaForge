import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AddIcon from '@mui/icons-material/Add';

const Profile = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
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

      setFormData(updatedData);
      setSuccess('Profile saved successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold text-indigo-700">
          {isEditing ? 'Edit Profile' : 'Profile Details'}
        </h1>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-500 text-center">{success}</div>}
        {loading && <div className="text-center">Loading...</div>}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4 flex w-[700px] flex-col items-center">
            <label 
              className="flex items-center justify-center w-[600px] h-12 border border-gray-300 rounded-md cursor-pointer"
              htmlFor="profile-upload"
            >
              <AddIcon />
              <span className="ml-2 text-lg">Add/Change profile picture</span>
              <input
                id="profile-upload"
                name="profile"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {/* Other input fields */}
            <input
              name="name"
              className="px-4 py-2 w-[600px] rounded-sm border border-gray-300"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            <input
              name="age"
              className="px-4 py-2 w-[600px] rounded-sm border border-gray-300"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
            />
            <input
              name="income"
              className="px-4 py-2 w-[600px] rounded-sm border border-gray-300"
              type="number"
              value={formData.income}
              onChange={handleChange}
              placeholder="Enter your monthly contribution"
              required
            />
            <input
              name="savings"
              className="px-4 py-2 w-[600px] rounded-sm border border-gray-300"
              type="number"
              value={formData.savings}
              onChange={handleChange}
              placeholder="Enter your savings"
              required
            />
            <input
              name="retirement_age"
              className="px-4 py-2 w-[600px] rounded-sm border border-gray-300"
              type="number"
              value={formData.retirement_age}
              onChange={handleChange}
              placeholder="Enter retirement age"
              required
            />
            <input
              name="retirement_savings"
              className="px-4 py-2 w-[600px] rounded-sm border border-gray-300"
              type="number"
              value={formData.retirement_savings}
              onChange={handleChange}
              placeholder="Enter retirement savings"
              required
            />
            <input
              name="risk_tolerance"
              className="px-4 py-2 w-[600px] rounded-sm border border-gray-300"
              type="number"
              value={formData.risk_tolerance}
              onChange={handleChange}
              placeholder="Enter risk tolerance (1-5)"
              required
            />
            <button
              className="w-[200px] py-2 bg-blue-500 text-white font-semibold rounded-sm hover:bg-blue-600 transition duration-300"
              type="submit"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="flex flex-col space-y-4">
            {formData.profile && <img src={formData.profile} alt="Profile" className="ml-8 w-40 h-40 rounded-full object-cover" />}
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Income:</strong> {formData.income}</p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
