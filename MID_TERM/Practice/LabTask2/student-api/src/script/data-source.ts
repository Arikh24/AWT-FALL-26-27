import { DataSource } from "typeorm";
import { dataSourceOptions } from "@/config/database.config";

// Used by the TypeORM CLI (migration:generate)
export default new DataSource(dataSourceOptions);
