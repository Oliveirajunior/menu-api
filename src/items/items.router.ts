/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

/**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();

    return res.status(200).json(items);

  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

// GET items/:id

itemsRouter.get('/:id', async (req: Request, res: Response) => {

  try {
    const id: number = parseInt(req.params.id, 10);
    const item: Item = await ItemService.find(id);

    if(item) {
      return res.status(200).json(item);
    }

    return res.status(404).send("item not found");

  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

// POST items

itemsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;

    const newItem: Item = await ItemService.create(item);

    return res.status(201).json(newItem);

  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

// PUT items/:id

itemsRouter.put('/:id', async(req: Request, res: Response) => {

  try {
    const id: number = parseInt(req.params.id, 10);
    const itemUpdate: BaseItem = req.body;

    const existingItem: Item = await ItemService.find(id);

    if(existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ItemService.create(itemUpdate);
    return res.status(201).json(newItem);
    
  } catch (error: any) {
    return res.status(500).send(error.message);
  }

});


// DELETE items/:id

itemsRouter.delete("/:id", async(req: Request, res: Response) => {

  try {
    const id: number = parseInt(req.params.id, 10)

    await ItemService.remove(id);
    return res.sendStatus(204);

  } catch (error: any) {
    return res.status(500).send(error.message);
  }
})