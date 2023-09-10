import EventModel from './../Models/EventModel.js'

export const allEvents = async (req, res) => {
  try {
    const { page, limit = 2, name, sort = 'date' ,order} = req.body;

    const query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' }
    }
    const sortPrefix = sort[0] == '-' ? "-" : "";
    const sortField = sort.replace(/^-/, "");
    const sortOption = { [sortField]: `${order}` }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

    const events = await EventModel.find(query).sort(sortOption).skip(skip).limit(limitValue).lean();

    return res.status(200).json({success:true,events})


  } catch (err) {
    console.error(err);
    res.status(500).json({success:false, error: 'Internal Server Error' });
  }
};
 