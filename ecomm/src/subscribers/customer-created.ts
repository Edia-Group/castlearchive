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
    //const customerService: CustomerService = container.resolve( "productService" )
    
    console.log("CustomerService.Events.CREATED",CustomerService.Events.CREATED)
    
    sendGridService.sendEmail({
      templateId: process.env.SENDGRID_USER_REGISTRATION_ID,
      from: process.env.SENDGRID_FROM,
      to: data.email,
      dynamic_template_data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    })
  }
  
  export const config: SubscriberConfig = {
    event: "customer.created",
  }