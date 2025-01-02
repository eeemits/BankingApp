export const isNotEmptyString = (value: string, error?: string): boolean =>
  value !== "" && error !== undefined;

export const isUndefined = (value: null | undefined | []) => {
  return value === null || value === undefined || value.length === 0;
};

export const isArrayNotEmpty = (value: unknown[] | undefined | null) => {
  return value !== null && value !== undefined && value.length > 0;
};

// Format the date

export const formatDateTime = (value: string, formatType?: "time" | "date") => {
  const date = new Date(value);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (formatType === undefined) {
    return `${formattedDate} ${formattedTime}`;
  }

  return formatType === "date" ? formattedDate : formattedTime;
};

// Format the time
