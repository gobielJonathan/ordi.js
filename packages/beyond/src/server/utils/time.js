export const minutesToMs = (minutes = 0) => minutes * 1000;
export const minutesToSeconds = (minutes = 0) => minutes * 60;

export const isStaleTime = (date) => {
  if (date instanceof Date) {
    return date <= new Date();
  }
  return new Date(date) <= new Date();
};

export const revalidateTime = (minutes, from) => {
  return minutes * 60000 + from;
};
