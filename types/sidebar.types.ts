type Partner = {
  actorCode: string
  type: string
}

type Collaborator = {
  actorCode: string
  projectsShared: number
}

type Project = {
  projectCode: string
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

type TargetedBeneficiary = {
  name: string,
  freeResponse: boolean
}

type TargetedValueChains = {
  name: string,
  freeResponse: boolean
}

type OnFarmAdaptations = {
  name: string,
  freeResponse: boolean
}

type BeyondFarmAdaptations = {
  name: string,
  freeResponse: boolean
}

export type ProjectData = {
  beneficiaryFlagMultiple: boolean | null
  beneficiaryNum: number | null
  beyondFarmAdaptations: BeyondFarmAdaptations[] | null
  budget: number | null
  budgetCurrency: string | null
  budgetEuro: number | null
  maxEndDate: number | null
  minStartDate: number | null
  onFarmAdaptations: OnFarmAdaptations[] | null
  partners: Partner[] | null
  projectCode: string
  projectName: string
  projectScale: string | null
  targetedBeneficiaries: TargetedBeneficiary[] | null
  targetedValueChains: TargetedValueChains[] | null
  vulnerableGroups: string[] | null
}

type Node = {
  id: string
  group: string
}

type Link = {
  source: string
  target: string
  type: string
}

type Network = {
  nodes: Node[]
  links: Link[]
}

export type NetworkData = {
  actorCode: string
  network: Network
}

