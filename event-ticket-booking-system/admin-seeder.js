const models = require("./models");
const prompt = require("prompt");
const { hash } = require("bcrypt");

async function admin() {
  await prompt.start();

  await prompt.get(
    [
      {
        name: "first_name",
        required: true,
      },
      {
        name: "last_name",
        required: true,
      },
      {
        name: "email",
        required: true,
      },
      {
        name: "password",
        hidden: true,
        conform: function (value) {
          return true;
        },
      },
      {
        name: "contact_no",
        required: true,
      },
      {
        name: "user_type",
        required: true,
      },
    ],
    async function (err, result) {
      try {
        const data = await models.User.create({
          firstName: result.first_name,
          lastName: result.last_name,
          email: result.email,
          password: await hash(result.password, 10),
          contactNo: result.contact_no,
          userType: result.user_type,
        });
      } catch (error) {
        console.log(error);
      }
    }
  );
}
admin();
