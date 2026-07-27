export type ComponentType =
  | 'heading'
  | 'paragraph'
  | 'button'
  | 'image'
  | 'input'
  | 'textarea'
  | 'divider'
  | 'card'
  | 'navbar'
  | 'footer'

export interface ComponentProps {
  text?: string
  placeholder?: string
  src?: string
  alt?: string
  href?: string
  backgroundColor?: string
  textColor?: string
  fontSize?: string
  fontWeight?: string
  padding?: string
  margin?: string
  borderRadius?: string
  width?: string
  height?: string
  alignment?: 'left' | 'center' | 'right'
}

export interface BuilderComponent {
  id: string
  type: ComponentType
  props: ComponentProps
}

export interface Project {
  id?: string
  user_id?: string
  name: string
  description?: string
  components: BuilderComponent[]
  published?: boolean
  published_url?: string
  created_at?: string
  updated_at?: string
}
