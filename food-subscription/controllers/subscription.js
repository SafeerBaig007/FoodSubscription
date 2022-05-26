const subscriptionModal = require("../models").Subscription;

const getSubscriptions = async (req, res) => {
  // console.log("getusers")
  try {
    let subscriptions = await subscriptionModal.findAll();
    res.status(200).send(subscriptions);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const addSubscription = async (req, res) => {
  console.log(req.body);
  try {
    const { user_id, variation } = req.body;
    let subscription = new subscriptionModal({
      user_id,
      variation,
      createAt: Date.now(),
      updatedAt: Date.now(),
    });
    await subscription.save();
    // emailJob.sendEmail(req.body)
    res.status(201).send(subscription);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const getUserSubscription = async (req, res) => {
  // console.log("getusers")
  try {
    let subscription = await subscriptionModal.findOne({
      where: { user_id: req.body.user_id },
    });
    res.status(200).send(subscription);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

module.exports = {
  getSubscriptions,
  addSubscription,
  getUserSubscription,
};
