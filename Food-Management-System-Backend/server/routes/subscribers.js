const express = require("express");

const router = express.Router();
const subscriberModel = require("../models").Subscribers;

router.post("/get/subscried-user", async (req, res) => {
  try {
    const user = await subscriberModel.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (user) res.status(200).json({ user });
    else res.status(400).json("Not found!");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/subscribe", async (req, res) => {
  try {
    const user = await subscriberModel.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (!user) {
      const subscriber = await subscriberModel.create({
        user_id: req.body.user_id,
        dish_id: req.body.dish_id,
        dates: req.body.dates,
      });
      res.status(200).json(subscriber);
    } else {
      const subscriber = await subscriberModel.update(
        {
          user_id: req.body.user_id,
          dish_id: req.body.dish_id,
          dates: req.body.dates,
        },
        {
          where: {
            user_id: req.body.user_id,
          },
        }
      );
      const resUser = await subscriberModel.findOne({
          where: {
              user_id: req.body.user_id
          }
      })
      console.log("subs", subscriber)
      res.status(200).json(resUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/opt-meal", async (req, res) => {
  try {
    console.log("try me aya");
    const user = await subscriberModel.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (user) {
      console.log("if me aya");
      let index = user.dates.findIndex((item) => {
        return item.meal == req.body.body.meal;
      });
      Object.assign(user.dates[index], req.body.body);
      console.log("user.dates", user.dates);
      await subscriberModel.update(
        {
          user_id: user.user_id,
          dish_id: user.dish_id,
          dates: user.dates,
        },
        {
          where: {
            user_id: req.body.user_id,
          },
        }
      );
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/subscribed-users', async(req, res) => {
  try {
    const users = await subscriberModel.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
