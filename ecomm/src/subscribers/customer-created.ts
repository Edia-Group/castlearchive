const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  console.log("Error loading .env file:", result.error);
}

import { 
    type SubscriberConfig, 
    type SubscriberArgs,
    CustomerService,
  } from "@medusajs/medusa"
  
  export default async function handleCustomerCreated({ 
    data, eventName, container, pluginOptions, 
  }: SubscriberArgs<Record<string, string>>) {
      const sendGridService = container.resolve("sendgridService")
      
      const templateId = process.env.SENDGRID_CUSTOMER_CREATED_ID;
      const fromEmail = process.env.SENDGRID_FROM;
      
      if (!templateId || !fromEmail) {
          throw new Error(
              `Missing required environment variables: ${[
                  !templateId && "SENDGRID_CUSTOMER_CREATED_ID",
                  !fromEmail && "SENDGRID_FROM",
              ].filter(Boolean).join(", ")}`
          );
      }
      
      sendGridService.sendEmail({
          templateId,
          from: fromEmail,
          to: data.email,
          dynamic_template_data: {
              first_name: data.first_name,
              last_name: data.last_name, 
          },
      });
  }
  
  export const config: SubscriberConfig = {
    event: CustomerService.Events.CREATED,
    context: {
      subscriberId: "customer-created-handler",
    },
  } 