import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "7d";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = async (
  userId: string,
  role: string,
): Promise<string> => {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const alg = "HS256";

  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg })
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret);

  return token;
};

export const verifyToken = async (token: string): Promise<any> => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
