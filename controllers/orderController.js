const Order = require("../db/models/orders.js");

const getAll = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const order = await Order.getOne(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalSales = async (req, res) => {
  const { from, to } = req.query;

  try {
    const orders = await Order.getSales(from, to);

    const totalSales = orders.reduce((salesAccumulator, currentOrder) => {
      const orderTotal = currentOrder.items.reduce(
        (orderAccumulator, currentItem) => {
          const itemCost = (currentItem.quantity, currentItem.item.price);
          return orderAccumulator + itemCost;
        },
        0
      );
      return salesAccumulator + orderTotal;
    }, 0);
    res.send({ total: totalSales });
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.update(req.params.id, req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const order = await Order.remove(req.params.id);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByCustomer = async (req, res) => {
  try {
    const orders = await Order.getByCustomer(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByStatus = async (req, res) => {
  const { s, from, to } = req.query;

  try {
    const orders = await Order.getByStatus(s, from, to);

    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  getTotalSales,
  create,
  update,
  remove,
  getByCustomer,
  getByStatus
};
