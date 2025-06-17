import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

type FormData = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  partySize: string;
  budget: string;
  serviceType: string;
  message: string;
};

const ConsultationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log('Form data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-lg mb-4">Your consultation request has been submitted successfully.</p>
        <p className="text-gray-600">
          Our team will contact you within 24 hours to discuss your event details and provide you with a customized quote.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      {/* Logo Container - Fixed height and proper spacing */}
      <div className="h-24 mb-8 flex items-center justify-center">
        <Image 
          src="/images/logo.png" 
          alt="Purple Haze BBQ Logo" 
          width={200} 
          height={100} 
          className="object-contain w-auto h-full"
          priority
        />
      </div>
      
      <h3 className="text-2xl font-bold mb-8 text-ph-purple text-center">Request a Consultation</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ph-purple focus:border-ph-purple ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address*
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ph-purple focus:border-ph-purple ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number*
            </label>
            <input
              id="phone"
              type="tel"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ph-purple focus:border-ph-purple ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('phone', { required: 'Phone number is required' })}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* Event Date */}
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
              Event Date*
            </label>
            <input
              id="eventDate"
              type="date"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ph-purple focus:border-ph-purple ${
                errors.eventDate ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('eventDate', { required: 'Event date is required' })}
            />
            {errors.eventDate && (
              <p className="mt-1 text-sm text-red-600">{errors.eventDate.message}</p>
            )}
          </div>

          {/* Event Time */}
          <div>
            <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-1">
              Event Time*
            </label>
            <input
              id="eventTime"
              type="time"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ph-purple focus:border-ph-purple ${
                errors.eventTime ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('eventTime', { required: 'Event time is required' })}
            />
            {errors.eventTime && (
              <p className="mt-1 text-sm text-red-600">{errors.eventTime.message}</p>
            )}
          </div>

          {/* Party Size */}
          <div>
            <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 mb-1">
              Party Size*
            </label>
            <select
              id="partySize"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ph-purple focus:border-ph-purple ${
                errors.partySize ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('partySize', { required: 'Party size is required' })}
            >
              <option value="">Select party size</option>
              <option value="small">Small (10-25 guests)</option>
              <option value="medium">Medium (25-50 guests)</option>
              <option value="large">Large (50+ guests)</option>
              <option value="custom">Custom size (specify in message)</option>
            </select>
            {errors.partySize && (
              <p className="mt-1 text-sm text-red-600">{errors.partySize.message}</p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
              Expected Budget
            </label>
            <select
              id="budget"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ph-purple focus:border-ph-purple"
              {...register('budget')}
            >
              <option value="">Select budget range</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000-5000">$2,000 - $5,000</option>
              <option value="5000+">$5,000+</option>
              <option value="undecided">Undecided/Need guidance</option>
            </select>
          </div>

          {/* Service Type */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type*</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  id="delivery"
                  type="radio"
                  value="delivery"
                  className="h-4 w-4 text-ph-purple focus:ring-ph-purple border-gray-300"
                  {...register('serviceType', { required: 'Service type is required' })}
                />
                <label htmlFor="delivery" className="ml-2 text-gray-700">
                  Delivery only
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="onsite"
                  type="radio"
                  value="onsite"
                  className="h-4 w-4 text-ph-purple focus:ring-ph-purple border-gray-300"
                  {...register('serviceType', { required: 'Service type is required' })}
                />
                <label htmlFor="onsite" className="ml-2 text-gray-700">
                  On-site service
                </label>
              </div>
            </div>
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ph-purple focus:border-ph-purple"
            placeholder="Tell us more about your event, any dietary restrictions, specific menu requests, etc."
            {...register('message')}
          ></textarea>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-ph-purple text-white rounded-lg font-semibold hover:bg-ph-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;