import { Customer, DeliveryPartner, Admin } from "../../models/userSchema";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" },
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken };
};

export const loginCustomer = async (req, reply) => {
  try {
    const { phone } = req.body;
    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = new Customer({
        phone,
        role: "Customer",
        isActivated: true,
      });
      await customer.save();
    }
    const { accessToken, refreshToken } = generateToken(customer);
    return reply.send({
      message: "User Logged Successfully",
      accessToken,
      refreshToken,
      customer
    });
  } catch (error) {
    return reply.status(500).send({
      message: "An error occurred",
      error,
    });
  }
};

