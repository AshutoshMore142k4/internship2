'use client';

import React, { useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import TaskList from '@/components/dashboard/TaskList';
import TaskForm from '@/components/dashboard/TaskForm';
import SearchBar from '@/components/dashboard/SearchBar';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuth();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSearchChange = useCallback((search: string, status: string, priority: string) => {
    setSearchQuery(search);
    setStatusFilter(status);
    setPriorityFilter(priority);
  }, []);

  const handleTaskUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Here&apos;s what you need to focus on today
        </p>
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">My Tasks</h2>
        <Button
          variant="primary"
          onClick={() => setIsTaskFormOpen(true)}
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Task
        </Button>
      </div>

      {/* Search and Filter */}
      <SearchBar onSearchChange={handleSearchChange} />

      {/* Task List */}
      <TaskList
        key={refreshKey}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onTaskUpdate={handleTaskUpdate}
      />

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSuccess={handleTaskUpdate}
      />
    </div>
  );
}
