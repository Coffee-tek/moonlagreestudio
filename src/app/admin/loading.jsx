export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full"></div>
      <p className="mt-4 text-lg text-gray-700">Chargement des données en cours...</p>
    </div>
  );
}
