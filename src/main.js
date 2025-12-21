import express from "express";
import cookieParser from "cookie-parser";

import { envConfig } from "./config/index.js";
import { connectDB } from "./config/db.js";
import { ApiError } from "./utils/api.error.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { createSuperAdmin } from "./helpers/create-superadmin.js";
import routes from "./routes/index.route.js";

const app = express();
const PORT = +envConfig.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Database connection
await connectDB();

// SUPERADMIN CREATION
await createSuperAdmin();

// ROUTES
app.use('/api', routes);

// URL (404) HANDLER
app.all(/(.*)/, (_req, _res, next) => {
    next(new ApiError("URL not found", 404));
});

// ERROR HANDLER
app.use(errorHandler);

app.listen(PORT, () => console.log("Server is running on port", PORT));
