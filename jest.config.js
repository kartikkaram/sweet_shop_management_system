module.exports = {
  testEnvironment: 'jsdom',
   transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.jest.config.js' }],
  },
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: [
    '/node_modules/', // ignore node_modules by default
  ],
};
