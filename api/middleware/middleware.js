const userModel = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();
  console.log(`${timestamp}--${method}--${url}`);
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let { id } = req.params;
    let userId = await userModel.getById(id);
    if (!userId) {
      res.status(404).json({ message: "kullanıcı bulunamadı not found" });
    } else {
      req.user = userId;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "işlem yapılamadı" });
    next(error);
  }
}

async function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "gerekli name alanı eksik" });
  } else {
    req.name = name;
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: "gerekli text alanı eksik" });
  } else {
    req.text = text;
    next();
  }
  // SİHRİNİZİ GÖRELİM
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
