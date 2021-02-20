  // graduates-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

module.exports = function (app) {
  const modelName = "graduates";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      fullname: {
        type: String,
        // required: [true, "First Name is required"],
        maxLength: 30,
      },
      headline: {
        type: String,
        // required: [true, "Headline is required"],
        maxLength: 100,
      },
      current_location: {
        type: String,
        // required: [true, "Location is required"],
        maxLength: 20,
      },
      languages: [
        {
          type: String,
          maxLength: 30,
        },
      ],
      willing_relocate: {
        type: Boolean,
      },
      email: {
        type: String,
      },
      mobile: {
        type: Number,
      },
      file_path: {
        type: String,
        // required: true
      },
      file_mimetype: {
        type: String,
        // required: true
      },
      full_time: {
        type: Boolean,
      },
      part_time: {
        type: Boolean,
      },
      contract: {
        type: Boolean,
      },
      willing_remote: {
        type: Boolean,
      },
      internship: {
        type: Boolean,
      },
      temp: {
        type: Boolean,
      },
      linkedin: {
        type: String,
      },
      website: {
        type: String,
      },
      github_nickname: {
        type: String,
      },
      resume_text: {
        type: String,
        maxLength: 2000,
      },
    },

    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
