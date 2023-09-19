import { Request, Response, NextFunction } from "express";

const logFullRoute = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl, ip, headers } = req;
  const authorizationHeader =
    headers.authorization || "No Authorization Header";

  let requestBody = "";
  if (req.is("application/json") && req.body) {
    const bodySize = Buffer.byteLength(JSON.stringify(req.body));
    const maxBodySize = 1000; // You can set your desired max body size to log
    if (bodySize <= maxBodySize) {
      requestBody = JSON.stringify(req.body, null, 4);
    } else {
      requestBody = `Request body too large to log (${bodySize} bytes)`;
    }
  }

  console.log(`Incoming Request:
Method: ${method}
URL: ${originalUrl}
IP Address: ${ip}
Authorization Header: ${authorizationHeader}
Request Body: ${requestBody}
------------------------------------------------------------------
  `);

  next();
};

export default logFullRoute;
