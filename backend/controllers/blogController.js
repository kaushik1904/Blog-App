const Blog = require("./../models/blog");

exports.getAllBlog = async (req, res, next) => {
  let blog;

  try {
    blog = await Blog.find();
  } catch (err) {
    return console.log(err);
  }

  res.status(200).json({ blog });
};

exports.addBlog = async (req, res, next) => {
  const { title, description, img, user } = req.body;

  const blog = new Blog({
    title,
    description,
    img,
    user,
  });

  try {
    blog.save();
  } catch (err) {
    return console.log(err);
  }

  res.status(201).json({ blog });
};

exports.updateBlog = async (req, res, next) => {
  const { title, description } = req.body;

  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    res.status(500).json({ message: "Unable to find blog" });
  }

  res.status(200).json({ blog });
};

exports.getById = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }

  if (!blog) {
    return res.status(404).json({ message: "not find blog" });
  }

  res.status(200).json({ blog });
};

exports.deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;

  try {
    blog = await Blog.findByIdAndDelete(blogId);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }

  if (!blog) {
    return res.status(404).json({ message: "not find blog" });
  }

  res.status(200).json({ message: "delete blog" });
};
