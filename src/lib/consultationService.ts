import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  partySize: string;
  budget?: string;
  serviceType: string;
  message?: string;
  selectedPackage?: string;
  selectedItems?: {
    proteins?: string[];
    sides?: Array<{ id: string; size: 'half' | 'full' }>;
  };
}

export const submitConsultation = async (formData: ConsultationFormData) => {
  try {
    // Add timestamp and status
    const consultationData = {
      ...formData,
      createdAt: serverTimestamp(),
      status: 'new',
      estimatedCost: 0, // Will be calculated later
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'consultations'), consultationData);

    // Send email notification (you'll need to set up an email service)
    await sendNotificationEmail(formData);

    return {
      success: true,
      id: docRef.id,
      message: 'Consultation request submitted successfully'
    };
  } catch (error) {
    console.error('Error submitting consultation:', error);
    return {
      success: false,
      message: 'Failed to submit consultation request'
    };
  }
};

// Email notification function (placeholder - implement with your email service)
const sendNotificationEmail = async (formData: ConsultationFormData) => {
  // Implement email sending logic here
  // You might want to use SendGrid, AWS SES, or another email service
  console.log('Email notification would be sent here:', formData);
};

// Function to calculate estimated cost
export const calculateEstimatedCost = (formData: ConsultationFormData) => {
  let baseCost = 0;

  // Base cost by party size
  switch (formData.partySize) {
    case 'small':
      baseCost = 500;
      break;
    case 'medium':
      baseCost = 1000;
      break;
    case 'large':
      baseCost = 2000;
      break;
    default:
      baseCost = 500;
  }

  // Add costs for selected items
  if (formData.selectedItems) {
    // Add protein costs
    const proteinCost = (formData.selectedItems.proteins?.length || 0) * 100;
    baseCost += proteinCost;

    // Add sides costs
    const sidesCost = formData.selectedItems.sides?.reduce((total, side) => {
      return total + (side.size === 'full' ? 75 : 45);
    }, 0) || 0;
    baseCost += sidesCost;
  }

  // Add service cost
  if (formData.serviceType === 'onsite') {
    baseCost += 250;
  }

  return baseCost;
};