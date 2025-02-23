import "dotenv/config.js";
import express from "express";
import { PORT } from "../env.js";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
// Change to swagger_output_dev.json in development
import swaggerDocument from "../docs/swagger_output_dev_new.json" assert { type: "json" };
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import mainStudentRouter from "./router/studentRouter.js";
import mainWardenRouter from "./router/wardenRouter.js";
import mainFacultyRouter from "./router/facultyRouter.js";

const app = express();

function main() {
  try {
    app.use(
      cors({
        origin: "*",
      })
    ); 
    app.use(bodyParser.json());

    app.get("http://localhost:8000/health", (req, res) => {
      res.send("OK");
    });

    app.use("http://localhost:8000/docs", swaggerUi.serve);
    app.get(
      "http://localhost:8000/docs",
      swaggerUi.setup(swaggerDocument, {
        customSiteTitle: "Webverse API",
      })
    );
    // resolve the parent directort path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // serve the HTML file
    app.get("http://localhost:8000/",(req,res) => {
      res.sendFile(path.resolve(path.dirname('') + "/index.html"));
    });
    
    // // serve the CSS file
    // app.get("/styles.css",(req,res) => {
    //   res.sendFile(path.resolve(path.dirname('') + "/styles.css"));
    // });

    // Main Router Merge
    app.use("/api/v1/student", mainStudentRouter);
    app.use("/api/v1/warden", mainWardenRouter);
    app.use("/api/v1/faculty", mainFacultyRouter);

    app.get("/", (req, res) => {
      res.send("Welcome to the webverse API!");
    });

    app.listen(PORT || 3001, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

main();
