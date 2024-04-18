require("dotenv").config();

import app from "./app";
import logger from "./helpers/logger";
import { connect } from "./utils/connect";
import { sequelize } from "./utils/database/sequelize";

const port = process.env.PORT;
logger.info("Starting App...");

const startApp = () =>
  app.listen(port, () =>
    logger.info(`

🚀 Le server est en cours d'execution. http//127.0.0.1:${port}

`)
  );

connect()
  .then(() => {
    logger.info(`Connexion reussie`);

    if (process.env.DATABASE_SYNC == "true") {
      logger.info("Synchronisation avec la base de donnée ++++++++");

      sequelize
        .sync({ force: false })
        .then(() => {
          logger.info("Base de données synchronisée avec succès");
          startApp();
        })
        .catch((err: any) => {
          logger.error(
            "Erreur lors de la synchronisation de la base de données :"
          );
          logger.error(err.message);
          console.error(err);
        });
    } else {
      startApp();
    }
  })
  .catch((error) => {
    logger.error(`Connexion échouée`);
    console.log(error.message);
  });

