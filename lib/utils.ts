import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function unslugify(str: string) {
  return str.replace(/-/g, " ");
}

export function prettifyDate(date: Date) {

  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear().toString().slice(-2); 
  
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  
  return formattedDate;
}