import vue from '@vitejs/plugin-vue'

const fluentPlugin = {
  name: 'fluent-vue',
  transform (code, id) {
    if (!/vue&type=fluent/.test(id)) {
      return
    }

    const [, rawQuery] = id.split('?', 2)
    const query = new URLSearchParams(rawQuery)

    return `
import { FluentResource } from '@fluent/bundle'

export default function (Component) {
  Component.fluent = Component.fluent || {}
  Component.fluent['${query.get('locale')}'] = new FluentResource(\`${code}\`)
}`
  }
}

export default {
  optimizeDeps: {
    link: ['fluent-vue']
  },
  plugins: [vue(), fluentPlugin]
}
