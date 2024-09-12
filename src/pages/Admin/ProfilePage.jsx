import React, { useState, useEffect } from 'react';
import { account, storage } from '../../services/AppwriteService';
import conf from '../../services/conf';
import LogoutBtn from '../../components/Admin/LogoutBtn';
import defaultProfileImage from '../../assets/profile-logo.jpeg';

const styles = {
  profileImg: 'w-24 h-24 rounded-full',
  label: 'block text-sm font-medium text-zinc-700 pb-1',
  input: 'outline-none mt-1 block w-full py-1 px-2 border border-zinc-300 rounded-md text-sm',
  savebtn: 'bg-black hover:bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md ',
  logoutbtn: 'border border-zinc-300 text-sm px-3 py-1.5 text-sm rounded-md'
}

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePicture: '',
    profilePictureId: ''
  });
  const [initialEmail, setInitialEmail] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await account.get();
      const profilePicUrl = response.prefs.profilePicture || '';
      const profilePicId = response.prefs.profilePictureId || '';
      setUser({
        name: response.name,
        email: response.email,
        profilePicture: profilePicUrl,
        profilePictureId: profilePicId
      });
      setInitialEmail(response.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await account.updateName(user.name);
      if (user.email !== initialEmail) {
        if (password === '') {
          alert('Please enter your password to update the email.');
          return;
        }
        await account.updateEmail(user.email, password);
      }
      if (newProfilePicture) {
        if (user.profilePictureId) {
          await storage.deleteFile(conf.profilePictureBucketId, user.profilePictureId);
        }
        const file = await storage.createFile(conf.profilePictureBucketId, 'unique()', newProfilePicture);
        await account.updatePrefs({
          profilePicture: storage.getFileView(conf.profilePictureBucketId, file.$id),
          profilePictureId: file.$id
        });
      }
      alert('Profile updated successfully!');
      fetchUserData();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <div className='max-w-2xl mx-auto rounded-lg'>
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-zinc-900">Profile</h1>
          <LogoutBtn />
        </header>
        <div className='flex justify-center m-10'>
          <img
            src={user.profilePicture || defaultProfileImage}
            alt="Profile"
            className='w-24 h-24 rounded-full'
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label htmlFor='name' className={styles.label}>Name</label>
            <input
              type="text"
              name="name"  // make the input field changeble
              id="name"
              value={user.name}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          <div className='my-5'>
            <label htmlFor='email' className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          {user.email !== initialEmail && (
            <div className='my-5'>
              <label htmlFor='password' className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password to update email"
                className={styles.input}
              />
            </div>
          )}
          <div className='my-5'>
            <label htmlFor='profile-picture' className={styles.label}>Profile Picture</label>
            <input
              type="file"
              id='profile-picture'
              onChange={(e) => setNewProfilePicture(e.target.files[0])}
              className={styles.input}
            />
          </div>
          <div className='flex justify-end'>
            <button type="submit" className={styles.savebtn}>Save</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;