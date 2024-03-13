import { Request, Response, NextFunction } from "express";
import decryptData from "../utils/decryption";

const hashMiddlware = (req: Request, res: Response, next: NextFunction) => {
  const { hash, encryptionIV } = req.body;

  if (!hash || !encryptionIV) {
    console.log(new Error("Hash or EncryptionIV is missing"));
    return res.status(500).json({
      error:
        "We're sorry, but the link you've provided is invalid. Please double-check and try again.",
    });
  }

  try {
    const decryptedString = decryptData(hash, encryptionIV);
    const decryptedData = JSON.parse(decryptedString);

    const currentDate = new Date();
    const expirationDate = new Date(decryptedData.expirationDate);

    if (expirationDate < currentDate) {
      console.log(new Error("Hash expired"));
      return res.status(500).json({ error: "Link expired" });
    }

    req.body.decryptedData = decryptedData;
  } catch (error) {
    console.log(new Error("Error decrypting the hash" + error));
    return res
      .status(500)
      .json({ error: "Something wrong with the link, please contact support" });
  }

  next();
};

export default hashMiddlware;
