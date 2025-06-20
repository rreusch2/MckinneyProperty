import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    rating: 5,
    text: "Lacon did an amazing job pressure washing our driveway and deck. The results were incredible - it looks brand new! Professional, punctual, and reasonably priced."
  },
  {
    name: "Mike Thompson",
    role: "Property Manager",
    rating: 5,
    text: "McKinney Total Property Care has been maintaining our landscaping for over a year. Always reliable, great attention to detail, and our yard has never looked better!"
  },
  {
    name: "Lisa Davis",
    role: "Business Owner",
    rating: 5,
    text: "When we needed help with junk removal and gutter cleaning, Lacon was responsive and got the job done quickly. Highly recommend for any property maintenance needs!"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-light-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-gray mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">Don't just take our word for it - hear from satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <div className="font-semibold text-dark-gray">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
