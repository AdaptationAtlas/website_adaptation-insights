type Partner = {
  actorCode: string,
  type: string
}

type Collaborator = {
  actorCode: string,
  projectsShared: number
}

type Project = {
  projectCode: string,
  numCollaborators: number
}

export type ActorData = {
  actorCode: string
  beneficiaryFlagMultiple: boolean | null
  collaborators: Collaborator[] | null
  email: string | null
  name: string
  projects: Project[] | null
  totalBeneficiaries: number | null
  totalBudget: number | null
  type: string | null
}

export type ProjectData = {
  beneficiaryFlagMultiple: boolean | null
  beneficiaryNum: number | null
  beyondFarmAdaptations: string[] | null
  budget: number | null
  budgetCurrency: string | null
  budgetEuro: number | null
  maxEndDate: number | null
  minStartDate: number | null
  onFarmAdaptations: string[] | null
  partners: Partner[] | null
  projectCode: string
  projectName: string
  projectScale: string | null
  targetedBeneficiaries: string[] | null
  targetedValueChains: string[] | null
  vulnerableGroups: string[] | null
}