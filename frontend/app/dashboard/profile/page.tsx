'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { userAPI } from '@/lib/api-client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const response = await userAPI.updateProfile({ name, avatar });
      const updatedUser = response.data.data;

      updateUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setAvatar(user?.avatar || '');
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-8">
          <img
            src={user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'User')}
            alt="Profile"
            className="h-24 w-24 rounded-full ring-4 ring-primary-100"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            {user?.createdAt && (
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={user?.email || ''}
            disabled
            helperText="Email cannot be changed"
          />

          <Input
            label="Avatar URL"
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            disabled={!isEditing}
            helperText="Provide a URL to your profile picture"
          />

          <div className="flex gap-3 pt-4">
            {!isEditing ? (
              <Button
                type="button"
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
