module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JS and JSX files
  },
  testEnvironment: 'jsdom', // Set the test environment
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // File extensions Jest will look for
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock styles
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)', // Ensure axios is transformed
  ],
  extensionsToTreatAsEsm: ['.js'], // Treat .js files as ESM
};
