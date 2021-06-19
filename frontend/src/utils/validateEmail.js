import axios from "axios";

async function validateEmail(email) {
  const data = await axios.post(
    "https://mockup-quora-backend.herokuapp.com/api/auth/verify_email",
    {
      email,
    }
  );

  var check = data.data.errormessage;
  return check;
}

export default validateEmail;
