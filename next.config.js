/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    dbConfig: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "blog-app",
    },
    secret: "BlogingPlatF0rm@2024#Dev",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api URL
        : "http://localhost:3000/api", // production api URL
  },
};
module.exports = nextConfig;
