import { 
    type SubscriberConfig, 
    type SubscriberArgs,
    CustomerService,
  } from "@medusajs/medusa"
  
  export default async function handleCustomerCreated({ 
    data, eventName, container, pluginOptions, 
  }: SubscriberArgs<Record<string, string>>) {
    const sendGridService = container.resolve("sendgridService")
  
    sendGridService.sendEmail({
      templateId: "d-e69e46b356e7493c8dd7d0b692828f38",
      from: "giannnlaa@gmail.com",
      to: data.email,
      dynamic_template_data: {
        // any data necessary for your template...
        first_name: data.first_name,
        last_name: data.last_name,
      },
    })
  }
  
  export const config: SubscriberConfig = {
    event: CustomerService.Events.CREATED,
    context: {
      subscriberId: "customer-created-handler",
    },
  }