/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['grpc']); // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
});
