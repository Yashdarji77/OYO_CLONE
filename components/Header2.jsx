const Header2 = () => {
  const List = [
    { name: "Bangalore" },
    { name: "Gujarat" },
    { name: "Mumbai" },
    { name: "Delhi" },
    { name: "Hyderabad" },
  ];

  return (
    <div className="bg-gray-100">
      <div className="flex flex-wrap justify-center md:justify-between items-center px-4 py-3">
        {List.map((e) => (
          <span
            key={e.name}
            className="mx-2 my-1 text-sm md:text-base font-semibold hover:text-blue-600 transition-colors duration-300"
          >
            {e.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Header2;
