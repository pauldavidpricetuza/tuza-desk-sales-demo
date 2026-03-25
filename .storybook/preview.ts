import type { Preview } from '@storybook/react'
import '../src/theme/fonts.css'
import { themeClass } from '../src/theme/theme.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const root = document.documentElement
      root.classList.add(themeClass)
      return Story()
    },
  ],
}

export default preview
