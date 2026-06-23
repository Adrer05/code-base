import { Router } from "express";
import { ProductsRoute } from "./products/product.route";
import { CategoriesRoute } from "./categories/categories.route";
import { WarehouseRoute } from "./warehouses/warehouse.route";
import { SuppliersRoute} from "./suppliers/supplier.route";

export class AppRoutes {
  static get route(): Router {
    const route = Router();

    route.use("/products", ProductsRoute.route);
    route.use("/categories", CategoriesRoute.route);
    route.use("/suppliers", SuppliersRoute.route);
    route.use("/warehouse", WarehouseRoute.route);

    return route;
  }
}
