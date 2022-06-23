// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const { loadEnvConfig } = require('@next/env')
loadEnvConfig(process.cwd())

const codeGenOutDir = process.env.CODEGEN_OUTPUT_FILE || 'types/generated/queries.ts'

module.exports = {
  overwrite: true,
  schema: [process.env.NEXT_PUBLIC_REACT_APP_SUBGRAPH_API],
  documents: 'src/queries/**/*.ts',
  generates: {
    [codeGenOutDir]: {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        'plugin-typescript-swr',
      ],
    },
  },
  config: {
    rawRequest: false,
    autogenSWRKey: true,
  },
}
