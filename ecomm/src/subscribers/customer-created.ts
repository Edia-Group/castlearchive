import { 
    type SubscriberConfig, 
    type SubscriberArgs,
    CustomerService,
  } from "@medusajs/medusa"
import { eventNames } from "process"
  
  export default async function handleCustomerCreated({ 
    data, eventName, container, pluginOptions, 
  }: SubscriberArgs<Record<string, string>>) {
    const sendGridService = container.resolve("sendgridService")
  
    sendGridService.sendEmail({
      templateId: "d-f71457c3457245609440a731730ced26",
      from: "giovanni.sdringola51@gmail.com",
      to: data.email,
      dynamic_template_data: {
        // any data necessary for your template...
        first_name: data.first_name,
        last_name: data.last_name,
      },
    })
  }
  
  export const config: SubscriberConfig = {
    event: "customer.created",
    //event: CustomerService.Events.CREATED,
    context: {
      subscriberId: "customer-created-handler",
    },
  }