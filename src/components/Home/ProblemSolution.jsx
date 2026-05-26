export default function ProblemSolution() {
  const problems = [
    {
      problem: "Manual processes killing productivity",
      solution: "Our platform automates repetitive tasks, freeing up your team to focus on high-value work.",
      icon: "⚡",
    },
    {
      problem: "Poor system integrations",
      solution: "We build seamless integrations across all your business tools, ensuring smooth data flow and efficiency.",
      icon: "🔗",
    },
    {
      problem: "Scaling issues with legacy tech",
      solution: "Modern, scalable architectures that grow with your business, preventing bottlenecks and downtime.",
      icon: "🚀",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#e0f7fa] to-[#ffffff] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#31b8c6] font-semibold tracking-widest uppercase text-sm mb-3">
            We Understand Your Pain
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Problems We Solve
          </h2>
        </div>

        {/* Split Layout with Lines */}
        <div className="space-y-16 relative">
          {problems.map((item, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''} gap-12`}> 
              <div className="flex-1 flex items-center justify-center">
                <div className="text-6xl text-[#31b8c6] animate-bounce">
                  {item.icon}
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="before:absolute before:-left-12 before:top-1/2 before:w-10 before:h-1 before:bg-[#31b8c6] before:rounded-full before:-translate-y-1/2"></div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {item.problem}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
