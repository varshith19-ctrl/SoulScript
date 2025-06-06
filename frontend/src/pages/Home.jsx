import { useEffect } from 'react';
import JournalForm from '../components/JournalForm';

export default function Home({ onNewEntry,setShowNavbar }) {
   useEffect(() => {
    setShowNavbar(false); // ✅ hide navbar on this page
    return () => setShowNavbar(true); // ✅ show navbar again when leaving
  }, []);
  return (
    <div className="mt-50">
      <JournalForm onNewEntry={onNewEntry}  />
    </div>
  );
}
