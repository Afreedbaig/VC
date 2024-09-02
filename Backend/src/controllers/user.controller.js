import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import { Meeting } from "../models/meeting.model.js";
import bcrypt, { hash } from "bcrypt";

async function login(req, res) {
  const { username, password } = req.body;
  // console.log(req.body);
  if (!username || !password) {
    return res.status(400).json({ message: "Please Provide" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User Not Found" });
    }else if (!(bcrypt.compareSync(password, user.password))){
      return res
        .status(httpStatus.401)
        .json({ message: "Incorrect Password" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      let token = crypto.randomUUID(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    } else {
      return res
        .status(httpStatus.401)
        .json({ message: "Invalid User name or Password!!" });
    }
  } catch (e) {
    return res.status(500).json({ message: "something went wrong" });
  }
}

async function register(req, res) {
  try {
    const { name, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User Registered" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
}

async function getuserhistory(req, res) {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token: token });
    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
}

async function addtohistory(req, res) {
  const { token, meeting_code } = req.body;
  try {
    const user = await User.findOne({ token: token });
    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    res.status(httpStatus.CREATED).json({ message: "Added code to history" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
}

export { login, register, getuserhistory, addtohistory };
