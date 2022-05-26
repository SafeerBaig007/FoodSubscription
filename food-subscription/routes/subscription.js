const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription");
const authMiddleware = require("../middlewares/auth");
const subscriptionMiddlewre = require("../middlewares/subscription");

router.get(
  "/",
  [authMiddleware.verifyToken],
  subscriptionController.getSubscriptions
);

router.post(
  "/create",
  [
    authMiddleware.verifyToken,
    subscriptionMiddlewre.validateSubscriptionCreate,
  ],
  subscriptionController.addSubscription
);

router.post(
  "/get-user-subscription",
  [authMiddleware.verifyToken],
  subscriptionController.getUserSubscription
);

// router.post("/login", subscriptionController.login);

module.exports = router;
