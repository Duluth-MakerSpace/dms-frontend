
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: './src/graphql/**/*.graphql',
  // ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/graphql/graphql.tsx": {
      // preset: "client",
      // plugins: [],
      plugins: ["typescript", "typescript-operations", "typescript-urql"]
    }
  }
};

export default config;
