'use client'
import { TextareaAutosize } from '@mui/base';
import React, { useState } from 'react';

interface FormData {
  patient: string;
  name: string;
  email: string;
  date: string;
  time: string;
  description: string;
}

const ServiceForm = () => {
  const [formData, setFormData] = useState<FormData>({
    patient: '',
    name: '',
    email: '',
    date: '',
    time: '',
    description: '',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-800 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 mb-2">
            Price
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-800 mb-2">
            Category
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-800 mb-2">
            Duration
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-800 mb-2">
            Description
          </label>
          <TextareaAutosize
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="bg-[#8b5cf6] text-white px-6 py-2 rounded-md hover:bg-[#7d53df] focus:outline-none absolute right-0 top-0 mt-4 mr-4"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
