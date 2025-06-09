export default function Quotation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 ">
      <div className="max-w-xl bg-base-100 bg-opacity-60 p-6 rounded-2xl shadow-lg backdrop-blur-sm animate-fade-in">
        <p className="text-xl md:text-2xl font-semibold text-[#5c4d7d]">
          “You don’t have to control your thoughts. You just have to stop letting them control you.”
        </p>
        <p className="mt-2 text-sm text-gray-500">— Dan Millman</p>
      </div>
    </div>
  );
}