const router = require("express").Router();
const TicketController = require("../../controllers/ticket-controller");

router.post("/v1/tickets", TicketController.create);

module.exports = router;