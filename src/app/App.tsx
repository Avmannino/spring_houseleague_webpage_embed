import logo from "../assets/wingslogo.png";
import familyIcon from "../assets/familyicon.png";
import allAgesIcon from "../assets/agesicon.png";
import heroImage1 from "../assets/hero/hero-1.jpg";
import heroImage2 from "../assets/hero/hero-2.jpg";
import heroImage3 from "../assets/hero/hero-3.jpg";
import heroImage4 from "../assets/hero/hero-4.jpg";
import galleryImage1 from "../assets/gallery/gallery-1.jpg";
import galleryImage2 from "../assets/gallery/gallery-2.jpg";
import galleryImage3 from "../assets/gallery/gallery-3.jpg";
import galleryImage4 from "../assets/gallery/gallery-4.jpg";
import catchCornerLogo from "../assets/logos/catchcorner.avif";
import { HeroCarousel } from "@/app/components/HeroCarousel";
import { ImageCarousel } from "@/app/components/ImageCarousel";
import { InfoBox } from "@/app/components/InfoBox";
import { PriceCard } from "@/app/components/PriceCard";
import { ScheduleTable } from "@/app/components/ScheduleTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Snowflake, Cross } from "lucide-react";

export default function App() {
  const heroImages = [
    { url: heroImage3, alt: "Wings Arena seating area" },
    { url: heroImage1, alt: "Wings Arena ice rink facility" },
    { url: heroImage2, alt: "Wings Arena ice rink view" },
    { url: heroImage4, alt: "Ice skates rental" },
  ];

  const galleryImages = [
    { url: heroImage3, alt: "Wings Arena seating area" },
    { url: heroImage1, alt: "Wings Arena ice rink facility" },
    { url: heroImage2, alt: "Wings Arena ice rink view" },
    { url: heroImage4, alt: "Ice skates rental" },
    { url: galleryImage1, alt: "Family ice skating" },
    { url: galleryImage2, alt: "Children skating rink" },
    { url: galleryImage3, alt: "Ice hockey arena" },
    { url: galleryImage4, alt: "Skating lessons" },
  ];

  const scrollToId =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

  // Tailwind "lg" = 1024px. Scroll to the right pricing section for the current layout.
  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const targetId = isDesktop ? "pricing-desktop" : "pricing-mobile";
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0f1340] flex flex-col sm:block">
      {/* Header */}
      <header className="bg-[#0f1340] border-b border-[#b2dbd7]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-4">
          <nav className="flex items-center justify-between"></nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#0f1340] border-b border-[#b2dbd7]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="lg:-ml-[30px]">
              <div className="flex flex-col items-start mb-6">
                <img
                  src={logo}
                  alt="Wings Arena"
                  className="w-[96.04px] mt-[-15px] mb-2 ml-[72px]"
                />
                <h1 className="text-4xl lg:text-5xl text-white">Public Skate</h1>
              </div>

              <div className="text-gray-300 mb-6 space-y-4">
                <p>
                  Lace up and hit the ice at our Public Skate—the perfect chance
                  to get out on the ice. Whether you're practicing your skills,
                  staying active, or just skating for fun, we welcome all ages
                  and skill levels!
                </p>
                <p>
                  No skates? No problem—we've got a wide range of rental sizes
                  from youth to adult, with both hockey and figure skates
                  available.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#schedule"
                  onClick={scrollToId("schedule")}
                  className="bg-[#b2dbd7] text-gray-900 px-6 py-3 rounded-md hover:bg-[#9ccbc7] hover:scale-105 transition-all inline-block"
                >
                  View Schedule
                </a>
                <a
                  href="#pricing"
                  onClick={scrollToPricing}
                  className="bg-transparent text-white px-6 py-3 rounded-md border border-gray-500 hover:bg-gray-800 hover:scale-105 transition-all inline-block"
                >
                  Pricing Info
                </a>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 lg:h-96 ml-[15px]">
              <HeroCarousel images={heroImages} interval={3000} />
            </div>
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="max-w-[calc(80rem*0.97+200px)] mx-auto px-4 sm:px-6 xl:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[calc(1.5rem*1.1356)]">
          <InfoBox
            iconImage={familyIcon}
            title="Great for Families"
            description="Easy outing that works for kids, teens, and parents"
            iconSize="w-[33.6px] h-[33.6px]"
            iconOffset="-mt-[3px]"
          />
          <InfoBox
            iconImage={allAgesIcon}
            title="All Ages Welcome"
            description="Family-friendly environment for everyone"
            iconSize="w-[44.35px] h-[44.35px]"
            iconOffset="-mt-[4px]"
            textOffset="-mt-[5px]"
          />
          <InfoBox
            icon={Snowflake}
            title="Quality Ice"
            description="Professionally maintained ice surface"
          />
          <InfoBox
            icon={Cross}
            title="Safety First"
            description="Trained staff and safety equipment available"
          />
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="bg-[#0f1340] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 lg:-ml-[75px] -mt-[47px] lg:mt-[15px] order-1">
              <h2 className="text-[1.84125rem] sm:text-3xl mb-6 text-white text-center">
                This Week's Public Skates
              </h2>
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6">
                <ScheduleTable />
              </div>
            </div>

            {/* Pricing Section - shows here on mobile, later on desktop */}
            <div className="order-2 lg:hidden mt-0">
              <h2
                id="pricing-mobile"
                className="text-[2rem] sm:text-[2.15625rem] mb-4 sm:mb-8 text-white text-center mt-[10px] sm:mt-0"
              >
                Pricing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 w-[90%] sm:w-full max-w-[1056px] mx-auto gap-8 sm:gap-12 lg:gap-[72px]">
                <PriceCard
                  title="Admission"
                  price="$14"
                  description="Per person"
                  features={[
                    "Walk-ins welcome",
                    "Session length varies by date",
                    "Covers the full public skate session listed",
                  ]}
                />
                <PriceCard
                  title="Skate Rental"
                  price="$6"
                  description="Per person"
                  features={[
                    "Hockey or Figure Skates - Youth to Adult",
                    "Exchange sizes anytime",
                    "Skate helpers available (limited quantity)",
                  ]}
                />
              </div>
            </div>

            <div className="space-y-[23px] sm:space-y-[26px] lg:mt-14 lg:ml-[50px] lg:w-[calc(100%-5px)] mt-[40px] lg:-mt-[25px] w-[85%] mx-auto lg:mx-0 lg:w-[calc(100%-5px)] order-3">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6 lg:mt-3.75">
                <h3 className="text-white mb-2 text-center lg:text-left">
                  Skate Rentals
                </h3>
                <p className="text-gray-300 text-sm text-center lg:text-left">
                  Hockey & figure skates in youth and adult sizes
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6 lg:mt-6.25">
                <h3 className="text-white mb-2 text-center lg:text-left">
                  Spectator Seating
                </h3>
                <p className="text-gray-300 text-sm text-center lg:text-left">
                  Ample space for parents and guests to watch
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6 lg:mt-[30px]">
                <h3 className="text-white mb-2 text-center lg:text-left">
                  Helmets Recommended
                </h3>
                <p className="text-gray-300 text-sm text-center lg:text-left">
                  Especially for kids and first-time skaters
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - shows here on desktop, hidden on mobile */}
      <section
        id="pricing-desktop"
        className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-12 lg:-mt-[10px]"
      >
        <h2 className="text-[2rem] sm:text-[2.15625rem] mb-8 text-white text-center">
          Pricing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[1056px] mx-auto gap-8 sm:gap-12 lg:gap-[72px]">
          <PriceCard
            title="Admission"
            price="$14"
            description="Per person"
            features={[
              "Walk-ins welcome",
              "Session length varies by date",
              "Covers the full public skate session listed",
            ]}
          />
          <PriceCard
            title="Skate Rental"
            price="$6"
            description="Per person"
            features={[
              "Hockey or Figure Skates - Youth to Adult",
              "Exchange sizes anytime",
              "Skate helpers available (limited quantity)",
            ]}
          />
        </div>
      </section>

      {/* Parties & Ice Bookings Section */}
      <section className="bg-[#0f1340] py-12 pb-4 sm:pb-12 -mt-[30px] sm:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-[1.9625rem] sm:text-[2.0625rem] mb-6 sm:mb-8 text-white text-center">
            Parties & Ice Bookings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-[70%] sm:w-full max-w-4xl mx-auto gap-8 sm:gap-12 lg:gap-[72px]">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-[1.65375rem] text-center">
              <h3 className="text-white text-[1.378125rem] sm:text-[1.65375rem] mb-4 -mt-[5px]">
                Birthday Parties
              </h3>
              <a
                href="https://www.wingsarena.com/events"
                className="bg-[#b2dbd7] text-gray-900 px-[1.65375rem] py-[0.826875rem] rounded-md hover:bg-[#9ccbc7] hover:scale-105 transition-all inline-block mb-4 font-bold"
              >
                Learn More
              </a>
              <p className="text-gray-300 text-[0.9646875rem]">
                For birthday party inquiries email: jwanderlingh@wingsarena.com
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 p-[1.65375rem] text-center">
              <h3 className="text-white text-[1.378125rem] sm:text-[1.65375rem] mb-4 -mt-[5px]">
                Private Ice Bookings
              </h3>
              <a
                href="https://www.catchcorner.com/facility-page/embedded/rental/wings-arena"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#b2dbd7] text-gray-900 px-[1.65375rem] py-[0.826875rem] rounded-md hover:bg-[#9ccbc7] hover:scale-105 transition-all inline-block mt-[8px]"
              >
                <img
                  src={catchCornerLogo}
                  alt="Book with CatchCorner"
                  className="h-[3.3075rem] sm:h-[4.41rem] rounded-md"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-12 -mt-[40px] sm:mt-0 order-2 sm:order-none">
        <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-white text-center">
          Gallery
        </h2>
        <ImageCarousel images={galleryImages} interval={3000} />
      </section>

      {/* FAQ Section */}
      <section className="bg-[#0f1340] py-12 sm:py-12 pt-0 sm:pt-12 order-1 sm:order-none mt-[35px] sm:mt-0">
        <div className="max-w-[58.08rem] mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-white text-center">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="bg-[#b2dbd7] rounded-lg border border-gray-700 px-4 sm:px-6"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Do I need to bring my own skates?
              </AccordionTrigger>
              <AccordionContent>
                No, skate rentals are available for a small fee. We have sizes
                for all ages, from toddlers to adults. However, you're welcome
                to bring your own skates if you prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What should I wear to public skate?
              </AccordionTrigger>
              <AccordionContent>
                We recommend wearing comfortable, warm clothing that allows for
                movement. Long pants are recommended, and layers are ideal as
                the rink temperature is kept cool. Gloves or mittens are
                strongly encouraged for hand protection.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Are skating aids available for beginners?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we have skating aids available to help beginners learn to
                skate (limited quantity). These are especially helpful for young
                children and first-time skaters. Staff members are also
                available to provide basic guidance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Can I book a birthday party or group event?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! We host birthday parties and group event bookings.
                These include reserved skating time, party room rental, and
                various add-on options. For more info and availability, email
                our Events Coordinator - jwanderlingh@wingsarena.com
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
