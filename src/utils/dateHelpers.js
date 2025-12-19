// Calculate years of service (whole years only)
export const calculateYearsOfService = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years--;
  }
  
  return years;
};

// Calculate exact time in service (in years as decimal)
export const calculateExactYearsOfService = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now - start);
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const diffYears = diffDays / 365.25;
  return diffYears;
};
