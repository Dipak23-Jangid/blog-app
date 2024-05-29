import jwt from "jsonwebtoken";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

function getUserFromToken(req) {
  //console.log("serverRuntimeConfig ", serverRuntimeConfig);
  const authHeader = req.headers.authorization;
  if (!authHeader) throw "Authorization header missing";

  const token = authHeader.split(" ")[1];
  if (!token) throw "Token missing";

  try {
    const decoded = jwt.verify(token, serverRuntimeConfig.secret);
    return decoded.sub;
  } catch (error) {
    throw "Invalid token";
  }
}

export { getUserFromToken };
