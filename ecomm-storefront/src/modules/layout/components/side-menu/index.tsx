"use client"
import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Region } from "@medusajs/medusa"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useState } from "react"
import { BarsThree } from "@medusajs/icons"
import { Instagram, Music2 } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
  FAQ: "/faq",
}

const SocialLinks = {
  Instagram: {
    url: "https://instagram.com/castle.archiv",
    icon: Instagram,
  },
  TikTok: {
    url: "https://tiktok.com/castle.archiv",
    icon: Music2,
  },
}

const SideMenu = ({ regions }: { regions: Region[] | null }) => {
  const toggleState = useToggleState()
  const [isSocialOpen, setIsSocialOpen] = useState(false)

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button 
                  data-testid="nav-menu-button" 
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <BarsThree className="w-6 h-6" />
                </Popover.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full border-2 border-black sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 bg-def-30 text-sm text-ui-fg-on-color">
                  <div data-testid="nav-menu-popup" className="flex flex-col h-full justify-between">
                    <div className="border-black border-b-2 bg-def-20">
                      <div className="flex justify-end p-2" id="xmark">
                        <h1 className="mr-6 text-xl text-black">MENU</h1>
                        <button data-testid="close-menu-button" onClick={close}>
                          <XMark className="text-black"/>
                        </button>
                      </div>
                    </div>
                    <div className="h-full mt-4 bg-def-30 p-5">
                      <ul className="flex flex-col gap-6 items-start justify-start text-black ml-5">
                        {Object.entries(SideMenuItems).map(([name, href]) => (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-xl leading-10 hover:text-ui-fg-disabled"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        ))}
                        <li>
                          <div className="relative">
                            <button
                              onClick={() => setIsSocialOpen(!isSocialOpen)}
                              className="text-xl leading-10 hover:text-ui-fg-disabled flex items-center gap-2"
                            >
                              Social
                              <ArrowRightMini
                                className={clx(
                                  "transition-transform duration-150 w-4 h-4",
                                  isSocialOpen ? "-rotate-90" : ""
                                )}
                              />
                            </button>
                            {isSocialOpen && (
                              <ul className="ml-4 mt-2">
                                {Object.entries(SocialLinks).map(([name, { url, icon: Icon }]) => (
                                  <li key={name} className="mb-2">
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-lg hover:text-ui-fg-disabled"
                                    >
                                      <Icon className="w-5 h-5" />
                                      {name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="">
                      <div className="flex flex-col gap-y-6 text-black bg-def-30 px-2">
                        <div
                          className="flex justify-between"
                          onMouseEnter={toggleState.open}
                          onMouseLeave={toggleState.close}
                        >
                          {regions && (
                            <CountrySelect
                              toggleState={toggleState}
                              regions={regions}
                            />
                          )}
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              toggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                        <div className="flex flex-col">
                          <Text className="txt-compact-small text-black text-xs">
                            © {new Date().getFullYear()} Castle Archivs. All rights
                            reserved.
                          </Text>
                          
                          <LocalizedClientLink href="/terms-of-use" className="txt-compact-small text-black text-xs hover:text-gray-500 py-1">
                            Terms of Use
                          </LocalizedClientLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu