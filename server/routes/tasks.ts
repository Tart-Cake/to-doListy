import express from "express";
import { ObjectId } from "mongodb";

import db from "../db/connection.js";

const router = express.Router();

// Get All Tasks
router.get("/", async (req, res) => {
  let collection = await db.collection("tasks");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get One Task by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("tasks");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Task Not Found!").status(404);
  else res.send(result).status(200);
});

// Create New Task
router.post("/", async (req, res) => {
  try {
    let newTask = {
      text: req.body.text,
      completed: false,
    };
    let collection = await db.collection("tasks");
    let result = await collection.insertOne(newTask);
    res.status(201).send({
      id: result.insertedId,
      ...newTask,
    });
  } catch (error) {
    res.send("Error Adding New Task").status(500);
  }
});

// Update a Task
router.patch("/:id", async (req, res) => {
  // Patch is used rather than put since we will update part of the task not all of it.
  try {
    let query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        text: req.body.text,
      },
    };
    let collection = await db.collection("tasks");
    let result = await collection.findOneAndUpdate(
      query,
      updates,
      { returnDocument: "after" } // Return updated document
    );
    res.status(200).send({
      id: req.params.id,
      text: req.body.text,
    });
  } catch (error) {
    console.log(error);
    res.send("Error Updating the Task").status(500);
  }
});

// Delete a Task
router.delete("/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let collection = await db.collection("tasks");
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.log(error);
    res.send("Error Deleting the Task").status(500);
  }
});

export default router;
