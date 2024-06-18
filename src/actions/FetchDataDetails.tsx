"use server";

export const fetchDataDetails = async (url?: string) => {
  const res = await fetch(`${url}`);
  const data = await res.json();

  return data.data;
};