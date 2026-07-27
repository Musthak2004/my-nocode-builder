import { BuilderComponent } from '@/types/builder'

interface Props {
  component: BuilderComponent
  isPreview?: boolean
}

export default function ComponentRenderer({
  component,
  isPreview = false,
}: Props) {
  const { type, props } = component

  switch (type) {
    case 'heading':
      return (
        <h1
          className={`
            text-${props.fontSize || '2xl'}
            font-${props.fontWeight || 'bold'}
            text-${props.alignment || 'left'}
            w-full
          `}
          style={{ color: props.textColor }}
        >
          {props.text}
        </h1>
      )

    case 'paragraph':
      return (
        <p
          className={`text-${props.fontSize || 'base'} text-${props.alignment || 'left'} w-full`}
          style={{ color: props.textColor }}
        >
          {props.text}
        </p>
      )

    case 'button':
      return (
        <button
          className="px-6 py-2 font-medium transition-opacity hover:opacity-80"
          style={{
            backgroundColor: props.backgroundColor,
            color: props.textColor,
            borderRadius: props.borderRadius,
          }}
          onClick={isPreview ? undefined : (e) => e.preventDefault()}
        >
          {props.text}
        </button>
      )

    case 'image':
      return (
        <img
          src={props.src}
          alt={props.alt || ''}
          className="max-w-full"
          style={{ width: props.width }}
        />
      )

    case 'input':
      return (
        <input
          type="text"
          placeholder={props.placeholder}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          style={{ backgroundColor: props.backgroundColor }}
          readOnly={!isPreview}
        />
      )

    case 'textarea':
      return (
        <textarea
          placeholder={props.placeholder}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          style={{ backgroundColor: props.backgroundColor }}
          readOnly={!isPreview}
        />
      )

    case 'divider':
      return (
        <hr
          className="w-full border-t"
          style={{ borderColor: props.backgroundColor }}
        />
      )

    case 'card':
      return (
        <div
          className="w-full shadow-md"
          style={{
            backgroundColor: props.backgroundColor,
            borderRadius: props.borderRadius,
            padding: props.padding,
          }}
        >
          <h3 className="font-semibold text-lg">{props.text}</h3>
          <p className="text-gray-500 mt-2">Card content goes here.</p>
        </div>
      )

    case 'navbar':
      return (
        <nav
          className="w-full px-6 py-4 flex items-center justify-between"
          style={{
            backgroundColor: props.backgroundColor,
            color: props.textColor,
          }}
        >
          <span className="font-bold text-lg">{props.text}</span>
          <div className="flex gap-4">
            <a href="#" style={{ color: props.textColor }} className="hover:opacity-70">Home</a>
            <a href="#" style={{ color: props.textColor }} className="hover:opacity-70">About</a>
            <a href="#" style={{ color: props.textColor }} className="hover:opacity-70">Contact</a>
          </div>
        </nav>
      )

    case 'footer':
      return (
        <footer
          className="w-full px-6 py-4 text-center"
          style={{
            backgroundColor: props.backgroundColor,
            color: props.textColor,
          }}
        >
          {props.text}
        </footer>
      )

    default:
      return null
  }
}
