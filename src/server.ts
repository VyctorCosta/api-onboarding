import "dotenv/config";

import app from "./app";

app.listen(process.env.PORT || 3001, () => console.log(`Server is Running at port: https://localhost:${process.env.PORT || 3001}`));
