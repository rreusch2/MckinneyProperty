import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  const achievements = [
    "Licensed & Insured Professional",
    "Years of Property Care Experience",
    "Commitment to Customer Satisfaction",
    "Comprehensive Service Offerings"
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-dark-gray mb-6">Meet Lacon McKinney</h2>
            <p className="text-lg text-gray-600 mb-6">
              With years of experience in property maintenance and a commitment to excellence, I founded McKinney Total Property Care LLC to provide reliable, professional services that homeowners and businesses can trust.
            </p>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-success-green text-white p-2 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
              alt="Professional property care specialist"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -top-6 -right-6 bg-primary-blue text-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
