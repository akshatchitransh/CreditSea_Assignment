import express from "express";
import testRoutes from "./routes/test.route.js";
import borrowerRoutes from "./routes/borrower.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import sanctionRoutes from "./routes/sanction.routes.js";
import disbursementRoutes from "./routes/disbursement.routes.js";
import repaymentRoutes from "./routes/repayment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import salesRoutes from "./routes/sales.routes.js";

import collectionRoutes from"./routes/collection.route.js"
import cors from "cors";


import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/borrower", borrowerRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/loan", loanRoutes);
app.use("/api/sanction", sanctionRoutes);
app.use(
  "/api/collection",
  collectionRoutes
);
app.use(
  "/api/disbursement",
  disbursementRoutes
);
app.use(
  "/api/repayment",
  repaymentRoutes
);

app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/api/admin", adminRoutes);
app.use("/api/sales", salesRoutes);

export default app;