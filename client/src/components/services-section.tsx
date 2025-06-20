import { 
  SprayCan, 
  Leaf, 
  TrafficCone, 
  Trash2, 
  PaintBucket, 
  Home, 
  Scissors, 
  Waves, 
  Truck, 
  Snowflake, 
  TreePine,
  Phone 
} from "lucide-react";

const services = [
  {
    icon: SprayCan,
    title: "Pressure Washing",
    description: "Professional pressure washing for driveways, sidewalks, decks, and building exteriors."
  },
  {
    icon: Leaf,
    title: "Landscaping",
    description: "Complete landscaping design, installation, and maintenance for beautiful outdoor spaces."
  },
  {
    icon: TrafficCone,
    title: "Concrete Sealing",
    description: "Protect and enhance concrete surfaces with professional sealing services."
  },
  {
    icon: Trash2,
    title: "Junk Removal",
    description: "Efficient removal of unwanted items, debris, and clutter from your property."
  },
  {
    icon: PaintBucket,
    title: "Painting",
    description: "Interior and exterior painting services to refresh and protect your property."
  },
  {
    icon: Home,
    title: "Gutter Cleaning",
    description: "Thorough gutter cleaning and maintenance to protect your property from water damage."
  },
  {
    icon: Scissors,
    title: "Lawn Mowing",
    description: "Regular lawn mowing and maintenance to keep your grass healthy and beautiful."
  },
  {
    icon: Waves,
    title: "Pool Cleaning",
    description: "Professional pool cleaning and maintenance for crystal clear water year-round."
  },
  {
    icon: Truck,
    title: "Moving Services",
    description: "Reliable moving assistance for residential and commercial relocations."
  },
  {
    icon: TrafficCone,
    title: "Driveway Salting",
    description: "Winter driveway salting services to ensure safe access during icy conditions."
  },
  {
    icon: Snowflake,
    title: "Snow Removal",
    description: "Prompt snow removal services to keep your property accessible and safe."
  },
  {
    icon: TreePine,
    title: "Brush Clearing",
    description: "Efficient brush and vegetation clearing for property maintenance and safety."
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-gray mb-4">Our Complete Range of Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive property care solutions to keep your property in pristine condition year-round.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="text-primary-blue mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="tel:270-704-2207"
            className="bg-primary-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary-blue transition-colors inline-flex items-center"
          >
            <Phone className="mr-3 h-5 w-5" />
            Get Free Estimate Today
          </a>
        </div>
      </div>
    </section>
  );
}
