import express from "express";
import { envConfig } from "./config/index.js";
import { connectDB } from "./config/db.js";
import { ApiError } from "./utils/api.error.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { createSuperAdmin } from "./helpers/create-superadmin.js";
import router from "./routes/admin.route.js";

const app = express();
const PORT = +envConfig.PORT || 5000;

app.use(express.json());

// Database connection
await connectDB();

// SUPERADMIN CREATION
await createSuperAdmin();

// ROUTES
app.use('/api/admin', router);

// URL (404) HANDLER
app.all(/(.*)/, (_req, _res, next) => {
    next(new ApiError("URL not found", 404));
});

// ERROR HANDLER
app.use(errorHandler);

app.listen(PORT, () => console.log("Server is running on port", PORT));
