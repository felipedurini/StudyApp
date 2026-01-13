const noteRouter = require("express").Router();
const noteController = require("../controllers/noteController");

noteRouter.post("/", noteController.create);
noteRouter.get("/", noteController.getAll);
noteRouter.get("/subject/:subjectId", noteController.getBySubject);
noteRouter.delete("/:id", noteController.deleteNote);
noteRouter.put("/:id", noteController.updateNote);

module.exports = noteRouter;
