import { calculateExactYearsOfService, calculateYearsOfService } from './dateHelpers';

// Determine if anniversary reminder needed
export const getAnniversaryReminder = (startDate) => {
  const exactYears = calculateExactYearsOfService(startDate);
  const yearsOfService = calculateYearsOfService(startDate);
  
  // Check if exactly 5, 10, 15, 20, 25, etc. years
  if (Math.abs(exactYears - Math.round(exactYears)) < 0.02 && yearsOfService > 0 && yearsOfService % 5 === 0) {
    return {
      emoji: '🎉',
      message: 'Schedule recognition meeting.'
    };
  }
  
  // Check if less than 6 months
  if (exactYears < 0.5) {
    return {
      emoji: '🔔',
      message: 'Schedule probation review.'
    };
  }
  
  return null;
};
