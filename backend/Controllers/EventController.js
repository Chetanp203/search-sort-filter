import Event from "../Models/EventModel.js";
import jwt from 'jsonwebtoken'

export const createEvent = async (req, res) => {
  try {
    const { name, date, token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const event = new Event({
      name, 
      creator: decoded?.userID,
      date
    });
    await event.save();
    res.send('Event created successfully');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};