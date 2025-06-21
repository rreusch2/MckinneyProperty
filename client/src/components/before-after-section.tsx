import { ShieldCheck, Timer, ThumbsUp, Award, BarChart } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "We arrive on time, deliver on our promises, and stand behind our work with a satisfaction guarantee."
  },
  {
    icon: Award,
    title: "Quality",
    description: "From the equipment we use to the people we hire, quality is at the core of everything we do."
  },
  {
    icon: Timer,
    title: "Efficiency",
    description: "We respect your time and property by working efficiently while never compromising our high standards."
  },
  {
    icon: ThumbsUp,
    title: "Customer Satisfaction",
    description: "Your complete satisfaction is our ultimate goal. We work closely with you to exceed your expectations."
  }
];

export default function CoreValuesSection() {
  return (
    <section className="py-16" style={{
      background: "linear-gradient(135deg, var(--light-blue) 0%, #f0f7ff 50%, white 100%)",
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-gray mb-4">Our Client-Focused Values</h2>
          <p className="text-xl text-gray-600">The principles that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center flex flex-col items-center"
            >
              <div className="bg-primary-blue p-4 rounded-full text-white mb-6 group-hover:scale-110 transition-transform">
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-dark-gray mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-primary-blue">
          <div className="flex items-center mb-4">
            <BarChart className="h-8 w-8 text-primary-blue mr-3" />
            <h3 className="text-2xl font-bold text-dark-gray">Our Mission</h3>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            At McKinney Total Property Care LLC, our mission is to exceed client expectations by delivering exceptional property maintenance services with integrity, professionalism, and attention to detail. We are committed to enhancing the beauty, functionality, and value of your property while providing an outstanding customer experience from start to finish.
          </p>
        </div>
      </div>
    </section>
  );
}
