import React, { useEffect, useState } from 'react';

interface Average {
  id_utilisateur: number;
  id_module: number;
  moyenne: number;
}

export default function Averages() {
  const [averages, setAverages] = useState<Average[]>([]);

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/averages");
        const data = await response.json();

        console.log("Réponse brute de l'API:", data);

        // 🔹 Convertir les moyennes en nombres
        const formattedAverages = data.map((item: any) => ({
          ...item,
          moyenne: parseFloat(item.moyenne),
        }));

        setAverages(formattedAverages);
      } catch (error) {
        console.error("Erreur lors du chargement des moyennes:", error);
      }
    };

    fetchAverages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Moyennes des étudiants</h1>
      
      {averages.length === 0 ? (
        <p>Aucune moyenne disponible.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID Étudiant</th>
              <th className="border border-gray-300 px-4 py-2">ID Module</th>
              <th className="border border-gray-300 px-4 py-2">Moyenne</th>
            </tr>
          </thead>
          <tbody>
            {averages.map((average, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{average.id_utilisateur}</td>
                <td className="border border-gray-300 px-4 py-2">{average.id_module}</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">{average.moyenne.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
