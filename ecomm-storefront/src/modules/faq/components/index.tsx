"use client"

import { Mail, Minus, Plus } from "lucide-react"
import { useRef, useState } from "react"

interface FAQSectionProps {
  title: string;
  children: React.ReactNode;
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{title}</h3>
        <div className="transition-transform duration-200 ease-out">
          {isOpen ? (
            <Minus className="w-5 h-5 text-gray-500" />
          ) : (
            <Plus className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>
      <div 
        className={`transform transition-all duration-200 ease-in-out grid ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className={`pb-6 transition-all duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="faq-container">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">Find answers to common questions about our products and services</p>
      </div>

      <div className="space-y-2">
        <FAQSection title="General Information">
          <div className="prose prose-sm text-gray-600">
            <p className="mb-4">
              We offer both personalized and non-personalized clothing. Each product comes with a detailed description on its dedicated page.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Delivery time: Usually within 7 business days
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Shipping costs: Covered by the customer unless there is a special promotion
              </li>
            </ul>
          </div>
        </FAQSection>

        <FAQSection title="Shipping and Returns">
          <div className="prose prose-sm text-gray-600">
            <p className="mb-4">
              Due to the personalized nature of our products, we do not accept returns except in the following cases:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Damaged products
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Incorrect items
              </li>
            </ul>
            <p className="font-medium mb-2">If you experience these issues:</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Contact us within 14 days at&nbsp;
                <a href="mailto:castle.archive1@gmail.com" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                  castle.archive1@gmail.com
                  <Mail className="w-4 h-4 ml-1" />
                </a>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Return shipping costs will be your responsibility
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                We will issue a refund within 14 days after receiving the returned item
              </li>
            </ul>
          </div>
        </FAQSection>

        <FAQSection title="Are the products always available?">
          <div className="prose prose-sm text-gray-600">
            <p className="mb-4">
              Each product is available in limited quantities (1 unit per item).
            </p>
            <p>
            If the product you want is out of stock, you can contact us and have personalized product. 
            Please note that delivery times will be longer in such cases.
            </p>
          </div>
        </FAQSection>

        <FAQSection title="How can I request a personalized product?">
          <div className="prose prose-sm text-gray-600">
            <p className="mb-4">If you have a special idea, we can make it happen!</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  <span>
                    Contact us with the details of your request at&nbsp;
                    <a href="mailto:castle.archive1@gmail.com" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
                      castle.archive1@gmail.com
                      <Mail className="w-4 h-4 ml-1" />
                    </a>
                  </span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                We&apos;ll work together to create a unique and personalized product just for you.
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                We do accept collaboration with artists and other brands
              </li>
            </ul>
          </div>
        </FAQSection>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Still have questions?{" "}
          <a 
            href="mailto:castle.archive1@gmail.com" 
            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
          >
            Contact us
            <Mail className="w-4 h-4 ml-1" />
          </a>
        </p>
      </div>
    </div>
  )
}