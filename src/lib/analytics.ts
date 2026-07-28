import posthog from 'posthog-js'

export const analytics = {
  userSignedUp: (userId: string) => {
    posthog.capture('user_signed_up', { userId })
  },

  userLoggedIn: (userId: string) => {
    posthog.capture('user_logged_in', { userId })
  },

  projectCreated: (projectId: string, projectName: string) => {
    posthog.capture('project_created', { projectId, projectName })
  },

  projectSaved: (projectId: string, componentCount: number) => {
    posthog.capture('project_saved', { projectId, componentCount })
  },

  projectDeleted: (projectId: string) => {
    posthog.capture('project_deleted', { projectId })
  },

  projectPreviewed: (projectId: string) => {
    posthog.capture('project_previewed', { projectId })
  },

  componentAdded: (componentType: string, projectId: string) => {
    posthog.capture('component_added', { componentType, projectId })
  },

  componentDeleted: (componentType: string, projectId: string) => {
    posthog.capture('component_deleted', { componentType, projectId })
  },

  componentSelected: (componentType: string) => {
    posthog.capture('component_selected', { componentType })
  },

  componentReordered: (projectId: string) => {
    posthog.capture('component_reordered', { projectId })
  },

  templateUsed: (templateId: string, templateName: string) => {
    posthog.capture('template_used', { templateId, templateName })
  },

  saveError: (error: string, projectId: string) => {
    posthog.capture('save_error', { error, projectId })
  },

  previewOpened: (projectId: string) => {
    posthog.capture('preview_opened', { projectId })
  },

  onboardingStarted: () => {
    posthog.capture('onboarding_started')
  },

  onboardingCompleted: () => {
    posthog.capture('onboarding_completed')
  },

  firstProjectCreated: (projectId: string) => {
    posthog.capture('first_project_created', {
      projectId,
      milestone: true,
    })
  },
}
