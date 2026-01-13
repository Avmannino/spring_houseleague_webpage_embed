interface PriceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
}

export function PriceCard({ title, price, description, features }: PriceCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8 w-[85%] sm:w-full mx-auto sm:mx-0">
      <h3 className="text-white mb-3 text-lg sm:text-xl text-center sm:text-left">{title}</h3>
      <div className="text-3xl sm:text-4xl mb-3 text-white text-center sm:text-left">{price}</div>
      <p className="text-gray-300 text-sm sm:text-base mb-6 text-center sm:text-left">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="text-sm sm:text-base text-gray-300 flex items-start justify-center sm:justify-start">
            <span className="text-gray-500 mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}