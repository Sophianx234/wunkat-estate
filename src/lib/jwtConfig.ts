import jwt from "jsonwebtoken";
type userType = {
  id: string;
  name: string;
};
export const signToken = async (user: userType) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const jwtExpires = process.env.JWT_EXPIRES;
  if (jwtSecret && jwtExpires)
    return jwt.sign({ userId: user.id, name: user.name }, jwtSecret, {
      expiresIn: Number(jwtExpires)*60*60,
    });
  else {
    throw new Error("JWT_EXPIRES is not defined in environment variables");
  }
};


