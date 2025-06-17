// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clearkWebhooks = async (req, res) => {
//   try {
//     //  create an svix instance with clerk webhook secret

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     //Getting Headers

//     const headers = {
//       "svix-id": req.headers["sivix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     //verifying Headers

//     await whook.verify(JSON.stringify(req.body), headers);

//     //getting data from request body
//     const { data, type } = req.body;
//     const userData = {
//       _id: data.id,
//       email: data.email_addresses[0].email_addresses,
//       username: data.first_name + " " + data.last_name,
//       image: data.image_url,
//     };
//     //switch case for diffrent Events
//     switch (type) {
//       case "user.created": {
//         await User.create(userData);
//         break;
//       }
//       case "user.created": {
//         await User.create(userData);
//         break;
//       }
//       case "user.updated": {
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       }
//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id, userData);
//         break;
//       }
//       default: break;

//     }

//     res.json({success:true,
//         message : "webhook Recived"
//    } );

//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false , message: error.message });

//   }
// };

// export default clearkWebhooks;

import User from "../models/User.js";
import { Webhook } from "svix";

const clearkWebhooks = async (req, res) => {
  try {
    // Create an svix instance with Clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting Headers
    const headers = {
      "svix-id": req.headers["svix-id"], // Fixed typo
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verifying Headers
    await whook.verify(JSON.stringify(req.body), headers);

    // Getting data from request body
    const { data, type } = req.body;
    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    // Switch case for different events
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        break;
    }

    res.json({
      success: true,
      message: "Webhook received",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default clearkWebhooks;
