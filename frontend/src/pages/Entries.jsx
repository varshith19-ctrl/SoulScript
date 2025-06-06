import JournalList from '../components/JournalList';
import { useEffect } from 'react';
export default function Entries({ entries ,setShowNavbar,setEntries}) {
useEffect(() => {
      setShowNavbar(false); // ✅ hide navbar on this page
      return () => setShowNavbar(true); // ✅ show navbar again when leaving
    }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#916570]">Your Journal Entries</h2>
      <JournalList entries={entries} setEntries={setEntries} />
    </div>
  );
}
