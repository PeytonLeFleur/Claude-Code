// Pure-logic unit tests only. The offline domain core (mites, risk, csv, store
// selectors) imports nothing from react-native, so ts-jest compiles it directly —
// no jest-expo / RN babel transform needed. Component tests get added later with
// jest-expo once there are screens worth rendering.
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'commonjs',
          esModuleInterop: true,
          strict: true,
          skipLibCheck: true,
        },
      },
    ],
  },
};
