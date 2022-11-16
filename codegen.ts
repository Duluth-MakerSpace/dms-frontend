
import type { CodegenConfig } from '@graphql-codegen/cli';
import { BACKEND_URL } from "./src/constants/makerspace"

const config: CodegenConfig = {
  overwrite: true,
  schema: `${BACKEND_URL}/graphql`,
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
