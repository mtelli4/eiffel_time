import React, { useState, useEffect } from 'react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import '../../styles/select-styles.css';

interface Module {
  id_module: number;
  libelle: string;
}

interface Groupe {
  id_grp: number;
  libelle: string;
}

interface Semestre {
  periode: string;
}
interface BlocCompetence {
  id_bloc_comp: number;
  libelle: string;
  modules: Module[];
}


interface Student {
  id_utilisateur: number;
  nom: string;
  prenom: string;
  moyennes: { id_module: number; moyenne: string }[];
  absences: number;
  moyenneGenerale: string;
  moyenneAvecMalus: string;
}

export default function Averages() {
  const [students, setStudents] = useState<Student[]>([]);
  const [blocsCompetences, setBlocsCompetences] = useState<BlocCompetence[]>([]);

  const [modules, setModules] = useState<Module[]>([]);
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [semestres, setSemestres] = useState<Semestre[]>([]);
  const [selectedGroupe, setSelectedGroupe] = useState('all');
  const [selectedSemestre, setSelectedSemestre] = useState('all');

  // 🔹 Récupération des données avec filtres dynamiques
  const fetchData = () => {
    fetch(`http://localhost:4000/api/averages?semestre=${selectedSemestre}&groupe=${selectedGroupe}`)
      .then((res) => res.json())
      .then((data) => {
        setModules(data.modules);
        setStudents(data.students);
        setGroupes(data.groupes);
        setBlocsCompetences(data.blocsCompetences); // ✅ Ajout des blocs de compétences
        setSemestres(data.semestres);
      })
      .catch((error) => console.error('Erreur lors de la récupération des données:', error));
  };

  useEffect(() => {
    fetchData();
  }, [selectedGroupe, selectedSemestre]);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        {/* 🔹 Filtres Groupe et Semestre */}
        <div className="flex gap-3">
          <select 
            onChange={(e) => setSelectedGroupe(e.target.value)} 
            value={selectedGroupe} 
            className="select dark:bg-gray-800 dark:text-white"
          >
            <option value="all">Tous les groupes</option>
            {groupes.map((groupe) => (
              <option key={groupe.id_grp} value={groupe.id_grp}>{groupe.libelle}</option>
            ))}
          </select>

          <select 
            onChange={(e) => setSelectedSemestre(e.target.value)} 
            value={selectedSemestre} 
            className="select dark:bg-gray-800 dark:text-white "
            disabled
          >
            <option value="all">Tous les semestres</option>
            {semestres.map((sem) => (
              <option key={sem.periode} value={sem.periode}>{sem.periode}</option>
            ))}
          </select>
        </div>

        {/* 🔹 Boutons d'exportation */}
        <div className="flex gap-3">
          <button onClick={() => console.log('Exporting XLSX')} className="btn btn-outline dark:bg-primary dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Exporter XLSX
          </button>
          <button onClick={() => console.log('Exporting PDF')} className="btn btn-outline dark:bg-primary dark:text-white flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            Exporter PDF
          </button>
        </div>
      </div>

      {/* 🔹 Tableau des étudiants */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
      <thead>
  <tr className="border-b-2 border-gray-300 dark:border-gray-500">
    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-900">
      Bloc de compétences
    </th>

    {/* 🔹 Affichage des blocs de compétences */}
    {blocsCompetences.map((bloc) => (
      <th
        key={bloc.id_bloc_comp}
        colSpan={bloc.modules.length}
        className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l-2 bg-gray-200 dark:bg-gray-700"
      >
        {bloc.libelle}
      </th>
    ))}

 
  </tr>

  <tr className="border-b-2 border-gray-300 dark:border-gray-500">
    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-900">
      Module
    </th>

    {/* 🔹 Affichage des modules sous chaque bloc */}
    {blocsCompetences.map((bloc) =>
      bloc.modules.map((module) => (
        <th
          key={module.id_module}
          className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-300"
        >
          {module.libelle}
        </th>
      ))
    )}

    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
       Moyenne générale 
    </th>
    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l border-gray-300">
      Absence (h)
    </th>
    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 border-l-2 border-gray-300 bg-gray-50 dark:bg-gray-800">
      Moyenne avec malus 
    </th>
  </tr>
</thead>

           <tbody>
  {students.length > 0 ? (
    students.map((student) => (
      <tr key={student.id_utilisateur} className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900">
        <td className="py-3 px-4 sticky left-0 bg-white dark:bg-gray-900 dark:text-gray-300 font-medium">
          {student.nom} {student.prenom}
        </td>

        {/* 🔹 Affichage des notes pour chaque module sous chaque bloc */}
        {blocsCompetences.map((bloc) =>
          bloc.modules.map((module) => {
            const studentModule = student.moyennes.find((m) => m.id_module === module.id_module);
            return (
              <td key={module.id_module} className="text-center py-3 px-4 border-l border-gray-200 dark:text-gray-300">
                {studentModule ? studentModule.moyenne : '-'}
              </td>
            );
          })
        )}

        <td className="text-center py-3 px-4 border-l border-gray-300">{student.moyenneGenerale}</td>
        <td className="text-center py-3 px-4 border-l border-gray-300">{student.absences}</td>
        <td className="text-center py-3 px-4 border-l border-gray-300">{student.moyenneAvecMalus}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={blocsCompetences.reduce((acc, bloc) => acc + bloc.modules.length, 3)} className="text-center py-4 dark:text-gray-300">
        Aucun étudiant trouvé pour ce filtre.
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
