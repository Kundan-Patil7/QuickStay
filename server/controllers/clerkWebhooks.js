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
    console.log("Webhook triggered");
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    console.log("Verifying webhook headers...");
    await whook.verify(JSON.stringify(req.body), headers);

    console.log("Webhook verified. Processing data...");
    const { data, type } = req.body;
    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    switch (type) {
      case "user.created": {
        console.log("Creating user:", userData);
        await User.create(userData);
        break;
      }
      case "user.updated": {
        console.log("Updating user:", userData);
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        console.log("Deleting user:", data.id);
        await User.findByIdAndDelete(data.id);
        break;
      }
      default: {
        console.log("Unhandled webhook type:", type);
        break;
      }
    }

    res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Error in webhook handler:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clearkWebhooks;
