
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  X,
  FileText,
  Settings,
  HelpCircle,
  Trash2,
  Check
} from 'lucide-react';
const PROMPT_CATEGORIES = ['head', 'body', 'movement'];
const MEDIA_TYPES = ['text', 'audio', 'video', 'mixed', 'none'];

const Sidebar = ({
  isOpen,
  onParticipantInfoClick,
  onTestSelect,
  onSettingsClick,
  onHelpClick
}) => {
  // State management
  const [isAddTestDialogOpen, setIsAddTestDialogOpen] = useState(false);
  const [newTestName, setNewTestName] = useState('');
  const [newTestDescription, setNewTestDescription] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [existingTests, setExistingTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing chatbot settings on component mount
  useEffect(() => {
    const fetchChatbotSettings = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/auth/getChatbotSettings');
        setExistingTests(response.data.settings || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching chatbot settings:', err);
        setError('Failed to load chatbot settings');
        setIsLoading(false);
      }
    };

    fetchChatbotSettings();
  }, []);

  // Prompt management functions
  const addPrompt = () => {
    setPrompts([
      ...prompts,
      {
        category: '',
        requiredMediaType: '',
        promptText: ''
      }
    ]);
  };

  const updatePrompt = (index, field, value) => {
    const updatedPrompts = [...prompts];
    updatedPrompts[index][field] = value;
    setPrompts(updatedPrompts);
  };

  const removePrompt = (index) => {
    const updatedPrompts = prompts.filter((_, i) => i !== index);
    setPrompts(updatedPrompts);
  };

  // Add new test to the system
  const handleAddTest = async () => {
    try {
      // Validate input
      if (!newTestName || prompts.length === 0) {
        alert('Please provide a test name and at least one prompt');
        return;
      }

      const nextTestNumber = existingTests.length + 1;
      const testId = `test${nextTestNumber}`;

      const testData = {
        testId,
        name: newTestName,
        description: newTestDescription,
        isActive: true,
        prompts: prompts.map((prompt, index) => ({
          order: index + 1,
          ...prompt,
          isRequired: true,
          timeout: 60
        })),
        createdBy: 'system'
      };

      const response = await axios.post('/api/auth/addChatbotSettings', testData);

      // Update local state
      setExistingTests([
        ...existingTests,
        {
          testId,
          name: newTestName,
          description: newTestDescription
        }
      ]);

      // Reset form
      setNewTestName('');
      setNewTestDescription('');
      setPrompts([]);
      setIsAddTestDialogOpen(false);

      alert(`New test ${testId} added successfully!`);
    } catch (error) {
      console.error('Error adding test:', error);
      alert('Failed to add test. Please try again.');
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div
        className={`
          ${isOpen ? 'w-64' : 'w-0'} 
          h-screen 
          bg-gray-800 
          text-white 
          transition-all 
          duration-300 
          ease-in-out 
          overflow-hidden
        `}
      >
        <div className="p-4 animate-pulse">Loading tests...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div
        className={`
          ${isOpen ? 'w-64' : 'w-0'} 
          h-screen 
          bg-gray-800 
          text-white 
          transition-all 
          duration-300 
          ease-in-out 
          overflow-hidden
        `}
      >
        <div className="p-4 text-red-400">{error}</div>
      </div>
    );
  }

  // Render main sidebar
  return (
    <div
      className={`
        ${isOpen ? 'w-64' : 'w-0'} 
        h-screen 
        bg-gray-900 
        text-white 
        transition-all 
        duration-300 
        ease-in-out 
        overflow-hidden 
        shadow-lg
      `}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Test Management</h2>
            <button
              onClick={() => setIsAddTestDialogOpen(true)}
              className="hover:bg-gray-700 p-2 rounded-full transition-colors"
              title="Add New Test"
            >
              <Plus size={24} className="text-blue-400 hover:text-blue-300" />
            </button>
          </div>

          {/* Sidebar Navigation Items */}
          <div className="space-y-2">
            <div
              onClick={onParticipantInfoClick}
              className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer transition-colors"
            >
              <FileText size={18} className="mr-3 text-blue-400" />
              <span>Participant Info</span>
            </div>

            {/* Dynamically render existing tests */}
            {existingTests.map((test) => (
              <div
                key={test.testId}
                onClick={() => onTestSelect(test.testId)}
                className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer transition-colors"
              >
                <FileText size={18} className="mr-3 text-green-400" />
                <span>{test.name}</span>
              </div>
            ))}

            <div
              onClick={onHelpClick}
              className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer transition-colors"
            >
              <HelpCircle size={18} className="mr-3 text-purple-400" />
              <span>Help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Test Modal */}
      {isAddTestDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Create New Test</h2>
              <button
                onClick={() => setIsAddTestDialogOpen(false)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Test Name and Description */}
            <div className="space-y-4">
              {/* <div>
                <label className="block text-sm font-medium text-black-700 mb-1">Test Name</label>
                <input
                  value={newTestName}
                  onChange={(e) => setNewTestName(e.target.value)}
                  placeholder="Enter test name"
                  className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
                <input
                  value={newTestName}
                  onChange={(e) => setNewTestName(e.target.value)}
                  placeholder="Enter test name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
  <textarea
    value={newTestDescription}
    onChange={(e) => setNewTestDescription(e.target.value)}
    placeholder="Enter test description"
    rows={3}
    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
            </div>

            {/* Prompts Section */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Prompts</h3>
                <button
                  onClick={addPrompt}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  type="button"
                >
                  <Plus size={18} className="mr-1" /> Add Prompt
                </button>
              </div>

              {prompts.map((prompt, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3 relative">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                    <select
                      value={prompt.category}
                      onChange={(e) => updatePrompt(index, 'category', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded-md text-black text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {PROMPT_CATEGORIES.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Media Type</label>
                    <select
                      value={prompt.requiredMediaType}
                      onChange={(e) => updatePrompt(index, 'requiredMediaType', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded-md text-black text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Media Type</option>
                      {MEDIA_TYPES.map(mediaType => (
                        <option key={mediaType} value={mediaType}>
                          {mediaType}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Prompt Text</label>
                    <textarea
                      value={prompt.promptText}
                      onChange={(e) => updatePrompt(index, 'promptText', e.target.value)}
                      placeholder="Enter detailed prompt text"
                      rows={3}
                      className="w-full px-2 py-1 border border-gray-200 rounded-md text-black text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <button
                    onClick={() => removePrompt(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddTestDialogOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTest}
                disabled={!newTestName || prompts.length === 0}
                className={`
                  px-4 py-2 
                  rounded-md 
                  transition-colors 
                  flex items-center
                  ${!newTestName || prompts.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'}
                `}
              >
                <Check size={18} className="mr-2" /> Add Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
