import { Router } from "express";
import { WharehouseService } from "./warehouse.service";
import { WarehouseController} from "./warehouse.controller";

export class WarehouseRoute {
    static get route(): Router{
        const router = Router();

        const warehouseService = new WharehouseService ();
        const warehouseController = new WarehouseController (warehouseService );

        router.post("/", warehouseController.create);
        router.get("/", warehouseController.findAll);
        router.get("/:id", warehouseController.findOne);
        router.put("/:id", warehouseController.update);
        router.delete("/:id", warehouseController.delete);

        return router;
    }
}