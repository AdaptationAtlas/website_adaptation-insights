import { orderBy } from 'lodash'
import { ActorData, ProjectData } from '@/types/sidebar.types'

export const fetchData = async (url: any) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.json();
}

// TODO - move sorting to a separate utils file

export const sortActors = (data: any, viewByBudget: boolean) => {
  const orderField = viewByBudget ? 'totalBudget' : 'totalBeneficiaries';
  const sortedData = orderBy(
    data,
    [orderField, 'name'], // Fallback to 'name' if you want to sort by name when values are equal
    ['desc', 'asc'] // Or any other order you prefer
  )
  return sortedData
}

export const sortProjects = (data: any, viewByBudget: boolean) => {
  const sortedData = orderBy(
    data,
    [
      // Check if budget is null only when sorting by budget
      viewByBudget ? (project) => project.budget === null : (project) => project.beneficiaryNum === null,
      viewByBudget ? 'budget' : 'beneficiaryNum', // Choose field to sort by based on state
    ],
    [viewByBudget ? 'asc' : 'asc', viewByBudget ? 'desc' : 'desc'] // Adjust the sort order
  );
  return sortedData
}

// TODO - move filtering to a separate utils file

export const filterByYear = (data: ProjectData[], year: number) => {
  // Add checks to ensure minStartDate and maxEndDate are not null
  return data.filter(item => 
    (item.minStartDate !== null && item.minStartDate <= year) &&
    (item.maxEndDate !== null && item.maxEndDate >= year)
  )
}

export const filterByCountry = (data: ProjectData[], country: string) => {
  return data.filter(item => item.countries?.includes(country));
}

export const filterByType = (data: ActorData[], type: string) => {
  return data.filter(item => item.type === type);
}



