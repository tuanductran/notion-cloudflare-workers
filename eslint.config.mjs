import antfu from '@antfu/eslint-config'
import command from 'eslint-plugin-command/config'

export default antfu(
  {
    type: 'lib',
    formatters: true,
  },
  command(),
)
