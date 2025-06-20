export default function BeforeAfterSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-gray mb-4">See the Difference We Make</h2>
          <p className="text-xl text-gray-600">Real results from our professional property care services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
              alt="Before and after pressure washing service"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-dark-gray mb-2">Pressure Washing Results</h3>
              <p className="text-gray-600">
                Dramatic transformation of driveways and walkways with our professional pressure washing services.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
              alt="Professional landscaping transformation"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-dark-gray mb-2">Landscaping Excellence</h3>
              <p className="text-gray-600">
                Complete landscape transformation that enhances your property's curb appeal and value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
