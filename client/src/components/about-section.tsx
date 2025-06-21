import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  const achievements = [
    "Commitment to Customer Satisfaction",
    "Comprehensive Service Offerings"
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div>
            <h2 className="text-4xl font-bold text-dark-gray mb-6">Meet Lacon McKinney</h2>
            <p className="text-lg text-gray-600 mb-8">
              With a commitment to excellence, I founded McKinney Total Property Care LLC to provide reliable, professional services that homeowners and businesses can trust.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
        </div>
      </div>
    </section>
  );
}
