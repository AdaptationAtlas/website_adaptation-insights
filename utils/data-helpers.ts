import { find } from 'lodash'

// Utility function to look up project based on projectCode
export const getProject = (projectCode: string, data: any) => {
  const project = find(data, { 'projectCode': projectCode })
  return project
}

// Utility function to look up actor based on actorCode
export const getActor = (actorCode: string, data: any) => {
  const actor = find(data, { 'actorCode': actorCode })
  return actor
}

export const getProjectName = (projectCode: string, data: any) => {
  const project = find(data, { 'projectCode': projectCode })
  return project?.projectName;
}

export const getActorName = (actorCode: string, data: any) => {
  const actor = find(data, { 'actorCode': actorCode })
  return actor?.name;
}