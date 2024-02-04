import multer from "multer";

const imageUploader = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.originalname.split(".").pop();
      cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
    },
  }),
});

export default imageUploader;
