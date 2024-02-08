const userModel = require("../model/useModel");

const create = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }

    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// ====================Get All Record API=============================

const getAll = async (req, res) => {
  try {
    const getAllData = await userModel.find();
    if (getAllData.length === 0) {
      return res.status(404).send({ msg: "User data not found" });
    }
    res.status(200).send(getAllData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// ============Get-Data-By-Id API========================================
const getSingleUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findById(id);
    if (!userExist) {
      return res.status(404).send({ smg: "User not found" });
    }
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: userExist,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// ================== Delete API=================================
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userDelete = await userModel.findById(id);

    if (!userDelete) {
      return res.status(404).send({ smg: "User not found" });
    }
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
      data: userDelete,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// =======Update API===========================================
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userUpdate = await userModel.findById(id);

    if (!userUpdate) {
      return res.status(401).send({ smg: "User not found" });
    }
    const updateData = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "User Updated successfully",
      data: updateData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

module.exports = { create, getAll, getSingleUsers, deleteUser, updateUser };
