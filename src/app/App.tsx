import type React from "react";

import logo from "../assets/wingslogo.png";
import familyIcon from "../assets/familyicon.png";
import heroImage1 from "../assets/hero/hero-1.jpg";
import heroImage2 from "../assets/hero/hero-2.jpg";
import heroImage3 from "../assets/hero/hero-3.jpg";
import heroImage4 from "../assets/hero/hero-4.jpg";
import { HeroCarousel } from "@/app/components/HeroCarousel";
import { InfoBox } from "@/app/components/InfoBox";
import { PriceCard } from "@/app/components/PriceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Snowflake, Cross } from "lucide-react";
import coedIcon from "../assets/icons/coed.png";
import allAgesIcon from "../assets/icons/icons8-birth-date-100.png";
import practiceIcon from "../assets/icons/icons8-practice-64.png";
import hockeyFieldIcon from "../assets/icons/icons8-hockey-field-100.png";
import coachingIcon from "../assets/icons/icons8-coaching-100.png";
import qrCode from "../assets/Registration_QR.png";

export default function App() {
  const heroImages = [
    { url: heroImage3, alt: "Wings Arena seating area" },
    { url: heroImage1, alt: "Wings Arena ice rink facility" },
    { url: heroImage2, alt: "Wings Arena ice rink view" },
    { url: heroImage4, alt: "Ice skates rental" },
  ];

  // ✅ One shadow token you can reuse everywhere (cards/images/buttons/schedule wrappers)
  const SHADOW = "shadow-[0_8px_20px_rgba(0,0,0,0.45)]";

  // ✅ NEW COLORS
  const PAGE_BG = "bg-[#1f419b]";
  const CARD_OVERLAY = "bg-[#e51837]/85"; // background only (text stays 100%)

  return (
    <div className={`min-h-screen ${PAGE_BG} flex flex-col sm:block`}>
      {/* Header */}
      <header className={`${PAGE_BG} border-b border-[#b2dbd7]/70`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-4">
          <nav className="flex items-center justify-between"></nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`${PAGE_BG} border-b border-[#b2dbd7]/70`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-5 xl:px-0 py-12">
          <div className="grid lg:grid-cols-2 gap-y-8 lg:gap-y-8 lg:gap-x-[162px] items-center">
            <div className="lg:-ml-[60px] min-[1001px]:max-[1325px]:ml-0 min-[1001px]:max-[1325px]:pr-5">
              {/* Logo + header */}
              <div className="flex flex-col items-center lg:items-center mb-6">
                <img
                  src={logo}
                  alt="Wings Arena"
                  className="w-[65.04px] mt-[-40px] mb-2 ml-2 mr-3 lg:ml-[10px] min-[1001px]:max-[1325px]:ml-[28px]"
                />
                <h1 className="text-4xl lg:text-4xl text-white text-center lg:text-center min-[1001px]:max-[1325px]:pl-[28px]">
                  2026 In-House Spring League
                </h1>

                <p className="text-[#b2dbd7] font-bold tracking-wide mt-3 text-center min-[1001px]:max-[1325px]:pl-[28px]">
                  Starting Friday, March 13th
                </p>

                <div className="mt-[15px] -mb-[10px] h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />
              </div>

              <div className="text-gray-200 mb-4 ml-1 space-y-5 lg:text-center min-[1001px]:max-[1325px]:ml-[28px] text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed">
                <p className="font-semibold text-gray-200">
                  A recreational league for travel team players.
                </p>

                <p>
                  In-house teams with a focus on <strong>development</strong> and{" "}
                  <strong>game play</strong>. Non-checking league.
                </p>

                {/* ✅ ADDED per request */}
                <p className="text-gray-300 font-semibold">
                  Practice &amp; skills development designed to provide a
                  structured, competitive hockey experience
                </p>
              </div>
            </div>

            {/* HeroCarousel */}
            <div
              className={`
                relative h-64 sm:h-80 lg:h-96
                ml-[0px] lg:ml-0
                min-[1001px]:max-[1325px]:h-[320px]
                min-[1001px]:max-[1325px]:ml-0
                min-[1001px]:max-[1325px]:scale-[0.93]
                min-[1001px]:max-[1325px]:origin-top-left
                ${SHADOW}
                rounded-lg overflow-hidden
              `}
            >
              <HeroCarousel images={heroImages} interval={3000} />
            </div>
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section
        className="
          max-w-[calc(80rem*0.97+200px)]
          mx-auto
          px-0
          sm:px-6
          xl:px-8
          py-8
          max-[1000px]:pt-0
          max-[1000px]:mt-[18px]
          lg:mt-[25px]
        "
      >
        <div className="max-[640px]:w-[100vw] max-[640px]:ml-[calc(50%-50vw)] max-[640px]:px-3 max-[640px]:box-border">
          {/* Row 1: Ages card centered */}
          <div className="flex justify-center mb-[calc(1rem*1.0356)]">
            <div className={`w-full max-w-[760px] [&>*]:!w-full [&>*]:${SHADOW}`}>
              <InfoBox
                iconImage={allAgesIcon}
                title="Ages (Birth Years)"
                description={
                  <>
                    <strong>Mites</strong> (2020–2018) • <strong>Squirts</strong>{" "}
                    (2017–2016) • <strong>Peewee</strong> (2015–2014) •{" "}
                    <strong>Bantam</strong> (2013–2012) • <strong>U16-18</strong>{" "}
                    (2011–2008)
                  </>
                }
                iconSize="w-[35.35px] h-[35.35px]"
                iconOffset="-mt-[10px]"
                textOffset="-mt-[1.5px]"
                titleClassName="text-[15px] sm:text-[16px]"
                descriptionClassName="text-[11px] sm:text-[13px] leading-snug"
              />
            </div>
          </div>

          {/* Row 2: 4 cards centered */}
          <div className="flex justify-center">
            <div className="grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[20px] gap-y-[calc(1rem*1.0356)] justify-items-stretch">
              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={practiceIcon}
                  title="Friday Practices"
                  description="Practices on Fridays (limited practice spots)"
                  iconSize="w-[40px] h-[40px]"
                  iconOffset="-mt-[6px]"
                  textOffset="-mt-[3.5px]"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight"
                />
              </div>

              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={hockeyFieldIcon}
                  title="Sunday Games"
                  description="Games on Sundays (weekly, by age group)"
                  iconSize="w-[39px] h-[39px]"
                  iconOffset="-mt-[6px]"
                  textOffset="-mt-[3.5px]"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight"
                />
              </div>

              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={coachingIcon}
                  title="Coaching"
                  description="Coached by Wings Arena professional coaches"
                  iconSize="w-[39px] h-[39px]"
                  iconOffset="-mt-[6px]"
                  textOffset="-mt-[3.5px]"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight"
                />
              </div>

              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={coedIcon}
                  title="Co-Ed League"
                  description="Open to both boys and girls"
                  iconSize="w-[36px] h-[36px]"
                  iconOffset="-mt-[6px]"
                  textOffset="-mt-[3.5px]"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight min-h-[2.6em]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`${PAGE_BG} py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-[1.7rem] sm:text-[2.15625rem] mb-2 text-white text-center">
            Pricing Options
          </h2>
          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />
          <p className="text-center text-gray-200 mb-6 font-semibold">
            Jersey included • Goalies play for FREE
          </p>

          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-6 sm:gap-x-10 w-full max-w-5xl">
              <div className={`h-full flex [&>*]:h-full [&>*]:w-full [&>*]:mx-0 [&>*]:${SHADOW}`}>
                <PriceCard
                  title="Games Only"
                  price="$550"
                  description="Jersey included"
                  features={["Non-checking league"]}
                />
              </div>

              <div className={`h-full flex [&>*]:h-full [&>*]:w-full [&>*]:mx-0 [&>*]:${SHADOW}`}>
                <PriceCard
                  title="Games + Weekly Practice"
                  price="$800"
                  description="Jersey included"
                  features={["Friday practice (limited spots)", "Sunday games"]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule header + divider */}
      <section className={`${PAGE_BG} pt-2 pb-0`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-[1.5625rem] sm:text-[2.2625rem] mb-0 sm:mb-5 text-white text-center">
            Schedule
          </h2>
          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />
        </div>
      </section>

      {/* Weekly Schedules (single card) */}
      <div className="w-[92%] sm:w-full max-w-6xl mx-auto my-8 mt-2">
        <div className={`relative overflow-hidden rounded-lg border border-white/20 p-6 sm:p-8 ${SHADOW}`}>
          {/* ✅ background only */}
          <div className={`absolute inset-0 ${CARD_OVERLAY} backdrop-blur-[2px]`} />
          {/* ✅ content full opacity */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
              {/* LEFT: Friday Practice */}
              <div className="pt-8 sm:pt-20">
                <h3 className="text-white text-[1.25rem] sm:text-[1.6rem] mb-3 -mt-[40px] text-center">
                  Friday Practice Schedule
                </h3>

                <ul className="text-white space-y-2 text-[0.98rem] sm:text-[1.05rem] text-center">
                  <li>• 4:10 PM — Mites</li>
                  <li>• 5:20 PM — Squirts</li>
                  <li>• 6:30 PM — Peewee</li>
                </ul>

                <p className="text-white mt-4 text-[0.92rem] text-center">
                  Limited practice spots available.
                </p>
              </div>

              {/* RIGHT: Sunday Games */}
              <div className="md:border-l md:border-white/25 md:pl-8">
                <h3 className="text-white text-[1.25rem] sm:text-[1.6rem] mb-4 text-center">
                  Sunday Game Schedule
                </h3>

                <ul className="text-white space-y-2 text-[0.98rem] sm:text-[1.05rem] text-center">
                  <li>• 7:00 AM — Mites</li>
                  <li>• 8:10 AM — Mites</li>
                  <li>• 9:20 AM — Squirt</li>
                  <li>• 10:30 AM — Squirt</li>
                  <li>• 1:30 PM — Peewee</li>
                  <li>• 2:40 PM — Peewee</li>
                  <li>• 3:55 PM — Bantam</li>
                  <li>• 5:20 PM — Bantam</li>
                  <li>• 6:50 PM — U16-18</li>
                  <li>• 8:15 PM — U16-18</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration / Contact (combined) */}
      <section className={`${PAGE_BG} py-8 pb-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-[1.5625rem] sm:text-[2.2625rem] mb-0 sm:mb-5 text-white text-center">
            Registration
          </h2>
          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />

          <div className="w-[90%] sm:w-full max-w-3xl mx-auto my-8">
            <div className={`relative overflow-hidden rounded-lg border border-white/20 p-6 sm:p-8 text-center ${SHADOW}`}>
              {/* ✅ background only */}
              <div className={`absolute inset-0 ${CARD_OVERLAY} backdrop-blur-[2px]`} />
              {/* ✅ content full opacity */}
              <div className="relative z-10">
                <h3 className="text-white text-[1.35rem] sm:text-[1.65rem] mb-2 -mt-[10px]">
                  Register Today!
                </h3>

                <p className="text-white leading-relaxed">
                  Use the QR code or click the link below to register.
                </p>

                <img
                  src={qrCode}
                  alt="Registration QR Code"
                  className="mx-auto mt-5 w-[120px] sm:w-[160px] h-auto rounded-md bg-white p-2"
                />

                <a
                  href="https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=8390&GroupID=3982414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-bold underline underline-offset-4 text-blue-600 hover:text-blue-700 transition text-lg md:text-3xl lg:text-3xl xl:text-4xl"
                >
                  Click Here to Register
                </a>

                <div className="my-6 h-px w-full bg-white/25" />

                <h3 className="text-white text-[1.35rem] sm:text-[1.65rem] mb-3">
                  Questions?
                </h3>

                <p className="text-white">
                  Email: <span className="font-semibold">Kebanks@wingsarena.com</span>
                </p>

                <div className="mt-4 text-white space-y-1">
                  <p className="font-semibold text-white">Wings Arena</p>
                  <p>5 Barry Place • Stamford, CT 06902</p>
                  <p>203.357.1055</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`${PAGE_BG} py-12 sm:py-12 pt-0 sm:pt-12 mt-[35px] sm:mt-0 -translate-y-[15px]`}>
        <div className="max-w-[58.08rem] mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-white text-center">
            Frequently Asked Questions
          </h2>
          <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />

          {/* ✅ Accordion wrapper uses same background-overlay pattern */}
          <div className={`relative overflow-hidden rounded-lg border border-white/20 ${SHADOW}`}>
            <div className={`absolute inset-0 ${CARD_OVERLAY} backdrop-blur-[2px]`} />

            <div className="relative z-10">
              <Accordion
                type="single"
                collapsible
                className="bg-transparent px-4 sm:px-6"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-white">
                    Who is this league for?
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    This is a recreational in-house spring league for travel team
                    players, designed for Ages 7–18 (Mite/Squirt/Peewee/Bantam/U16-18).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-white">
                    What’s included with registration?
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    Pricing options include Games Only ($550) or Games + 1 Weekly
                    Practice ($800). A jersey is included with both options.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-white">
                    When are practices and games?
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    Practices are Fridays (limited spots). Games are Sundays. See the
                    Weekly Schedule section above for the full breakdown by age group.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-white">
                    Do goalies have to pay?
                  </AccordionTrigger>
                  <AccordionContent className="text-white">
                    No — goalies play for FREE.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
