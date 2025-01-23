import { InitApp } from "./app";
import { populateDB } from "./configs/db";

const app = InitApp();
populateDB();
app.listen(3000, () => console.log("Server running on port 3000"));
