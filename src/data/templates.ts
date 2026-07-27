import { BuilderComponent } from '@/types/builder'

export const templates: {
  id: string
  name: string
  description: string
  category: string
  components: BuilderComponent[]
}[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'A simple landing page for your business',
    category: 'Business',
    components: [
      {
        id: 't-1',
        type: 'navbar',
        props: {
          text: 'My Business',
          backgroundColor: '#000000',
          textColor: '#ffffff',
        },
      },
      {
        id: 't-2',
        type: 'heading',
        props: {
          text: 'Welcome to My Business',
          fontSize: '4xl',
          fontWeight: 'bold',
          alignment: 'center',
          textColor: '#000000',
        },
      },
      {
        id: 't-3',
        type: 'paragraph',
        props: {
          text: 'We provide the best services for your needs.',
          fontSize: 'lg',
          alignment: 'center',
          textColor: '#6b7280',
        },
      },
      {
        id: 't-4',
        type: 'button',
        props: {
          text: 'Get Started',
          backgroundColor: '#000000',
          textColor: '#ffffff',
          borderRadius: '8px',
          href: '#',
        },
      },
      {
        id: 't-5',
        type: 'footer',
        props: {
          text: '© 2024 My Business. All rights reserved.',
          backgroundColor: '#f3f4f6',
          textColor: '#6b7280',
        },
      },
    ],
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'A simple contact form page',
    category: 'Form',
    components: [
      {
        id: 'f-1',
        type: 'heading',
        props: {
          text: 'Contact Us',
          fontSize: '3xl',
          fontWeight: 'bold',
          alignment: 'center',
          textColor: '#000000',
        },
      },
      {
        id: 'f-2',
        type: 'paragraph',
        props: {
          text: 'Fill out the form below and we will get back to you.',
          fontSize: 'base',
          alignment: 'center',
          textColor: '#6b7280',
        },
      },
      {
        id: 'f-3',
        type: 'input',
        props: { placeholder: 'Your Name', backgroundColor: '#ffffff' },
      },
      {
        id: 'f-4',
        type: 'input',
        props: { placeholder: 'Your Email', backgroundColor: '#ffffff' },
      },
      {
        id: 'f-5',
        type: 'textarea',
        props: { placeholder: 'Your Message', backgroundColor: '#ffffff' },
      },
      {
        id: 'f-6',
        type: 'button',
        props: {
          text: 'Send Message',
          backgroundColor: '#000000',
          textColor: '#ffffff',
          borderRadius: '8px',
        },
      },
    ],
  },
]
